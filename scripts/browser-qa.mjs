import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const output = path.join(root, '.qa')
await mkdir(output, { recursive: true })
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
}
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    let file = path.resolve(root, 'dist', '.' + pathname)
    assert.ok(file.startsWith(path.join(root, 'dist')))
    if (pathname === '/') file = path.join(file, 'index.html')
    else if (!path.extname(file)) file += '.html'
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream')
    res.end(await readFile(file))
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const base = 'http://127.0.0.1:' + server.address().port
const browser = await chromium.launch({ executablePath: process.env.CV_BROWSER_PATH || undefined })
const reports = []
const errors = []
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort())
  await page.route('https://www.google-analytics.com/**', (route) => route.abort())
  page.on('pageerror', (error) => errors.push(error.message))
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const locale of ['en', 'es', 'pt']) {
      for (const route of ['/', '/experience', '/projects', '/skills']) {
        const url = locale === 'en' ? route : '/' + locale + (route === '/' ? '' : route)
        const response = await page.goto(base + url)
        assert.equal(response.status(), 200, url)
        await page.locator('astro-island[ssr]').count() // Static content is available immediately.
        assert.equal(await page.locator('h1').count(), 1, 'one main heading: ' + url)
        assert.equal(
          await page.locator('nav a[aria-current="page"]').count(),
          1,
          'active navigation: ' + url
        )
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth
        )
        assert.equal(overflow, false, 'horizontal overflow: ' + url + ' at ' + width)
        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
        reports.push({
          url,
          width,
          violations: axe.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => n.target)
          }))
        })
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(base)
  await page.screenshot({ path: path.join(output, 'desktop.png'), fullPage: true })
  await page.getByRole('button', { name: 'Switch dark mode' }).click()
  assert.equal(await page.locator('html').getAttribute('class'), 'dark')
  await page.screenshot({ path: path.join(output, 'desktop-dark.png'), fullPage: true })
  const darkAxe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  reports.push({
    url: '/',
    theme: 'dark',
    violations: darkAxe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))
  })
  await page.getByRole('link', { name: 'Experience', exact: true }).click()
  await page.waitForURL(base + '/experience')
  assert.equal(
    await page.locator('html').getAttribute('class'),
    'dark',
    'theme persists after navigation'
  )
  await page.getByRole('button', { name: 'Switch dark mode' }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base)
  await page.screenshot({ path: path.join(output, 'mobile.png'), fullPage: true })
  await page.keyboard.press('Tab')
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Skip to content')
  await page.keyboard.press('Enter')
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content')
  for (const locale of ['en', 'es', 'pt']) {
    await page.goto(base + (locale === 'en' ? '/print' : '/' + locale + '/print'))
    assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, follow')
    await page.emulateMedia({ media: 'print' })
    assert.equal(
      await page.locator('#print-cv').isVisible(),
      false,
      'print controls are excluded from PDF'
    )
    await page.screenshot({ path: path.join(output, 'print-' + locale + '.png'), fullPage: true })
    if (process.argv.includes('--pdf')) {
      const pdfNames = { en: 'English', es: 'Español', pt: 'Português' }
      await page.pdf({
        path: path.join(
          root,
          'public',
          'Pablo_Miceli_-_Senior_Product_Engineer_(' + pdfNames[locale] + ').pdf'
        ),
        format: 'A4',
        preferCSSPageSize: true,
        printBackground: true,
        tagged: true,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate:
          '<div style="font-size:9px;color:#475569;text-align:center;width:100%">Pablo Miceli · <span class="pageNumber"></span> / <span class="totalPages"></span></div>'
      })
    }
  }
  await page.emulateMedia({ media: 'screen' })
  await writeFile(
    path.join(output, 'browser-report.json'),
    JSON.stringify({ errors, reports }, null, 2)
  )
  assert.deepEqual(errors, [], 'browser runtime errors')
  assert.equal(
    reports.flatMap((r) => r.violations).length,
    0,
    'accessibility violations; inspect .qa/browser-report.json'
  )
  console.log(
    'Passed: 48 route/viewport checks, keyboard skip link, theme/navigation persistence, print metadata and WCAG automated checks.'
  )
} finally {
  await browser.close()
  server.close()
}

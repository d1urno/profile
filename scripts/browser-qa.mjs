import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const output = path.join(root, '.qa')
const experienceItemSelector = 'section[aria-labelledby="experience-heading"] > article'
const projectCardSelector = 'article[data-project-id]'
const experienceLinkSelector = `${experienceItemSelector} h3 a`
const projectLinkSelector = `${projectCardSelector} a[data-text]`
const overviewLinkSelector = 'a[data-text][href="/projects"]:has(span[aria-hidden="true"])'
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
const arrowGeometry = []
async function createQaContext(options) {
  const context = await browser.newContext(options)
  // Keep every UI scenario isolated from external analytics and its worker callbacks.
  await context.route('https://www.googletagmanager.com/**', (route) => route.abort())
  await context.route('https://www.google-analytics.com/**', (route) => route.abort())
  return context
}
async function settleNavigation(page) {
  await page.waitForFunction(() => !document.documentElement.hasAttribute('data-astro-transition'))
}
async function readExperiences(page) {
  return page.locator(experienceItemSelector).evaluateAll((items) =>
    items.map((item) => ({
      text: item.textContent.trim().replace(/\s+/g, ' '),
      links: Array.from(item.querySelectorAll('a')).map((link) => link.getAttribute('href'))
    }))
  )
}
async function checkAnimatedLabel(link, context) {
  const { label, content } = await link.evaluate((element) => ({
    label: element.dataset.text,
    content: getComputedStyle(element, '::before').content
  }))
  assert.equal(content, `${JSON.stringify(label)} / ""`, context + ' decorative glow label')
}
async function checkArrowGeometry(link, context) {
  const geometry = await link.evaluate((element) => {
    const arrow = element.querySelector('span[aria-hidden="true"]')
    const originalText = arrow.firstChild
    const originalRange = document.createRange()
    originalRange.setStart(originalText, originalText.length - 1)
    originalRange.setEnd(originalText, originalText.length)
    const original = originalRange.getBoundingClientRect().toJSON()
    const reveal = getComputedStyle(element, '::before')
    // A measurable text layer with the pseudo-element's exact computed typography/layout.
    const probe = document.createElement('span')
    for (const property of reveal)
      probe.style.setProperty(property, reveal.getPropertyValue(property))
    probe.style.width = 'max-content'
    probe.style.border = 'none'
    probe.style.filter = 'none'
    probe.style.transition = 'none'
    probe.textContent = element.dataset.text
    element.append(probe)
    const animatedRange = document.createRange()
    animatedRange.setStart(probe.firstChild, probe.firstChild.length - 1)
    animatedRange.setEnd(probe.firstChild, probe.firstChild.length)
    const animated = animatedRange.getBoundingClientRect().toJSON()
    probe.remove()
    return { original, animated }
  })
  for (const dimension of ['x', 'y', 'width', 'height']) {
    assert.ok(
      Math.abs(geometry.original[dimension] - geometry.animated[dimension]) < 0.25,
      context + ' aligned arrow ' + dimension + ': ' + JSON.stringify(geometry)
    )
  }
  arrowGeometry.push({ context, ...geometry })
}
try {
  const context = await createQaContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  page.on('pageerror', (error) =>
    errors.push({ message: error.message, url: page.url(), stack: error.stack })
  )
  const experienceByLocale = {}
  const referencePage = await context.newPage()
  for (const locale of ['en', 'es', 'pt']) {
    await referencePage.goto(base + (locale === 'en' ? '/print' : '/' + locale + '/print'))
    experienceByLocale[locale] = await readExperiences(referencePage)
    assert.equal(experienceByLocale[locale].length, 7, 'print contains each approved role once')
  }
  await referencePage.close()
  const printPage = await context.newPage()
  printPage.on('pageerror', (error) =>
    errors.push({ message: error.message, url: printPage.url(), stack: error.stack })
  )
  await printPage.addInitScript(() => {
    window.qaPrintCalls = 0
    window.print = () => window.qaPrintCalls++
  })
  for (const locale of ['en', 'es', 'pt']) {
    const home = locale === 'en' ? '/' : '/' + locale
    const print = (locale === 'en' ? '' : '/' + locale) + '/print'
    await printPage.goto(base + print)
    await printPage.locator('#print-cv').focus()
    await printPage.keyboard.press('Enter')
    assert.equal(await printPage.evaluate(() => window.qaPrintCalls), 1)
    // Match production's same-origin website link on the local QA server.
    const website = printPage.getByRole('link', { name: 'pablomiceli.dev', exact: true })
    await website.evaluate((link, href) => (link.href = href), base + home)
    await website.click()
    await printPage.waitForURL(base + home)
    await settleNavigation(printPage)
    for (const expectedCalls of [2, 3]) {
      await printPage.goBack()
      await printPage.waitForURL(base + print)
      await settleNavigation(printPage)
      await printPage.locator('#print-cv').click()
      assert.equal(
        await printPage.evaluate(() => window.qaPrintCalls),
        expectedCalls,
        'print button works once per click after returning: ' + locale
      )
      await printPage.goForward()
      await printPage.waitForURL(base + home)
      await settleNavigation(printPage)
    }
  }
  await printPage.close()
  const ctaPage = await context.newPage()
  ctaPage.on('pageerror', (error) =>
    errors.push({ message: error.message, url: ctaPage.url(), stack: error.stack })
  )
  const ctaChecks = []
  for (const [locale, emailLabel, projectsLabel] of [
    ['en', 'Email me', 'View projects'],
    ['es', 'Envíame un email', 'Ver proyectos'],
    ['pt', 'Envie-me um email', 'Ver projetos']
  ]) {
    const home = locale === 'en' ? '/' : '/' + locale
    const projects = locale === 'en' ? '/projects' : '/' + locale + '/projects'
    await ctaPage.goto(base + home)
    const email = ctaPage.getByRole('link', { name: emailLabel, exact: true })
    assert.equal(await email.getAttribute('href'), 'mailto:d1urno@gmx.com')
    await email.focus()
    assert.equal(await email.evaluate((link) => link.matches(':focus-visible')), true)
    await email.evaluate((link) =>
      link.addEventListener(
        'click',
        (event) => {
          event.preventDefault()
          link.dataset.keyboardActivated = String(event.isTrusted)
        },
        { once: true }
      )
    )
    await ctaPage.keyboard.press('Enter')
    assert.equal(
      await email.getAttribute('data-keyboard-activated'),
      'true',
      'Email CTA responds to keyboard activation'
    )
    const projectLink = ctaPage.getByRole('link', { name: projectsLabel, exact: true })
    assert.equal(await projectLink.getAttribute('href'), projects)
    await projectLink.focus()
    assert.equal(await projectLink.evaluate((link) => link.matches(':focus-visible')), true)
    await ctaPage.keyboard.press('Enter')
    await ctaPage.waitForURL(base + projects)
    await ctaPage.locator('nav a[aria-current="page"][href="' + projects + '"]').waitFor()
    await settleNavigation(ctaPage)
    assert.equal(await ctaPage.locator(projectCardSelector).count(), 4)
    ctaChecks.push({ locale, emailLabel, email: 'mailto:d1urno@gmx.com', projectsLabel, projects })
  }
  await writeFile(path.join(output, 'cta-report.json'), JSON.stringify(ctaChecks, null, 2))
  await ctaPage.close()
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const locale of ['en', 'es', 'pt']) {
      for (const route of ['/', '/experience', '/projects', '/skills', '/score']) {
        const url = locale === 'en' ? route : '/' + locale + (route === '/' ? '' : route)
        const response = await page.goto(base + url)
        assert.equal(response.status(), 200, url)
        if (route === '/experience')
          await page.waitForURL(
            base + (locale === 'en' ? '/' : '/' + locale) + '#experience-heading'
          )
        assert.equal(await page.locator('html').getAttribute('lang'), locale, 'locale: ' + url)
        const currentSection = route === '/experience' ? '/' : route
        const canonicalPath =
          locale === 'en'
            ? currentSection
            : '/' + locale + (currentSection === '/' ? '' : currentSection)
        assert.equal(
          await page.locator('link[rel="canonical"]').getAttribute('href'),
          'https://pablomiceli.dev' + canonicalPath,
          'canonical retains current section and language: ' + url
        )
        for (const language of ['en', 'es', 'pt']) {
          const alternatePath =
            language === 'en'
              ? currentSection
              : '/' + language + (currentSection === '/' ? '' : currentSection)
          assert.equal(
            await page
              .locator(`link[rel="alternate"][hreflang="${language}"]`)
              .getAttribute('href'),
            'https://pablomiceli.dev' + alternatePath,
            'alternate retains current section: ' + url + ' -> ' + language
          )
        }
        await page.locator('astro-island[ssr]').count() // Static content is available immediately.
        assert.equal(await page.locator('h1').count(), 1, 'one main heading: ' + url)
        assert.equal(
          await page.locator('nav a[aria-current="page"]').count(),
          1,
          'active navigation: ' + url
        )
        assert.equal(await page.locator('nav a').count(), 4, 'four navigation tabs')
        assert.equal(
          await page.locator('nav a[href*="/experience"]').count(),
          0,
          'Experience is no longer a tab'
        )
        if (route === '/' || route === '/experience') {
          assert.deepEqual(
            await readExperiences(page),
            experienceByLocale[locale],
            'full ordered experience content and links: ' + url
          )
          assert.equal(
            await page.locator('section[aria-labelledby="projects-heading"]').count(),
            0,
            'Selected work removed from Overview'
          )
          assert.equal(await page.locator('h2#experience-heading').count(), 1)
          assert.equal(await page.locator(`${experienceItemSelector} h3`).count(), 7)
          const inlineLink = page.locator('.prose a[href="https://github.com/d1urno/nuxt-image-extractor"]')
          assert.equal(await inlineLink.getAttribute('data-text'), await inlineLink.textContent())
        }
        if (route === '/projects') {
          const projects = await page.locator('[data-project-id]').evaluateAll((cards) =>
            cards.map((card) => ({
              id: card.dataset.projectId,
              title: card.querySelector('h2').textContent.trim(),
              links: Array.from(card.querySelectorAll('a')).map((link) =>
                link.getAttribute('href')
              ),
              thumbnail: card
                .querySelector('img')
                ?.getAttribute('src')
                .split('/')
                .pop()
                .split('.')[0]
            }))
          )
          assert.deepEqual(
            projects,
            [
              {
                id: 'trace-cdr',
                title: 'Trace CDR',
                links: ['https://preview.tracecdr-demo.pages.dev/', 'https://www.tracecdr.org'],
                thumbnail: 'trace-cdr'
              },
              {
                id: 'nuxt-image-extractor',
                title: 'Nuxt image extractor',
                links: ['https://github.com/d1urno/nuxt-image-extractor'],
                thumbnail: undefined
              },
              {
                id: 'dog-and-pony',
                title: 'Dog & Pony Studios',
                links: ['https://dps-senior-frontend-test.netlify.app'],
                thumbnail: 'dog-and-pony'
              },
              {
                id: 'doc88',
                title: 'Doc88',
                links: ['https://doc88-frontend-challenge.netlify.app'],
                thumbnail: 'doc88'
              }
            ],
            'each project retains its own image and destinations: ' + url
          )
        }
        for (const tab of await page.locator('nav a').all()) {
          const bounds = await tab.boundingBox()
          assert.ok(
            Math.abs(bounds.height - 44) < 0.1 && bounds.width >= 44,
            'compact usable tab: ' + url
          )
        }
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth
        )
        assert.equal(overflow, false, 'horizontal overflow: ' + url + ' at ' + width)
        for (const [name, href] of [
          ['GitHub', 'https://github.com/d1urno'],
          ['LinkedIn', 'https://www.linkedin.com/in/pmicel/'],
          ['Twitter', 'https://twitter.com/d1urno']
        ]) {
          const link = page.getByRole('complementary').getByRole('link', { name, exact: true })
          assert.equal(await link.getAttribute('href'), href)
          assert.equal(await link.locator('svg[aria-hidden=true]').count(), 1)
        }
        if (route === '/score') {
          await page.locator('img[src="/img/score-2024.jpg"]').scrollIntoViewIfNeeded()
          await page.waitForFunction(
            () => document.querySelector('img[src="/img/score-2024.jpg"]').naturalWidth > 0
          )
          assert.equal(
            await page
              .locator('img[src="/img/score-2024.jpg"]')
              .evaluate((img) => img.naturalWidth > 0),
            true,
            'saved Score image loads'
          )
        }
        for (const link of await page.locator('a[data-text]').all()) {
          const linkContext = url + ' at ' + width + ': ' + (await link.getAttribute('href'))
          await checkAnimatedLabel(link, linkContext)
          if (await link.locator('span[aria-hidden="true"]').count())
            await checkArrowGeometry(link, linkContext)
        }
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
  await page.getByRole('link', { name: 'Projects', exact: true }).click()
  await page.waitForURL(base + '/projects')
  await settleNavigation(page)
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
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent.trim()),
    'Skip to content'
  )
  await page.keyboard.press('Enter')
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content')
  const interactionPage = await context.newPage()
  interactionPage.on('pageerror', (error) =>
    errors.push({ message: error.message, url: interactionPage.url(), stack: error.stack })
  )
  for (const width of [390, 1440]) {
    await interactionPage.setViewportSize({ width, height: 844 })
    for (const locale of ['en', 'es', 'pt']) {
      const home = locale === 'en' ? '/' : '/' + locale
      const route = (section) =>
        section ? (locale === 'en' ? '' : '/' + locale) + '/' + section : home
      await interactionPage.goto(base + home)
      for (const section of ['projects', 'score', 'skills', '', 'score']) {
        await interactionPage.locator('nav a[href="' + route(section) + '"]').click()
        await interactionPage.waitForURL(base + route(section))
        await interactionPage
          .locator('nav a[aria-current="page"][href="' + route(section) + '"]')
          .waitFor()
        assert.equal(
          await interactionPage.locator('nav a[aria-current="page"]').getAttribute('href'),
          route(section)
        )
        await settleNavigation(interactionPage)
        if (width === 390) {
          await interactionPage.waitForFunction(() => {
            const nav = document.querySelector('#main-nav-tabs').getBoundingClientRect()
            return nav.top >= -1 && nav.bottom <= window.innerHeight
          })
        }
      }
      await interactionPage.goBack()
      await interactionPage.waitForURL(base + home)
      await interactionPage.locator('nav a[aria-current="page"][href="' + home + '"]').waitFor()
      assert.equal(
        await interactionPage.locator('nav a[aria-current="page"]').getAttribute('href'),
        home
      )
      await settleNavigation(interactionPage)
      await interactionPage.goForward()
      await interactionPage.waitForURL(base + route('score'))
      await interactionPage
        .locator('nav a[aria-current="page"][href="' + route('score') + '"]')
        .waitFor()
      assert.equal(
        await interactionPage.locator('nav a[aria-current="page"]').getAttribute('href'),
        route('score')
      )
      await settleNavigation(interactionPage)
      await interactionPage.locator('nav a[aria-current="page"]').click()
      await settleNavigation(interactionPage)
      assert.equal(await interactionPage.locator('html').getAttribute('lang'), locale)
    }
  }
  await interactionPage.close()
  const animatedContext = await createQaContext({ reducedMotion: 'no-preference' })
  const animatedPage = await animatedContext.newPage()
  animatedPage.on('pageerror', (error) =>
    errors.push({ message: error.message, url: animatedPage.url(), stack: error.stack })
  )
  await animatedPage.setViewportSize({ width: 1440, height: 1000 })
  await animatedPage.goto(base)
  const animatedTab = animatedPage.getByRole('link', { name: 'Score', exact: true })
  const selectedTab = animatedPage.locator('nav a[aria-current="page"]')
  const selectedBounds = await selectedTab.boundingBox()
  const selectedIdle = await selectedTab.evaluate((link) => ({
    cursor: getComputedStyle(link, '::before').borderInlineEndColor,
    after: getComputedStyle(link, '::after').content,
    highlight: getComputedStyle(link).borderBottomWidth
  }))
  assert.equal(selectedIdle.cursor, 'rgba(0, 0, 0, 0)')
  assert.equal(selectedIdle.after, 'none')
  assert.equal(selectedIdle.highlight, '3px')
  await selectedTab.hover()
  await animatedPage.waitForFunction(() => {
    const link = document.querySelector('nav a[aria-current="page"]')
    return (
      parseFloat(getComputedStyle(link, '::before').width) >= link.getBoundingClientRect().width + 5
    )
  })
  assert.ok(
    Math.abs(
      (await selectedTab.evaluate((link) => {
        const style = getComputedStyle(link, '::before')
        return (
          parseFloat(style.width) -
          parseFloat(style.borderInlineEndWidth) -
          link.getBoundingClientRect().width
        )
      })) - 3.2
    ) < 0.3,
    'selected hover cursor has trailing gap'
  )
  assert.deepEqual(await selectedTab.boundingBox(), selectedBounds, 'hover causes no layout shift')
  await animatedPage.mouse.move(0, 0)
  assert.equal(await animatedTab.getAttribute('data-text'), 'Score')
  assert.equal(
    await animatedTab.evaluate((link) => getComputedStyle(link, '::before').transitionDuration),
    '1s'
  )
  await animatedTab.hover()
  await animatedPage.waitForFunction(() => {
    const reveal = getComputedStyle(document.querySelector('nav a[href="/score"]'), '::before')
    return (
      parseFloat(reveal.width) >=
      document.querySelector('nav a[href="/score"]').getBoundingClientRect().width + 5
    )
  })
  await animatedPage.screenshot({ path: path.join(output, 'tabs-hover.png'), fullPage: true })
  const glowProof = []
  async function captureGlow(link, name) {
    await checkAnimatedLabel(link, name)
    await link.hover()
    await animatedPage.waitForFunction(
      (element) => {
        const reveal = getComputedStyle(element, '::before')
        return parseFloat(reveal.width) >= element.getBoundingClientRect().width + 5
      },
      await link.elementHandle()
    )
    const bounds = await link.boundingBox()
    const clip = {
      x: Math.floor(bounds.x - 30),
      y: Math.max(0, Math.floor(bounds.y - 30)),
      width: Math.ceil(bounds.width + 60),
      height: Math.ceil(bounds.height + 60)
    }
    await animatedPage.screenshot({ path: path.join(output, name + '-glow.png'), clip })
    await animatedPage.addStyleTag({
      content:
        '[data-glow-proof="off"]::before { filter: none !important; transition: none !important; }'
    })
    await link.evaluate((element) => element.setAttribute('data-glow-proof', 'off'))
    await animatedPage.screenshot({ path: path.join(output, name + '-plain.png'), clip })
    await link.evaluate((element) => element.removeAttribute('data-glow-proof'))
    glowProof.push({ name, bounds, clip })
    const gap = await link.evaluate((element) => {
      const style = getComputedStyle(element, '::before')
      return (
        parseFloat(style.width) -
        parseFloat(style.borderInlineEndWidth) -
        element.getBoundingClientRect().width
      )
    })
    assert.ok(Math.abs(gap - 3.2) < 0.3, name + ' trailing cursor gap')
    assert.equal(await link.evaluate((element) => getComputedStyle(element).overflow), 'visible')
    assert.equal(
      await animatedPage.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false
    )
  }
  await captureGlow(animatedTab, 'tab-light')
  await captureGlow(animatedPage.locator(experienceLinkSelector).first(), 'link-light')
  for (const [selector, label, arrow] of [
    [overviewLinkSelector, 'View projects', '→'],
    [projectLinkSelector, 'Source and documentation — Nuxt image extractor', '↗']
  ]) {
    if (selector === projectLinkSelector) await animatedPage.goto(base + '/projects')
    const link = animatedPage.locator(selector).first()
    assert.equal(await animatedPage.getByRole('link', { name: label, exact: true }).count(), 1)
    assert.equal(await link.locator('[aria-hidden="true"]').count(), 1, 'one decorative arrow')
    const visibleLabel = await link.evaluate((element) => {
      const copy = element.cloneNode(true)
      copy.querySelectorAll('.sr-only').forEach((node) => node.remove())
      return copy.textContent.trim().replace(/[ \t\r\n\f]+/g, ' ')
    })
    assert.equal(
      await link.getAttribute('data-text'),
      visibleLabel,
      'animation covers complete label'
    )
    assert.ok(visibleLabel.endsWith(arrow))
    await checkArrowGeometry(link, 'keyboard focus: ' + selector)
    await link.focus()
    assert.equal(await link.evaluate((element) => element.matches(':focus-visible')), true)
    await captureGlow(link, arrow === '→' ? 'internal-arrow-light' : 'external-arrow-light')
    await link.evaluate((element) => element.blur())
    await animatedPage.mouse.move(0, 0)
    await animatedPage.waitForFunction((selector) => {
      const element = document.querySelector(selector)
      const reveal = getComputedStyle(element, '::before')
      return parseFloat(reveal.width) <= 2.1 && reveal.filter === 'none'
    }, selector)
    assert.equal(
      await link.locator('[aria-hidden="true"]').evaluate((arrow) => getComputedStyle(arrow).color),
      await link.evaluate((element) => getComputedStyle(element).color),
      'arrow resets with label'
    )
  }
  await animatedPage.goto(base)
  await animatedTab.focus()
  assert.equal(await animatedTab.evaluate((link) => link.matches(':focus-visible')), true)
  const social = animatedPage
    .getByRole('complementary')
    .getByRole('link', { name: 'GitHub', exact: true })
  const socialIdleColor = await social.evaluate((link) => getComputedStyle(link).color)
  await social.hover()
  await animatedPage.waitForFunction(() =>
    getComputedStyle(document.querySelector('aside a[aria-label="GitHub"]')).transform.includes('1.25')
  )
  await social.focus()
  assert.equal(await social.evaluate((link) => link.matches(':focus-visible')), true)
  await animatedPage.screenshot({ path: path.join(output, 'social-focus.png'), fullPage: true })
  await social.evaluate((link) => link.blur())
  await animatedPage.mouse.move(0, 0)
  await animatedPage.waitForFunction(
    (color) =>
      getComputedStyle(document.querySelector('aside a[aria-label="GitHub"]')).color === color &&
      getComputedStyle(document.querySelector('aside a[aria-label="GitHub"]')).transform === 'none',
    socialIdleColor
  )
  await animatedPage.getByRole('button', { name: 'Switch dark mode' }).click()
  await captureGlow(animatedTab, 'tab-dark')
  await captureGlow(animatedPage.locator(experienceLinkSelector).first(), 'link-dark')
  await captureGlow(
    animatedPage.locator(overviewLinkSelector),
    'internal-arrow-dark'
  )
  await animatedPage.goto(base + '/projects')
  await captureGlow(
    animatedPage.locator(projectLinkSelector).first(),
    'external-arrow-dark'
  )
  await animatedTab.hover()
  const animatedDarkAxe = await new AxeBuilder({ page: animatedPage })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  assert.equal(animatedDarkAxe.violations.length, 0, 'dark hover accessibility')
  await animatedPage.goto(base + '/score')
  await animatedPage.locator('img[src="/img/score-2024.jpg"]').scrollIntoViewIfNeeded()
  await animatedPage.screenshot({
    path: path.join(output, 'score-desktop-dark.png'),
    animations: 'disabled',
    fullPage: true
  })
  await animatedPage.getByRole('button', { name: 'Switch dark mode' }).click()
  await animatedPage.setViewportSize({ width: 390, height: 844 })
  await animatedPage.screenshot({
    path: path.join(output, 'score-mobile.png'),
    fullPage: true,
    animations: 'disabled'
  })
  await animatedPage.goto(base)
  await animatedPage.setViewportSize({ width: 1440, height: 1000 })
  const animationCycles = []
  async function sampleAnimation(link, duration) {
    return link.evaluate(
      (element, duration) =>
        new Promise((resolve) => {
          const frames = []
          const start = performance.now()
          const sample = () => {
            const style = getComputedStyle(element, '::before')
            frames.push({
              time: performance.now() - start,
              width: parseFloat(style.width),
              fullWidth:
                element.getBoundingClientRect().width +
                parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.2 +
                2,
              filter: style.filter,
              borderColor: style.borderInlineEndColor,
              borderWidth: style.borderInlineEndWidth
            })
            if (performance.now() - start < duration) requestAnimationFrame(sample)
            else resolve(frames)
          }
          requestAnimationFrame(sample)
        }),
      duration
    )
  }
  for (const width of [390, 1440]) {
    await animatedPage.setViewportSize({ width, height: 844 })
    for (const selector of [
      'nav a[href="/score"]',
      experienceLinkSelector,
      overviewLinkSelector,
      projectLinkSelector
    ]) {
      await animatedPage.goto(base + (selector === projectLinkSelector ? '/projects' : '/'))
      const link = animatedPage.locator(selector).first()
      const timing = await link.evaluate((element) => {
        const style = getComputedStyle(element, '::before')
        return {
          property: style.transitionProperty,
          duration: style.transitionDuration,
          delay: style.transitionDelay,
          easing: style.transitionTimingFunction
        }
      })
      assert.deepEqual(timing, {
        property: 'all',
        duration: '1s',
        delay: '0s',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      })
      await animatedPage.mouse.move(0, 0)
      await link.evaluate((element) => element.blur())
      await animatedPage.waitForFunction(
        (selector) =>
          parseFloat(getComputedStyle(document.querySelector(selector), '::before').width) <= 2.1,
        selector
      )
      await link.hover()
      const enter = await sampleAnimation(link, 1100)
      await animatedPage.mouse.move(0, 0)
      const leave = await sampleAnimation(link, 1100)
      await link.hover()
      const partialEnter = await sampleAnimation(link, 250)
      await animatedPage.mouse.move(0, 0)
      const partialLeave = await sampleAnimation(link, 200)
      await link.hover()
      const reenter = await sampleAnimation(link, 1100)
      for (const frames of [enter, leave, partialEnter, partialLeave, reenter]) {
        for (const frame of frames) {
          const blur = Number(
            (frame.filter.match(/([\d.]+)px/g) || ['0px']).at(-1).replace('px', '')
          )
          assert.ok(
            Math.abs(frame.width / frame.fullWidth - blur / 25) < 0.045,
            'glow and cursor share progress'
          )
          assert.equal(frame.borderWidth, '2px')
        }
      }
      assert.ok(enter.at(-1).width >= enter.at(-1).fullWidth - 1)
      assert.ok(leave.at(-1).width <= 2.1)
      assert.ok(reenter.at(-1).width >= reenter.at(-1).fullWidth - 1)
      assert.ok(
        enter.some(
          (frame) => frame.width / frame.fullWidth > 0.2 && frame.width / frame.fullWidth < 0.8
        )
      )
      if (await link.locator('span[aria-hidden="true"]').count())
        await checkArrowGeometry(link, 'after reentry at ' + width + ': ' + selector)
      animationCycles.push({
        width,
        selector,
        timing,
        enter,
        leave,
        partialEnter,
        partialLeave,
        reenter
      })
    }
  }
  await writeFile(
    path.join(output, 'animation-cycles.json'),
    JSON.stringify(animationCycles, null, 2)
  )
  await writeFile(path.join(output, 'arrow-geometry.json'), JSON.stringify(arrowGeometry, null, 2))
  await animatedPage.emulateMedia({ reducedMotion: 'reduce' })
  await social.hover()
  assert.equal(await social.evaluate((link) => getComputedStyle(link).transform), 'none')
  assert.equal(
    await animatedTab.evaluate((link) => getComputedStyle(link, '::before').transitionDuration),
    '1e-05s'
  )
  await animatedContext.close()
  await writeFile(path.join(output, 'glow-proof.json'), JSON.stringify(glowProof, null, 2))
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
          process.env.CV_PDF_DIR || path.join(root, 'public'),
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
  for (const locale of ['en', 'es', 'pt']) {
    for (const route of ['', '/experience', '/projects', '/skills', '/print', '/tests', '/score']) {
      const response = await page.goto(base + '/' + locale + route)
      assert.equal(response.status(), 200, 'localized alias: /' + locale + route)
      if (route === '/experience')
        await page.waitForURL(base + (locale === 'en' ? '/' : '/' + locale) + '#experience-heading')
      assert.equal(await page.locator('html').getAttribute('lang'), locale)
    }
  }
  for (const prefix of ['', '/en', '/es', '/pt']) {
    const projects = prefix === '/es' || prefix === '/pt' ? prefix + '/projects' : '/projects'
    for (const suffix of ['', '.html']) {
      const legacy = prefix + '/tests' + suffix
      await page.goto(base + legacy)
      const activeTab = page.locator('nav a[aria-current="page"]')
      assert.equal(await activeTab.count(), 1, 'one active tab on legacy Projects: ' + legacy)
      assert.equal(await activeTab.getAttribute('href'), projects)
      assert.equal(await activeTab.getAttribute('data-active'), 'true')
      assert.equal(await page.locator(projectCardSelector).count(), 4)
    }
  }
  const redirectChecks = []
  for (const javaScriptEnabled of [true, false]) {
    const redirectContext = await createQaContext({ javaScriptEnabled, reducedMotion: 'reduce' })
    const redirectPage = await redirectContext.newPage()
    redirectPage.on('pageerror', (error) =>
      errors.push({ message: error.message, url: redirectPage.url(), stack: error.stack })
    )
    for (const prefix of ['', '/en', '/es', '/pt']) {
      const home = prefix === '/es' || prefix === '/pt' ? prefix : '/'
      for (const suffix of ['', '.html']) {
        const legacy = prefix + '/experience' + suffix
        const destination = base + home + '#experience-heading'
        await redirectPage.goto(base + '/projects')
        await redirectPage.goto(base + legacy)
        await redirectPage.waitForURL(destination)
        await settleNavigation(redirectPage)
        assert.equal(
          await redirectPage.locator('nav a[aria-current="page"]').getAttribute('href'),
          home
        )
        assert.equal(await redirectPage.locator(experienceItemSelector).count(), 7)
        await redirectPage.goBack()
        await redirectPage.waitForURL(base + '/projects')
        await settleNavigation(redirectPage)
        await redirectPage.goForward()
        await redirectPage.waitForURL(destination)
        await redirectPage.goBack()
        await redirectPage.waitForURL(base + '/projects')
        redirectChecks.push({
          legacy,
          destination: home + '#experience-heading',
          javaScriptEnabled
        })
      }
    }
    await redirectContext.close()
  }
  await writeFile(
    path.join(output, 'redirect-report.json'),
    JSON.stringify(redirectChecks, null, 2)
  )
  assert.equal((await context.request.get(base + '/robots.txt')).status(), 200)
  assert.equal((await context.request.get(base + '/sitemap-index.xml')).status(), 200)
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
    'Passed: 60 route/viewport checks, Overview experience content, legacy Projects aliases, legacy redirects with/without JavaScript and stable history, repeated and back/forward navigation, print keyboard activation and history, social icons, Score image, keyboard skip link, theme persistence, print metadata and WCAG automated checks.'
  )
} finally {
  await browser.close()
  server.close()
}

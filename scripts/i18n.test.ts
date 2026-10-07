import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getLocale, getPagePath, localizePath } from '../src/functions/getLocale.ts'
import { createTranslator } from '../src/i18n/translate.ts'

test('canonical and legacy URLs resolve to the same locale and section', () => {
  for (const [path, locale, section] of [
    ['/', 'en', '/'],
    ['/index.html', 'en', '/'],
    ['/en.html', 'en', '/'],
    ['/es/', 'es', '/'],
    ['/pt/index.html', 'pt', '/'],
    ['/en/projects.html', 'en', '/projects'],
    ['/es/projects', 'es', '/projects'],
    ['/pt/tests.html', 'pt', '/tests'],
    ['/score.html', 'en', '/score'],
    ['/especially', 'en', '/especially']
  ] as const) {
    const url = new URL(path, 'https://pablomiceli.dev')
    assert.equal(getLocale(url), locale, path)
    assert.equal(getPagePath(url), section, path)
  }
})

test('localized links preserve the section and canonical English URLs', () => {
  assert.equal(localizePath('/', 'en'), '/')
  assert.equal(localizePath('/', 'es'), '/es')
  assert.equal(localizePath('/projects', 'pt'), '/pt/projects')
  assert.equal(
    localizePath(getPagePath(new URL('https://pablomiceli.dev/en/skills.html')), 'es'),
    '/es/skills'
  )
})

test('translations resolve string leaves and preserve Unicode', () => {
  const t = createTranslator({ greeting: 'Olá', navigation: { projects: 'Projetos' } }, 'pt')
  assert.equal(t('greeting'), 'Olá')
  assert.equal(t('navigation.projects'), 'Projetos')
})

test('missing, non-string and inherited translation keys fail clearly', () => {
  const t = createTranslator({ navigation: { projects: 'Projects' }, invalid: null }, 'en')
  for (const key of ['missing', 'missing.nested', 'navigation.missing', 'toString', '__proto__']) {
    assert.throws(() => t(key as never), /Missing translation .* locale "en"/)
  }
  for (const key of ['navigation', 'invalid']) {
    assert.throws(() => t(key as never), /must be a string/)
  }
})

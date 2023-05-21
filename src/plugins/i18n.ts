import { createI18n } from 'vue-i18n'
import type { UserPlugin } from '@/main'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('@/assets/locales/*.json')).map(([key, value]) => {
    const json = key.endsWith('.json')
    return [key.slice(20, json ? -5 : -4), (value as Record<string, string>).default]
  })
)

const getBrowserLocale = (options = {}) => {
  const defaultOptions = { countryCodeOnly: false }

  const opt = { ...defaultOptions, ...options }

  const navigatorLocale =
    navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!navigatorLocale) return undefined

  return opt.countryCodeOnly ? navigatorLocale.trim().split(/[-_]/)[0] : navigatorLocale.trim()
}

export function getSupportedLocales() {
  const annotatedLocales = []
  for (const code of Object.keys(messages)) {
    annotatedLocales.push(code)
  }
  return annotatedLocales
}

function supportedLocalesInclude(locale: string) {
  return getSupportedLocales().includes(locale)
}

function getStartingLocale() {
  // Check for saved language
  const lang: string | null = localStorage.getItem('language')
  if (lang) return lang

  // Check for browser language
  const browserLocale: string | undefined = getBrowserLocale({
    countryCodeOnly: true
  })
  if (browserLocale && supportedLocalesInclude(browserLocale)) return browserLocale

  // Default language
  return 'en'
}

export const install: UserPlugin = ({ app }) => {
  const i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: getStartingLocale(),
    messages
  })

  // Set initial lang meta
  // document.documentElement.lang = i18n.global.locale.value

  app.use(i18n)
}

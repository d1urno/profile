import { createI18n, type Locale } from 'vue-i18n'
import type { UserPlugin } from '@/main'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {}
})

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('@/assets/locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale
  ])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined') document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang) return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

function supportedLocalesInclude(locale: string) {
  return availableLocales.includes(locale)
}

function getBrowserLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false }

  const opt = { ...defaultOptions, ...options }

  const navigatorLocale =
    navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!navigatorLocale) return undefined

  return opt.countryCodeOnly ? navigatorLocale.trim().split(/[-_]/)[0] : navigatorLocale.trim()
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
  app.use(i18n)
  loadLanguageAsync(getStartingLocale())
}

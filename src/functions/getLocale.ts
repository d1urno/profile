import { defaultLocale, isLocale, localeCodes, type Locale } from '../i18n/config.ts'
export type { Locale } from '../i18n/config.ts'

const localePrefix = new RegExp(`^/(${localeCodes.join('|')})(?=/|$)`)

export function getLocale(url: URL): Locale {
  const prefix = url.pathname.replace(/\.html$/, '').split('/')[1]
  return isLocale(prefix) ? prefix : defaultLocale
}

export function getPagePath(url: URL): string {
  return (
    url.pathname
      .replace(/\.html$/, '')
      .replace(localePrefix, '')
      .replace(/\/index$/, '/')
      .replace(/\/$/, '') || '/'
  )
}

/** Localize an unprefixed page path; English retains its canonical root URLs. */
export function localizePath(path: string, locale: Locale): string {
  return locale === defaultLocale ? path : '/' + locale + (path === '/' ? '' : path)
}

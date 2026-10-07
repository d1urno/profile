export type Locale = 'en' | 'es' | 'pt'

export function getLocale(url: URL): Locale {
  const prefix = url.pathname.replace(/\.html$/, '').split('/')[1]
  return prefix === 'es' || prefix === 'pt' ? prefix : 'en'
}

export function getPagePath(url: URL): string {
  return (
    url.pathname
      .replace(/\.html$/, '')
      .replace(/^\/(en|es|pt)(?=\/|$)/, '')
      .replace(/\/index$/, '/')
      .replace(/\/$/, '') || '/'
  )
}

export const locales = { en: 'en-US', es: 'es-AR', pt: 'pt-BR' } as const
export type Locale = keyof typeof locales
export const defaultLocale: Locale = 'en'
export const localeCodes = Object.keys(locales) as Locale[]

export function isLocale(value: string): value is Locale {
  return Object.hasOwn(locales, value)
}

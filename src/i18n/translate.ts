export type TranslationKey<T> = {
  [Key in keyof T & string]: T[Key] extends string
    ? Key
    : T[Key] extends Record<string, unknown>
      ? `${Key}.${TranslationKey<T[Key]>}`
      : never
}[keyof T & string]

export function createTranslator<T extends Record<string, unknown>>(dictionary: T, locale: string) {
  return (key: TranslationKey<T>): string => {
    let value: unknown = dictionary
    for (const segment of key.split('.')) {
      if (!value || typeof value !== 'object' || !Object.hasOwn(value, segment)) {
        throw new Error(`Missing translation "${key}" for locale "${locale}"`)
      }
      value = (value as Record<string, unknown>)[segment]
    }
    if (typeof value !== 'string') {
      throw new Error(`Translation "${key}" for locale "${locale}" must be a string`)
    }
    return value
  }
}

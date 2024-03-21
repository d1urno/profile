export default function useTranslations(locale: string) {
  const messages = Object.fromEntries(
    Object.entries(import.meta.glob('/src/assets/locales/*.json', { eager: true })).map(
      ([key, value]) => {
        const json = key.endsWith('.json')
        return [
          key.slice(20, json ? -5 : -4),
          (value as Record<string, any>).default
        ]
      }
    )
  )

  const availableLocales = Object.keys(messages)

  function t(key: string) {
    return key.split('.').reduce((o, i) => o[i], messages[locale])
  }

  return { t, availableLocales }
}

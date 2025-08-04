import { getEntry } from 'astro:content'

export default async function useTranslations(locale: string) {
  const common = await getEntry('locales', `${locale}/common`)

  const t = (key: string) => {
    return key.split('.').reduce((o, i) => o[i], common?.data)
  }

  return { t }
}

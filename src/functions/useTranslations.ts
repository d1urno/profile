import { getEntry } from 'astro:content'
import type { Locale } from '@/i18n/config'
import { createTranslator } from '@/i18n/translate'

export default async function useTranslations(locale: Locale) {
  const common = await getEntry('translations', `${locale}/common`)
  if (!common) throw new Error(`Missing translations for locale "${locale}"`)
  return { t: createTranslator(common.data, locale), translations: common.data }
}

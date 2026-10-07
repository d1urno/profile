import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'
import { translationSchema } from '@/i18n/schema'

const translationsCollection = defineCollection({
  loader: glob({ pattern: '*/common.md', base: './src/content/locales' }),
  schema: translationSchema
})

const profilesCollection = defineCollection({
  loader: glob({ pattern: '*/profile.md', base: './src/content/locales' }),
  schema: z.object({ title: z.string().min(1) }).strict()
})

const scoresCollection = defineCollection({
  loader: glob({ pattern: '*/score.md', base: './src/content/locales' }),
  schema: z.object({ title: z.string().min(1), score: z.string().min(1) }).strict()
})

const experiencesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    link: z.string(),
    order: z.number()
  })
})

export const collections = {
  translations: translationsCollection,
  profiles: profilesCollection,
  scores: scoresCollection,
  experiences: experiencesCollection
}

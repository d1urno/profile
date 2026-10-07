import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const localesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locales' })
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
  locales: localesCollection,
  experiences: experiencesCollection
}

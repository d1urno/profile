import { defineCollection, z } from 'astro:content'

const localesCollection = defineCollection({
  type: 'content'
})

const experiencesCollection = defineCollection({
  type: 'content',
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

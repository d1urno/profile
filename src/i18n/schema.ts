import { z } from 'astro/zod'

// A complete dictionary is required in every locale; missing copy fails the build.
export const translationSchema = z
  .object({
    en: z.string().min(1),
    es: z.string().min(1),
    pt: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    SideSection: z
      .object({
        title: z.string().min(1),
        nationality: z.string().min(1),
        birth: z.string().min(1),
        location: z.string().min(1),
        idioms: z.string().min(1),
        spanish: z.string().min(1),
        english: z.string().min(1),
        portuguese: z.string().min(1),
        german: z.string().min(1),
        native: z.string().min(1),
        fluent: z.string().min(1),
        beginner: z.string().min(1),
        download: z.string().min(1),
        link: z.string().min(1),
        switchColors: z.string().min(1),
        facePicture: z.string().min(1)
      })
      .strict(),
    SkillsSection: z
      .object({
        title: z.string().min(1),
        subtitle1: z.string().min(1),
        subtitle2: z.string().min(1),
        subtitle3: z.string().min(1),
        subtitle4: z.string().min(1),
        text: z.string().min(1)
      })
      .strict(),
    ExperiencesSection: z
      .object({
        title: z.string().min(1)
      })
      .strict(),
    TestsSection: z
      .object({
        title: z.string().min(1),
        preview: z.string().min(1)
      })
      .strict(),
    ThemeSwitcher: z
      .object({
        label: z.string().min(1)
      })
      .strict(),
    Tabs: z
      .object({
        projects: z.string().min(1),
        profile: z.string().min(1),
        skills: z.string().min(1),
        experience: z.string().min(1),
        tests: z.string().min(1),
        score: z.string().min(1)
      })
      .strict(),
    projectTitle: z.string().min(1),
    navigation: z.string().min(1),
    skip: z.string().min(1),
    locationValue: z.string().min(1),
    contact: z.string().min(1),
    Overview: z
      .object({
        email: z.string().min(1),
        projects: z.string().min(1)
      })
      .strict(),
    Projects: z
      .object({
        thumbnailLabel: z.string().min(1),
        actions: z
          .object({
            demo: z.string().min(1),
            source: z.string().min(1),
            preview: z.string().min(1),
            live: z.string().min(1)
          })
          .strict(),
        items: z
          .object({
            'trace-cdr': z
              .object({
                eyebrow: z.string().min(1),
                description: z.string().min(1),
                stack: z.string().min(1)
              })
              .strict(),
            'nuxt-image-extractor': z
              .object({
                eyebrow: z.string().min(1),
                description: z.string().min(1),
                stack: z.string().min(1)
              })
              .strict(),
            'dog-and-pony': z
              .object({
                eyebrow: z.string().min(1),
                description: z.string().min(1),
                stack: z.string().min(1)
              })
              .strict(),
            doc88: z
              .object({
                eyebrow: z.string().min(1),
                description: z.string().min(1),
                stack: z.string().min(1)
              })
              .strict()
          })
          .strict()
      })
      .strict(),
    Print: z
      .object({
        summary: z.string().min(1),
        technicalFocus: z.string().min(1),
        languages: z.string().min(1),
        selectedWork: z.string().min(1),
        nuxtSummary: z.string().min(1),
        traceSummary: z.string().min(1),
        printAction: z.string().min(1),
        focus: z
          .object({
            frontend: z.string().min(1),
            backend: z.string().min(1),
            tooling: z.string().min(1)
          })
          .strict(),
        aiIntegrations: z.string().min(1)
      })
      .strict(),
    Score: z
      .object({
        snapshotNote: z.string().min(1)
      })
      .strict()
  })
  .strict()
export type Translations = z.infer<typeof translationSchema>

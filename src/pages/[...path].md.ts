import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, getEntry } from 'astro:content'
import { getProjects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { localizePath } from '@/functions/getLocale'
import useTranslations from '@/functions/useTranslations'
import { defaultLocale, localeCodes, type Locale } from '@/i18n/config'

const pages = ['index', 'projects', 'skills', 'score'] as const
interface Props {
  locale: Locale
  page: (typeof pages)[number]
}

export const getStaticPaths = (() =>
  localeCodes.flatMap((locale) =>
    pages.map((page) => ({
      params: { path: locale === defaultLocale ? page : `${locale}/${page}` },
      props: { locale, page }
    }))
  )) satisfies GetStaticPaths

export const GET: APIRoute<Props> = async ({ props: { locale, page }, site }) => {
  const { t, translations } = await useTranslations(locale)
  const href = (path: string) => new URL(localizePath(path, locale), site).href
  const htmlPath = page === 'index' ? '/' : `/${page}`
  const title = {
    index: `Pablo Miceli | ${t('title')}`,
    projects: `Pablo Miceli | ${t('projectTitle')}`,
    skills: `Pablo Miceli | ${t('SkillsSection.title')}`,
    score: `Pablo Miceli | ${t('Tabs.score')}`
  }[page]
  const sections = [
    `# ${title}`,
    `[${t(`Tabs.${page === 'index' ? 'profile' : page}`)}](${href(htmlPath)})`
  ]

  if (page === 'index') {
    const profile = await getEntry('profiles', `${locale}/profile`)
    if (!profile?.body) throw new Error(`Missing profile content for locale "${locale}"`)
    const experiences = (
      await getCollection('experiences', ({ id }) => id.startsWith(`${locale}/`))
    ).sort((a, b) => a.data.order - b.data.order)
    sections.push(
      `${t('SideSection.location')}: ${t('locationValue')}`,
      profile.body.trim(),
      `## ${t('ExperiencesSection.title')}`,
      ...experiences.map((experience) =>
        [
          `### [${experience.data.title}](${experience.data.link})`,
          `**${experience.data.period}**`,
          experience.body?.trim() ?? ''
        ].join('\n\n')
      ),
      `## ${t('contact')}`,
      [
        `- [${t('Overview.email')}](mailto:d1urno@gmx.com)`,
        '- [GitHub](https://github.com/d1urno)',
        '- [LinkedIn](https://www.linkedin.com/in/pmicel/)',
        '- [Twitter](https://twitter.com/d1urno)',
        `- [${t('SideSection.download')}](<${new URL(`/${t('SideSection.link')}.pdf`, site).href}>)`
      ].join('\n')
    )
  } else if (page === 'projects') {
    sections.push(
      ...getProjects(translations.Projects).map((project) =>
        [
          `## ${project.title}`,
          project.eyebrow,
          project.description,
          project.stack,
          project.actions.map((action) => `- [${action.label}](${action.href})`).join('\n')
        ].join('\n\n')
      )
    )
  } else if (page === 'skills') {
    sections.push(
      t('SkillsSection.text'),
      ...skillGroups.map(({ label, skills }) =>
        [`## ${t(`SkillsSection.${label}`)}`, skills.map((skill) => `- ${skill}`).join('\n')].join(
          '\n\n'
        )
      )
    )
  } else {
    const score = await getEntry('scores', `${locale}/score`)
    if (!score?.body) throw new Error(`Missing score content for locale "${locale}"`)
    sections.push(
      score.body.trim(),
      t('Score.snapshotNote'),
      `[![${score.data.score}](${new URL('/img/score-2026.jpg', site).href})](https://pagespeed.web.dev/analysis/https-pablomiceli-dev/z6qf14gcxb?form_factor=mobile)`
    )
  }

  return new Response(`${sections.join('\n\n')}\n`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

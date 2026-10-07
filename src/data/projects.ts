import type { ImageMetadata } from 'astro'
import type { Translations } from '@/i18n/schema'
import traceCdrThumbnail from '@/assets/projects/trace-cdr.png'
import dogAndPonyThumbnail from '@/assets/projects/dog-and-pony.png'
import doc88Thumbnail from '@/assets/projects/doc88.png'

export type ProjectId = keyof Translations['Projects']['items']
type ProjectCopy = Translations['Projects']['items'][ProjectId]
interface Project {
  title: string
  thumbnail?: ImageMetadata
  actions: { href: string; label: keyof Translations['Projects']['actions'] }[]
}
export type LocalizedProject = ProjectCopy & {
  id: ProjectId
  title: string
  thumbnail?: ImageMetadata
  actions: { href: string; label: string }[]
}

// IDs join validated translated copy to its own image and destinations.
export const projects = {
  'trace-cdr': {
    title: 'Trace CDR',
    thumbnail: traceCdrThumbnail,
    actions: [
      {
        href: 'https://preview.tracecdr-demo.pages.dev/',
        label: 'demo'
      },
      {
        href: 'https://www.tracecdr.org',
        label: 'live'
      }
    ]
  },
  'nuxt-image-extractor': {
    title: 'Nuxt image extractor',
    actions: [
      {
        href: 'https://github.com/d1urno/nuxt-image-extractor',
        label: 'source'
      }
    ]
  },
  'dog-and-pony': {
    title: 'Dog & Pony Studios',
    thumbnail: dogAndPonyThumbnail,
    actions: [
      {
        href: 'https://dps-senior-frontend-test.netlify.app',
        label: 'preview'
      }
    ]
  },
  doc88: {
    title: 'Doc88',
    thumbnail: doc88Thumbnail,
    actions: [
      {
        href: 'https://doc88-frontend-challenge.netlify.app',
        label: 'preview'
      }
    ]
  }
} satisfies Record<ProjectId, Project>

export function getProjects(copy: Translations['Projects']): LocalizedProject[] {
  return (Object.entries(projects) as [ProjectId, Project][]).map(([id, project]) => ({
    id,
    title: project.title,
    thumbnail: project.thumbnail,
    ...copy.items[id],
    actions: project.actions.map((action) => ({
      href: action.href,
      label: copy.actions[action.label]
    }))
  }))
}

import type { ImageMetadata } from 'astro'
import type { Locale } from '@/functions/getLocale'
import traceCdrThumbnail from '@/assets/projects/trace-cdr.png'
import dogAndPonyThumbnail from '@/assets/projects/dog-and-pony.png'
import doc88Thumbnail from '@/assets/projects/doc88.png'

export type ProjectId = 'trace-cdr' | 'nuxt-image-extractor' | 'dog-and-pony' | 'doc88'

interface ProjectCopy {
  eyebrow: string
  description: string
  stack: string
}

interface Project {
  id: ProjectId
  title: string
  thumbnail?: ImageMetadata
  copy: Record<Locale, ProjectCopy>
  actions: { href: string; label: Record<Locale, string> }[]
}

export interface LocalizedProject extends ProjectCopy {
  id: ProjectId
  title: string
  thumbnail?: ImageMetadata
  actions: { href: string; label: string }[]
}

// Each project owns its content, image and destinations; order is presentation only.
export const projects = [
  {
    id: 'trace-cdr',
    title: 'Trace CDR',
    copy: {
      en: {
        eyebrow: 'Public demo · 2025',
        description:
          'An interactive carbon emission data visualization app using React, d3.js and TanStack Query. Explore the interface in the public preview.',
        stack: 'React 19 · TypeScript · Tailwind CSS · d3.js · TanStack Query'
      },
      es: {
        eyebrow: 'Demo pública · 2025',
        description:
          'Una aplicación interactiva de visualización de datos de emisiones de carbono con React, d3.js y TanStack Query. Explora la interfaz en la vista previa pública.',
        stack: 'React 19 · TypeScript · Tailwind CSS · d3.js · TanStack Query'
      },
      pt: {
        eyebrow: 'Demo pública · 2025',
        description:
          'Um aplicativo interativo de visualização de dados de emissões de carbono com React, d3.js e TanStack Query. Explore a interface na prévia pública.',
        stack: 'React 19 · TypeScript · Tailwind CSS · d3.js · TanStack Query'
      }
    },
    actions: [
      {
        href: 'https://preview.tracecdr-demo.pages.dev/',
        label: {
          en: 'Open demo',
          es: 'Abrir demo',
          pt: 'Abrir demo'
        }
      },
      {
        href: 'https://www.tracecdr.org',
        label: {
          en: 'Visit live site',
          es: 'Visitar sitio publicado',
          pt: 'Visitar site publicado'
        }
      }
    ],
    thumbnail: traceCdrThumbnail
  },
  {
    id: 'nuxt-image-extractor',
    title: 'Nuxt image extractor',
    copy: {
      en: {
        eyebrow: 'Historical open source · 2020',
        description:
          'Built a Nuxt module for statically generated sites. It downloads images from a CMS and rewrites page references to local assets. Created for the Matera website workflow; the repository is now archived.',
        stack: 'Nuxt · Node.js · Static generation'
      },
      es: {
        eyebrow: 'Código abierto histórico · 2020',
        description:
          'Desarrollé un módulo de Nuxt para sitios estáticos. Descarga imágenes de un CMS y actualiza las referencias de las páginas a archivos locales. Creado para el proyecto de Matera; el repositorio está archivado.',
        stack: 'Nuxt · Node.js · Generación estática'
      },
      pt: {
        eyebrow: 'Código aberto histórico · 2020',
        description:
          'Desenvolvi um módulo Nuxt para sites estáticos. Ele baixa imagens de um CMS e atualiza as referências das páginas para arquivos locais. Criado para o projeto da Matera; o repositório está arquivado.',
        stack: 'Nuxt · Node.js · Geração estática'
      }
    },
    actions: [
      {
        href: 'https://github.com/d1urno/nuxt-image-extractor',
        label: {
          en: 'Source and documentation',
          es: 'Código y documentación',
          pt: 'Código e documentação'
        }
      }
    ]
  },
  {
    id: 'dog-and-pony',
    title: 'Dog & Pony Studios',
    copy: {
      en: {
        eyebrow: 'Frontend challenge · 2020',
        description: 'A frontend implementation exercise using Nuxt, Tailwind CSS and Jest.',
        stack: 'Nuxt · Tailwind CSS · Jest'
      },
      es: {
        eyebrow: 'Desafío frontend · 2020',
        description: 'Ejercicio de implementación frontend con Nuxt, Tailwind CSS y Jest.',
        stack: 'Nuxt · Tailwind CSS · Jest'
      },
      pt: {
        eyebrow: 'Desafio frontend · 2020',
        description: 'Exercício de implementação frontend com Nuxt, Tailwind CSS e Jest.',
        stack: 'Nuxt · Tailwind CSS · Jest'
      }
    },
    actions: [
      {
        href: 'https://dps-senior-frontend-test.netlify.app',
        label: {
          en: 'Open preview',
          es: 'Abrir vista previa',
          pt: 'Abrir prévia'
        }
      }
    ],
    thumbnail: dogAndPonyThumbnail
  },
  {
    id: 'doc88',
    title: 'Doc88',
    copy: {
      en: {
        eyebrow: 'Frontend challenge · 2020',
        description:
          'A frontend implementation exercise using Vue, TypeScript, Tailwind CSS and Jest.',
        stack: 'Vue 2.6 · TypeScript · Tailwind CSS · Jest'
      },
      es: {
        eyebrow: 'Desafío frontend · 2020',
        description:
          'Ejercicio de implementación frontend con Vue, TypeScript, Tailwind CSS y Jest.',
        stack: 'Vue 2.6 · TypeScript · Tailwind CSS · Jest'
      },
      pt: {
        eyebrow: 'Desafio frontend · 2020',
        description:
          'Exercício de implementação frontend com Vue, TypeScript, Tailwind CSS e Jest.',
        stack: 'Vue 2.6 · TypeScript · Tailwind CSS · Jest'
      }
    },
    actions: [
      {
        href: 'https://doc88-frontend-challenge.netlify.app',
        label: {
          en: 'Open preview',
          es: 'Abrir vista previa',
          pt: 'Abrir prévia'
        }
      }
    ],
    thumbnail: doc88Thumbnail
  }
] satisfies Project[]

export function getProjects(locale: Locale): LocalizedProject[] {
  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    thumbnail: project.thumbnail,
    ...project.copy[locale],
    actions: project.actions.map((action) => ({ href: action.href, label: action.label[locale] }))
  }))
}

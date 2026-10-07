import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import localizedRoutes from './scripts/localized-routes.mjs'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import { unified } from '@astrojs/markdown-remark'
import rehypeRewrite from 'rehype-rewrite'

const defaultLocale = 'en'
const locales = {
  en: 'en-US', // the `defaultLocale` value must present in `locales` keys
  es: 'es-AR',
  pt: 'pt-BR'
}

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    plugins: [tailwindcss()]
  },
  site: 'https://pablomiceli.dev/',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always' // experimental
  },
  prefetch: true,
  compressHTML: true,
  integrations: [
    localizedRoutes(),
    sitemap({
      i18n: {
        locales,
        defaultLocale
      },
      // Exclude print pages and legacy Experience redirects from the sitemap.
      filter: (page) => !/\/(?:print|experience)(?:\.html)?$/.test(new URL(page).pathname)
    }),
    vue({ appEntrypoint: '/src/vue-main' }),
    partytown()
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [
          rehypeRewrite,
          {
            rewrite: (node) => {
              if (node.type === 'element' && node.tagName === 'a' && node.properties.title) {
                node.properties['data-text'] = node.properties.title
                delete node.properties.title
              }
            }
          }
        ]
      ]
    })
  }
})

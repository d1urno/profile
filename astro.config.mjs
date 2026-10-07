import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import localizedRoutes from './scripts/localized-routes.mjs'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import { unified } from '@astrojs/markdown-remark'
import rehypeRewrite from 'rehype-rewrite'
import { defaultLocale, locales } from './src/i18n/config.ts'

const getTextContent = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(getTextContent).join('')

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
            selector: 'a',
            rewrite: (node) => {
              if (node.type === 'element' && node.tagName === 'a' && getTextContent(node).trim()) {
                node.properties['data-text'] = getTextContent(node)
                delete node.properties.title
              }
            }
          }
        ]
      ]
    })
  }
})

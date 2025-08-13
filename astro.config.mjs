import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { i18n } from 'astro-i18n-aut/integration'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
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
  integrations: [
    i18n({
      defaultLocale,
      locales,
      exclude: ['/robots.txt']
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale
      },
      // Include all locales, but exclude print pages from the sitemap
      filter: (page) => !page.endsWith('/print') && !page.endsWith('/print.html')
    }),
    vue({ appEntrypoint: '/src/vue-main' }),
    icon(),
    partytown()
  ],
  markdown: {
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
  }
})

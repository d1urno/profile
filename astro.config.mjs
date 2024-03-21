import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import sitemap from '@astrojs/sitemap'

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
    }
  },
  site: 'https://pablomiceli.dev/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always' // experimental
  },
  prefetch: true,
  integrations: [
    i18n({
      defaultLocale,
      locales
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale })
    }),
    vue({ appEntrypoint: '/src/vue-main' }),
    tailwind({ applyBaseStyles: false }),
    icon()
  ]
})

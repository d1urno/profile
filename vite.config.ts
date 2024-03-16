import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import svgLoader from 'vite-svg-loader'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import UnheadVite from '@unhead/addons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [fileURLToPath(new URL('./src/assets/locales/**', import.meta.url))]
    }),
    Pages(),
    Layouts(),
    svgLoader(),
    UnheadVite()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

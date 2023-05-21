import '@/assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { App as AppType } from 'vue'
import type { Router } from 'vue-router'
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
// @ts-ignore
import routes from 'virtual:generated-pages'

export type UserPlugin = (ctx: { app: AppType; router: Router }) => void

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes)
})

Object.values(import.meta.globEager('./plugins/*.ts')).map((i) =>
  (i as { install?: UserPlugin }).install?.({ app, router })
)

app.use(router)

app.mount('#app')
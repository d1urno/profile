import type { App as AppType } from 'vue'

export type UserPlugin = (ctx: { app: AppType }) => void

export default (app: AppType) => {
  Object.values(import.meta.glob('./plugins/*.ts', { eager: true })).map((i) =>
    (i as { install?: UserPlugin }).install?.({ app })
  )
}

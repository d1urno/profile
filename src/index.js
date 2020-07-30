import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/:lang/',
      component: App
    }
  ]
})

router.afterEach((to, from) => {
  let lang = to.path.split('/')[1]
  const fromLang = from.path.split('/')[1]
  if (!lang) {
    lang = 'en-US'
  }
  if (lang !== fromLang) {
    i18n.locale = lang
  }
})

new Vue({
  router,
  i18n,
  render: (createElement) => createElement(App)
}).$mount('#app')

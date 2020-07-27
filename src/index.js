import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'

new Vue({
  i18n,
  render: (createElement) => createElement(App)
}).$mount('#app')

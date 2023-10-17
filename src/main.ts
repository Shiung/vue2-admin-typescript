import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')

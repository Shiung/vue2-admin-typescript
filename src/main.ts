import Vue from 'vue'
import type { Directive } from 'vue'
import { PiniaVuePlugin } from 'pinia'
import ElementUI from 'element-ui'

import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import { store } from './stores'
import { setupProdMockServer } from './mock/mockProdServer'
import I18n from '@/i18n'

import PortalVue from 'portal-vue'

import * as directives from './directives'

import './assets/main.css'
import './styles/tailwind.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)
Vue.use(PortalVue)
Vue.use(I18n)
Vue.use(VueRouter)

Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: Directive })[key])
})

setupProdMockServer()

new Vue({
  router,
  pinia: store,
  render: (h) => h(App)
}).$mount('#app')

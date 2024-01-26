import Vue from 'vue'
import type { Directive } from 'vue'
import { PiniaVuePlugin } from 'pinia'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router'
import { store } from './stores'
import { setupProdMockServer } from './mock/mockProdServer'
import { setThemeVariable } from './styles/theme'

import PortalVue from 'portal-vue'

import * as directives from './directives'

import './assets/main.css'
import './styles/tailwind.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)
Vue.use(PortalVue)

Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: Directive })[key])
})

setupProdMockServer()
setThemeVariable()

new Vue({
  router,
  pinia: store,
  render: (h) => h(App)
}).$mount('#app')

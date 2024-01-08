import Vue from 'vue'
import { PiniaVuePlugin } from 'pinia'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router'
import { store } from './stores'
import { setupProdMockServer } from './mock/mockProdServer'
import { setThemeVariable } from './styles/theme'

import './assets/main.css'
import './styles/tailwind.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)

setupProdMockServer()
setThemeVariable()

new Vue({
  router,
  pinia: store,
  render: (h) => h(App)
}).$mount('#app')

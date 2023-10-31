import Vue from 'vue'
import { PiniaVuePlugin } from 'pinia'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import { store } from './stores'
import { setupProdMockServer } from './mock/mockProdServer'

import './assets/main.css'

Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)

setupProdMockServer()

new Vue({
  router,
  pinia: store,
  render: (h) => h(App)
}).$mount('#app')

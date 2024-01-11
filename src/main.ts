import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
import { store } from './stores'
import { setupProdMockServer } from './mock/mockProdServer'
import { setThemeVariable } from './styles/theme'

import './assets/main.css'
import './styles/tailwind.css'
// import 'element-ui/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'

const Vue = createApp(App)

Vue.use(ElementPlus)
Vue.use(router)
Vue.use(store)

setupProdMockServer()
setThemeVariable()

Vue.mount('#app')

// new Vue({
//   router,
//   pinia: store,
//   render: (h) => h(App)
// }).$mount('#app')

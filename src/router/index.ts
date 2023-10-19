import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Progress from '@core/progress'

import type { ToRouterType } from './types'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestHome.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('../views/Test2Home.vue')
    }
  ]
})

router.beforeEach((to: ToRouterType, from, next) => {
  Progress.start()
  console.log('to', to)
  next()
  Progress.done()
})

export default router

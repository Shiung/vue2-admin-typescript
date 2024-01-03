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
      path: '/login',
      name: 'login',
      components: {
        default: () => import('@views/LogIn.vue'),
        sideBar: () => import('@/components/SideBar.vue')
      }
    },
    {
      path: '/',
      name: 'home',
      redirect: '/',
      components: {
        default: () => import('@views/HomeView.vue'),
        navHeader: () => import('@layouts/default/navHeader.vue'),
        sideBar: () => import('@layouts/default/SideBar/index.vue')
      },
      children: [
        {
          path: '/',
          // name: 'home',
          component: () => import('@views/pageTest1.vue')
        },
        {
          path: 'test2',
          name: 'test2',
          component: () => import('@views/TestHome.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   components: {
    //     default: () => import('@views/LogIn.vue'),
    //     sideBar: () => import('@/components/SideBar.vue')
    //   }
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import('@views/AboutView.vue')
    //   components: {
    //     default: () => import('@views/AboutView.vue'),
    //     sideBar: () => import('@/components/SideBar.vue')
    //   }
    // },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: () => import('@views/TestHome.vue')
    // },
    // {
    //   path: '/test2',
    //   name: 'test2',
    //   component: () => import('@views/Test2Home.vue')
    // }
  ]
})

router.beforeEach((to: ToRouterType, from, next) => {
  Progress.start()
  console.log('to', to)
  next()
  Progress.done()
})

export default router

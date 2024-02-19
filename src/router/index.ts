import Vue from 'vue'
import VueRouter from 'vue-router'
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
        default: () => import('@views/LogIn.vue')
      }
    },
    {
      path: '/',
      // name: 'home',
      redirect: '/',
      meta: { titleI18n: 'nav-homeTitle' },
      components: {
        default: () => import('@views/Home/index.vue'),
        navHeader: () => import('@layouts/default/NavHeader/index.vue'),
        sideBar: () => import('@layouts/default/SideBar/index.vue')
      },
      children: [
        {
          path: '/',
          name: 'home',
          meta: { requiresAuth: true, titleI18n: 'test1Title' },
          component: () => import('@views/pageTest1.vue')
        },
        {
          path: 'test2',
          name: 'test2',
          meta: { requiresAuth: true, titleI18n: 'test2Title' },
          component: () => import('@views/TestHome.vue')
        },
        {
          path: 'test2/:id?',
          name: 'test3',
          meta: { requiresAuth: true, titleI18n: 'nav-game-manageTitle' },
          component: () => import('@views/TestHome3.vue')
        },
        {
          path: 'test4',
          name: 'test4',
          meta: { requiresAuth: true, titleI18n: 'test4Title' },
          component: () => import('@views/Test2Home.vue')
        },
        {
          path: 'test5',
          name: 'test5',
          component: () => import('@views/Test5/HomeTest5.vue'),
          meta: { requiresAuth: true, titleI18n: 'test5Title' }
        },
        {
          path: 'test5/chid/:id',
          name: 'test5In',
          component: () => import('@views/Test5/PageTest.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

let isLock = false
setTimeout(() => {
  isLock = false
}, 10000)

router.beforeEach(async (to: ToRouterType, from, next) => {
  const { meta } = to
  console.log('to router before', { ...meta })
  Progress.start()
  if (meta?.requiresAuth) {
    // check Auth token
    // next({ name: 'login', replace: true })
    if (isLock) {
      meta.lock = isLock
    } else {
      delete meta.lock
    }
    console.log('需要驗證')
  }
  console.log('to router', to)
  next()
  Progress.done()
})

export default router

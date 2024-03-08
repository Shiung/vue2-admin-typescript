// import Vue from 'vue'
import VueRouter from 'vue-router'
import Progress from '@core/progress'

import type { ToRouterType } from './types'

import { useUserStoreHook } from '@/stores/user'

// Vue.use(VueRouter)

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    titleI18n?: string
    lock?: boolean
    caches?: boolean
  }
}

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
      redirect: '/betOrders',
      meta: { titleI18n: 'nav-homeTitle' },
      components: {
        default: () => import('@views/Home/index.vue'),
        navHeader: () => import('@layouts/default/NavHeader/index.vue'),
        sideBar: () => import('@layouts/default/SideBar/index.vue')
      },
      children: [
        // {
        //   path: '/',
        //   name: 'home',
        //   meta: { requiresAuth: true, titleI18n: 'test1Title', caches: true },
        //   component: () => import('@views/pageTest1.vue')
        // },
        // {
        //   path: 'test2',
        //   name: 'test2',
        //   meta: { requiresAuth: true, titleI18n: 'test2Title', caches: true },
        //   component: () => import('@views/TestHome.vue')
        // },
        // {
        //   path: 'test2/:id?',
        //   name: 'test3',
        //   meta: { requiresAuth: true, titleI18n: 'nav-game-manageTitle' },
        //   component: () => import('@views/TestHome3.vue')
        // },
        // {
        //   path: 'test4',
        //   name: 'test4',
        //   meta: { requiresAuth: true, titleI18n: 'nav-order-listTitle' },
        //   component: () => import('@views/Test2Home.vue')
        // },
        // {
        //   path: 'test5',
        //   name: 'test5',
        //   component: () => import('@views/Test5/HomeTest5.vue'),
        //   meta: { requiresAuth: true, titleI18n: 'test5Title' }
        // },
        // {
        //   path: 'test5/chid/:id',
        //   name: 'test5In',
        //   component: () => import('@views/Test5/PageTest.vue'),
        //   meta: { requiresAuth: true, titleI18n: 'nav-order-editResultTitle', caches: true }
        // },

        // account
        {
          path: 'auth/permission',
          name: 'account-permission',
          component: () => import('@views/Permission/index.vue'),
          meta: { requiresAuth: true, titleI18n: 'nav-account-permissionManageTitle', caches: true }
        },

        // bet orders
        {
          path: 'betOrders',
          name: 'betOrders',
          component: () => import('@views/BetOrder/index.vue'),
          meta: { requiresAuth: true, titleI18n: 'nav-order-listTitle', caches: true }
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
  const { meta, name } = to
  const { token, info } = useUserStoreHook()

  console.log('to router before', { ...meta }, token)
  // console.log('to router before', { ...meta }, store)
  Progress.start()
  if (name === 'login') {
    if (token) {
      next({ path: '/', replace: true })
    } else {
      next()
    }
  } else {
    if (meta?.requiresAuth) {
      // check Auth token
      if (isLock) {
        meta.lock = isLock
      } else {
        delete meta.lock
      }

      if (!token) {
        next({ name: 'login', replace: true })
      } else {
        next()
      }
    } else {
      next()
    }
  }
  // next()
  Progress.done()
})

export default router

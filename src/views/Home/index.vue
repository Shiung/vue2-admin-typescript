<script lang="ts">
export default {
  name: 'homeDefaultView'
}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineAsyncComponent } from 'vue'
import ProviderSetting from '@views/Home/stores/ProvideSetting.vue'
import Progress from '@core/progress'
import HistoryTab from './components/HistoryTab/index.vue'
import { emitter } from '@core/mitt'

import useNav from '@/hooks/useNav'

const PermissionsDeniedPage = defineAsyncComponent(() => import('@views/PermissionsView.vue'))

const { route } = useNav()

const excuteRouteCache = ref<Array<string>>([])
const includeRouteCache = ref<Array<string>>([])
const domHeight = ref<number>(0)

const routerCahchHandler = (ls: any) => {
  console.log('routerCahchHandler', ls)
  includeRouteCache.value = ls
}

const removeRouterCacheHandler = (n: string) => {
  if (!n) return
  const domName = n + 'View'
  if (!excuteRouteCache.value.includes(domName)) {
    excuteRouteCache.value.push(domName)
    setTimeout(() => (excuteRouteCache.value = []), 0)
  }
}

onMounted(() => {
  // Progress.start()
  // console.log('home mounted ***')
  // setTimeout(() => {
  //   Progress.done()
  // }, 10000)
  emitter.on('navHeight', (h) => (domHeight.value = h))
})

onUnmounted(() => {
  emitter.off('navHeight')
})
</script>

<template>
  <main class="text-primary p-2" :style="{ height: `calc( 100vh - ${domHeight}px )`, overflowY: 'auto' }">
    <portal to="historyTabDom">
      <HistoryTab @remove-cache="removeRouterCacheHandler" @router-cache="routerCahchHandler" />
    </portal>
    <ProviderSetting>
      <Transition name="page-cache" mode="out-in" appear>
        <keep-alive :include="includeRouteCache">
          <router-view v-if="!$route.meta?.lock" />
        </keep-alive>
      </Transition>
      <PermissionsDeniedPage v-if="$route.meta?.lock" />
    </ProviderSetting>
  </main>
</template>

<script lang="ts">
export default {
  name: 'homeDefaultView'
}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineAsyncComponent, inject } from 'vue'
import { SettingUpdateSymbol } from '@views/Home/stores/ProvideSetting.vue'
import HistoryTab from './components/HistoryTab/index.vue'
import { emitter } from '@core/mitt'

const PermissionsDeniedPage = defineAsyncComponent(() => import('@views/PermissionsDeniedView.vue'))

const providerSettingHandler = inject(SettingUpdateSymbol)

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
  emitter.on('navHeight', (h) => {
    domHeight.value = h
    typeof providerSettingHandler === 'function' && providerSettingHandler('navHeight', h)
  })
})

onUnmounted(() => {
  emitter.off('navHeight')
})
</script>

<template>
  <main class="p-2" :style="{ height: `calc( 100vh - ${domHeight}px )`, overflowY: 'auto' }">
    <portal to="historyTabDom">
      <HistoryTab @remove-cache="removeRouterCacheHandler" @router-cache="routerCahchHandler" />
    </portal>
    <Transition name="page-cache" mode="out-in" appear>
      <keep-alive :include="includeRouteCache">
        <router-view v-if="!$route.meta?.lock" />
      </keep-alive>
    </Transition>
    <PermissionsDeniedPage v-if="$route.meta?.lock" />
  </main>
</template>

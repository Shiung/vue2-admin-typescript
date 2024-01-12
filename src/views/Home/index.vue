<script lang="ts">
export default {
  name: 'homeDefaultView'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ProviderSetting from '@views/Home/stores/ProvideSetting.vue'
import Progress from '@core/progress'
import HistoryTab from './components/HistoryTab/index.vue'

import useNav from '@/hooks/useNav'

const { route } = useNav()

const excuteRouteCache = ref<Array<string>>([])

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
})
</script>

<template>
  <main class="text-primary p-2">
    <portal to="historyTabDom">
      <HistoryTab @remove-cache="removeRouterCacheHandler" />
    </portal>
    <ProviderSetting>
      <Transition name="page" mode="out-in" appear>
        <keep-alive :exclude="excuteRouteCache">
          <router-view />
        </keep-alive>
      </Transition>
    </ProviderSetting>
  </main>
</template>

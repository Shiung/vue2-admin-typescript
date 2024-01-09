<script lang="ts">
export default {
  name: 'homeView'
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProviderSetting from '@views/Home/stores/ProvideSetting.vue'
import Progress from '@core/progress'

onMounted(() => {
  Progress.start()
  console.log('home mounted ***')
  setTimeout(() => {
    Progress.done()
  }, 10000)
})
</script>

<template>
  <main class="text-primary p-2">
    <ProviderSetting>
      <Transition name="page" mode="out-in" appear>
        <keep-alive>
          <router-view />
        </keep-alive>
      </Transition>
    </ProviderSetting>
  </main>
</template>

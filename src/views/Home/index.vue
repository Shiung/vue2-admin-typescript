<script lang="ts">
export default {
  name: 'homeView'
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProviderSetting from '@views/Home/stores/ProvideSetting.vue'

onMounted(() => {
  console.log('home mounted ***')
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

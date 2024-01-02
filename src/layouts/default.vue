<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    console.log('mounted defaul layout')
  }
})
</script>

<template>
  <div>
    <div>sidebar</div>
    <div>navHeader</div>
    <slot />
    <div>content</div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<!-- <style scoped lang="scss">

</style> -->

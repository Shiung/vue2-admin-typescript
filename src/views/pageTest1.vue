<script setup lang="ts">
import { onMounted, onActivated, onDeactivated } from 'vue'

onMounted(() => {
  console.log('mounted')
})

onActivated(() => {
  console.log('active')
})

onDeactivated(() => {
  console.log('onDeactivated')
})
</script>
<template>
  <div class="h-[1000px]">page1test</div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

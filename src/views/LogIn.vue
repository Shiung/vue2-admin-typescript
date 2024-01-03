<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Message } from 'element-ui'

let timeoutRef: ReturnType<typeof setTimeout>

onMounted(() => {
  console.log('login init ***')
  timeoutRef = setTimeout(() => {
    Message({
      type: 'error',
      message: '錯誤唷',
      duration: 0,
      showClose: true
    })
  }, 5000)
})

onUnmounted(() => {
  clearTimeout(timeoutRef)
})
</script>

<template>
  <div class="bg-gray-400 text-primary text-9xl">
    <router-link :to="{ name: 'home' }">回去</router-link>
    login
  </div>
</template>

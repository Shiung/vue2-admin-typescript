<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const route123 = useRoute()
const router = useRouter()

console.log('vueInstance', route123)

console.log('route123', route123)

const clickHandler = (v: string) => {
  console.log('click ***')
  router.push(v)
}

watch(
  () => route123?.params?.id,
  (be, af) => {
    console.log('parms be', be)
    console.log('parms af', af)
  },
  {
    immediate: true
  }
)

watch(
  () => route123?.query?.name,
  (be, af) => {
    console.log('query be', be)
    console.log('query af', af)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div>
    this is home 3
    <router-link to="/test2/abc">abc</router-link>
    <router-link to="/test2/456">456</router-link>

    <router-link to="/test2/456?name=jack">678?name=jack</router-link>
    <router-link to="/test2/456?name=oo">678?name=oo</router-link>
    <div @click="clickHandler('/test?name=sss')">go to /test?name=sss</div>
  </div>
</template>

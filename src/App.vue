<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { emitter } from '@core/mitt'
import API from '@/api'

import GlobalLoading from '@/components/GlobalLoading.vue'

import useTheme from '@/hooks/useTheme'

const isInit = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const fetchData = async () => {
  const res = await API.TestFetch()
  console.log('res', res)
}

useTheme()
watch(
  () => isLoading.value,
  (n, o) => {
    console.log('isLoading n', n)
    console.log('isLoading o', o)
  }
)
onMounted(() => {
  fetchData()
  emitter.on('call', (v) => console.log('v', v))
  emitter.on('Nprogress', (n) => (isLoading.value = n))
  setTimeout(() => (isInit.value = true), 2000)
})

onUnmounted(() => {
  emitter.off('call')
  emitter.off('Nprogress')
})
</script>

<template>
  <div id="app" class="flex min-h-screen">
    <template v-if="isInit">
      <keep-alive include="sideBarComp">
        <router-view name="sideBar" />
      </keep-alive>
      <div class="flex-1 overflow-x-auto">
        <keep-alive include="navHeaderComp">
          <router-view name="navHeader" />
        </keep-alive>
        <router-view />
      </div>
    </template>

    <GlobalLoading v-else :width="80" :height="80" loader="dots" :color="'var(--luTheme-primary)'" />
    <div
      v-if="isInit && isLoading"
      class="block w-screen h-screen fixed top-0 left-0 z-[1030] bg-[rgba(0,0,0,.3)] backdrop-blur-sm"
      @click="() => {}"
    ></div>
  </div>
</template>

<style scoped lang="scss">
#app {
  min-width: 1024px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

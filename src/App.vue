<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { emitter } from '@core/mitt'
import API from '@/api'

const fetchData = async () => {
  const res = await API.TestFetch()
  console.log('res', res)
}

// watch(this.$router)
onMounted(() => {
  fetchData()
  emitter.on('call', (v) => console.log('v', v))
})

onUnmounted(() => {
  emitter.off('call')
})
</script>

<template>
  <div id="app" class="flex min-h-screen">
    <keep-alive include="sideBarComp">
      <router-view name="sideBar" />
    </keep-alive>
    <div class="flex-1 bg-[#ccc]">
      <keep-alive include="navHeaderComp">
        <router-view name="navHeader" />
      </keep-alive>
      <router-view />
    </div>
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

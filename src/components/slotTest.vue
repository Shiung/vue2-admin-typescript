<script setup lang="ts">
import { ref, onMounted } from 'vue'

const ls = ref([
  { name: 'jack', age: 36 },
  { name: 'owen', age: 40 },
])

onMounted(() => {
  setTimeout(() => {
    ls.value = [
      { name: 'willson', age: 30 },
      { name: 'james', age: 35 },
    ]
  }, 5000)
})

</script>

<template>
  <div>
    <slot name="header">
      <h1>header</h1>
    </slot>

    <span v-for="item in ls" :key="item.name">
      <slot name="default" :ls="item"></slot>
    </span>
    <!-- <slot :ls="ls"></slot> -->
    <slot name="footer">
      <h1>footer</h1>
    </slot>
  </div>
</template>

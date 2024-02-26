<script lang="ts" setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const props = withDefaults(
  defineProps<{
    active?: boolean
    loader?: string
    width?: number
    height?: number
    color?: string
  }>(),
  {
    active: true,
    loader: 'bars',
    width: 20,
    height: 20
  }
)
</script>

<template>
  <loading :active="props.active" :loader="props.loader" :width="props.width" :height="props.height" :color="props.color"></loading>
</template>

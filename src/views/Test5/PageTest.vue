<script lang="ts" setup>
import useNav from '@/hooks/useNav'

const { route } = useNav()
</script>

<template>
  <div>
    page test 5
    <div>id: {{ route.params.id }}</div>
  </div>
</template>

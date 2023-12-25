<script setup lang="ts">
import { ref, onMounted, onActivated, onDeactivated } from 'vue'
import Progress from '@core/progress'

import { useUserStoreHook, useUserStore } from '@/stores/user'

// state
const isCollapse = ref<boolean>(true)

// store
const store = useUserStore()
const { SET_TOKEN } = useUserStoreHook()

const handleOpen = (props: any) => {
  const [key, keyPath] = props
  console.log('handleOpen', props, key, keyPath)
}

const handleClose = (props: any) => {
  const [key, keyPath] = props
  console.log(key, keyPath)
}

const fetch = async () => {
  return new Promise((resolve) => {
    Progress.start()
    setTimeout(() => {
      console.log('isCollapse', isCollapse.value)
      resolve(true)
      Progress.done()
    }, 3000)
  })
}
onMounted(() => {
  console.log('mounted')
  fetch()
  setTimeout(() => {
    SET_TOKEN('change_123')
  }, 2000)
})

onActivated(() => {
  console.log('active')
})

onDeactivated(() => {
  console.log('onDeactivated')
})
</script>
<template>
  <div>
    {{ store.token }}
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo bg-primary" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title" class="text-primary/[0.5]">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

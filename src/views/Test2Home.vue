<script lang="ts">
import { defineComponent, inject } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { SettingStateSymbol, SettingUpdateSymbol } from '@views/Home/stores/ProvideSetting.vue'

import API from '@/api'
export default defineComponent({
  data() {
    return {
      isCollapse: true
    }
  },
  setup() {
    const setting = inject(SettingStateSymbol)
    const settingUpdate = inject(SettingUpdateSymbol)
    return {
      setting,
      settingUpdate
    }
  },
  computed: {
    ...mapState(useUserStore, {
      storeToken: 'token'
    })
  },
  methods: {
    ...mapActions(useUserStore, ['SET_TOKEN']),
    handleOpen(q: any) {
      const [key, keyPath] = q
      console.log(key, keyPath)
    },
    handleClose(q: any) {
      const [key, keyPath] = q
      console.log(key, keyPath)
    },
    async feetchData() {
      const res3 = await API.TestFetch({ key: 3, page: 3 })
      console.log('res3', res3)
    }
  },
  mounted() {
    this.feetchData()
    console.log('mounted test2home')
    setTimeout(() => {
      this.SET_TOKEN('abctest')
    }, 3000)
  }
})
</script>
<template>
  <div>
    <div>theme: {{ setting?.theme }}</div>
    <div>language: {{ setting?.language }}</div>
    <el-button @click.native="settingUpdate && settingUpdate('language', 'ko_kr')">更新language</el-button>
    <el-button @click.native="settingUpdate && settingUpdate('theme', 'light')">更新theme</el-button>
    <div>{{ storeToken }}</div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
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
        <span slot="title">导航四</span>
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

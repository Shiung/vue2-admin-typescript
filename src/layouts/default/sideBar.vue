<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'

export default defineComponent({
  data() {
    return {
      // isCollapse: false,
      list: Array.from({ length: 20 }, (_, idx) => idx + 5)
    }
  },
  computed: {
    ...mapState(useSidebarCollapseStore, ['isCollapse'])
  },
  methods: {
    ...mapActions(useSidebarCollapseStore, ['SET_COLLAPSE']),
    handleCollapse() {
      // this.isCollapse = !this.isCollapse
    },
    handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string) {
      console.log(key, keyPath)
    }
  },
  mounted() {
    console.log('mounted sidebar layout')
    setTimeout(() => {
      this.list = Array.from({ length: 10 }, (_, idx) => idx + 5)
    }, 5000)
  }
})
</script>

<template>
  <div class="bg-[#000] h-screen sticky top-0 overflow-y-scroll">
    <div class="sticky top-0 z-10 h-[50px] bg-[#000] flex items-center justify-center">
      logo
      <!-- <div
        class="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer"
        :class="{ 'rotate-180': isCollapse }"
        @click="handleCollapse"
      >
        <i class="el-icon-arrow-left text-[#909399]"></i>
      </div> -->
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-custom"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">Navigator Four</span>
      </el-menu-item>
      <el-menu-item v-for="idx in list" index="idx" :key="idx">
        <i class="el-icon-setting"></i>
        <span slot="title">Navigator Four -- {{ idx }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.el-menu-vertical-custom {
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  border-right: none;
}
</style>

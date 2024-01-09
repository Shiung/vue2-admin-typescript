<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'

export default defineComponent({
  name: 'sideBarComp',
  data() {
    return {
      list: Array.from({ length: 20 }, (_, idx) => idx + 5),
      // menuData: [
      //   {
      //     title: 'Navigator One',
      //     icon: 'el-icon-location',
      //     children: [
      //       {
      //         title: 
      //       }
      //     ]
      //   }
      // ]
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
    },
    handleChange(key: string, keyPath: string) {
      console.log('handleChange key', key)
      console.log('handleChange keyPath', keyPath)
      const { path } = this.$route
      if (path === key) {
        console.log('same ***')
        return
      }
      this.$router.push(key)
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
    <div class="sticky top-0 z-10 h-[50px] bg-[#000] flex items-center justify-center">logo</div>
    <el-menu
      default-active="/test2"
      class="el-menu-vertical-custom"
      @open="handleOpen"
      @close="handleClose"
      @select="handleChange"
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
          <el-menu-item index="/test4">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="/test2/123">item three</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">item four</template>
          <el-menu-item index="/">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/test2">
        <i class="el-icon-menu"></i>
        <span slot="title">Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="/login">
        <i class="el-icon-setting"></i>
        <span slot="title">Navigator Four</span>
      </el-menu-item>
      <el-menu-item v-for="idx in list" :index="idx.toString()" :key="idx">
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

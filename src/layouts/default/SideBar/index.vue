<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'
import Svg_Logo from '@/assets/svg/logo.svg'
import Backstage from '@/assets/svg/backstage.svg'

export default defineComponent({
  name: 'sideBarComp',
  data() {
    return {
      menuActive: '',
      list: Array.from({ length: 20 }, (_, idx) => idx + 5)
    }
  },
  components: {
    Svg_Logo,
    Backstage
  },
  computed: {
    ...mapState(useSidebarCollapseStore, ['isCollapse'])
  },
  methods: {
    ...mapActions(useSidebarCollapseStore, ['SET_COLLAPSE']),
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
  },
  watch: {
    $route: {
      handler(cur) {
        this.menuActive = cur.path
      },
      immediate: true
    }
  }
})
</script>

<template>
  <div class="relative">
    <el-button
      icon="el-icon-arrow-left"
      class="absolute right-0 z-[12] translate-x-1/2 top-[12px] shadow-sm w-[25px] h-[25px] !p-[3px]"
      :class="isCollapse ? 'rotate-180' : ''"
      size="small"
      @click="SET_COLLAPSE(!isCollapse)"
      circle
    ></el-button>
    <div class="bg-[var(--luTheme-sideBar-bg)] h-screen sticky top-0 overflow-y-scroll shadow-[1px_0_2px_0_rgba(0,0,0,0.05)] z-[11]">
      <div class="sticky top-0 z-10 h-[50px] bg-[var(--luTheme-sideBar-bg)]">
        <div class="flex items-center justify-center scale-[0.7]">
          <Svg_Logo />
          <Backstage v-if="!isCollapse" class="ml-2 mt-2 [&>path]:fill-black" />
        </div>
      </div>
      <el-menu
        :default-active="menuActive"
        class="el-menu-vertical-custom"
        @open="handleOpen"
        @close="handleClose"
        @select="handleChange"
        :collapse="isCollapse"
        background-color="var(--luTheme-sideBar-bg)"
        text-color="var(--luTheme-sideBar-textColor)"
        active-text-color="var(--luTheme-sideBar-activeTextColor)"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <i class="el-icon-custom">1</i>
            <!-- <span class="w-[118px] inline-block truncate">Navigator</span> -->
            <span class="w-[118px] inline-block truncate">{{ $i18n('nav-orderManage') }}</span>
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
          <span slot="title" class="w-[130px] inline-block truncate">Navigator Four -- {{ idx }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-menu-vertical-custom {
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  border-right: none;

  .el-menu-item,
  :deep(.el-submenu__title) {
    &:hover {
      background-color: var(--luTheme-sideBar-bgHover) !important;
    }
  }
}
</style>

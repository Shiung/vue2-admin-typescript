<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'
import { useThemeStore } from '@/stores/theme'
import { ThemeConf } from '@/styles/theme/config'
import Svg_Logo from '@/assets/svg/logo.svg'
import Backstage from '@/assets/svg/backstage.svg'

import { menuConf } from './config'

export default defineComponent({
  name: 'sideBarComp',
  data() {
    return {
      menuActive: '',
      menuLs: menuConf
    }
  },
  components: {
    Svg_Logo,
    Backstage
  },
  computed: {
    ...mapState(useSidebarCollapseStore, ['isCollapse']),
    ...mapState(useThemeStore, ['theme'])
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
          <Backstage
            v-if="!isCollapse"
            class="ml-2 mt-2 [&>path]:fill-black"
            :class="[theme === 'dark' ? '[&>path]:fill-white' : '[&>path]:fill-black']"
          />
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
        <template v-for="menu in menuLs">
          <el-submenu v-if="menu.children" :key="menu.index" :index="menu.index">
            <template slot="title">
              <i :class="[menu.iconCss, '[&>svg]:inline']">
                <component :is="menu.iconEL" />
              </i>
              <span class="w-[118px] inline-block truncate">{{ $i18n(menu.titleI18n) }}</span>
            </template>
            <el-menu-item v-for="child in menu.children" :index="child.index" :key="child.index">{{ $i18n(child.titleI18n) }}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="menu.index" :index="menu.index" :disabled="menu.disabled">
            <i :class="[menu.iconCss, '[&>svg]:inline', 'svgActive']">
              <component :is="menu.iconEL" />
            </i>
            <span slot="title" class="w-[130px] inline-block truncate">{{ menu.titleI18n }}</span>
          </el-menu-item>
        </template>
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
  .el-menu-item {
    &.is-active {
      .svgActive {
        :deep(svg) {
          path {
            fill: var(--luTheme-sideBar-activeTextColor);
          }
        }
      }
    }
  }
}
</style>

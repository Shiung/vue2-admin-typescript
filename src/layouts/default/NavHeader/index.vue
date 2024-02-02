<script lang="ts">
import { defineComponent } from 'vue'
import type { Route } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'

import UserCard from './components/UserCard.vue'

export default defineComponent({
  name: 'navHeaderComp',
  data() {
    return {
      vm: this,
      breadcrumbLs: []
    }
  },
  components: {
    UserCard
  },
  computed: {
    ...mapState(useSidebarCollapseStore, ['isCollapse'])
  },
  methods: {
    ...mapActions(useSidebarCollapseStore, ['SET_COLLAPSE']),
    collapseHandler() {
      this.SET_COLLAPSE()
    }
  },
  watch: {
    $route: {
      handler(r: Route) {
        this.breadcrumbLs = r.matched.reduce((sum, cur) => {
          const { meta } = cur
          return meta.titleI18n ? sum.concat(meta.titleI18n) : sum
        }, [])
      },
      immediate: true
    }
  },
  mounted() {
    console.log('clickOutside mounted navHeader layout')
  },
  destroyed() {
    console.log('clickOutside navHeader unmounted')
  }
})
</script>

<template>
  <div class="bg-white sticky top-0 z-10">
    <div class="h-[50px] flex justify-between items-center text-primary p-2 shadow-sm">
      <el-breadcrumb class="ml-[20px]" separator="/">
        <el-breadcrumb-item v-for="i18nKey in breadcrumbLs" :key="i18nKey">{{ i18nKey }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="cursor-pointer text-[20px]" @click="collapseHandler">
        <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
      </div> -->
      <!-- <div>nav header</div> -->
      <UserCard />
    </div>

    <portal-target name="historyTabDom" />
  </div>
</template>

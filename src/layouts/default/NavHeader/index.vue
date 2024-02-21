<script lang="ts">
import { defineComponent } from 'vue'
import type { Route } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'
import { emitter } from '@core/mitt'

import UserCard from './components/UserCard.vue'

type breadcrumb = { i18nKey: string; params?: string }

type State = {
  breadcrumbLs: Array<breadcrumb>
  elHeight: number
  resizeObserverState: ResizeObserver | undefined
}

export default defineComponent({
  name: 'navHeaderComp',
  data(): State {
    return {
      breadcrumbLs: [],
      elHeight: 0,
      resizeObserverState: undefined
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
        const routeParams = Object.values(r?.params ?? {}).join('/')
        const curName = r.name
        this.breadcrumbLs = r.matched.reduce((sum, cur) => {
          const { meta } = cur
          return meta.titleI18n
            ? sum.concat({
                i18nKey: meta.titleI18n,
                ...(curName === cur.name && !!routeParams && { params: `: ${routeParams}` })
              })
            : sum
        }, [] as Array<breadcrumb>)
      },
      immediate: true
    },
    elHeight(cur) {
      emitter.emit('navHeight', cur)
    }
  },
  mounted() {
    this.resizeObserverState = new ResizeObserver(() => {
      this.elHeight = (this.$refs.dom as HTMLElement)?.getBoundingClientRect()?.height ?? 0
    })
    this.resizeObserverState.observe(this.$refs.dom as HTMLElement)
  },
  destroyed() {
    this.resizeObserverState?.disconnect()
  }
})
</script>

<template>
  <div class="bg-white sticky top-0 z-10" ref="dom">
    <div class="h-[50px] flex justify-between items-center text-primary p-2 shadow-sm">
      <el-breadcrumb class="ml-[20px]" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="{ i18nKey, params } in breadcrumbLs" :key="i18nKey">
          {{ $i18n(i18nKey) }} {{ params }}
        </el-breadcrumb-item>
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

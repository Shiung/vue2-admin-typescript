<script lang="ts">
export default {
  name: 'historyTab'
}
</script>

<script lang="ts" setup>
import { watch, reactive, computed } from 'vue'
import type { State } from './types'
import { tabConf } from './config'
import useNav from '@/hooks/useNav'

const { route, router } = useNav()

const states = reactive<State>({
  editableTabsValue: '',
  editableTabs: [],
  tabIndex: 1
})

const isTabCloseAble = computed(() => states.editableTabs.length > 1)

const tabClickHandler = () => {
  const routerPushName = states.editableTabsValue
  if (route.name === routerPushName) return
  router.push({ name: routerPushName })
}

const tabRemoveHandler = (name: string) => {
  const removeIndex = states.editableTabs.findIndex((tab) => tab.name === name)
  const isActiveTab = states.editableTabs[removeIndex].name === states.editableTabsValue
  if (removeIndex === -1) return
  if (isActiveTab) {
    const changeTabName = states.editableTabs[removeIndex === 0 ? 1 : removeIndex - 1].name
    states.editableTabsValue = changeTabName
    router.push({ name: changeTabName })
  }
  states.editableTabs = states.editableTabs.filter((_, idx) => idx !== removeIndex)
}

watch(
  () => route.path,
  (cur) => {
    const routerName = route.name as string
    const exist = states.editableTabs.find(({ name }) => name === routerName)
    if (exist) {
      states.editableTabsValue = exist.name
    } else {
      const match = tabConf?.[routerName]
      if (!match) return
      states.editableTabs.push({
        name: match.name,
        title: match.title,
        content: `content ${match.content}`
      })
      states.editableTabsValue = routerName
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="historyTab text-primary px-2 pt-2 overflow-x-hidden w-full">
    <el-tabs
      v-model="states.editableTabsValue"
      type="card"
      :closable="isTabCloseAble"
      @tab-click="tabClickHandler"
      @tab-remove="tabRemoveHandler"
    >
      <el-tab-pane v-for="item in states.editableTabs" :key="item.name" :label="item.title" :name="item.name" lazy></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs--card) {
  .el-tabs__header {
    border: none;
    .el-tabs__nav {
      border: none;
    }

    .el-tabs__item {
      border: 1px solid rgba(0, 0, 0, 0.1) !important;
      border-radius: 10px 10px 0 0;
      &:not(:first-of-type) {
        margin-left: 2px;
      }
      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: var(--luTheme-primary);
        transition: 0.3s;
      }
      &.is-active,
      &:hover {
        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>

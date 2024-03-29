<script lang="ts">
export default {
  name: 'HistoryTab'
}
</script>

<script lang="ts" setup>
import { watch, reactive, computed, onUnmounted } from 'vue'
import type { State } from './types'
import useNav from '@/hooks/useNav'

const { route, router } = useNav()

const emit = defineEmits<{
  (e: 'remove-cache', name: string): void
  (e: 'router-cache', ls: Array<string>): void
}>()

const states = reactive<State>({
  editableTabsValue: '',
  editableTabs: [],
  tabIndex: 1
})

const isTabCloseAble = computed(() => states.editableTabs.length > 1)

const calculTitleParamsHandler = (p: object) => {
  return `: ${Object.values(p).join('/')}`
}

const tabClickHandler = (cur: any) => {
  const routerPushName = states.editableTabsValue
  const routerPushParams = states.editableTabs
  console.log('tabClickHandler', route.name, routerPushName, routerPushParams, cur)
  if (route.name === routerPushName) return
  const match = routerPushParams.find(({ name }) => name === routerPushName)
  router.push({ name: routerPushName, ...(match?.params && { params: match.params }) })
}

const tabRemoveHandler = (name: string) => {
  const removeIndex = states.editableTabs.findIndex((tab) => tab.name === name)
  const isActiveTab = states.editableTabs[removeIndex].name === states.editableTabsValue
  if (removeIndex === -1) return
  emit('remove-cache', name)
  if (isActiveTab) {
    const changeTabName = states.editableTabs[removeIndex === 0 ? 1 : removeIndex - 1].name
    states.editableTabsValue = changeTabName
    router.push({ name: changeTabName })
  }
  states.editableTabs = states.editableTabs.filter((_, idx) => idx !== removeIndex)
}

watch(
  () => states.editableTabs,
  (tab) => {
    const cacheLs = tab.filter(({ cacheCompName }) => !!cacheCompName)
    emit(
      'router-cache',
      cacheLs.map((l) => l?.cacheCompName ?? 'none')
    )
  },
  { immediate: true, deep: true }
)

watch(
  () => route.path,
  (cur) => {
    const routerName = route.name as string
    const routerParams = route.params ?? {}
    const { titleI18n: routerTitleI18n = 'none', caches: routerCache } = route.meta ?? {}
    const exist = states.editableTabs.find(({ name }) => name === routerName)
    if (exist) {
      states.editableTabsValue = exist.name
    } else {
      const cur = route.matched[route.matched.length - 1]
      const { name, __name } = cur.components.default as { name: string; __name: string }
      states.editableTabs.push({
        name: routerName,
        title: routerTitleI18n,
        ...(Object.keys(routerParams).length > 0 && { params: routerParams }),
        ...(routerCache && { cacheCompName: name ?? __name })
      })
      states.editableTabsValue = routerName
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  console.log('historyTab destory***')
})
</script>

<template>
  <div v-if="states.editableTabs.length > 0" class="historyTab text-primary px-2 pt-2 overflow-x-hidden w-full">
    <el-tabs
      v-model="states.editableTabsValue"
      type="card"
      :closable="isTabCloseAble"
      @tab-click="tabClickHandler"
      @tab-remove="tabRemoveHandler"
    >
      <el-tab-pane v-for="item in states.editableTabs" :key="item.name" :label="item.title" :name="item.name" lazy>
        <span slot="label">{{ $i18n(item.title) }}{{ item.params && calculTitleParamsHandler(item.params) }}</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs--card) {
  .el-tabs__header {
    border: none;
    margin-bottom: 5px;
    .el-tabs__nav {
      border: none;
    }

    .el-tabs__item {
      border: 1px solid rgba(0, 0, 0, 0.1) !important;
      border-radius: 10px;
      overflow: hidden;
      &:not(:first-of-type) {
        margin-left: 5px;
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

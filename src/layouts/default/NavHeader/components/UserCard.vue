<script lang="ts" setup>
import LuSelector from '@/components/LuSelector.vue'
import { storeToRefs } from 'pinia'
import { useUserStoreHook } from '@/stores/user'
import useNav from '@/hooks/useNav'

type MenuId = 'logout' | 'changePsw'

type Ls = Array<{
  i18nKey: string,
  id: MenuId
}>

const { router } = useNav()

const store = useUserStoreHook()
const { operatorName } = storeToRefs(store)
const { SET_LOOUT } = store

const ls: Ls = [
  { i18nKey: 'login-changePsw', id: 'changePsw' },
  { i18nKey: 'logout-button', id: 'logout' }
]

const clickHandler = (id: MenuId, callBack: () => void) => {
  if (id === 'logout') {
    SET_LOOUT()
    router.push({ name: 'login' })
  }
  typeof callBack === 'function' && callBack()
}
</script>

<template>
  <LuSelector cus-css="px-4 py-2 rounded-[8px] border border-[rgba(0,0,0,0.1)] text-[12px">
    <template #label>
      <el-avatar icon="el-icon-user-solid" :size="25" class="mr-3"></el-avatar>
      <span class="text-[12px] text-black">{{ operatorName }}</span>
    </template>
    <template #arrow="{ show }">
      <i :class="['el-icon-caret-bottom text-[15px] text-[#00000080] ml-3 transition duration-150', show ? '-rotate-180' : 'rotate-0']" />
    </template>

    <template #dropDown="{ callBack }">
      <ul class="options">
        <li v-for="{ i18nKey, id } in ls" :key="id" @click="clickHandler(id, callBack)">{{ $i18n(i18nKey) }}</li>
      </ul>
    </template>
  </LuSelector>
</template>

<style lang="scss" scoped>
.options {
  & > li {
    white-space: nowrap;
    padding: 5px 20px;
    color: #606266;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>

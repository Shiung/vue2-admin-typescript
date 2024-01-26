<script lang="ts" setup>
import LuSelector from '@/components/LuSelector.vue'

const ls: Array<{ key: string }> = [{ key: 'changePSW' }, { key: 'logout' }]

const clickHandler = (key: string, callBack: () => void) => {
  console.log('key', key)
  typeof callBack === 'function' && callBack()
}
</script>

<template>
  <LuSelector cus-css="px-4 py-2 rounded-[8px] border border-[rgba(0,0,0,0.1)] text-[12px">
    <template #label>
      <el-avatar icon="el-icon-user-solid" :size="25" class="mr-3"></el-avatar>
      <span class="text-[12px] text-black">admin-jack</span>
    </template>
    <template #arrow="{ show }">
      <i :class="['el-icon-caret-bottom text-[15px] text-[#00000080] ml-3 transition duration-150', show ? '-rotate-180' : 'rotate-0']" />
    </template>

    <template #dropDown="{ callBack }">
      <ul class="options">
        <li v-for="{ key } in ls" :key="key" @click="clickHandler(key, callBack)">{{ key }}</li>
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

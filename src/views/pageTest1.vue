<script lang="ts">
export default {
  name: 'homeView'
}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, onActivated, onDeactivated, inject, watch } from 'vue'
import { SettingStateSymbol, SettingUpdateSymbol } from '@views/Home/stores/ProvideSetting.vue'
import slotTest from '@/components/slotTest.vue'

const setting = inject(SettingStateSymbol) // ?? { language: '', theme: '' }
const settingHandler = inject(SettingUpdateSymbol, () => console.log('wrong')) // ?? (() => console.log('wrong'))

watch(
  () => setting?.language,
  (current, prev) => {
    console.log('prev', prev)
    console.log('current', current)
  },
  { immediate: true }
)

const handeler = (v: string) => {
  console.log('handler ***')
  // setting.language = v
}

onMounted(() => {
  console.log('homeView mounted')
})

onUnmounted(() => {
  console.log('homeView destory')
})

onActivated(() => {
  console.log('active')
})

onDeactivated(() => {
  console.log('onDeactivated')
})
</script>
<template>
  <!-- <div class="h-full"> -->
  <div class="h-[1500px]" ref="dom">
    <div class="bg-[#ccc] sticky top-0">header</div>
    page1test
    <div>language: {{ setting?.language }}</div>
    <div>theme: {{ setting?.theme }}</div>
    <el-button type="success" round @click.native="settingHandler('language', 'ko-kr')">按我1</el-button>

    <el-button type="info" round @click.native="handeler('id_ID')">按我2</el-button>

    <!-- <el-button type="warning" round @click.native="settingHandler('theme', 'light')">按我3</el-button> -->

    <el-button type="danger" round @click.native="settingHandler('language', 'zh-cn')">按我4</el-button>

    <slotTest>
      <template #header>this is new header</template>

      <template #default="{ ls: { name, age } }">
        <div>
          <div class="text-slate-950">name: {{ name }}</div>
          <div class="text-gray-950">age: {{ age }}</div>
        </div>
      </template>
      <template #footer>
        <div class="text-black">this is new footer</div>
      </template>
    </slotTest>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

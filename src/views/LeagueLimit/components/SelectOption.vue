<script lang="ts" setup>
import { ref, watch, inject } from 'vue'
import { sportsConf } from '../constants'

import Loading from 'vue-loading-overlay'
import { useUserStoreHook } from '@/stores/user'

import { useFetchCid, useFetchTid } from '../hooks'

import { SettingStateSymbol } from '@views/Home/stores/ProvideSetting.vue'

const sidPicker = ref(sportsConf[0].value)
const cidPicker = ref<number | null>(null)
const tidPicker = ref<number | null>(null)

const provider_setting = inject(SettingStateSymbol)

const { states: useCidsStates, actions: useCidsActions } = useFetchCid()
const { states: useTidsStates, actions: useTidsActions } = useFetchTid()

watch(
  [() => sidPicker.value, () => provider_setting?.language],
  ([sid, language]) => {
    if (!sid || !useUserStoreHook().token || !language) return
    cidPicker.value = null
    useCidsActions.fetchHandler(sid, language)
  },
  { immediate: true }
)

watch(
  [() => sidPicker.value, () => cidPicker.value, () => provider_setting?.language],
  ([sid, cid, language]) => {
    if (!sid || !useUserStoreHook().token || !language) return
    tidPicker.value = null
    useTidsActions.fetchHandler({ sid, language, ...(cid && { cid }) })
  },
  { immediate: true }
)

defineExpose({
  sidPicker,
  cidPicker,
  tidPicker
})
</script>

<template>
  <div class="flex-1 flex space-x-2">
    <div class="flex items-center">
      <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('selector-label-sportPickLabel') }}</div>
      <el-select
        v-model="sidPicker"
        placeholder="请选择"
        size="small"
        :style="{ width: '100px' }"
        :disabled="useCidsStates.isFetchCids.value || useTidsStates.isFetchTids.value"
      >
        <el-option v-for="item in sportsConf" :key="item.value" :label="$i18n(item.i18nKey)" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="flex items-center">
      <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('selector-label-regionPickLabel') }}</div>
      <div class="w-[150px]">
        <Loading
          :active="useCidsStates.isFetchCids.value"
          loader="bars"
          :width="20"
          :height="20"
          :color="'var(--luTheme-primary)'"
          :zIndex="1000"
          :is-full-page="false"
        />
        <el-select
          v-model="cidPicker"
          placeholder="全部"
          filterable
          clearable
          size="small"
          @clear="cidPicker = null"
          :disabled="useTidsStates.isFetchTids.value"
        >
          <el-option v-for="{ cid, name } in useCidsStates.cidList.value" :key="cid" :label="name" :value="cid"></el-option>
        </el-select>
      </div>
    </div>
    <div class="flex items-center">
      <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('selector-label-leaguePickLabel') }}</div>
      <div class="w-[150px]">
        <Loading
          :active="useTidsStates.isFetchTids.value"
          loader="bars"
          :width="20"
          :height="20"
          :color="'var(--luTheme-primary)'"
          :zIndex="1000"
          :is-full-page="false"
        />
        <el-select v-model="tidPicker" placeholder="全部" filterable clearable size="small" @clear="tidPicker = null">
          <el-option v-for="{ tid, name } in useTidsStates.tidList.value" :key="tid" :label="name" :value="tid"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

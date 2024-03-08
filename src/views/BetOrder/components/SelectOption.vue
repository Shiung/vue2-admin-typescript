<script lang="ts" setup>
import { computed, ref, watch, getCurrentInstance } from 'vue'
import dayjs from 'dayjs'
import Loading from 'vue-loading-overlay'

import { sportsConf, currenciesConf, ordersConf } from '../constants'
import { useFetchLeagueHandler, useFetchGameHandler } from '../hooks'

import { useUserStoreHook } from '@/stores/user'

const vueInstance = getCurrentInstance()

const pickerOptions = {
  shortcuts: [
    {
      text: vueInstance?.proxy.$i18n('timer-range-week'),
      onClick(picker: any) {
        const today = dayjs()
        const end = today.endOf('date')
        const start = dayjs(today.valueOf() - 3600 * 1000 * 24 * 7).startOf('date')
        picker?.$emit('pick', [start, end])
      }
    },
    {
      text: vueInstance?.proxy.$i18n('timer-range-month'),
      onClick(picker: any) {
        const today = dayjs()
        const end = today.endOf('date')
        const start = dayjs(today.valueOf() - 3600 * 1000 * 24 * 30).startOf('date')
        picker?.$emit('pick', [start, end])
      }
    },
    {
      text: vueInstance?.proxy.$i18n('timer-range-oneQuarterYear'),
      onClick(picker: any) {
        const today = dayjs()
        const end = today.endOf('date')
        const start = dayjs(today.valueOf() - 3600 * 1000 * 24 * 30 * 3).startOf('date')
        picker?.$emit('pick', [start, end])
      }
    },
    {
      text: vueInstance?.proxy.$i18n('timer-range-halfYear'),
      onClick(picker: any) {
        const today = dayjs()
        const end = today.endOf('date')
        const start = dayjs(today.valueOf() - 3600 * 1000 * 24 * 30 * 6).startOf('date')
        picker?.$emit('pick', [start, end])
      }
    }
  ]
}

const datePicker = ref([dayjs().startOf('date'), dayjs().endOf('date')])
const sidPicker = ref(sportsConf[0].value)
const tidPicker = ref<number | null>(null)
const gidPicker = ref<number | null>(null)
const currencyPicker = ref<string>()
const orderTypePicker = ref<string>()
const userNameInput = ref<string>()
const orderIdInput = ref<string>()

const { states: useLeagueStates, actions: useLeagueActions } = useFetchLeagueHandler()
const { states: useGameStates, actions: useGameActions } = useFetchGameHandler()

const dateSelect = computed(() => {
  const [startDate, endDate] = datePicker.value
  return {
    startDate: startDate.valueOf(), // dayjs(startDate).startOf('date').valueOf(),
    endDate: endDate.valueOf() //dayjs(endDate).endOf('date').valueOf()
  }
})

const resetHandler = () => {
  tidPicker.value = null
  gidPicker.value = null
  currencyPicker.value = ''
  orderTypePicker.value = ''
  userNameInput.value = ''
  orderIdInput.value = ''
}

watch(
  [() => sidPicker.value, () => dateSelect.value],
  ([sid, dateObj]) => {
    if (!useUserStoreHook().token) return
    tidPicker.value = null
    useLeagueActions.fetchLeagueHandler(sid, { startDate: dateObj.startDate.toString(), endDate: dateObj.endDate.toString() })
  },
  { immediate: true }
)

watch(
  [() => tidPicker.value, () => dateSelect.value, () => sidPicker.value],
  ([tid, dateObj, sid]) => {
    if (!useUserStoreHook().token) return
    gidPicker.value = null
    useGameActions.resetGidList()
    if (!sid || !tid) return
    useGameActions.fetchGameHandler(sidPicker.value, tid, { startDate: dateObj.startDate.toString(), endDate: dateObj.endDate.toString() })
  },
  { immediate: true }
)

defineExpose({
  dateSelect,
  sidPicker,
  tidPicker,
  gidPicker,
  currencyPicker,
  orderTypePicker,
  userNameInput,
  orderIdInput,
  resetHandler
})
</script>

<template>
  <div class="flex-1 space-y-2 pr-2 [&>div]:space-x-3">
    <div class="flex items-center">
      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('order-title-timePickLabel') }}</div>
        <el-date-picker
          v-model="datePicker"
          type="datetimerange"
          size="small"
          range-separator="~"
          start-placeholder="start date"
          end-placeholder="end date"
          :clearable="false"
          :style="{ width: '380px' }"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('order-title-sportPickLabel') }}</div>
        <el-select v-model="sidPicker" placeholder="请选择" size="small" :style="{ width: '100px' }">
          <el-option v-for="item in sportsConf" :key="item.value" :label="$i18n(item.i18nKey)" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="flex items-center">
      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('order-title-leaguePickLabel') }}</div>
        <div class="w-[150px]">
          <Loading
            :active="useLeagueStates.isFetchTids.value"
            loader="bars"
            :width="20"
            :height="20"
            :color="'var(--luTheme-primary)'"
            :zIndex="1000"
            :is-full-page="false"
          />
          <el-select v-model="tidPicker" placeholder="请选择" filterable size="small">
            <el-option v-for="{ tid, name } in useLeagueStates.tidList.value" :key="tid" :label="name" :value="tid"></el-option>
          </el-select>
        </div>
      </div>

      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('order-title-gamePickLabel') }}</div>
        <div class="w-[150px]">
          <Loading
            :active="useGameStates.isFetchGids.value"
            loader="bars"
            :width="20"
            :height="20"
            :color="'var(--luTheme-primary)'"
            :zIndex="1000"
            :is-full-page="false"
          />
          <el-select v-model="gidPicker" placeholder="请选择" filterable size="small">
            <el-option
              v-for="{ gid, homeName, awayName } in useGameStates.gidList.value"
              :key="gid"
              :label="homeName + 'vs' + awayName"
              :value="gid"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('order-title-currencyPickLabel') }}</div>
        <el-select v-model="currencyPicker" placeholder="请选择" size="small" :style="{ width: '100px' }">
          <el-option v-for="{ i18nKey, value } in currenciesConf" :key="value" :label="$i18n(i18nKey)" :value="value"></el-option>
        </el-select>
      </div>

      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] mr-2">{{ $i18n('order-title-currencyPickLabel') }}</div>
        <el-select v-model="orderTypePicker" placeholder="全部" size="small" :style="{ width: '100px' }">
          <el-option v-for="{ i18nKey, value } in ordersConf" :key="value" :label="$i18n(i18nKey)" :value="value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="flex items-center">
      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] whitespace-nowrap mr-2">{{ $i18n('order-title-userNameLabel') }}</div>
        <el-input v-model="userNameInput" placeholder="请输入会员名称" size="small"></el-input>
      </div>
      <div class="flex items-center">
        <div class="text-slate-400 text-[12px] whitespace-nowrap mr-2">{{ $i18n('order-title-orderIdLabel') }}</div>
        <el-input v-model="orderIdInput" placeholder="请输入会员名称" size="small"></el-input>
      </div>
    </div>
  </div>
</template>

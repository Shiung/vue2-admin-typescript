<script lang="ts">
export default {
  name: 'leagueLimitView'
}
</script>

<script lang="ts" setup>
import { onMounted, inject, ref, computed, getCurrentInstance } from 'vue'

import SelectOption from './components/SelectOption.vue'
import { SettingStateSymbol } from '@views/Home/stores/ProvideSetting.vue'
import config from '@/config'
import Progress from '@/core/progress'
import { SID } from '@/constants'

import { tableOptionHeight } from './constants'
import { useFetchLeagueLimit, useTableSelect, usePutLimit } from './hooks'

import { MessageBox, Message } from 'element-ui'

const vueInstance = getCurrentInstance()

const tableboxDom = ref()
const selectOpthionRef = ref<InstanceType<typeof SelectOption>>()

const provider_setting = inject(SettingStateSymbol)

const { states: useLimitStates, actions: useLimitActions } = useFetchLeagueLimit()
const { states: useTableSelectStates, actions: useTableSelectActions } = useTableSelect(tableboxDom)
const { actions: usePutLimtActions } = usePutLimit()

const editButtonUnitTitle = computed(() => {
  return useTableSelectStates.multipleSelectionLength.value > 0
    ? vueInstance?.proxy.$i18n(useTableSelectStates.multipleSelectionLength.value === 1 ? 'unit-single' : 'unit-multiple')
    : ''
})

const resetPrompt = () => {
  if (!vueInstance?.proxy) return
  const h = vueInstance.proxy.$createElement
  MessageBox({
    title: vueInstance.proxy.$i18n('button-reset'),
    showCancelButton: true,
    confirmButtonText: vueInstance.proxy.$i18n('button-confirm'),
    cancelButtonText: vueInstance.proxy.$i18n('button-cancel'),
    customClass: 'cusElMessage',
    message: h(
      'div',
      { class: 'flex flex-col items-center' },
      useTableSelectStates.editList.value.map(({ tournamentId }) =>
        h('div', { class: 'flex space-x-2' }, [h('div', undefined, 'name:'), h('div', undefined, tournamentId)])
      )
    )
  })
    .then(() => {
      Message({
        type: 'warning',
        message: 'not yet'
      })
    })
    .catch(() => {
      // 取消 do noting
    })
    .finally(() => {
      useTableSelectActions.clearSelectionHandler()
    })
}

const sendPrompt = () => {
  if (!vueInstance?.proxy) return
  const h = vueInstance.proxy.$createElement
  MessageBox({
    title: vueInstance.proxy.$i18n('button-edit'),
    showCancelButton: true,
    confirmButtonText: vueInstance.proxy.$i18n('button-confirm'),
    cancelButtonText: vueInstance.proxy.$i18n('button-cancel'),
    customClass: 'cusElMessage !w-[500px]',
    message: h(
      'div',
      { class: 'space-y-5 text-[12px]' },
      useTableSelectStates.editList.value.map(({ tournamentId, matchMaxBet, minimumBet, maxPayout, edition }) =>
        h('div', { class: 'flex space-x-2 [&:not(:last-of-type)]:border-b' }, [
          h('div', { class: 'w-[100px] truncate' }, tournamentId),
          h('div', { class: 'flex-1 flex space-x-2' }, [
            h('div', { class: 'flex-1' }, [
              h('div', { class: 'text-primary' }, vueInstance.proxy.$i18n('game-title-minimumBet')),
              h('div', undefined, `${minimumBet} -> ${edition.minimumBet}`)
            ]),
            h('div', { class: 'flex-1' }, [
              h('div', { class: 'text-primary' }, vueInstance.proxy.$i18n('game-title-matchMaxBet')),
              h('div', undefined, `${matchMaxBet} -> ${edition.matchMaxBet}`)
            ]),
            h('div', { class: 'flex-1' }, [
              h('div', { class: 'text-primary' }, vueInstance.proxy.$i18n('game-title-maxPayout')),
              h('div', undefined, `${maxPayout} -> ${edition.maxPayout}`)
            ])
          ])
        ])
      )
    )
  })
    .then(() => {
      sendRequestHandler()
    })
    .catch(() => {
      // 取消 do noting
    })
    .finally(() => {
      useTableSelectActions.switchEditOptionHandler(false)
    })
}

const searchHandler = () => {
  if (selectOpthionRef.value?.sidPicker) {
    useLimitActions.setActionQuery('search', {
      sid: selectOpthionRef.value.sidPicker,
      platformId: config.platform,
      ...(selectOpthionRef.value?.cidPicker && { cid: selectOpthionRef.value?.cidPicker }),
      ...(selectOpthionRef.value?.tidPicker && { cid: selectOpthionRef.value?.tidPicker })
    })

    fetchHandler()
  }
}

const sendRequestHandler = async () => {
  const language = provider_setting?.language
  if (!language) return
  Progress.start()
  await usePutLimtActions.putHadnler({
    params: useTableSelectStates.editList.value.map(({ tournamentId, sportId, matchMaxBet, minimumBet, maxPayout, edition }) => ({
      sportId: sportId,
      tournamentId: tournamentId,
      platformId: config.platform,
      minimumBet: isNaN(Number(edition.minimumBet)) ? Number(minimumBet) : Number(edition.minimumBet),
      matchMaxBet: isNaN(Number(edition.matchMaxBet)) ? Number(matchMaxBet) : Number(edition.matchMaxBet),
      maxPayout: isNaN(Number(edition.maxPayout)) ? Number(maxPayout) : Number(edition.maxPayout)
    })),
    language,
    callback: (res) => {
      Message({
        type: 'success',
        message: res.message
      })
      fetchHandler()
    }
  })

  Progress.done()
}

const fetchHandler = async () => {
  useTableSelectActions.switchEditOptionHandler(false)
  const language = provider_setting?.language
  if (!language) return
  Progress.start()
  await useLimitActions.fetchHandler(language)
  tableboxDom.value?.$refs?.bodyWrapper?.scrollTo(0, 0)
  Progress.done()
}

onMounted(() => {
  useLimitActions.setActionQuery('init', {
    sid: selectOpthionRef.value?.sidPicker || SID.football,
    platformId: config.platform
  })
  fetchHandler()
})
</script>

<template>
  <div class="h-full flex flex-col space-y-2">
    <div class="bg-white rounded-xl p-3 flex items-center justify-between">
      <SelectOption ref="selectOpthionRef" />
      <div class="w-[90px] border-l flex flex-col items-center justify-center space-x-0 space-y-2">
        <el-button type="primary" size="small" @click="searchHandler" :disabled="useTableSelectStates.openEditOption.value">
          {{ $i18n('button-search') }}
        </el-button>
      </div>
    </div>

    <div class="bg-white rounded-xl flex-1 overflow-auto">
      <div :style="{ height: `${tableOptionHeight}px` }" class="flex items-center justify-end p-3">
        <template v-if="!useTableSelectStates.openEditOption.value">
          <el-button
            key="button-edit"
            type="primary"
            size="small"
            icon="el-icon-edit-outline"
            :disabled="useTableSelectStates.multipleSelectionLength.value === 0"
            @click="useTableSelectActions.switchEditOptionHandler(true)"
          >
            {{ editButtonUnitTitle }}
            {{ $i18n('button-edit') }}
          </el-button>
          <el-button
            key="button-reset"
            type="primary"
            size="small"
            icon="el-icon-refresh"
            :disabled="useTableSelectStates.multipleSelectionLength.value === 0"
            @click="resetPrompt"
          >
            {{ editButtonUnitTitle }}
            {{ $i18n('button-reset') }}
          </el-button>
        </template>
        <template v-else>
          <el-button key="button-cancel" type="danger" size="small" @click="useTableSelectActions.switchEditOptionHandler(false)">
            {{ $i18n('button-cancel') }}
          </el-button>
          <el-button key="button-confirm" type="primary" size="small" @click="sendPrompt">
            {{ $i18n('button-confirm') }}
          </el-button>
        </template>
      </div>

      <el-table
        :data="useLimitStates.dataLs.value"
        :height="`calc( 100% - ${tableOptionHeight}px )`"
        style="width: 100%"
        header-cell-class-name="text-[12px] !text-center !bg-[var(--luTheme-table-header-bg)]"
        cell-class-name="text-[12px] !text-center"
        :highlight-selection-row="true"
        @selection-change="useTableSelectActions.selectionChangeHandler"
        ref="tableboxDom"
      >
        <el-table-column fixed type="selection" width="55" :selectable="useTableSelectActions.selectableHandler"></el-table-column>
        <el-table-column :label="$i18n('game-title-leagueName')" prop="tournamentId"></el-table-column>
        <el-table-column :label="$i18n('game-title-minimumBet')" width="180">
          <template #default="{ row: { tournamentId, minimumBet } }">
            <el-input
              v-if="
                tournamentId in useTableSelectStates.multipleSelection.value &&
                ('minimumBet' in useTableSelectStates.multipleSelection.value[tournamentId]?.edition ?? {}) &&
                useTableSelectStates.openEditOption.value
              "
              v-model.number="useTableSelectStates.multipleSelection.value[tournamentId].edition.minimumBet"
              size="small"
              placeholder="请输入限額"
            ></el-input>
            <span v-else>{{ minimumBet }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('game-title-matchMaxBet')" width="180">
          <template #default="{ row: { tournamentId, matchMaxBet } }">
            <el-input
              v-if="
                tournamentId in useTableSelectStates.multipleSelection.value &&
                ('matchMaxBet' in useTableSelectStates.multipleSelection.value[tournamentId]?.edition ?? {}) &&
                useTableSelectStates.openEditOption.value
              "
              v-model.number="useTableSelectStates.multipleSelection.value[tournamentId].edition.matchMaxBet"
              size="small"
              placeholder="请输入限額"
            ></el-input>
            <span v-else>{{ matchMaxBet }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('game-title-maxPayout')" width="180">
          <template #default="{ row: { tournamentId, maxPayout } }">
            <el-input
              v-if="
                tournamentId in useTableSelectStates.multipleSelection.value &&
                ('maxPayout' in useTableSelectStates.multipleSelection.value[tournamentId]?.edition ?? {}) &&
                useTableSelectStates.openEditOption.value
              "
              v-model.number="useTableSelectStates.multipleSelection.value[tournamentId].edition.maxPayout"
              size="small"
              placeholder="请输入限額"
            ></el-input>
            <span v-else>{{ maxPayout }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('game-title-option')" width="180">
          <template #default="scope">
            <div class="flex items-center justify-center space-x-2">
              <el-button
                type="text"
                :class="useTableSelectStates.openEditOption.value ? 'text-slate-400' : 'text-black'"
                @click="useTableSelectActions.toggleSelectionHandler('edit', scope.row)"
                :disabled="useTableSelectStates.openEditOption.value"
              >
                <i class="el-icon-edit-outline text-[20px] font-bold"></i>
              </el-button>
              <el-button
                type="text"
                :class="useTableSelectStates.openEditOption.value ? 'text-slate-400' : 'text-black'"
                @click="
                  () => {
                    useTableSelectActions.toggleSelectionHandler('reset', scope.row)
                    resetPrompt()
                  }
                "
                :disabled="useTableSelectStates.openEditOption.value"
              >
                <i class="el-icon-refresh text-[20px] font-bold"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss">
$elMessageHeight: 500px;
$elMessageHeaderHeight: 55px;
$elMessageFooterHeight: 55px;

.cusElMessage {
  width: 300px;
  max-height: $elMessageHeight;
  padding: 0;
  border-radius: 12px;
  .el-message-box__header {
    height: $elMessageHeaderHeight;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.05);
  }
  .el-message-box__content {
    overflow-y: scroll;
    height: calc($elMessageHeight - $elMessageHeaderHeight - $elMessageFooterHeight);
  }
  .el-message-box__btns {
    box-shadow: 0 -1px 2px 0px rgba(0, 0, 0, 0.05);
    height: $elMessageFooterHeight;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
  }
}
</style>

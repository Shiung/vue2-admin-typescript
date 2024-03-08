<script lang="ts">
export default {
  name: 'betOrdersView'
}
</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Progress from '@/core/progress'

import dayjs from 'dayjs'

import SelectOption from './components/SelectOption.vue'
import { SID } from '@/constants'
import { defaultOrderPageReqParams, paginationHeight } from './constants'
import { parseAH_k } from './utils'

import { useFetchOrderPage } from './hooks'

const tableboxDom = ref()
const selectOpthionRef = ref<InstanceType<typeof SelectOption>>()

const { states, actions } = useFetchOrderPage()

const fetchHandler = async () => {
  Progress.start()
  await actions.fetchHandler()
  tableboxDom.value?.$refs?.bodyWrapper?.scrollTo(0, 0)
  Progress.done()
}

const pageChange = (p: number) => {
  actions.setActionQuery('paging', { page: p - 1 })
  fetchHandler()
}

const searchHandler = () => {
  actions.setActionQuery('search', {
    startDate: selectOpthionRef.value?.dateSelect.startDate.toString() ?? '',
    endDate: selectOpthionRef.value?.dateSelect.endDate.toString() ?? '',
    sid: selectOpthionRef.value?.sidPicker ?? SID.football,
    ...(selectOpthionRef.value?.tidPicker && {
      tid: selectOpthionRef.value?.tidPicker
    }),
    ...(selectOpthionRef.value?.gidPicker && {
      gid: selectOpthionRef.value?.gidPicker
    }),
    ...(selectOpthionRef.value?.currencyPicker && {
      currencyType: selectOpthionRef.value?.currencyPicker
    }),
    ...(selectOpthionRef.value?.orderTypePicker && {
      orderType: selectOpthionRef.value?.orderTypePicker
    }),
    ...(selectOpthionRef.value?.userNameInput && {
      userName: selectOpthionRef.value?.userNameInput
    }),
    ...(selectOpthionRef.value?.orderIdInput && {
      orderId: selectOpthionRef.value?.orderIdInput
    })
  })
  fetchHandler()
}

const cancelHandler = () => {
  const { resetHandler } = selectOpthionRef.value as any
  typeof resetHandler === 'function' && resetHandler()
}

onMounted(() => {
  if (selectOpthionRef.value?.dateSelect) {
    actions.setActionQuery('init', {
      startDate: selectOpthionRef.value?.dateSelect.startDate.toString(),
      endDate: selectOpthionRef.value?.dateSelect.endDate.toString(),
      sid: selectOpthionRef.value?.sidPicker ?? 1
    })

    fetchHandler()
  }
})
</script>

<template>
  <div class="h-full flex flex-col [&>div:not(:first-of-type)]:mt-2">
    <div class="bg-white rounded-xl p-3 flex items-center justify-between">
      <SelectOption ref="selectOpthionRef" />
      <div class="w-[90px] border-l flex flex-col items-center justify-center space-x-0 space-y-2">
        <el-button plain size="small" @click="cancelHandler">{{ $i18n('button-cancel') }}</el-button>
        <el-button type="primary" size="small" @click="searchHandler">{{ $i18n('button-search') }}</el-button>
      </div>
    </div>
    <div class="bg-white rounded-xl flex-1 overflow-auto">
      <el-table
        :data="states.dataLs"
        :height="`calc( 100% - ${paginationHeight}px )`"
        class="cusTable"
        style="width: 100%"
        header-cell-class-name="text-[12px] !text-center"
        cell-class-name="text-[12px] !text-center"
        ref="tableboxDom"
      >
        <el-table-column fixed prop="orderId" :label="$i18n(`order-title-orderId`)" width="180"></el-table-column>
        <el-table-column :label="$i18n(`order-title-userName`)" width="120">
          <template #default="scope">
            <div>{{ scope?.row?.userName }}</div>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header>
            <div>
              {{ $i18n('order-title-betTime') }} /
              <br />
              #{{ $i18n('order-title-curGameTime') }}
            </div>
          </template>
          <template #default="scope">
            {{ scope?.row?.betTime && dayjs(scope.row.betTime).format('YYYY-MM-DD hh:mm:ss') }}
            <br />
            <template v-for="({ gameTime }, idx) in scope.row.detailInfos">
              <span v-if="!!gameTime" :key="idx" class="text-primary">#{{ gameTime }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column width="155">
          <template #header>
            <div>
              {{ $i18n('order-title-createTime') }} /
              <br />
              #{{ $i18n('order-title-payoutTime') }}
            </div>
          </template>
          <template #default="{ row: { betTime, outcomeInfo } }">
            {{ betTime && dayjs(betTime).format('YYYY-MM-DD hh:mm:ss') }} / <br />
            <span v-if="outcomeInfo?.payoutTime" class="text-primary">
              #{{ outcomeInfo.payoutTime && dayjs(outcomeInfo.payoutTime).format('YYYY-MM-DD hh:mm:ss') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('order-title-betDetail')" width="250">
          <template #default="scope">
            <div
              v-for="(i, idx) in scope.row.detailInfos"
              :key="`${i.tid}-${idx}`"
              class="my-1 p-2 rounded-lg shadow-[0px_0.5px_3px_0px_rgba(0,0,0,0.15)] text-left"
            >
              <div>{{ i.homeName }} v.s {{ i.awayName }}</div>
              <div>{{ $i18n(`sport-${SID[i.sid]}`) }} {{ i.tnName }} {{ i.kickoffTime && dayjs(i.kickoffTime).format('YYYY-MM-DD') }}</div>
              <div class="text-primary">
                <span class="font-semibold">{{ i.betScore }}</span>
                <span class="mx-1">{{ i.betOnName }}</span>
                <span class="mx-1">{{ parseAH_k(i.k, i.marketId, i.betOnId) }}</span>
                <span class="mx-1">{{ i.odds }}</span>
                <span class="mx-1">{{ i.oddsType }}</span>
              </div>
              <div>
                <span>{{ i.marketName }}</span>
                <span class="mx-1">{{ $i18n(`order-matchType-${i.matchType}`) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('order-title-resultScore')">
          <template #default="scope">
            <div v-for="(i, idx) in scope.row.detailInfos" :key="`${i.tid}-${idx}`">
              {{ i.resultScore }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('order-title-userResult')">
          <template #default="scope">
            <div v-for="(i, idx) in scope.row.detailInfos" :key="`${i.tid}-${idx}`">
              {{ $i18n(`order-marketResult-${i.marketResult}`) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('order-title-totalAnte')" prop="totalAnte"></el-table-column>
        <el-table-column :label="$i18n('order-title-status')">
          <template #default="scope">
            {{ scope.row.outcomeInfo.orderStatus || scope.row.cashoutInfo.cashoutStatus }} <br />
            {{ scope.row.outcomeInfo.paidStatus }} <br />
            {{ scope.row.outcomeInfo.payout || scope.row.cashoutInfo.cashoutAmount }}
          </template>
        </el-table-column>
        <el-table-column :label="$i18n('order-title-cancelReason')">
          <template #default="{ row: { detailInfos = [] } }">
            <template v-for="(i, idx) in detailInfos">
              <span v-if="i.cancelReason" :key="`${i.tid}-${idx}`" class="text-red-400">
                {{ $i18n(`order-cancelReason-${i.cancelReason?.toLowerCase()}`) }}
              </span>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="shadow-[-1px_0_2px_0_rgba(0,0,0,0.05)] flex justify-center items-center" :style="{ height: `${paginationHeight}px` }">
        <el-pagination
          background
          :current-page="(states.paging?.currentPage ?? 0) + 1"
          :page-size="defaultOrderPageReqParams.pageSize"
          layout="prev, pager, next"
          :total="states.paging?.totalCount"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cusTable {
  :deep(.el-table__header th) {
    background-color: var(--luTheme-table-header-bg);
  }
}
</style>

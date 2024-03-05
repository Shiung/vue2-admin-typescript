<script lang="ts">
export default {
  name: 'betOrdersView'
}
</script>

<script lang="ts" setup>
import { reactive, onMounted, inject } from 'vue'
import { SettingStateSymbol } from '@views/Home/stores/ProvideSetting.vue'
import API from '@/api'
import Progress from '@/core/progress'

import dayjs from 'dayjs'

import { SID } from '@/constants'
import { } from './constants'
import { parseAH_k } from './utils'

type State = {
  dataLs: Awaited<ReturnType<typeof API.OrdersListGet>>['data']['orders']
  paging?: Awaited<ReturnType<typeof API.OrdersListGet>>['data']['page']
  pageHeight: number
}

const states = reactive<State>({
  dataLs: [],
  paging: undefined,
  pageHeight: 50
})

const provider_setting = inject(SettingStateSymbol)

const fetchHandler = async () => {
  Progress.start()
  const res = await API.OrdersListGet(
    {
      startDate: '123',
      endDate: '321',
      platformId: '111',
      pageSize: 30
    },
    {
      headers: { timeZone: 'UTC+8', language: provider_setting?.language ?? 'zh-cn' }
    }
  )
  states.dataLs = res.data.orders
  states.paging = res.data.page
  console.log('res', res)
  Progress.done()
}

const pageChange = (p: any) => {
  console.log('current', p)
}

onMounted(() => {
  fetchHandler()
})
</script>

<template>
  <div class="h-full flex flex-col [&>div:not(:first-of-type)]:mt-2">
    <div class="bg-white rounded-xl p-3 flex items-start justify-between">
      <div class="flex-1">header</div>
      <div class="w-[90px] border-l">button</div>
    </div>
    <div class="bg-white rounded-xl flex-1 overflow-auto">
      <el-table
        :data="states.dataLs"
        :height="`calc( 100% - ${states.pageHeight}px )`"
        class="cusTable"
        style="width: 100%"
        header-cell-class-name="!text-center"
        cell-class-name="text-[12px] !text-center"
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
              <span v-if="i.cancelReason" :key="`${i.tid}-${idx}`">
                {{ $i18n(`order-cancelReason-${i.cancelReason}`) }}
              </span>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="shadow-[-1px_0_2px_0_rgba(0,0,0,0.05)] flex justify-center items-center" :style="{ height: `${states.pageHeight}px` }">
        <el-pagination
          background
          :current-page="(states.paging?.currentPage ?? 0) + 1"
          :page-size="10"
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

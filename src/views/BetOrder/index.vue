<script lang="ts">
export default {
  name: 'betOrdersView'
}
</script>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import API from '@/api'
import Progress from '@/core/progress'

import type { OrderUnit } from '@/api/types/modules/orders'

type State = {
  dataLs: Array<OrderUnit> //Array<{ date: string; name: string; address: string }>
  pageHeight: number
}

const states = reactive<State>({
  // dataLs: Array.from({ length: 50 }, (_, idx) => {
  //   return {
  //     date: `2016-05-${idx}`,
  //     name: '王小虎',
  //     address: '上海市普陀区金沙江路 1518',
  //     checked: false
  //   }
  // }),
  dataLs: [],
  pageHeight: 50
})

const fetchHandler = async () => {
  Progress.start()
  const res = await API.OrdersListGet()
  states.dataLs = res.data.orders
  console.log('res', res)
  Progress.done()
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
        cell-class-name="text-[12px]"
      >
        <el-table-column fixed prop="orderId" label="orderId" width="180"></el-table-column>
        <el-table-column label="userName" width="120">
          <template #default="scope">
            <div>{{ scope.row.userName }}</div>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header>
            <div>
              投注时间 /
              <br />
              #当下赛事时间
            </div>
          </template>
          <template #default="scope">
            {{ scope.row.betTime }}
            <br />
            <template v-for="({ gameTime }, idx) in scope.row.detailInfos">
              <span v-if="!!gameTime" :key="idx" class="text-primary">#{{ gameTime }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header>
            <div>
              成立时间 /
              <br />
              #结算时间
            </div>
          </template>
          <template #default="scope">
            {{ scope.row.betTime }} / <br />
            <span v-if="scope.row?.outcomeInfo?.payoutTime" class="text-primary">#{{ scope.row?.outcomeInfo?.payoutTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="投注内容" width="200">
          <template #default="scope">
            <div v-for="i in scope.row.detailInfos" :key="i.tid" class="my-1 p-2 rounded-lg shadow-[-0.5px_0.5px_3px_0px_rgba(0,0,0,0.15)]">
              <div>{{ i.homeName }} v.s {{ i.awayName }}</div>
              <div>{{ i.sid }} {{ i.tnName }} {{ i.kickoffTime }}</div>
              <div class="text-primary">
                <span class="font-semibold">{{ i.betScore }}</span>
                <span class="mx-1">{{ i.betOnName }}</span>
                <!-- <span class="mx-1">{{ parseAH_k(k, marketId, betOnId) }}</span> -->
                <span class="mx-1">{{ i.odds }}</span>
                <span class="mx-1">{{ i.oddsType }}</span>
              </div>
              <div>
                <span>{{ i.marketName }}</span>
                <span className="mx-1">{{ i.matchType }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最终比分">
          <template #default="scope">
            <div v-for="(i, idx) in scope.row.detailInfos" :key="idx">
              {{ i.resultScore }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员输赢">
          <template #default="scope">
            <div v-for="(i, idx) in scope.row.detailInfos" :key="idx">
              {{ i.marketResult }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="投注金额" prop="totalAnte"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            {{ scope.row.outcomeInfo.orderStatus || scope.row.cashoutInfo.cashoutStatus }} <br />
            {{ scope.row.outcomeInfo.paidStatus }} <br />
            {{ scope.row.outcomeInfo.payout || scope.row.cashoutInfo.cashoutAmount }}
          </template>
        </el-table-column>
      </el-table>
      <div class="shadow-[-1px_0_2px_0_rgba(0,0,0,0.05)] flex justify-center items-center" :style="{ height: `${states.pageHeight}px` }">
        <el-pagination hide-on-single-page background :current-page="2" layout="prev, pager, next" :total="11"></el-pagination>
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

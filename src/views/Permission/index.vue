<script lang="ts">
export default {
  name: 'PermissionView'
}
</script>

<script lang="ts" setup>
import { onMounted, reactive, watch, ref } from 'vue'

type State = {
  dataLs: Array<{ date: string; name: string; address: string }>
  checkedCities: Array<string>
  cities: Array<string>
  checkAll: boolean
  isIndeterminate: boolean,
  testLs: Array<any>
}

const states = reactive<State>({
  dataLs: Array.from({ length: 5 }, (_, idx) => {
    return {
      date: `2016-05-${idx}`,
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518',
      checked: false
    }
  }),
  checkAll: false,
  checkedCities: ['上海', '北京'],
  cities: ['上海', '北京', '广州', '深圳'],
  isIndeterminate: false,
  testLs: [
    {
      a: {
        view: true,
        childA: {
          view: true
        }
      }
    },
    {
      b: {
        view: true,
        childb: {
          view: true
        }
      }
    }
  ]
})

const ls = ref({
  a: { view: true, collapse: false },
  b: { view: true, collapse: false },
  c: {
    view: true,
    collapse: false,
    children: {
      view: true,
      update: false,
      delete: false
    }
  },
  d: { view: true, collapse: false },
  e: { view: true, collapse: false },
  e1: { view: true, collapse: false },
  e2: { view: true, collapse: false },
  e3: { view: true, collapse: false },
  e4: { view: true, collapse: false },
  e5: { view: true, collapse: false },
  e6: { view: true, collapse: false },
  e7: { view: true, collapse: false },
  e8: { view: true, collapse: false },
  e9: { view: true, collapse: false },
  e10: { view: true, collapse: false },
  e11: { view: true, collapse: false },
  e12: { view: true, collapse: false },
  e13: { view: true, collapse: false },
  e14: { view: true, collapse: false },
  e15: { view: true, collapse: false },
})

const handleCheckAllChange = (e: any, val: any) => {
  console.log('val111', val, e)
  states.checkedCities = e ? ['上海', '北京', '广州', '深圳'] : []
  states.isIndeterminate = false
}

const handleCheckedCitiesChange = (value: any) => {
  console.log('value', value)
  const checkedCount = value.length
  states.checkAll = checkedCount === states.cities.length
  states.isIndeterminate = checkedCount > 0 && checkedCount < states.cities.length
}

const handerChange = (val: any, t: string) => {
  console.log('handerChange', val, t)
  states.testLs[1].b.childb.view = false
}

watch(
  () => states.testLs[1].b.childb.view,
  (c) => console.log('testLs', c),
  { immediate: true }
)

watch(
  () => states.dataLs,
  (c2) => console.log('dataLs', c2),
  { immediate: true }
)

onMounted(() => {
  console.log('權限 init')
})
</script>

<!-- <template>
  <div class="bg-white rounded-xl h-full overflow-hidden">
    <el-table :data="states.dataLs" height="calc( 100% - 70px )" class="cusTable" style="width: 100%">
      <el-table-column type="expand">
        <template #default="scope">
          <el-table-column fixed prop="date" label="日期" width="180"></el-table-column>
          <el-table-column label="姓名"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column props="checkd" label="選擇"></el-table-column>
          123
        </template>
      </el-table-column>
      <el-table-column fixed prop="date" label="日期" width="180"></el-table-column>
      <el-table-column label="姓名">
        <template #default="scope">
          <div>123 {{ scope.row.name }} {{ scope.row.address }} result: {{ states.testLs[1].b.childb.view }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="選擇">
        <template #default="scope">
          <el-checkbox v-model="scope.row.checked" @change="handerChange($event, scope.row.date)">測試</el-checkbox>
        </template>
      </el-table-column>
    </el-table>

    <div class="h-[70px]">
      <el-checkbox :indeterminate="true" @change="handerChange($event, 'test 操')">測試</el-checkbox>
      <el-checkbox :indeterminate="states.isIndeterminate" v-model="states.checkAll" @change="handleCheckAllChange($event, 'test')">
        全选
      </el-checkbox>
      <div style="margin: 15px 0"></div>
      <el-checkbox-group v-model="states.checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in states.cities" :label="city" :key="city">{{ city }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template> -->

<template>
  <div class="bg-white rounded-xl h-full overflow-auto">
    <div class="flex">
      <div class="w-[248px] bg-white flex-shrink-0 sticky left-0 z-[11] shadow-[3px_0_5px_0_rgba(0,0,0,0.05)]">
        <div class="table__header table__row sticky top-0 z-10"></div>
        <template v-for="(value, key) in ls">
          <div :key="key" class="table__row" :class="'children' in value ? 'table__collapse' : ''">
            sidebar-{{ key }}
            <div v-if="'children' in value">
              <el-checkbox v-model="value.collapse">測試</el-checkbox>
            </div>
            <div v-else></div>
          </div>
          <template v-if="value.collapse && 'children' in value">
            <div :key="`${subKey}-sub`" v-for="(_, subKey) in value.children" class="table__row">sidebar-{{ subKey }}-sub</div>
          </template>
        </template>
      </div>
      <div class="flex-1 flex">
        <div v-for="i in 7" :key="i" class="flex-1 min-w-[120px]">
          <div class="table__header table__row sticky top-0 z-10">header2-{{ i }}</div>
          <template v-for="(value, key) in ls">
            <div :key="key" class="table__row" :class="'children' in value ? 'table__collapse' : ''">content-{{ key }}</div>
            <template v-if="value.collapse && 'children' in value">
              <div :key="`${subKey}-sub`" v-for="(_, subKey) in value.children" class="table__row">content-{{ subKey }}-sub</div>
            </template>
          </template>
        </div>
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

.table {
  &__row {
    height: 50px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:first-of-type) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
  }
  &__header {
    background-color: var(--luTheme-table-header-bg);
  }
  &__collapse {
    background-color: var(--luTheme-table-header-bg);
  }
}
</style>

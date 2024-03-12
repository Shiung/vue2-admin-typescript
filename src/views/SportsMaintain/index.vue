<script lang="ts">
export default {
  name: 'sportsMaintainView'
}
</script>

<script lang="ts" setup>
import { onMounted, reactive, inject, computed } from 'vue'
import { SID } from '@/constants'
import Banner_sports from '@/assets/img/banner_sports.png'
import API from '@/api'
import config from '@/config'
import Progress from '@/core/progress'

import { Message } from 'element-ui'
import { SettingStateSymbol } from '@views/Home/stores/ProvideSetting.vue'

type States = {
  list: Awaited<ReturnType<typeof API.SportSwitchGet>>['data']
  permission: boolean
}

const states = reactive<States>({
  list: [],
  permission: false
})

const provider_setting = inject(SettingStateSymbol)

const updateParams = computed(() =>
  states.list.map(({ SportId, Enable }) => ({
    sport_id: SportId,
    platform_id: config.platform,
    enable: !Enable
  }))
)

const updateHandler = () => {
  states.permission = false
  putSportsSwitchHandler()
}

const checkPermissionHandler = () => {
  states.permission = true
}

const putSportsSwitchHandler = async () => {
  try {
    Progress.start()
    const res = await API.SportSwitchPut(updateParams.value, {
      headers: { language: provider_setting?.language ?? 'zh-cn' }
    })
    if (res.code === 0) {
      Message({
        type: 'success',
        message: res.message,
        duration: 5000
      })
    } else {
      throw res
    }
  } catch (e) {
    console.log('error', e)
  }
  Progress.done()
}

const fetchHandler = async () => {
  try {
    Progress.start()
    const res = await API.SportSwitchGet(
      {
        platformId: config.platform
      },
      {
        headers: { language: provider_setting?.language ?? 'zh-cn' }
      }
    )

    if (res.code === 0) {
      states.list = res.data.map((i) => ({ ...i, Enable: !i.Enable }))
    } else {
      throw res
    }
  } catch (e) {
    console.log('error', e)
  }
  Progress.done()
}

onMounted(() => {
  fetchHandler()
})
</script>

<template>
  <div class="h-full flex">
    <div class="bg-white rounded-xl w-[280px] [&>div]:p-3">
      <div class="h-[50px] flex items-center justify-between border-b">
        <span class="text-[16px] font-semibold">{{ $i18n('game-title-sportsMaintain') }}</span>
        <el-button v-if="states.permission" icon="el-icon-unlock" circle size="small" @click="updateHandler"></el-button>
        <el-button v-else icon="el-icon-lock" circle size="small" @click="checkPermissionHandler"></el-button>
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between py-2" v-for="sport in states.list" :key="sport.Id">
          <span>{{ $i18n(`sport-${SID[sport.SportId] ?? sport.SportId}`) }}</span>
          <el-switch v-model="sport.Enable" :disabled="!states.permission"></el-switch>
        </div>
      </div>
    </div>
    <div class="flex-1 flex justify-end items-end">
      <el-image :src="Banner_sports" fit="contain" class="w-4/5 max-w-[500px]"></el-image>
    </div>
  </div>
</template>

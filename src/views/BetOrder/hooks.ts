import { reactive, ref, inject, readonly } from 'vue'
import API from '@/api'
import type { OrdersActionType } from '@/api/types'
import { SettingStateSymbol } from '@views/Home/stores/ProvideSetting.vue'

import { defaultOrderPageReqParams } from './constants'

type Parameters<Type extends (...args: any) => any> = Type extends (...args: infer Args) => any ? Args : never

const useFetchOrderPage = () => {
  type ActionQuery = Parameters<typeof API.OrdersListGet>[0]
  type ActionMap = {
    init: Required<Pick<OrdersActionType.OrdersGet['req'], 'startDate' | 'endDate' | 'sid'>>
    paging: Required<Pick<OrdersActionType.OrdersGet['req'], 'page'>>
    search: Omit<OrdersActionType.OrdersGet['req'], 'platformId'>
  }

  type State = {
    dataLs: Awaited<ReturnType<typeof API.OrdersListGet>>['data']['orders']
    paging: Awaited<ReturnType<typeof API.OrdersListGet>>['data']['page']
    actionQuery: ActionQuery
  }

  const states = reactive<State>({
    dataLs: [],
    paging: {
      currentPage: 0,
      totalPage: 0,
      totalCount: 0
    },
    actionQuery: undefined
  })

  const provider_setting = inject(SettingStateSymbol)

  const fetchHandler = async () => {
    try {
      const res = await API.OrdersListGet(states.actionQuery ? { ...states.actionQuery } : undefined, {
        headers: { timeZone: 'UTC+8', language: provider_setting?.language ?? 'zh-cn' }
      })
      if (res.code === 0) {
        states.dataLs = res.data.orders
        states.paging = res.data.page
      } else {
        throw res
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  const setActionQuery = <T extends keyof ActionMap>(type: T, p: ActionMap[T]) => {
    switch (type) {
      case 'init': {
        states.actionQuery = {
          ...(p as { sid: number; startDate: string; endDate: string }),
          ...defaultOrderPageReqParams
        }
        return
      }
      case 'paging': {
        if (states.actionQuery) {
          states.actionQuery = {
            ...states.actionQuery,
            page: (p as { page: number }).page
          }
        }
        return
      }
      case 'search': {
        if (p && 'startDate' in p && 'endDate' in p) {
          states.actionQuery = {
            ...p,
            ...defaultOrderPageReqParams
          }
        }
        return
      }
      default:
        return
    }
  }

  return {
    states,
    actions: {
      fetchHandler,
      setActionQuery
    }
  }
}

const useFetchLeagueHandler = () => {
  const isFetchTids = ref<boolean>(false)
  const tidList = ref<Awaited<ReturnType<typeof API.TournamentByDateRangeGet>>['data']>([])

  const provider_setting = inject(SettingStateSymbol)

  const fetchLeagueHandler = async (sid: number, date: { startDate: string; endDate: string }) => {
    try {
      isFetchTids.value = true
      const res = await API.TournamentByDateRangeGet(
        {
          sid: sid,
          startDate: date.startDate,
          endDate: date.endDate
        },
        {
          headers: { timeZone: 'UTC+8', language: provider_setting?.language ?? 'zh-cn' }
        }
      )
      if (res.code === 0) {
        tidList.value = res.data
      } else {
        throw res
      }
    } catch (e) {
      console.log('e', e)
    } finally {
      isFetchTids.value = false
    }
  }

  return {
    states: {
      isFetchTids: readonly(isFetchTids),
      tidList: readonly(tidList)
    },
    actions: {
      fetchLeagueHandler
    }
  }
}

const useFetchGameHandler = () => {
  type States = {
    isFetchGids: boolean
    gidList: Awaited<ReturnType<typeof API.MatchBzyDateRangeGet>>['data']
  }

  const isFetchGids = ref<States['isFetchGids']>(false)
  const gidList = ref<States['gidList']>([])
  const provider_setting = inject(SettingStateSymbol)

  const fetchGameHandler = async (sid: number, tid: number, date: { startDate: string; endDate: string }) => {
    try {
      isFetchGids.value = true
      const res = await API.MatchBzyDateRangeGet(
        {
          sid,
          tid,
          startDate: date.startDate,
          endDate: date.endDate
        },
        {
          headers: { timeZone: 'UTC+8', language: provider_setting?.language ?? 'zh-cn' }
        }
      )
      if (res.code === 0) {
        gidList.value = res.data
      } else {
        throw res
      }
    } catch (e) {
      console.log('e', e)
    } finally {
      isFetchGids.value = false
    }
  }

  return {
    states: {
      gidList: readonly(gidList),
      isFetchGids: readonly(isFetchGids)
    },
    actions: {
      resetGidList: () => {
        gidList.value = []
      },
      fetchGameHandler
    }
  }
}

export { useFetchOrderPage, useFetchLeagueHandler, useFetchGameHandler }

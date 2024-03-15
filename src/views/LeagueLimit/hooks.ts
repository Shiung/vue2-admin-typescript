import { ref, readonly, computed, watch, type Ref } from 'vue'
import API from '@/api'
import type { Parameters, UnitLeagueLimitData, EditSelector } from './types'

const useFetchCid = () => {
  const isFetchCids = ref<boolean>(false)
  const cidList = ref<Awaited<ReturnType<typeof API.SportCidListGet>>['data']>([])

  const fetchHandler = async (sid: number, language: string) => {
    try {
      isFetchCids.value = true
      const res = await API.SportCidListGet(
        { sid },
        {
          headers: { language: language ?? 'zh-cn' }
        }
      )
      if (res.code === 0) {
        cidList.value = res.data.filter((ls) => !!ls)
      } else {
        throw res
      }
    } catch (e) {
      console.log('e', e)
    } finally {
      isFetchCids.value = false
    }
  }

  return {
    states: {
      isFetchCids: readonly(isFetchCids),
      cidList: readonly(cidList)
    },
    actions: {
      fetchHandler
    }
  }
}

const useFetchTid = () => {
  const isFetchTids = ref<boolean>(false)
  const tidList = ref<Awaited<ReturnType<typeof API.SportTidListGet>>['data']>([])

  const fetchHandler = async ({ sid, cid, language }: { sid: number; cid?: number; language: string }) => {
    try {
      isFetchTids.value = true
      const res = await API.SportTidListGet(
        { sid, ...(cid && { cid }) },
        {
          headers: { language: language ?? 'zh-cn' }
        }
      )
      if (res.code === 0) {
        tidList.value = res.data.filter((ls) => !!ls)
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
      fetchHandler
    }
  }
}

const useFetchLeagueLimit = () => {
  type ActionRequireParams = Parameters<typeof API.SportLeagueLimitGet>[0]
  type ActionMap = {
    init: ActionRequireParams
    search: ActionRequireParams
  }

  const dataLs = ref<Awaited<ReturnType<typeof API.SportLeagueLimitGet>>['data']>([])
  const actionQuery = ref<ActionRequireParams>()

  const setActionQuery = <T extends keyof ActionMap>(type: T, p: ActionMap[T]) => {
    switch (type) {
      case 'init':
      case 'search': {
        actionQuery.value = p
        break
      }
      default:
        return
    }
  }

  const fetchHandler = async (language: string) => {
    if (!language || !actionQuery.value) return
    if (!('sid' in actionQuery.value) || !('platformId' in actionQuery.value)) return
    try {
      const res = await API.SportLeagueLimitGet(actionQuery.value, {
        headers: { language }
      })
      if (res.code === 0) {
        dataLs.value = res.data
      } else {
        throw res
      }
    } catch (e) {
      console.log('e', e)
    }
  }

  return {
    states: {
      dataLs: readonly(dataLs)
    },
    actions: {
      setActionQuery,
      fetchHandler
    }
  }
}

const usePutLimit = () => {
  type ActionRequireParams = Parameters<typeof API.SportLeagueLimitPut>[0]

  const putHadnler = async ({
    params,
    language,
    callback
  }: {
    params: ActionRequireParams
    language: string
    callback: (res: Awaited<ReturnType<typeof API.SportLeagueLimitPut>>) => void
  }) => {
    try {
      const res = await API.SportLeagueLimitPut(params, {
        headers: { language }
      })
      if (res.code === 0) {
        typeof callback === 'function' && callback(res)
      } else {
        throw res
      }
    } catch (e) {
      console.log('e', e)
    }
  }

  return {
    actions: {
      putHadnler
    }
  }
}

const useTableSelect = (tableboxDom: Ref) => {
  const multipleSelection = ref<EditSelector>({})
  const openEditOption = ref<boolean>(false)

  const multipleSelectionLength = computed(() => Object.keys(multipleSelection.value).length)

  const putParams = computed(() => {
    return Object.values(multipleSelection.value).map(({ edition, ...res }) => {
      return {
        ...res,
        ...{ edition }
      }
    })
  })

  const selectionChangeHandler = (val: Array<UnitLeagueLimitData>) => {
    multipleSelection.value = val.reduce<EditSelector>((sum, cur) => {
      const { tournamentId } = cur
      return {
        ...sum,
        [tournamentId]: {
          ...cur,
          edition: {
            minimumBet: cur.minimumBet,
            matchMaxBet: cur.matchMaxBet,
            maxPayout: cur.maxPayout
          }
        }
      }
    }, {})
  }

  const selectableHandler = (i: any) => {
    return openEditOption.value ? false : i
  }

  const clearSelectionHandler = () => typeof tableboxDom.value?.clearSelection === 'function' && tableboxDom.value?.clearSelection()

  const toggleSelectionHandler = (type: 'edit' | 'reset', row: any) => {
    if (row) {
      clearSelectionHandler()
      typeof tableboxDom.value?.toggleRowSelection === 'function' && tableboxDom.value?.toggleRowSelection(row)
    }

    switch (type) {
      case 'edit': {
        switchEditOptionHandler(true)
        break
      }
      case 'reset':
      default:
        break
    }
  }

  const switchEditOptionHandler = (s: boolean) => (openEditOption.value = s)

  watch(
    () => openEditOption.value,
    (o) => {
      if (!o) clearSelectionHandler()
    },
    { immediate: true }
  )

  return {
    states: {
      multipleSelection,
      openEditOption: readonly(openEditOption),
      editList: readonly(putParams),
      multipleSelectionLength: readonly(multipleSelectionLength)
    },
    actions: {
      switchEditOptionHandler,
      selectableHandler,
      toggleSelectionHandler,
      selectionChangeHandler,
      clearSelectionHandler
    }
  }
}

export { useFetchCid, useFetchTid, useFetchLeagueLimit, useTableSelect, usePutLimit }

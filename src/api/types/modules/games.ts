import type { withData } from '../common'

import type { UnitLeagueLimitData } from '@views/LeagueLimit/types'

interface SportSwitchGet {
  req: {
    platformId?: string
  }
  res: withData<
    Array<{
      Id: number
      PlatformId: string
      SportId: number
      Enable: boolean
      CreateTime: string
      UpdateTime: string
    }>
  >
}

interface SportSwitchPut {
  req: Array<{
    sport_id: number
    platform_id: string
    enable: boolean
  }>
  res: withData<undefined>
}

interface SportCidListGet {
  req: {
    sid: number
  }
  res: withData<
    Array<{
      cid: number
      name: string
    }>
  >
}

interface SportTidListGet {
  req: {
    sid: number
    cid?: number
  }
  res: withData<
    Array<{
      tid: number
      name: string
    }>
  >
}

interface SportLeagueLimitGet {
  req: {
    sid: number
    cid?: number
    tid?: number
    platformId: string
  }
  res: withData<Array<UnitLeagueLimitData>>
}

interface SportLeagueLimitPut {
  req: Array<{
    sportId: number
    tournamentId: number
    minimumBet: number
    matchMaxBet: number
    maxPayout: number
    platformId: string
  }>
  res: withData<undefined>
}

export type { SportSwitchGet, SportSwitchPut, SportCidListGet, SportTidListGet, SportLeagueLimitGet, SportLeagueLimitPut }

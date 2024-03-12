import type { withData } from '../common'

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

export type { SportSwitchGet, SportSwitchPut }

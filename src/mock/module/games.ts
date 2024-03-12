import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import type { GamesActionType } from '@/api/types'

import { apiPathMap } from '@/api/config'

export default () => {
  return [
    {
      url: apiPathMap.SportSwitchGet.mockPath,
      method: 'get',
      response: (req: any): GamesActionType.SportSwitchGet['res'] => {
        const { query } = req as { query: GamesActionType.SportSwitchGet['req']}
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0

        const fakeLs = Array.from({ length: 4 }, (_, idx) => {
          return {
            Id: idx + 1,
            PlatformId: query?.platformId ?? 'luxon',
            SportId: idx + 1,
            Enable: Random.natural(0, 1) === 1,
            CreateTime: '',
            UpdateTime: ''
          }
        })

        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.SportSwitchGet.path,
            ...(isQueryExist && { query })
          },
          data: fakeLs
        }
      }
    },
    {
      url: apiPathMap.SportSwitchPut.mockPath,
      method: 'put',
      response: (req: any): GamesActionType.SportSwitchPut['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0

        return {
          code: 0,
          message: 'success',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.SportSwitchPut.path,
            ...(isQueryExist && { query })
          },
          data: undefined
        }
      }
    }
  ] as MockMethod[]
}

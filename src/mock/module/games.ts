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
            platformId: query?.platformId ?? 'luxon',
            sportId: idx + 1,
            enable: Random.natural(0, 1) === 1
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
    },
    {
      url: apiPathMap.SportCidListGet.mockPath,
      method: 'get',
      response: (req: any): GamesActionType.SportCidListGet['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0

        const fakeData = Array.from({ length: Random.natural(5, 30) }, (_, idx) => {
          return {
            cid: Number(`${Random.natural(100, 2000)}${idx}`),
            name: Random.province()
          }
        })

        return {
          code: 0,
          message: 'success',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.SportCidListGet.path,
            ...(isQueryExist && { query })
          },
          data: fakeData
        }
      }
    },
    {
      url: apiPathMap.SportTidListGet.mockPath,
      method: 'get',
      response: (req: any): GamesActionType.SportTidListGet['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0

        const fakeData = Array.from({ length: Random.natural(5, 30) }, (_, idx) => {
          return {
            tid: Number(`${Random.natural(100, 2000)}${idx}`),
            name: Random.cname()
          }
        })

        return {
          code: 0,
          message: 'success',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.SportTidListGet.path,
            ...(isQueryExist && { query })
          },
          data: fakeData
        }
      }
    },
    {
      url: apiPathMap.SportLeagueLimitGet.mockPath,
      method: 'get',
      response: (req: any): GamesActionType.SportLeagueLimitGet['res'] => {
        const { query } = req as { query: GamesActionType.SportLeagueLimitGet['req'] }
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0

        const fakeData = Array.from({ length: Random.natural(5, 50) }, (_, idx) => {
          return {
            sportId: Number(query.sid),
            platformId: query.platformId,
            tournamentId: Number(`${Random.natural(100, 2000)}${idx}`),
            minimumBet: `${Random.natural(5, 10)}`,
            matchMaxBet: `${Random.natural(50000, 1000000)}`,
            maxPayout: `${Random.natural(5000, 10000)}`
          }
        })

        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.SportLeagueLimitGet.path,
            ...(isQueryExist && { query })
          },
          data: fakeData
        }
      }
    },
    {
      url: apiPathMap.SportLeagueLimitPut.mockPath,
      method: 'put',
      response: (req: any): GamesActionType.SportLeagueLimitPut['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0

        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.SportLeagueLimitPut.path,
            ...(isQueryExist && { query })
          },
          data: undefined
        }
      }
    }
  ] as MockMethod[]
}

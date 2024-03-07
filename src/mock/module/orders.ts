import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import type { OrdersActionType } from '@/api/types'

import { apiPathMap } from '@/api/config'

const cancelReasonLs = ['', 'manual_canceled', 'goal_event', 'match_canceled']
const marketResultLs = ['None', 'Winner', 'Loser', 'WinHalf', 'LoseHalf', 'Refund', 'Irrelevant']

export default () => {
  return [
    {
      url: apiPathMap.ordersGet.mockPath,
      method: 'get',
      response: (req: any): OrdersActionType.OrdersGet['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0
        const page = Number(query?.page ?? 0)
        const pageSize = Number(query?.pageSize ?? 30)
        const mockOrders = Array.from({ length: pageSize }, (_, idx) => {
          return {
            orderId: Random.id(),
            userId: `luxon_AutoRemote002`,
            platformId: 'luxon',
            userName: `AutoRemote002-${page + 1}-${idx}`,
            betTime: 1703804378000,
            updateTime: 1703879015000,
            currencyType: 'CNY',
            totalAnte: Random.natural(10, 500).toString(),
            effectiveTotalAnte: '14',
            maxWinnableAmount: '8.96',
            parlayInfo: {
              isParlay: false,
              set: '',
              count: 0,
              odds: '1.64'
            },
            detailInfos: Array.from({ length: Random.natural(1, 2) }, () => {
              return {
                sid: Random.natural(1, 4),
                tid: 30085,
                tnName: '阿尔及利亚甲组联赛',
                gid: 291258,
                homeName: 'USM 阿尔及尔',
                awayName: '阿尔及尔',
                kickoffTime: 1703869200000,
                matchType: 'Prematch',
                gameTime: '',
                period: '',
                periodName: '',
                betScore: '0-0',
                marketId: 'ah_1st',
                marketName: '让球-上半场',
                betOnId: 'h',
                betOnName: 'USM 阿尔及尔',
                k: '+0/0.5',
                odds: '1.64',
                oddsType: 'EU',
                marketResult: marketResultLs[Random.natural(0, 6)],
                resultScore: '0-0',
                cancelReason: cancelReasonLs[Random.natural(0, 4)],
                resultReason: '',
                betProbability: '0.5783',
                cashoutProbability: '0',
                endDate: ''
              }
            }),
            outcomeInfo: {
              orderStatus: 'Settled',
              paidStatus: 'Paid',
              payout: '18.48',
              payoutTime: 1703879015000
            },
            cashoutInfo: {
              cashoutStatus: 'None',
              cashoutTime: '0',
              cashoutAmount: '0'
            }
          }
        })

        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.ordersGet.path,
            ...(isQueryExist && { query })
          },
          data: {
            page: {
              currentPage: page,
              totalCount: pageSize * 5,
              totalPage: 5
            },
            orders: mockOrders
          }
        }
      }
    },
    {
      url: apiPathMap.TournamentByDateRangeGet.mockPath,
      method: 'get',
      response: (req: any): OrdersActionType.TournamentByDateRangeGet['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0
        const fakeTids = Array.from({ length: Random.natural(1, 20) }, (_, idx) => {
          return {
            tid: Number(`${Random.natural(100, 2000)}${idx}`),
            name: Random.ctitle()
          }
        })
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.TournamentByDateRangeGet.path,
            ...(isQueryExist && { query })
          },
          data: fakeTids
        }
      }
    },
    {
      url: apiPathMap.MatchByDateRangeGet.mockPath,
      method: 'get',
      response: (req: any): OrdersActionType.MatchByDateRangeGet['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0
        const fakeTids = Array.from({ length: Random.natural(1, 10) }, (_, idx) => {
          return {
            gid: Number(`${Random.natural(100, 2000)}${idx}`),
            homeName: Random.cname(),
            awayName: Random.cname()
          }
        })
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.MatchByDateRangeGet.path,
            ...(isQueryExist && { query })
          },
          data: fakeTids
        }
      }
    }
  ] as MockMethod[]
}

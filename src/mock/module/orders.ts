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
        const mockOrders = Array.from({ length: 30 }, (_, idx) => {
          return {
            orderId: Random.id(),
            userId: `luxon_AutoRemote002`,
            platformId: 'luxon',
            userName: `AutoRemote002-${idx}`,
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
            path: apiPathMap.ordersGet.path
          },
          data: {
            page: {
              currentPage: 0,
              totalCount: Number(query?.pageSize),
              totalPage: 1
            },
            orders: mockOrders
          }
        }
      }
    }
  ] as MockMethod[]
}

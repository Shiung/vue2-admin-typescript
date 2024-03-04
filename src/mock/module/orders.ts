import type { MockMethod } from 'vite-plugin-mock'
import { Random, mock } from 'mockjs'
import type { OrdersActionType } from '@/api/types'

import { apiPathMap } from '@/api/config'

export default () => {
  return [
    {
      url: apiPathMap.ordersGet.mockPath,
      method: 'get',
      timeout: 2000,
      response: (req: any): OrdersActionType.OrdersGet['res'] => {
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
              totalCount: 600,
              totalPage: 20
            },
            orders: [
              {
                orderId: '155102a87877799ee393',
                userId: 'luxon_AutoRemote002',
                platformId: 'luxon',
                userName: 'AutoRemote002',
                betTime: 1703804378000,
                updateTime: 1703879015000,
                currencyType: 'CNY',
                totalAnte: '14',
                effectiveTotalAnte: '14',
                maxWinnableAmount: '8.96',
                parlayInfo: {
                  isParlay: false,
                  set: '',
                  count: 0,
                  odds: '1.64'
                },
                detailInfos: [
                  {
                    sid: 1,
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
                    marketResult: 'WinHalf',
                    resultScore: '0-0',
                    cancelReason: '',
                    resultReason: '',
                    betProbability: '0.5783',
                    cashoutProbability: '0',
                    endDate: ''
                  }
                ],
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
            ]
          }
        }
      }
    }
  ] as MockMethod[]
}

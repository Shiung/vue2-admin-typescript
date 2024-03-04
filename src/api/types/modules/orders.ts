import type { withData } from '../common'

type OrderUnit = {
  orderId: string
  userId: string
  betTime: number
  userName: string
  currencyType: string
  effectiveTotalAnte: string
  updateTime: number
  totalAnte: string
  platformId: string
  maxWinnableAmount: string
  parlayInfo: {
    isParlay: boolean
    set: string
    count: number
    odds: string
  }
  detailInfos: Array<{
    sid: number
    tid: number
    tnName: string
    gid: number
    homeName: string
    awayName: string
    kickoffTime: number
    matchType: string
    gameTime: string
    period: string
    periodName: string
    betScore: string
    marketName: string
    marketId: string
    betOnId: string
    betOnName: string
    k: string
    odds: string
    oddsType: string
    marketResult: string
    betProbability: string
    cashoutProbability: string
    resultScore: string
    cancelReason: string
    resultReason: string
    endDate: string
  }>
  outcomeInfo: {
    orderStatus: string
    paidStatus: string
    payout: string
    payoutTime: number
  }
  cashoutInfo: {
    cashoutStatus: string
    cashoutTime: string
    cashoutAmount: string
  }
}

interface OrdersGet {
  req: {
    startDate: string
    endDate: string
    orderId?: string
    platformId: string
    userName?: string
    currencyType?: string
    orderType?: string
    paidStatus?: string
    sid?: number
    tid?: number
    gid?: number
    page?: number
    pageSize?: number
    sortOrder?: string
    sortType?: string
  }
  res: withData<{
    page: {
      currentPage: number
      totalPage: number
      totalCount: number
    }
    orders: Array<OrderUnit>
  }>
}

export type { OrdersGet, OrderUnit }

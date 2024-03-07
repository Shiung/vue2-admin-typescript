import { SID } from '@/constants'
import config from '@/config'

const sportsConf: Array<{ i18nKey: string; value: SID }> = [
  { i18nKey: `sport-${SID[SID.football]}`, value: SID.football },
  { i18nKey: `sport-${SID[SID.basketball]}`, value: SID.basketball },
  { i18nKey: `sport-${SID[SID.tennis]}`, value: SID.tennis },
  { i18nKey: `sport-${SID[SID.baseball]}`, value: SID.baseball }
]

const currenciesConf: Array<{ i18nKey: string; value: string }> = [
  { i18nKey: 'CNY', value: 'CNY' },
  { i18nKey: 'USD', value: 'USD' }
]

const ordersConf: Array<{ i18nKey: string; value: string }> = [
  { i18nKey: 'order-betType-single', value: 'Single' },
  { i18nKey: 'order-betType-parlay', value: 'Parlay' }
]

const paginationHeight = 50

const defaultOrderPageReqParams = {
  page: 0,
  pageSize: 30,
  platformId: config.platform
} as const

export { sportsConf, currenciesConf, ordersConf, defaultOrderPageReqParams, paginationHeight }

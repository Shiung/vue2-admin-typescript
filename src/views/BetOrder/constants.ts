import { SID } from '@/constants'

const sportsConf: Array<{ i18nKey: string; value: SID }> = [
  { i18nKey: '足球', value: SID.football },
  { i18nKey: '籃球', value: SID.basketball },
  { i18nKey: '網球', value: SID.tennis },
  { i18nKey: '棒球', value: SID.baseball }
]

const currenciesConf: Array<{ i18nKey: string; value: string }> = [
  { i18nKey: 'CNY', value: 'CNY' },
  { i18nKey: 'USD', value: 'USD' }
]

const ordersConf: Array<{ i18nKey: string; value: string }> = [
  { i18nKey: '單注', value: 'Single' },
  { i18nKey: '串關', value: 'Parlay' }
]

export { sportsConf, currenciesConf, ordersConf }

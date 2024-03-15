import { SID } from '@/constants'

const sportsConf: Array<{ i18nKey: string; value: SID }> = [
  { i18nKey: `sport-${SID[SID.football]}`, value: SID.football },
  { i18nKey: `sport-${SID[SID.basketball]}`, value: SID.basketball },
  { i18nKey: `sport-${SID[SID.tennis]}`, value: SID.tennis },
  { i18nKey: `sport-${SID[SID.baseball]}`, value: SID.baseball }
]

const tableOptionHeight = 50

export { sportsConf, tableOptionHeight }

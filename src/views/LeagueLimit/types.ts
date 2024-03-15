type Parameters<Type extends (...args: any) => any> = Type extends (...args: infer Args) => any ? Args : never

interface UnitLeagueLimitData {
  sportId: number
  platformId: string
  tournamentId: number
  minimumBet: string
  matchMaxBet: string
  maxPayout: string
}

interface Edition extends UnitLeagueLimitData {
  edition: Pick<UnitLeagueLimitData, 'minimumBet' | 'matchMaxBet' | 'maxPayout'>
}

type EditSelector = {
  [key in string]: Edition
}

export type { Parameters, UnitLeagueLimitData, EditSelector }

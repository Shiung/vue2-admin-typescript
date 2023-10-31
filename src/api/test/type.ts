import type { withData } from '../types'

interface TestFetch {
  req: {
    key: number
    page: number
  }
  res: withData<{
    id: number
    title: string
  }>
}

interface TestPost {
  req: {
    title: string
  }
  res: withData<{
    id: number
    title: string
  }>
}

export type { TestFetch, TestPost }

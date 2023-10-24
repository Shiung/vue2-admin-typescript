export interface TestFetch {
  res: {
    id: number
    title: string
  }
}

export interface TestPost {
  req: {
    title: string
  }
  res: {
    id: number
    title: string
  }
}

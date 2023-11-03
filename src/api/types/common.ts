import type { AxiosRequestConfig } from '@core/http/types'

export interface AxiosConfigBind extends AxiosRequestConfig {
  Authorization?: string
}

type Mock = {
  root: string
  path: string
}

export interface withData<T> {
  message: string
  code: number
  data: T
  mockPath?: Mock
}

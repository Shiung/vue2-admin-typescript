import type { AxiosRequestConfig } from '@core/http/types'

export interface AxiosConfigBind extends AxiosRequestConfig {
  Authorization?: string
}

export * from './test'

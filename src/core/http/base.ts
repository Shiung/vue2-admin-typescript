import Axios from 'axios'
import type { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, RequestMethods, ApiType } from './types'
import { emitter } from '@core/mitt'

import { getLocalStorage } from '@/utils'

const mock = getLocalStorage('mock') === true

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/',
  timeout: 0.5 * 60 * 1000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export default class Base {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 註冊axios instance
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  // 請求攔截器
  private httpInterceptorsRequest(): void {
    Base.axiosInstance.interceptors.request.use(
      (config) => {
        // console.log('config', config)
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  // 回應攔截器
  private httpInterceptorsResponse(): void {
    Base.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (mock) console.log('api response ==>', response)
        if (response.data.code !== 0) throw { response }
        return response.data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  private httpErrorResponse(e: (Error | AxiosError) & { response: any }) {
    if (Axios.isAxiosError(e)) {
      // axios error
      // console.error('isAxiosError', e)
    } else {
      // others error
      // console.error('isNotAxiosError', e)
    }
    emitter.emit('requestError', {
      response: e,
      code: e?.response?.data?.code ?? 0,
      message: e?.response?.data?.message ?? 'error'
    })
    return e
  }

  private request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: AxiosRequestConfig): Promise<T | any> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    }

    return Base.axiosInstance.request(config).catch(this.httpErrorResponse)
  }

  protected post<T extends ApiType<T['res'], T['req']>>(url: string, params?: T['req'], config?: AxiosRequestConfig): Promise<T['res']> {
    const p = params ? { data: params } : undefined
    return this.request<T['res']>('post', url, p, config)
  }

  protected get<T extends ApiType<T['res'], T['req']>>(url: string, params?: T['req'], config?: AxiosRequestConfig): Promise<T['res']> {
    const p = params ? { params } : undefined
    return this.request<T['res']>('get', url, p, config)
  }
}

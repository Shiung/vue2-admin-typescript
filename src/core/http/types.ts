import type { AxiosInstance, Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'option'>

type ApiType<TRes, TReq> = {
  req: TReq & AxiosRequestConfig
  res: TRes
}

export type { AxiosInstance, RequestMethods, AxiosError, AxiosResponse, AxiosRequestConfig, ApiType }

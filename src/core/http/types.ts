import type { AxiosInstance, Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'option'>

export type { AxiosInstance, RequestMethods, AxiosError, AxiosResponse, AxiosRequestConfig }

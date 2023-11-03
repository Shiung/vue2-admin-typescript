import Base from '@core/http/base'
import type { ApiType } from '@core/http/types'
import type * as Type from './types'

import { useUserStoreHook } from '@/stores/user'

const mock = localStorage.getItem('mock') === 'true' || false

class API extends Base {
  constructor() {
    super()
  }

  private configBind(c?: Type.AxiosConfigBind) {
    console.log('before fetch token', useUserStoreHook().token)
    return {
      baseURL: mock ? 'https://dummyjson.com' : '/',
      ...c
    }
  }

  private action_get<T extends ApiType<T['res'], T['req']>>(url: string) {
    return (params: T['req'], c?: Type.AxiosConfigBind) => this.get<T>(url, params, this.configBind(c))
  }

  private action_post<T extends ApiType<T['res'], T['req']>>(url: string) {
    return (data: T['req'], c?: Type.AxiosConfigBind) => this.post<T>(url, data, this.configBind(c))
  }

  // test
  TestFetch = this.action_get<Type.TestActionType.TestFetch>('/products/1')
  TestPost = this.action_post<Type.TestActionType.TestPost>('/products/add')

  // testFetch(params: Type.TestActionType.TestFetch['req'], c?: Type.AxiosConfigBind) {
  //   const config = this.configBind(c)
  //   return this.get<null, Type.TestActionType.TestFetch['res']>('/products/1', params ? { params } : undefined, config)
  // }

  // testPost(data: Type.TestActionType.TestPost['req'], c?: Type.AxiosConfigBind) {
  //   const config = this.configBind(c)
  //   return this.post<Type.TestActionType.TestPost['req'], Type.TestActionType.TestPost['res']>('/products/add', { data }, config)
  // }
}

export default new API()

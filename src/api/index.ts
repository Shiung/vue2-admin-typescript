import Base from '@core/http/base'
import type * as Type from './types'

import { useUserStoreHook } from '@/stores/user'
import { actionTestMapping } from './test'

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

  // test
  [actionTestMapping.TestFetch.name](params: Type.TestActionType.TestFetch['req'], c?: Type.AxiosConfigBind) {
    const config = this.configBind(c)
    return this.get<null, Type.TestActionType.TestFetch['res']>(actionTestMapping.TestFetch.path, params ? { params } : undefined, config)
  }

  [actionTestMapping.TestPost.name](data: Type.TestActionType.TestPost['req'], c?: Type.AxiosConfigBind) {
    const config = this.configBind(c)
    return this.post<Type.TestActionType.TestPost['req'], Type.TestActionType.TestPost['res']>(
      actionTestMapping.TestPost.path,
      { data },
      config
    )
  }

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

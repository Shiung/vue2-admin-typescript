import Base from '@core/http/base'
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

  testFetch(c?: Type.AxiosConfigBind) {
    const config = this.configBind(c)
    return this.get<null, Type.TestFetch['res']>('/products/1', undefined, config)
  }

  testPost(c?: Type.AxiosConfigBind, data?: Type.TestPost['req']) {
    const config = this.configBind(c)
    return this.post<Type.TestPost['req'], Type.TestPost['res']>('/products/add', { data }, config)
  }
}

export default new API()

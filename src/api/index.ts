import Base from '@core/http/base'
import type { ApiType } from '@core/http/types'
import type * as Type from './types'
import config from '@/config'
import { apiPathMap } from './config'

import { useUserStoreHook } from '@/stores/user'
import { getLocalStorage } from '@/utils'

const mock = getLocalStorage('mock') === true

const prefixPath = mock ? 'mockPath' : 'path'

class API extends Base {
  constructor() {
    super()
  }

  private configBind(c?: Type.AxiosConfigBind) {
    const token = useUserStoreHook().token
    return {
      baseURL: mock ? '/' : config.apiUrl,
      ...(!!token && { headers: { Authorization: token } }),
      ...c
    }
  }

  private action_get<T extends ApiType<T['res'], T['req']>>(url: string) {
    return (params?: T['req'], c?: Type.AxiosConfigBind) => this.get<T>(url, params, this.configBind(c))
  }

  private action_get_withPathParams<T extends ApiType<T['res'], T['req']>>(url: string) {
    return (pathParams: string, params?: T['req'], c?: Type.AxiosConfigBind) => {
      const reqExp = new RegExp(':id', 'g')
      const urlPath = mock ? url.split('/:id').join('') : url.replace(reqExp, pathParams)
      return this.get<T>(urlPath, params, this.configBind(c))
    }
  }

  private action_post<T extends ApiType<T['res'], T['req']>>(url: string) {
    return (data: T['req'], c?: Type.AxiosConfigBind) => this.post<T>(url, data, this.configBind(c))
  }

  // auth
  LoginPost = this.action_post<Type.AuthActionType.LoginPost>(apiPathMap.login[prefixPath])
  PermissionManageGet = this.action_get<Type.AuthActionType.UserRoleGroupGet>(apiPathMap.userRoleGroup[prefixPath])
  PermissionManageRoleGroupGet = this.action_get_withPathParams<Type.AuthActionType.UserRoleGroupPermissionGroupGet>(
    apiPathMap.userRoleGroupPermission[prefixPath]
  )

  // test
  TestFetch = this.action_get<Type.TestActionType.TestFetch>('/products/1')
  TestPost = this.action_post<Type.TestActionType.TestPost>('/products/add')
}

export default new API()

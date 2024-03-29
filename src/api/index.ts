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
      // baseURL: mock ? '/' : config.apiUrl,
      // ...(!!token && { headers: { Authorization: token } }),
      // ...c
      baseURL: mock ? '/' : config.apiUrl,
      ...c,
      ...(!!token && { headers: { Authorization: token, ...(c && 'headers' in c && c.headers) } })
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

  private action_put<T extends ApiType<T['res'], T['req']>>(url: string) {
    return (data: T['req'], c?: Type.AxiosConfigBind) => this.put<T>(url, data, this.configBind(c))
  }

  // auth
  LoginPost = this.action_post<Type.AuthActionType.LoginPost>(apiPathMap.login[prefixPath])
  PermissionManageGet = this.action_get<Type.AuthActionType.UserRoleGroupGet>(apiPathMap.userRoleGroup[prefixPath])
  PermissionManageRoleGroupGet = this.action_get_withPathParams<Type.AuthActionType.UserRoleGroupPermissionGroupGet>(
    apiPathMap.userRoleGroupPermission[prefixPath]
  )

  // orders
  OrdersListGet = this.action_get<Type.OrdersActionType.OrdersGet>(apiPathMap.ordersGet[prefixPath])
  TournamentByDateRangeGet = this.action_get<Type.OrdersActionType.TournamentByDateRangeGet>(
    apiPathMap.TournamentByDateRangeGet[prefixPath]
  )
  MatchBzyDateRangeGet = this.action_get<Type.OrdersActionType.MatchByDateRangeGet>(apiPathMap.MatchByDateRangeGet[prefixPath])

  // game
  SportSwitchGet = this.action_get<Type.GamesActionType.SportSwitchGet>(apiPathMap.SportSwitchGet[prefixPath])
  SportSwitchPut = this.action_put<Type.GamesActionType.SportSwitchPut>(apiPathMap.SportSwitchPut[prefixPath])
  SportCidListGet = this.action_get<Type.GamesActionType.SportCidListGet>(apiPathMap.SportCidListGet[prefixPath])
  SportTidListGet = this.action_get<Type.GamesActionType.SportTidListGet>(apiPathMap.SportTidListGet[prefixPath])
  SportLeagueLimitGet = this.action_get<Type.GamesActionType.SportLeagueLimitGet>(apiPathMap.SportLeagueLimitGet[prefixPath])
  SportLeagueLimitPut = this.action_put<Type.GamesActionType.SportLeagueLimitPut>(apiPathMap.SportLeagueLimitPut[prefixPath])

  // test
  TestFetch = this.action_get<Type.TestActionType.TestFetch>('/products/1')
  TestPost = this.action_post<Type.TestActionType.TestPost>('/products/add')
}

export default new API()

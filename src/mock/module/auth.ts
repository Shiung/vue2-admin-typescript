import type { MockMethod } from 'vite-plugin-mock'
import { Random, mock } from 'mockjs'
import type { AuthActionType } from '@/api/types'

import { apiPathMap } from '@/api/config'

export default () => {
  return [
    {
      url: apiPathMap.login.mockPath,
      method: 'post',
      response: (req: any): AuthActionType.LoginPost['res'] => {
        const { operatorName, platformId } = req?.body as AuthActionType.LoginPost['req']
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.login.path
          },
          data: {
            platformId: platformId,
            operatorId: `${platformId}_${operatorName}`,
            roleId: 2,
            token: Random.guid(),
            permissions: [
              'InfoBoardView',
              'InfoBoardTradingVolumeView',
              'InfoBoardNetResultView',
              'InfoBoardUserStatisticView',
              'InfoBoardUnsettledAmountView',
              'OrdersView',
              'NotificationNodeView',
              'ResettleNotificationView',
              'ForecastNodeView',
              'ReportsNodeView',
              'UserManagementNodeView',
              'UserManagementUserListView',
              'UserManagementUserGroupView',
              'UserManagementUserGroupCreate',
              'UserManagementUserGroupUpdate',
              'UserManagementUserGroupDelete',
              'RiskManagementNodeView',
              'RiskManagementNodeBetLimitView',
              'RiskManagementNodeBetLimitUpdate',
              'RiskManagementNodeRestrictUserListView',
              'GameManagementNodeView',
              'GameManagementNodeGameSportSwitchView',
              'GameManagementNodeGameSportSwitchUpdate',
              'GameManagementNodeGameLimitView',
              'GameManagementNodeGameLimitCreate',
              'GameManagementNodeGameLimitUpdate',
              'GameManagementNodeGameLimitDelete',
              'GameManagementNodeGameParlaySettingView',
              'GameManagementNodeGameParlaySettingUpdate',
              'PermissionManagementNodeView',
              'PermissionManagementNodeRoleGroupView',
              'PermissionManagementNodeRoleGroupCreate',
              'PermissionManagementNodeRoleGroupUpdate',
              'PermissionManagementNodeRoleGroupDelete',
              'PermissionManagementNodeOperatorListView',
              'PermissionManagementNodeOperatorListCreate',
              'PermissionManagementNodeOperatorListUpdate',
              'PermissionManagementNodeOperatorListDelete',
              'UserListMarginView',
              'UserListMarginUpdate',
              'UserListInfoView',
              'UserListTransactionView',
              'UserListLimitView',
              'UserListLimitUpdate',
              'UserListNoteView',
              'UserListNoteCreate',
              'UserListNoteDelete',
              'RiskManagementNodeExposureMatchView',
              'UserListExemptionUpdate'
            ]
          }
        }
      },
      timeout: 1000
    },
    {
      url: apiPathMap.userRoleGroup.mockPath,
      method: 'get',
      response: (req: any): AuthActionType.UserRoleGroupGet['res'] => {
        const { query } = req
        const isQueryExist = typeof query === 'object' && Object.keys(query).length > 0
        const fakeData = mock({
          'data|1-1': [
            {
              id: Random.natural(1, 5),
              name: 'admin',
              platformId: 'luxon',
              description: '管理員'
            }
          ]
        })
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.userRoleGroup.path,
            ...(isQueryExist && { query })
          },
          data: [...fakeData.data]
        }
      }
    },
    {
      url: apiPathMap.userRoleGroupPermission.mockPath,
      method: 'get',
      response: (): AuthActionType.UserRoleGroupPermissionGroupGet['res'] => {
        const fakeData = mock({
          'array|1-10': [{ id: Random.natural(1, 100) }]
        })
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: apiPathMap.userRoleGroupPermission.path
          },
          data: [...fakeData.array]
        }
      }
    }
  ] as MockMethod[]
}

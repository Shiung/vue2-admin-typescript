import type { withData } from '../common'

interface LoginPost {
  req: {
    operatorName: string
    password: string
    platformId: string
  }
  res: withData<{
    platformId: string
    operatorId: string
    roleId: number
    token: string
    permissions: Array<string>
  }>
}

interface UserRoleGroupGet {
  req: undefined
  res: withData<
    Array<{
      id: number
      platformId: string
      name: string
      description: string
    }>
  >
}

interface UserRoleGroupPermissionGroupGet {
  req: undefined
  res: withData<Array<{ id: number }>>
}

export type { LoginPost, UserRoleGroupGet, UserRoleGroupPermissionGroupGet }

import { defineStore } from 'pinia'
import { store } from './index'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/windowStorage'

type Info = { roleId: number | null; permissions: Array<string> }

type UserType = {
  token: string
  operator: string
  info: Info
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserType => ({
    token: getLocalStorage('auth')?.token ?? '',
    operator: getLocalStorage('auth')?.operator ?? '',
    info: { roleId: null, permissions: [] }
  }),
  getters: {
    userToken: (state) => state.token,
    operatorName: (state) => {
      const [platform, op] = state.operator?.split('_') ?? []
      return op || platform
    }
  },
  actions: {
    SET_TOKEN(token: string) {
      // this.token = token
    },
    SET_LOGIN({ token, operator, info }: UserType) {
      setLocalStorage('auth', { token, operator, roleId: info.roleId })
      this.token = token
      this.operator = operator
      this.info = {
        roleId: info.roleId,
        permissions: info.permissions
      }
    },
    SET_LOOUT() {
      removeLocalStorage('auth')
      this.token = ''
      this.operator = ''
      this.info = { roleId: null, permissions: [] }
    }
  }
})

export const useUserStoreHook = () => {
  return useUserStore(store)
}

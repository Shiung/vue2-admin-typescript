import { defineStore } from 'pinia'
import type { UserType } from './types'
import { store } from './index'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserType => ({
    token: '123'
  }),
  getters: {
    userToken: (state) => state.token
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    SET_TOKEN(token: string) {
      this.token = token
    }
  }
})

export const useUserStoreHook = () => {
  return useUserStore(store)
}

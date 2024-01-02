import { defineStore } from 'pinia'
import { store } from './index'

export const useSidebarCollapseStore = defineStore({
  id: 'sidebarCollapse',
  state: (): { isCollapse: boolean } => ({
    isCollapse: false
  }),
  getters: {},
  actions: {
    SET_COLLAPSE(v?: boolean) {
      typeof v === 'boolean' ? (this.isCollapse = v) : (this.isCollapse = !this.isCollapse)
    }
  }
})

export const useSidebarCollapseStoreHook = () => {
  return useSidebarCollapseStore(store)
}

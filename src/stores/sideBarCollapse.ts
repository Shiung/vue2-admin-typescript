import { defineStore } from 'pinia'
import { store } from './index'

type SideBarCollapse = {
  isCollapse: boolean
}

export const useSidebarCollapseStore = defineStore({
  id: 'sidebarCollapse',
  state: (): SideBarCollapse => ({
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

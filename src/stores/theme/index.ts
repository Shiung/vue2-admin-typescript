import { defineStore } from 'pinia'
import { store } from '../index'
import { ThemeConf } from '@/styles/theme/config'

type ThemeState = {
  theme: ThemeConf
}

export const useThemeStore = defineStore({
  id: 'themeStore',
  state: (): ThemeState => ({
    theme: ThemeConf.dark
  }),
  getters: {},
  actions: {
    SET_THEME(t: ThemeConf) {
      this.theme = t
    }
  }
})

export const useThemeStoreHook = () => {
  return useThemeStore(store)
}

import { defineStore } from 'pinia'
import { store } from '../index'

type ThemeState = {
  theme: 'dark' | 'light'
}

export const useThemeStore = defineStore({
  id: 'themeStore',
  state: (): ThemeState => ({
    theme: 'dark'
  }),
  getters: {},
  actions: {
    SET_THEME(t: ThemeState['theme']) {
      this.theme = t
    }
  }
})

export const useThemeStoreHook = () => {
  return useThemeStore(store)
}

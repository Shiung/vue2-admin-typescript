import { ref, onMounted, onUnmounted, watch } from 'vue'
import { ThemeConf } from '@/styles/theme/config'
import { setThemeVariable } from '@/styles/theme'

import { useThemeStoreHook } from '@/stores/theme'

const useTheme = () => {
  const theme = ref<ThemeConf>(ThemeConf.dark)
  const store = useThemeStoreHook()

  const media = window.matchMedia('(prefers-color-scheme: dark)')

  const themeChangeHander = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? ThemeConf.dark : ThemeConf.light
    newTheme !== theme.value && (theme.value = newTheme)
  }

  watch(
    () => theme.value,
    (t) => {
      // setThemeVariable(t)
      // store.SET_THEME(t)
      const theme = ThemeConf.light
      setThemeVariable(theme)
      store.SET_THEME(theme)
    },
    { immediate: true }
  )

  onMounted(() => {
    theme.value = media.matches ? ThemeConf.dark : ThemeConf.light
    media.addEventListener('change', themeChangeHander)
  })

  onUnmounted(() => {
    console.log('useTheme *** destory')
    media.removeEventListener('change', themeChangeHander)
  })
}

export default useTheme

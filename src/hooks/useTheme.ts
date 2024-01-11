import { ref, onMounted, onUnmounted, watch } from 'vue'

export enum ThemeConf {
  'dark' = 'dark',
  'light' = 'light'
}

// const media = window.matchMedia('(prefers-color-scheme: dark)')

//   media.addEventListener('change', event => {
//     const newColorScheme = event.matches ? "dark" : "light";
//   console.log('newColorScheme', newColorScheme)
//   })

//   console.log('init', media.matches)

const useTheme = () => {
  const theme = ref<ThemeConf>(ThemeConf.dark)

  const media = window.matchMedia('(prefers-color-scheme: dark)')

  const themeChangeHander = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? ThemeConf.dark : ThemeConf.light
    newTheme !== theme.value && (theme.value = newTheme)
  }

  watch(
    () => theme.value,
    (t, ot) => {
      console.log('useTheme t', t)
      console.log('useTheme ot', ot)
    }
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

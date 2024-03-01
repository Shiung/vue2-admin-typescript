import type { VueConstructor } from 'vue'
import { flattenObj } from '@/utils'
import zhCN from './zhCn'
import enUS from './enUS'

declare module 'vue/types/vue' {
  interface Vue {
    $i18n: (key: string, replace?: { [key in string]: string }) => string
    $i18n_set: (lang: string) => void
  }
}

const flattenMethod = (o: object) => {
  return flattenObj(o)
}
// xx-xxx-xxx as key bind
let i18nMap = flattenMethod(zhCN) as { [key in string]: string }

window.$i18nMap = i18nMap

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$i18n = (key: string, replace?: { [key in string]: string }) => {
      if (key in i18nMap) {
        if (replace && typeof replace === 'object') {
          let returnStr = i18nMap[key]
          Object.entries(replace).forEach(([key, value]) => {
            const reqExp = new RegExp(`{${key}}`, 'g')
            returnStr = returnStr.replace(reqExp, value)
          })
          return returnStr
        }
        return i18nMap[key]
      } else {
        return key
      }
    }
    Vue.prototype.$i18n_set = (lang: string) => {
      switch (lang) {
        case 'en_US': {
          i18nMap = flattenMethod(enUS)
          break
        }
        default:
          i18nMap = flattenMethod(zhCN)
      }
    }
  }
}

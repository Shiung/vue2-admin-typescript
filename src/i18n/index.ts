import type { VueConstructor } from 'vue'
import { flattenObj } from '@/utils'
import zhCN from './zhCn'
import enUS from './enUS'

declare module 'vue/types/vue' {
  interface Vue {
    $i18n: (key: string) => string
    $i18n_set: (lang: string) => void
  }
}

const flattenMethod = (o: object, prefix?: string) => {
  return flattenObj(o)
}

let i18nMap = flattenMethod(zhCN) as { [key in string]: string }

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$i18n = (key: string) => {
      if (key in i18nMap) {
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

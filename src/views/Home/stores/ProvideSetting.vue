<script lang="ts">
import { provide, reactive, readonly } from 'vue'
import type { InjectionKey } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStoreHook } from '@/stores/theme'

type State = {
  language: 'zh_cn' | 'en_us' | 'ja_jp' | 'ko_kr'
  theme: 'dark' | 'light'
  navHeight: number
}

type UpdateHandler = <T extends keyof State>(property: T, value: State[T]) => void

export const SettingStateSymbol: InjectionKey<Readonly<State>> = Symbol('setting state')
export const SettingUpdateSymbol: InjectionKey<UpdateHandler> = Symbol('setting update')

export default {
  props: {
    css: String
  },
  setup() {
    const { theme: storeTheme } = storeToRefs(useThemeStoreHook())
    const state = reactive<State>({
      language: 'en_us',
      theme: 'light',
      navHeight: 0
    })

    provide(SettingStateSymbol, readonly(state))

    const update: UpdateHandler = (property, value) => {
      state[property] = value
    }

    provide(SettingUpdateSymbol, update)

    return { state, storeTheme, providerUpdate: update }
  },
  watch: {
    storeTheme: {
      handler(t) {
        this.providerUpdate('theme', t)
      },
      immediate: true
    }
  }
}
</script>
<template>
  <div id="context-setting" :class="$props.css" :data-lang="state.language" :data-theme="state.theme">
    <slot></slot>
  </div>
</template>

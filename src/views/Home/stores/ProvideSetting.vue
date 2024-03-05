<script lang="ts">
import { provide, reactive, readonly, watch } from 'vue'
import type { InjectionKey } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStoreHook } from '@/stores/theme'
import { ThemeConf } from '@/styles/theme/config'

type State = {
  language: 'zh-cn' | 'en-us' | 'ja-jp' | 'ko-kr'
  theme: ThemeConf
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
      language: 'zh-cn',
      theme: ThemeConf.light,
      navHeight: 0
    })

    provide(SettingStateSymbol, readonly(state))

    const update: UpdateHandler = (property, value) => {
      state[property] = value
    }

    watch(
      () => storeTheme.value,
      (t) => update('theme', t),
      { immediate: true }
    )

    provide(SettingUpdateSymbol, update)

    return { state, storeTheme, providerUpdate: update }
  }
}
</script>
<template>
  <div id="context-setting" :class="$props.css" :data-lang="state.language" :data-theme="state.theme">
    <slot></slot>
  </div>
</template>

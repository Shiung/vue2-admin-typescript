<script lang="ts">
import { provide, reactive, readonly } from 'vue'
import type { InjectionKey } from 'vue'

type State = {
  language: 'zh_cn' | 'en_us' | 'ja_jp' | 'ko_kr'
  theme: 'dark' | 'light'
}

type UpdateHandler = <T extends keyof State>(property: T, value: State[T]) => void

export const SettingStateSymbol: InjectionKey<Readonly<State>> = Symbol('setting state')
export const SettingUpdateSymbol: InjectionKey<UpdateHandler> = Symbol('setting update')

export default {
  setup() {
    const state = reactive<State>({
      language: 'en_us',
      theme: 'light'
    })

    provide(SettingStateSymbol, readonly(state))

    const update: UpdateHandler = (property, value) => {
      state[property] = value
    }

    provide(SettingUpdateSymbol, update)

    return { state }
  }
}
</script>
<template>
  <div id="context-setting" class="h-full" :data-lang="state.language" :data-theme="state.theme">
    <slot></slot>
  </div>
</template>

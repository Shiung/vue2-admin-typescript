<script lang="ts">
import { provide, reactive, readonly, toRefs } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export type State = {
  language: string
  theme: string
}

type UpdateHandler = (property: keyof State, value: string) => void

export const SettingStateSymbol: InjectionKey<Readonly<State>> = Symbol('setting state')
export const SettingUpdateSymbol: InjectionKey<UpdateHandler> = Symbol('setting update')

export default {
  setup() {
    const state = reactive<State>({
      language: 'en',
      theme: 'light'
    })

    // provide(SettingStateSymbol, toRefs(readonly(state)))
    provide(SettingStateSymbol, readonly(state))

    const update = (property: keyof State, value: string) => {
      state[property] = value
    }

    provide(SettingUpdateSymbol, update)

    return { state }
  }
  // render() {
  //   return this.$slots.default()
  // }
}
</script>
<template>
  <div id="context-setting" :data-lang="state.language" :data-theme="state.theme">
    <slot></slot>
  </div>
</template>

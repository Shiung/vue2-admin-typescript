<script lang="ts" setup>
import { ref } from 'vue'

type Props = {
  cusCss?: string
}

const isShow = ref<boolean>(false)

withDefaults(defineProps<Props>(), {
  cusCss: ''
})

const clickOutsideHandler = () => {
  isShow.value = false
}
</script>

<template>
  <div :class="cusCss" class="flex items-center justify-center relative hover:shadow-sm">
    <div id="selector-click-block" class="cursor-pointer absolute w-full h-full z-10" @click.stop.self="isShow = !isShow" />
    <slot name="label">
      <span>label</span>
    </slot>
    <slot name="arrow" :show="isShow"></slot>

    <div v-if="isShow" v-click-outside="{ fn: clickOutsideHandler }" class="dropDown">
      <div id="selector-poper-arrow" class="trangle"></div>
      <slot name="dropDown" :callBack="() => (isShow = false)">
        <span>drop down</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropDown {
  min-width: 100px;
  min-height: 50px;
  background-color: white;
  position: absolute;
  right: 0;
  bottom: -7px;
  transform: translateY(100%);
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  padding: 10px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.trangle {
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  position: absolute;
  top: -6px;
  right: 10px;
  border-width: 6px;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  &::after {
    content: '';
    border-width: 6px;
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #fff;
  }
}
</style>

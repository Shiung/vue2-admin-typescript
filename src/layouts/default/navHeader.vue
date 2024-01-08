<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'

export default defineComponent({
  name: 'navHeaderComp',
  data() {
    return {
      vm: this
    }
  },
  computed: {
    ...mapState(useSidebarCollapseStore, ['isCollapse'])
  },
  methods: {
    ...mapActions(useSidebarCollapseStore, ['SET_COLLAPSE']),
    collapseHandler() {
      this.SET_COLLAPSE()
    }
  },
  mounted() {
    console.log('mounted navHeader layout')
  }
})
</script>

<template>
  <div class="bg-white h-[50px] text-primary sticky top-0 z-10 flex justify-between items-center p-2">
    <div class="cursor-pointer text-[20px]" @click="collapseHandler">
      <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
    </div>
    <div>nav header</div>
  </div>
</template>

<!-- <style scoped lang="scss">

</style> -->

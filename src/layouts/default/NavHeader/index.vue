<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useSidebarCollapseStore } from '@/stores/sideBarCollapse'

import UserCard from './components/UserCard.vue'

export default defineComponent({
  name: 'navHeaderComp',
  data() {
    return {
      vm: this
    }
  },
  components: {
    UserCard
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
    console.log('clickOutside mounted navHeader layout')
  },
  destroyed() {
    console.log('clickOutside navHeader unmounted')
  }
})
</script>

<template>
  <div class="bg-white sticky top-0 z-10">
    <div class="h-[50px] flex justify-between items-center text-primary p-2 shadow-sm">
      <div class="cursor-pointer text-[20px]" @click="collapseHandler">
        <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
      </div>
      <!-- <div>nav header</div> -->
      <UserCard />
    </div>

    <portal-target name="historyTabDom" />
  </div>
</template>

<!-- <style scoped lang="scss">

</style> -->

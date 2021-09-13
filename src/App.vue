<template>
  <router-view #="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const getLabelList = () => store.dispatch('label/getLabelList')
    getLabelList()
  },
})
</script>

<style lang="scss" scoped>
</style>
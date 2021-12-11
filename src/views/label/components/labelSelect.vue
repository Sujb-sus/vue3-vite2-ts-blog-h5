<script setup lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const emit = defineEmits(['changeLabel'])
const labelList = store.getters['label/labelList']

let activeIndex = ref(-1)
let labelName = ref('')

// 选择label类别
// index的类型有可能是 string | number | symbol，不能写 number，打包编译会报错
const handleLabel = (index: any, label: string) => {
  labelName.value = activeIndex.value === index && labelName.value ? '' : label
  activeIndex.value = index
  emit('changeLabel', labelName)
}
</script>

<template>
  <div class="label-box">
    <div
      class="label-text"
      :class="{ 'label-text__active': activeIndex === index && labelName }"
      :style="{
        backgroundColor:
          activeIndex === index && labelName ? item.bgColor : '#fff',
      }"
      v-for="(item, index) in labelList"
      :key="item.label"
      @click="handleLabel(index, item.label)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.label-box {
  overflow-x: auto;
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 99;
  height: 44px;
  background-color: #fff;
  padding: 6px 16px 0;
  @include flex(flex-start);
  &::-webkit-scrollbar {
    display: none;
  }
  .label-text {
    flex-shrink: 0;
    margin: 4px;
    box-sizing: border-box;
    font-size: 14px;
    color: $subFontColor;
    border: 1px solid #d8dce5;
    border-radius: 12px;
    padding: 4px 8px;
  }
  .label-text__active {
    color: #fff;
    border: none;
  }
}
</style>
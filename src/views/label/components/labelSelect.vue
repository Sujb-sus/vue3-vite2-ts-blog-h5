<script setup lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue'

const emit = defineEmits(['changeLabel'])
const store = useStore()
const labelList = store.getters['label/labelList']
let activeIndex = ref(-1)
let labelName = ref('')
// index类型可能为number、string、symbol
const handleLabel = (index: any, label: string) => {
  labelName.value = activeIndex.value === index && labelName.value ? '' : label
  activeIndex.value = index
  emit('changeLabel', labelName)
}
</script>

<template>
  <div class="label-body">
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
  </div>
</template>

<style lang="scss" scoped>
.label-body {
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .label-box {
    @include flex(flex-start);
    padding: 12px 16px 0;
    width: max-content;
    .label-text {
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
}
</style>
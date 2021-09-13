<script setup lang="ts">
import LabelSelect from './components/labelSelect.vue'
import List from '@/views/home/components/list.vue'
import { reactive, ref } from 'vue'
import SvgIcon from '@/components/svgIcon'

const params = reactive({
  keyword: '',
  sortBy: '',
  type: '',
  isMobile: true,
})
const changeLabel = (labelName: string) => {
  params.type = labelName
}
let keyword = ref('')
const onSearch = () => {
  params.keyword = keyword.value
}
const onCancel = () => {
  params.keyword = ''
}
</script>

<template>
  <div class="app-container">
    <form action="/">
      <van-search
        v-model="keyword"
        input-align="center"
        :clearable="false"
        :show-action="!!keyword"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <LabelSelect @changeLabel="changeLabel" ref="label"></LabelSelect>
    <van-tabs
      v-model:active="params.sortBy"
      color="#009688"
      title-active-color="#009688"
      title-inactive-color="#595959"
      line-width="24px"
      line-height="2px"
    >
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="推荐" name="level"></van-tab>
      <van-tab title="最新" name="releaseTime"></van-tab>
      <van-tab title="最热" name="pv"></van-tab>
      <van-tab title="最赞" name="likes"></van-tab>

      <List :showTitle="false" :params="params"></List>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  padding-bottom: 50px;
  .van-search {
    padding: 12px 16px 0;
    :deep(.van-search__content) {
      border-radius: 16px;
      input {
        color: $strongFontColor;
        &::placeholder {
          color: $disableFontColor;
        }
      }
    }
  }
  :deep(.van-tabs) {
    .van-tabs__wrap {
      position: relative;
      &::after {
        @include borderZeroPointFive();
      }
    }
  }
}
</style>
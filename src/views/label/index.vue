<script setup lang="ts">
import LabelSelect from './components/labelSelect.vue'
import List from '@/views/home/components/list.vue'
import { reactive, ref } from 'vue'
import SvgIcon from '@/components/svgIcon'

let params = reactive({
  keyword: '',
  sortBy: '',
  type: '',
  isMobile: true,
})
let keyword = ref('')
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
        @search="() => (params.keyword = keyword)"
        @cancel="() => (params.keyword = '')"
      />
    </form>
    <LabelSelect
      @changeLabel="(val) => (params.type = val)"
      ref="label"
    ></LabelSelect>
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
  .van-search {
    padding: 12px 16px 0;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 46px;
    z-index: 99;
    background-color: #fff;
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
      position: fixed;
      top: 90px;
      width: 100vw;
      height: 44px;
      z-index: 99;
      background-color: #fff;
      &::after {
        @include borderZeroPointFive();
      }
    }
  }
}
</style>
<script setup lang="ts">
import {
  apiGetMessageList,
  apiGetReplyCount,
  apiAddMessage,
} from '@/api/message'
import { ref } from 'vue'
import base from '@/utils/base'
import NoData from '@/components/noData'
import CommentEditor from './components/commentEditor.vue'
import CommentList from './components/commentList.vue'
import { commentModel } from '@/models/index'

let replyCount = ref(0)
let total = ref(-1)
let commentList = ref<Array<commentModel>>([])
let loading = ref(false)
let finished = ref(false)
let pageindex = ref(1)
let pagesize = ref(10)
let editorRef = ref() // 引用子组件

// 获取留言列表
const getMessageList = () => {
  return apiGetMessageList({
    pageindex: pageindex.value,
    pagesize: pagesize.value,
  })
    .then((res) => {
      commentList.value = [...commentList.value, ...res?.data?.list]
      total.value = res?.data?.total
      finished.value = pageindex.value * pagesize.value >= total.value
    })
    .finally(() => {
      loading.value = false
    })
}
// 获取回复数量
const getReplyCount = () => {
  return apiGetReplyCount().then((res) => {
    replyCount.value = res?.data[0]?.replyCount
  })
}
// 添加留言
const addMessage = (params: object) => {
  base.showLoading()
  return apiAddMessage(params)
    .then(() => {
      editorRef.value.resetData()
      initData()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      base.hideLoading()
    })
}
// 初始化数据
const initData = () => {
  commentList.value = []
  pageindex.value = 1
  base.showLoading()
  Promise.all([getMessageList(), getReplyCount()])
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      base.hideLoading()
    })
}
initData()
// 滚动加载
const handleLoad = () => {
  pageindex.value++
  getMessageList()
}
</script>

<template>
  <div class="app-container">
    <CommentEditor @submitSuccess="addMessage" ref="editorRef"></CommentEditor>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      :finished-text="total > 10 ? '--我是有底线的--': ''"
      @load="handleLoad"
    >
      <CommentList
        v-if="total > 0"
        :commentList="commentList"
        :total="total"
        :replyCount="replyCount"
        @replySuccess="initData"
      ></CommentList>
    </van-list>
    <NoData v-if="!total"></NoData>
  </div>
</template>

<style lang="scss" scoped>
</style>
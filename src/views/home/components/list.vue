
<script setup lang="ts">
import base from '@/utils/base'
import NoData from '@/components/noData'
import SvgIcon from '@/components/svgIcon'
import { apiGetBlogList, apiUpdateLikes } from '@/api/blog'
import { formatTime, formatNumber } from '@/filters/index'
import useClickLike from '@/useMixin/useClickLike'
import useGetLabelColor from '@/useMixin/useGetLabelColor'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { articleModel } from '@/models/index'

const route = useRouter()
// 父组件传下来的值
interface Props {
  showTitle?: boolean
  params?: object
}
const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  params: undefined,
})
// 点赞逻辑
const { getLikesNumber, getLikesColor, handleLikes } =
  useClickLike(apiUpdateLikes)
// 标签背景色
const { getLabelColor } = useGetLabelColor()

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const hasLoad = ref(false)
const pageindex = ref(1)
const pagesize = ref(10)
const total = ref(0)
let list = ref<Array<articleModel>>([])

// 获取文章列表
const getBlogList = (reload = true) => {
  if (reload) {
    base.showLoading()
  }
  return apiGetBlogList({
    pageindex: pageindex.value,
    pagesize: pagesize.value,
    ...props.params,
  })
    .then((res) => {
      list.value = list.value.concat(res?.data?.list)
      total.value = res?.data?.total
      finished.value = pageindex.value * pagesize.value >= total.value
    })
    .catch((err) => console.log(err))
    .finally(() => {
      hasLoad.value = true
      loading.value = false
      refreshing.value = false
      if (reload) {
        base.hideLoading()
      }
    })
}
getBlogList()
// 监听参数
if (props.params) {
  watch(props.params, () => {
    pageindex.value = 1
    hasLoad.value = false
    loading.value = false
    finished.value = false
    list.value = []
    getBlogList()
  })
}
// 下拉刷新
const onRefresh = () => {
  pageindex.value = 1
  list.value = []
  getBlogList()
}
// 滚动加载
const onLoad = () => {
  if (!refreshing.value) {
    pageindex.value++
    getBlogList(false)
  }
}
// 去详情页
const gotoDetail = (id: string) => {
  route.push({ path: '/article/detail', query: { id } })
}
</script>

<template>
  <div class="list-container" v-if="hasLoad">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-if="total">
      <div class="list-title" v-if="props.showTitle">
        <SvgIcon name="icon-label01"></SvgIcon>
        <span>最新文章</span>
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="--我是有底线的--"
        @load="onLoad"
      >
        <div
          class="list-item"
          v-for="item in list"
          :key="item._id"
          @click.stop="gotoDetail(item._id)"
        >
          <div class="item-content">
            <img :src="item.fileCoverImgUrl" />
            <div class="content-box">
              <div class="content-top">
                <div class="content-title">{{ item.title }}</div>
                <div class="content-desc">{{ item.desc }}</div>
              </div>
              <div class="content-label">
                <div
                  class="label-text"
                  :style="{ backgroundColor: getLabelColor(label) }"
                  v-for="label in item.type"
                  :key="label"
                >
                  {{ label }}
                </div>
              </div>
            </div>
          </div>
          <div class="item-footer">
            <div class="footer-item">
              <SvgIcon name="icon-date02"></SvgIcon>
              <div class="footer-text">
                {{ formatTime(item.releaseTime, 'yyyy-MM-dd') }}
              </div>
            </div>
            <div class="footer-item">
              <SvgIcon name="icon-browse02"></SvgIcon>
              <div class="footer-text">{{ formatNumber(item.pv) }}</div>
            </div>
            <div
              class="footer-item"
              :class="{ 'icon-likes': getLikesColor(item._id) }"
              @click.stop="handleLikes(item._id)"
            >
              <SvgIcon name="icon-like02"></SvgIcon>
              <div class="footer-text">
                {{ formatNumber(getLikesNumber(item._id, item.likes)) }}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <NoData v-else></NoData>
  </div>
</template>

<style lang="scss" scoped>
.list-container {
  min-height: calc(100vh - 150px);
  .list-title {
    padding: 12px 0 8px 16px;
    display: flex;
    align-items: center;
    :deep(.icon) {
      font-size: 18px;
    }
    span {
      font-size: 16px;
      color: $strongFontColor;
      margin-left: 4px;
    }
    position: relative;
    &::after {
      @include borderZeroPointFive(16px, 0, calc(100vw - 32px));
    }
  }
  .list-item {
    padding: 10px 16px;
    position: relative;
    &::after {
      @include borderZeroPointFive(16px, 0, calc(100vw - 32px));
    }
    .item-content {
      display: flex;
      img {
        width: 80px;
        height: 80px;
        margin-right: 8px;
        border-radius: 4px;
        object-fit: cover;
      }
      .content-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .content-top {
          .content-title {
            color: $strongFontColor;
            font-size: 16px;
            @include singleText();
          }
          .content-desc {
            color: $subFontColor;
            font-size: 12px;
            margin: 4px 0;
            @include multiText(2);
          }
        }
        .content-label {
          @include flex(flex-start);
          @include singleText();
          .label-text {
            margin-right: 6px;
            font-size: 12px;
            color: #fff;
            border-radius: 12px;
            padding: 2px 4px;
          }
        }
      }
    }
    .item-footer {
      @include flex(flex-start);
      margin-top: 8px;
      .footer-item {
        @include flex();
        min-width: 80px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          display: flex;
          justify-content: flex-start;
        }
        .footer-text {
          font-size: 12px;
          color: $subFontColor;
          margin-left: 6px;
        }
      }
      .icon-likes {
        color: $warningColor;
        .footer-text {
          color: $warningColor;
        }
      }
    }
  }
}
</style>
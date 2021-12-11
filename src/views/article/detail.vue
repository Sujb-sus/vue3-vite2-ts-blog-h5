<script setup lang="ts">
import base from '@/utils/base'
import { apiGetBlogDetail, apiUpdatePV } from '@/api/blog'
import SvgIcon from '@/components/svgIcon'
import { formatTime, formatNumber } from '@/filters/index'
import useGetLabelColor from '@/useMixin/useGetLabelColor'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { articleModel } from '@/models/index'

const { getLabelColor } = useGetLabelColor()
const route = useRouter()

const id = route.currentRoute.value.query['id']
const detail = ref<articleModel>()
const detailHtml = ref('')

// 获取文章详情
const getBlogDetail = () => {
  base.showLoading()
  return apiGetBlogDetail({ _id: id })
    .then((res) => {
      detail.value = res?.data
      if (detail.value) {
        detailHtml.value = res?.data?.html?.replace(
          /<a /gi,
          `<a target='_blank'`
        )
      }
    })
    .catch((err) => console.log(err))
    .finally(() => base.hideLoading())
}
// 更新浏览量
const updatePV = () => {
  return apiUpdatePV({ _id: id })
    .then(() => {
      getBlogDetail()
    })
    .catch((err) => console.log(err))
}
updatePV()
</script>

<template>
  <div class="detail-content" v-if="detail">
    <div class="detail-body">
      <div class="detail-title">{{ detail.title }}</div>
      <div class="detail-func">
        <div class="func-icon">
          <SvgIcon name="icon-date02"></SvgIcon>
          <div class="box-text">
            {{ formatTime(detail.releaseTime, 'yyyy-MM-dd') }}
          </div>
        </div>
        <div class="func-icon">
          <SvgIcon name="icon-browse02"></SvgIcon>
          <div class="box-text">{{ formatNumber(detail.pv) }}</div>
        </div>
        <div class="func-icon" v-if="detail.auth">
          <SvgIcon name="icon-laborer"></SvgIcon>
          <div class="box-text">
            {{ detail.auth }}
          </div>
        </div>
      </div>
      <div class="detail-main fmt" v-html="detailHtml"></div>
      <div class="detail-label">
        标签：
        <div
          class="box-text label-text"
          :style="{ backgroundColor: getLabelColor(label) }"
          v-for="label in detail.type"
          :key="label"
        >
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-content {
  background-color: #fff;
  padding: 16px;
  padding-bottom: 24px;
  .detail-body {
    .detail-title {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      color: $strongFontColor;
    }
    .detail-func {
      @include flex();
      padding: 16px 0;
      position: relative;
      &::after {
        @include borderZeroPointFive();
      }
      .func-icon {
        color: $subFontColor;
        display: flex;
        align-items: center;
        margin-right: 24px;
        .box-text {
          padding-left: 6px;
          position: relative;
          top: 1px;
          font-size: 14px;
        }
      }
    }
    .detail-main {
      padding: 12px 0;
    }
    .detail-label {
      display: flex;
      align-items: center;
      color: $subFontColor;
      font-size: 14px;
      .box-text {
        padding-left: 6px;
        position: relative;
        top: 2px;
      }
      .label-text {
        padding: 4px 10px;
        color: #fff;
        margin-left: 8px;
        border-radius: 12px;
        font-size: 14px;
        top: 0;
      }
    }
  }
}
</style>
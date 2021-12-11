<script setup lang="ts">
import SvgIcon from '@/components/svgIcon'
import { formatTime } from '@/filters/index'
import { replyItem as replyObj } from '@/models/index'

interface Props {
  reply?: replyObj
}
const props = withDefaults(defineProps<Props>(), {
  reply: undefined,
})

const replyItem = props.reply
</script>

<template>
  <div class="reply-item" v-show="replyItem">
    <div class="item-img" :style="{ color: replyItem.replyHeaderColor }">
      <SvgIcon name="icon-user02"></SvgIcon>
    </div>
    <div class="reply-box">
      <div class="box-content">
        <div class="reply-user">
          <span class="reply-name">{{ replyItem.replyUser }}</span>
          <span class="by-reply-name"> @ {{ replyItem.byReplyUser }}：</span>
        </div>
        <div v-html="replyItem.replyContent" class="reply-content"></div>
      </div>
      <div class="reply-date">
        {{ formatTime(replyItem.replyTime, 'yyyy-MM-dd hh:mm:ss') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reply-item {
  background-color: $baseBackColor;
  padding: 6px 12px;
  margin: 0 16px 0 60px;
  margin-bottom: 6px;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  &:last-child {
    margin-bottom: 0;
  }
  .item-img {
    margin-right: 10px;
    :deep(svg) {
      &.icon {
        font-size: 36px;
      }
    }
  }
  .reply-box {
    flex: 1;
    .box-content {
      .reply-user {
        font-size: 14px;
        line-height: 24px;
        .reply-name {
          color: $warningColor;
          font-weight: bold;
        }
        .by-reply-name {
          color: #595959;
          font-weight: bold;
        }
      }
      .reply-content {
        flex: 1;
        font-size: 14px;
        line-height: 24px;
        color: $subFontColor;
      }
    }
    .reply-date {
      font-size: 12px;
      color: $disableFontColor;
      margin-top: 2px;
      text-align: right;
    }
  }
}
</style>
<script setup lang="ts">
import SvgIcon from '@/components/svgIcon'
import CommentItem from './commentItem.vue'
import { commentModel } from '@/models/index'

interface Props {
  commentList?: Array<commentModel>
  total?: number
  replyCount?: number
}
const props = withDefaults(defineProps<Props>(), {
  commentList: () => [],
  total: 0,
  replyCount: 0,
})
const emit = defineEmits(['replySuccess'])
</script>

<template>
  <div class="comment-list">
    <div class="side-title">
      <SvgIcon name="icon-comment"></SvgIcon>
      <span>{{ props.total }}</span
      >条评论， <span>{{ props.replyCount }}</span
      >条回复
    </div>
    <CommentItem
      v-for="item in props.commentList"
      :key="item._id"
      :item="item"
      @replySuccess="() => emit('replySuccess')"
    >
    </CommentItem>
  </div>
</template>

<style lang="scss" scoped>
.comment-list {
  margin: 0 auto;
  .side-title {
    font-size: 14px;
    padding-bottom: 10px;
    padding-left: 16px;
    color: $strongFontColor;
    position: relative;
    &::after {
      @include borderZeroPointFive(16px, 0, calc(100vw - 32px), $warningColor);
    }
    :deep(svg) {
      margin-right: 4px;
      font-size: 18px;
    }
    span {
      color: $warningColor;
      margin-right: 4px;
    }
  }
}
</style>
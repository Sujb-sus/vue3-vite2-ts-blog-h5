<script setup lang="ts">
import { apiUpdateLikes, apiUpdateReplys } from '@/api/message'
import ReplyItem from './replyItem.vue'
import CommentEditor from './commentEditor.vue'
import SvgIcon from '@/components/svgIcon'
import base from '@/utils/base'
import { ref } from 'vue'
import { formatTime, formatNumber } from '@/filters/index'
import useClickLike from '@/useMixin/useClickLike'
import { commentModel } from '@/models/index'

interface Props {
  item?: commentModel
}
const props = withDefaults(defineProps<Props>(), {
  item: undefined,
})

const { getLikesNumber, getLikesColor, handleLikes } =
  useClickLike(apiUpdateLikes)
const emit = defineEmits(['replySuccess'])
const commentItem = props.item
const colorList = ref([
  '#EB6841',
  '#3FB8AF',
  '#464646',
  '#FC9D9A',
  '#ED8901',
  '#C8C8A9',
  '#83AF9B',
  '#036564',
])

let isEdit = ref(false)
let currentId = ref('')
let byReplyUser = ref('')
let editorRef = ref() // 引用子组件

// 点击回复留言
const handleReply = (id: string, name: string) => {
  isEdit.value = !isEdit.value
  currentId.value = id
  byReplyUser.value = name
}

interface replyObj {
  content: string
  nickname: string
}
// 添加回复
const addReply = (replyItem: replyObj) => {
  const params = {
    _id: currentId.value,
    replyTime: new Date().getTime() + '',
    replyContent: replyItem.content,
    replyUser: replyItem.nickname,
    byReplyUser: byReplyUser.value,
    replyHeaderColor: colorList.value[Math.floor(Math.random() * 7)],
  }
  base.showLoading()
  return apiUpdateReplys(params)
    .then(() => {
      emit('replySuccess')
      editorRef.value.resetData()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      base.hideLoading()
    })
}
</script>

<template>
  <div class="comment-item" v-show="commentItem">
    <div class="comment-part">
      <div class="item-img" :style="{ color: commentItem.headerColor }">
        <SvgIcon name="icon-user03"></SvgIcon>
      </div>
      <div class="item-box">
        <div class="box-title">
          {{ commentItem.nickname }}
          <span>{{
            formatTime(commentItem.createTime, 'yyyy-MM-dd hh:mm')
          }}</span>
        </div>
        <div class="box-content" v-html="commentItem.content"></div>
        <div class="item-icon">
          <div
            class="box-icon"
            :class="{ 'icon-likes': getLikesColor(commentItem._id) }"
            @click.stop="handleLikes(commentItem._id)"
          >
            <SvgIcon name="icon-like02"></SvgIcon>
            <span
              >{{
                formatNumber(getLikesNumber(commentItem._id, commentItem.likes))
              }}
            </span>
          </div>
          <div
            class="box-icon box-reply"
            @click.stop="handleReply(commentItem._id, commentItem.nickname)"
          >
            <SvgIcon name="icon-reply02"></SvgIcon>
            <span>{{ isEdit ? '取消' : '回复' }}</span>
            <span>{{
              commentItem.replyList?.length ? commentItem.replyList?.length : ''
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 回复编辑框 -->
    <CommentEditor
      v-show="isEdit"
      @submitSuccess="addReply"
      ref="editorRef"
    ></CommentEditor>
    <!-- 回复列表 -->
    <div
      v-if="commentItem.replyList && commentItem.replyList.length"
      class="reply-list"
    >
      <ReplyItem
        v-for="(reply, index) in commentItem.replyList"
        :key="reply._id + index"
        :reply="reply"
      ></ReplyItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-item {
  position: relative;
  &::after {
    @include borderZeroPointFive(16px, 0, calc(100vw - 32px));
  }
  .comment-part {
    display: flex;
    align-items: flex-start;
    padding: 12px 16px 8px;
    position: relative;
    .item-img {
      display: flex;
      padding-right: 16px;
      :deep(svg) {
        font-size: 36px;
      }
    }
    .item-box {
      flex: 1;
      .box-title {
        color: $baseFontColor;
        font-size: 14px;
        font-weight: bold;
        span {
          font-size: 12px;
          color: $disableFontColor;
          font-weight: 500;
        }
      }
      .box-content {
        font-size: 14px;
        color: $subFontColor;
        line-height: 24px;
        margin-top: 4px;
      }
      .item-icon {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .box-icon {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: $subFontColor;
          min-width: 90px;
          span {
            font-size: 16px;
            margin-left: 6px;
          }
        }
        .box-reply {
          span {
            &:last-child {
              margin-left: 2px;
              position: relative;
              top: 1px;
            }
          }
        }
        .icon-likes {
          color: $warningColor;
        }
      }
    }
  }
}
.reply-list {
  padding-bottom: 10px;
}
</style>
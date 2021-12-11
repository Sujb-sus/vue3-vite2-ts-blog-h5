<script setup lang="ts">
import { Toast } from 'vant'
import { ref } from 'vue'

// 定义响应父组件的方法
const emit = defineEmits(['submitSuccess'])

const content = ref('')
const nickname = ref('')
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

// 提交留言
const handleSubmit = () => {
  if (!content.value) {
    Toast('内容不能为空')
    return false
  }
  const params = {
    content: content.value,
    nickname: nickname.value,
    createTime: new Date().getTime() + '',
    headerColor: colorList.value[Math.floor(Math.random() * 7)],
  }
  emit('submitSuccess', params)
}
// 重置表单数据
const resetData = () => {
  content.value = ''
  nickname.value = ''
}
// 子组件需要明确使用expose方法暴露出接口之后，才能在父组件获取到接口引用。
// 未暴露接口的情况下，引用的始终是一个空对象。
defineExpose({
  resetData,
})
</script>

<template>
  <div class="edit-container">
    <van-cell-group inset>
      <van-field
        v-model="content"
        rows="2"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="请在此输入内容..."
        show-word-limit
      />
    </van-cell-group>
    <div class="edit-footer">
      <van-field
        v-model="nickname"
        placeholder="你的昵称"
        type="text"
        maxlength="10"
        class="edit-name"
      />
      <button @click="handleSubmit">提交</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-container {
  padding-bottom: 12px;
  .van-cell-group--inset {
    border: 1px solid $baseBorderColor;
    margin: 10px 16px;
    padding: 4px 12px;
    textarea {
      color: $strongFontColor;
      &::placeholder {
        color: $subFontColor;
      }
    }
  }
  .edit-footer {
    @include flex(flex-end);
    padding-right: 16px;
    .edit-name {
      width: 160px;
      border: 1px solid $baseBorderColor;
      border-radius: 12px;
      margin-right: 16px;
      :deep(.van-field__body) {
        input {
          color: $strongFontColor;
          padding-left: 10px;
        }
      }
    }
    button {
      border: none;
      padding: 2px 10px;
      background-color: $baseLinkColor;
      color: #fff;
      font-size: 14px;
      border-radius: 4px;
      font-weight: bold;
    }
  }
}
</style>
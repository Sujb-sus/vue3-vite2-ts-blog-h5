<script setup lang="ts">
</script>

<template>
  <div class="app-container">
    <div class="my-bg">
      <img class="img-avatar" src="@/assets/avatar.png" />
      <img class="img-bg" src="@/assets/bg4.jpg" />
    </div>
    <div class="my-body">
      <div class="my-name">wall | 苏s哈</div>
      <div class="my-job">Web前端工程师</div>
      <div class="my-desc">
        一个热爱篮球与前端技术的95后！20年入行，
        热衷于研究web前端技术，一边工作一边积累经验，分享一些自己整理的笔记和优选文章。
      </div>
    </div>
    <div class="my-footer">
      + 本博客是采用 Vue3.2 + Node14.15 + Vite2.5 + TS4.3
      前后端完全分离模式来搭建，具体的技术栈可在 GitHub 上了解。
      <br />
      + 本博客已开源，源码已上传到
      GitHub。如果觉得该博客对你学习有帮助的，请能给博主点个 Star。
      如果有不清楚的地方，欢迎邮箱来信交流。感谢各位国家栋梁的支持！！！🙏🙏🙏
      <br />+ React Hooks H5版本：
      <a
        href="https://github.com/Sujb-sus/react-hooks-blog-h5"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/Sujb-sus/react-hooks-blog-h5
      </a>
      <br />+ Vue3 Vite H5版本：
      <a
        href="https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5
      </a>
      <br />+ Vue2 Node PC版本：
      <a
        href="https://github.com/Sujb-sus/vue-node-mongodb-blog"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/Sujb-sus/vue-node-mongodb-blog
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  .my-bg {
    height: 150px;
    border-radius: 4px;
    position: relative;
    .img-avatar {
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -50px;
      left: calc(50vw - 50px);
      border-radius: 50%;
      z-index: 99;
    }
    .img-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .my-body {
    margin-top: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .my-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .my-job {
      font-size: 14px;
      color: $mainColor;
    }
    .my-desc {
      font-size: 14px;
      color: $baseFontColor;
      padding: 16px 24px;
      line-height: 24px;
    }
  }
  .my-footer {
    background: $baseBackColor;
    border-radius: 12px;
    margin: 0 16px;
    padding: 12px;
    text-align: left;
    line-height: 24px;
    color: $subFontColor;
    font-size: 14px;
    a {
      color: $baseLinkColor;
      text-decoration: underline;
    }
  }
}
</style>
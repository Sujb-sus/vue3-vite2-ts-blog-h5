<template>
  <div class="intro-container">
    <div class="intro-box">
      <div class="intro-title">WALL-BLOG</div>
      <div class="intro-desc">
        享受编程和技术所带来的快乐<br />Coding Your Ambition
      </div>
    </div>
    <img src="@/assets/cloud-left.png" class="cloud-left" />
    <img src="@/assets/grass-confetti.png" class="grass-confetti" />
  </div>
</template>

<style lang="scss" scoped>
.intro-container {
  background: linear-gradient(to bottom, #c6dde4, #fefeff);
  position: relative;
  width: 100vw;
  overflow: hidden;
  height: 150px;
  .intro-box {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 99;
    .intro-title {
      color: $subFontColor;
      font-family: lato, sans-serif;
      font-size: 24px;
      letter-spacing: 10px;
      margin-top: 0;
      margin-bottom: 0;
      text-shadow: rgb(198, 221, 228) -1px -1px 1px,
        rgb(254, 254, 255) 1px 1px 1px;
    }
    .intro-desc {
      color: $strongFontColor;
      font-weight: 400;
      font-size: 12px;
      padding: 10px 0;
      letter-spacing: 5px;
      text-transform: capitalize;
      margin-top: 0;
      margin-bottom: 0;
      text-shadow: rgb(198, 221, 228) -1px -1px 1px,
        rgb(254, 254, 255) 1px 1px 1px;
    }
  }
  img {
    position: absolute;
    object-fit: contain;
    &.cloud-left {
      left: 0;
      top: 0;
      width: 100vw;
    }
    &.grass-confetti {
      left: -40vw;
      bottom: 0;
    }
  }
}
</style>
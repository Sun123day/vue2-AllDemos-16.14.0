<!-- 网页截图 -->
<template>
  <div class="content">
    <h1>网页截图</h1>
    <el-button
      @click="handleScreenshot"
    >点我截图</el-button>
    <div>下方是截图：</div>
    <img v-if="screenshot" :src="screenshot" alt="截图" class="screen-shot-img" />
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  data() {
    return {
      screenshot: null,
    }
  },
  // 也无法进入到beforeDestroy生命周期钩子函数中  
  // 原因：
  // 在 Vue.js 中，beforeDestroy 是组件生命周期的一个钩子，
  // 它在组件实例销毁之前被调用。
  // 在这个钩子中，您可以执行一些清理操作，
  // 比如解绑事件监听器、取消定时器，将数据属性设置为 null。
  // 对于字符串类型的 Data URL，这并不是必须的，
  // 因为字符串作为原始数据类型会被 JavaScript 的垃圾回收机制自动处理。
  // 然而，对于更复杂的数据结构或资源，
  // 使用 beforeDestroy 钩子进行清理是一个很好的实践。
  // beforeDestroy() {
    // if (this.screenshot) {
      // console.log("进入了销毁")
      // 无法使用.disose()销毁的原因：
      // screenshot是一个字符串（原始数据类型：String/Number/Boolean等）
      // ，不是一个对象，没有方法可以调用，无法使用.dispose()销毁
      // this.screenshot.dispose()
      // this.screenshot = null
    // }
  // },
  methods: {
    async handleScreenshot() {
      const elementToCapture = document.body; // 截取整个页面
      const canvas = await html2canvas(elementToCapture);
      const screenshot = canvas.toDataURL('image/png');
      this.screenshot = screenshot;
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #84c1f6;
  width: 100%;
  height: 100%;
}
.screen-shot-img {
  width: 300px;
}
</style>
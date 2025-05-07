<!-- 根据链接生成二维码 -->
<template>
  <div>
    <h1>根据链接生成二维码</h1>
    <div>
      <h2>qrcode方式生成没有头像的二维码</h2>
      <h2>===》成功</h2>
      <h2>===》更清晰</h2>
      <h2>===》设置多高多宽就是多大多宽</h2>
      <div class="qrcode" ref="qrCodeUrl"></div>
    </div>
    <div>
      <h2>vue-qr方式生成有头像的二维码</h2>
      <h2>===》成功</h2>
      <h2>===》有些模糊</h2>
      <h2>===》不建议logoScale大于0.2，否则会解析失败</h2>
      <!-- <vue-qr :logoSrc="imageUrl" text="https://www.gushiwen.cn/search.aspx?value=%E6%BB%95%E7%8E%8B%E9%98%81%E5%BA%8F&valuej=%E6%BB%95" :size="200"></vue-qr> -->
      <vue-qr 
        :logoSrc="imageUrl" 
        :text="testUrl" 
        :size="200" 
        :margin="0"
        :logoScale="0.2"
      ></vue-qr>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import vueQr from 'vue-qr'
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      // imageUrl: require('./favicon.png')
      imageUrl: require('./hc.png')
      // imageUrl: require('./heixiu.png')
    } 
  },
  mounted() {
    this.creatQrCode();
  },
  computed:{
    testUrl(){
      // return "https://www.gushiwen.cn/search.aspx?value=%E6%BB%95%E7%8E%8B%E9%98%81%E5%BA%8F&valuej=%E6%BB%95"
      return "https://apps.apple.com/us/app/%E5%8D%8E%E5%88%9B%E6%99%BA%E6%85%A7%E8%8A%82%E8%83%BD%E4%BA%91%E5%B9%B3%E5%8F%B0/id6744142892"
      // return "早安喵 午安喵 晚安喵 喵！"
    }
  },
  methods: {
    creatQrCode() {
      const qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.testUrl, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.qrcode {
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: #fff;
  padding: 6px;
  box-sizing: border-box;
}
</style>
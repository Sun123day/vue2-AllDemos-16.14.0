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
      <h2>===》比设置的稍微小些，目前没有找不含内边距的设置</h2>
      <vue-qr :logoSrc="imageUrl" text="https://www.gushiwen.cn/search.aspx?value=%E6%BB%95%E7%8E%8B%E9%98%81%E5%BA%8F&valuej=%E6%BB%95" :size="200"></vue-qr>
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
      imageUrl: require('./favicon.png')
    } 
  },
  methods: {
    creatQrCode() {
      const qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "https://www.gushiwen.cn/search.aspx?value=%E6%BB%95%E7%8E%8B%E9%98%81%E5%BA%8F&valuej=%E6%BB%95", // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
  },
  mounted() {
    this.creatQrCode();
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
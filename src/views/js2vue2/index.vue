<template>
  <div>
    <el-button @click="onChangeColor">
      点我
    </el-button>
    <p id="demo">这里是显示</p>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "#ff0000",
      time: null
    }
  },
  // 设置定时器，每0.3s点一下按钮
  // mounted() {
  //   this.time = setInterval(() => {
  //     this.onChangeColor()
  //   }, 300)
  // },
  // beforeDestroy() {
  //   // 销毁定时器
  //   clearInterval(this.time)
  // },
  methods: {
    onChangeColor() {
      let x = document.getElementById('demo')
      // console.log("document.getElementById('demo')", document.getElementById('demo'))
      if(!x.style.color) {
        x.style.color = this.color
      }
      x.style.color = this.colorRGBtoHex(x.style.color) == this.color ? "rgb(0, 128, 0)" : "#ff0000"
      // console.log(x.style.color == this.color)
    },
    colorRGBtoHex(color) {
      // console.log("color", color)
      const rgb = color.match(/\d+/g)
      // console.log("rgb", rgb)
      if(rgb && rgb.length == 3) {
        const r = parseInt(rgb[0])
        const g = parseInt(rgb[1])
        const b = parseInt(rgb[2])
        const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        // console.log("hex", hex)
        return hex
      }
    }
  },


}
</script>

<style>

</style>
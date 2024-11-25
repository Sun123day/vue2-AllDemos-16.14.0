<template>
  <div class="content">
    <h1>echarts和水球</h1>
    <h2>echarts</h2>
    <NormalPie />
    <h2>水球</h2>
    <WaterBall />
  </div>
</template>

<script>
import NormalPie from './normalPie/index.vue'
import WaterBall from './waterBall/index.vue'
export default {
  components: {
    NormalPie,
    WaterBall
  },

}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
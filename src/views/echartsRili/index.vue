<template>
  <div class="content">
    <h1>echarts和日历结合</h1>
    <div ref="pieEchartRes" style="width: 1000px; height: 600px"></div>
  </div>
</template>

<script>
import { getPieChartOption } from './chartOptions'
import * as echarts from 'echarts'

export default {
  // props: {
  //   tableData: {
  //     type: Array
  //   }
  // },
  data() {
    return {
      mycharts: null,
      // tableData: [
      //   {name: '甲烷', carbon: 500, rate: 50},
      //   {name: '一氧化碳', carbon: 300, rate: 30},
      //   {name: '设备寿命', carbon: 200, rate: 20},
      // ]
    }
  },
  mounted() {
    this.initEcharts()
  },
  // watch: {
  //   tableData: {
  //     handler() {
  //       this.refreshChart()
  //     },
  //     deep: true
  //   }
  // },
  beforeDestroy() {
    if (this.mycharts) {
      this.mycharts.dispose()
      this.mycharts = null
    }
  },
  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.pieEchartRes)
      window.addEventListener('resize', this.autoResize)
      this.autoResize()
      this.refreshChart()
    },
    autoResize() {
      if (this.mycharts) {
        this.mycharts.resize()
      }
    },
    refreshChart() {
      // if (!this.mycharts || !this.tableData) {
      if (!this.mycharts) {
        return
      }
      // const option = getPieChartOption(this.tableData)
      const option = getPieChartOption()
      this.mycharts.setOption(option)
    },
    setHighLight(dataIndex = 0) {
      this.mycharts.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      })
    }
  }
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
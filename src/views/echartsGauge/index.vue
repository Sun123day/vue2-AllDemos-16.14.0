<template>
  <div style="display: flex; align-items: center; justify-content: center;">
    <div class="container">
      <div ref="gaugeEchartRes" style="height: 500px; width: 500px;"></div>
    </div>
  </div>
</template>

<script>
import { getGaugeChartOption } from './chartOptions'
import * as echarts from 'echarts'

export default {
  // props: {
  //   power: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data() {
    return {
      // tableData:{ name: '实时发电功率', value:  this.$props.power || 0, unit: 'kW' },
      tableData:{ name: '实时发电功率', value: 100, unit: 'kW' },
      mycharts: null
    }
  },
  mounted() {
    this.initEcharts()
  },
  // watch: {
  //   power: {
  //     handler(newVal) {
  //       this.tableData.value = newVal || 0
  //     },
  //   },
  //   tableData: {
  //     handler() {
  //       this.refreshChart()
  //     },
  //     deep: true
  //   },
  // },
  beforeDestroy() {
    if (this.mycharts) {
      this.mycharts.dispose()
      this.mycharts = null
    }
  },
  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.gaugeEchartRes)
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
      if (!this.mycharts || !this.tableData) {
        return
      }
      const option = getGaugeChartOption(this.tableData)
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
.container {
  background-color: #001439;
  width: 1200px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
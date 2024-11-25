<template>
  <div ref="pieEchartRes" style="width: 260px; height: 260px"></div>
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
      tableData: [
        {name: '甲烷', carbon: 500, rate: 50},
        {name: '一氧化碳', carbon: 300, rate: 30},
        {name: '设备寿命', carbon: 200, rate: 20},
      ]
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
      if (!this.mycharts || !this.tableData) {
        return
      }
      const option = getPieChartOption(this.tableData)
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
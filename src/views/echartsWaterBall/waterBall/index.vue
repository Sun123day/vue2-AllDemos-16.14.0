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
        {name: '甲烷', value: 500, rate: 0.5, ratePercent: 50},
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
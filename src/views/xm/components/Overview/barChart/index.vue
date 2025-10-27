<template>
  <div ref="barEchartRes" style="width: 100%;height: 100%;" />  
</template>


<script>
import { getBarChartOption } from './chartOptions'
import * as echarts from 'echarts'
export default {
  // props: {
  //   barData: {
  //     type: Array
  //   },
  // },
  data() {
    return {
      mycharts: null,
      barData: [
        {name: '景色评分', value: 5},
        {name: '价格评分', value: 3},
        {name: '设施评分', value: 4},
        {name: '服务评分', value: 4},
        {name: '推荐评分', value: 4},
      ]
    }
  },
  mounted() {
    this.initEcharts()
  },
  watch: {
    barData: {
      handler() {
        this.refreshChart()
      },
      deep: true
    },
  },
  beforeDestroy() {
    if (this.mycharts) {
      this.mycharts.dispose()
      this.mycharts = null
    }
  },
  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.barEchartRes)
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
      if (!this.mycharts || !this.barData) {
        return
      }
      const option = getBarChartOption(this.barData)

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

<style>

</style>
<template>
  <div ref="pieEchartRes" style="width: 100%;height: 100%;" />
</template>

<script>
import { getPieChartOption } from './chartOptions'
import * as echarts from 'echarts'

export default {
  props: {
    // pieData: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      mycharts: null,
      pieData: [
        ['好评', '3000', '30'],
        ['中评', '5000', '50'],
        ['差评', '2000', '20'],
      ],
    }
  },
  mounted() {
    this.initEcharts()
  },
  watch: {
    pieData:{
      handler(){
        this.refreshChart()
      },
      deep: true
    }
  },
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
      this.updatePieData(); // 初始化时也更新数据
    },
    autoResize() {
      if (this.mycharts) {
        this.mycharts.resize()
      }
    },
    updatePieData() {
      this.refreshChart(); // 更新后刷新图表
    },
    refreshChart() {
      if (!this.mycharts || !this.pieData) {
        return
      }
      const option = getPieChartOption(this.pieData)
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

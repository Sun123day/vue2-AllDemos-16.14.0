<template>
  <div style="display: flex; justify-content: center; align-items: center;">
      <div id="mapID" style="width: 840px; height: 620px" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { mapState } from "vuex";

export default {
  data() {
      return {
          chart: null,
          rotate: 0,
      }
  },
  created() {
      // this.unwatch=this.$watch(()=>this.energyAmountData,
      // (newValue={})=>{
      //     this.totalData=newValue
      // })
  },
  watch: {

  },
  computed:{
      // ...mapState({
      //     energyAmountData: (state) => state.cockpit.energyAmountData
      // }),
      areaList(){
         let list = [
             { name: '中西区', value: 0 },
             { name: '湾仔', value: 0 },
             { name: '东区', value: 0 },
             { name: '南区', value: 0 },
             { name: '油尖旺', value: 0 },
             { name: '深水埗', value: 0 },
             { name: '九龙城', value: 0 },
             { name: '黄大仙', value: 0 },
             { name: '观塘', value: 0 },
             { name: '葵青', value: 0 },
             { name: '荃湾', value: 0 },
             { name: '屯门', value: 0 },
             { name: '元朗', value: 0 },
             { name: '北区', value: 0 },
             { name: '大埔', value: 0 },
             { name: '沙田', value: 0 },
             { name: '西贡', value: 0 },
             { name: '离岛', value: 0 }
         ] 
         return list
      }
  },
  mounted() {
      this.$nextTick(() => {
          this.chart = echarts.init(document.getElementById('mapID'))
          this.initChart()
      })
  },
  beforeDestroy() {
      if (!this.chart) {
          return
      }
      this.chart.dispose()
      this.chart = null
  },
  methods: {
      initChart() {

          this.chart.showLoading();
          fetch('map.json').then(response => response.json()).then((geoJson) => {
          
              this.chart.hideLoading();

              echarts.registerMap('HK', geoJson);

              this.chart.setOption({
                  tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                          return `
                          <div style="
                              width: 245px;
                              height: 143px;
                              background: rgba(0,35,92,0.9);
                              border-radius: 6px;
                              border: 1px solid;
                              padding: 10px;
                              box-sizing: border-box;
                          ">
                              <div style="
                                  height: 24px;
                                  font-family: PingFang SC, PingFang SC;
                                  font-weight: bold;
                                  font-size: 16px;
                                  color: #FFFFFF;
                                  line-height: 12px;
                                  text-align: left;
                                  font-style: normal;
                                  text-transform: none;
                                  border-bottom: 1px solid #0263B2;
                              ">${params.name}商场</div>
                              <div style="display: flex;padding: 10px 0;">
                                  <img style="width: 90px;height: 90px;margin-right: 6px;" src="https://ai-public.mastergo.com/ai/img_res/97ab259082099b307db7eb771612b53a.jpg" alt="">
                                  <div style="
                                      font-family: PingFang SC, PingFang SC;
                                      font-weight: 400;
                                      font-size: 10px;
                                      color: #FFFFFF;
                                      line-height: 12px;
                                      text-align: left;
                                      font-style: normal;
                                      text-transform: none;
                                  ">
                                      <div style="margin-bottom: 9px;">项目地址：${params.name}</div>
                                      <div style="margin-bottom: 9px;">建筑面积：${params.value} m³</div>
                                      <div style="margin-bottom: 9px;">项目设备：${Math.floor(params.value / 16 )}台</div>
                                      <div >数据监控：${Math.floor(params.value / 25 )}个</div>
                                  </div>
                              </div>
                          </div>`;
                      },
                      backgroundColor: 'transparent', // 修改为灰色背景
                      borderColor: 'transparent', // 修改边框颜色为灰色
                      borderWidth: 0, // 设置边框宽度为1像素
                      borderRadius: 4 // 设置圆角为4像素
                  },
                  layoutCenter: ['50%', '50%'],
                  layoutSize: '110%',
                  visualMap: {
                      show: false,
                      // min: 800,
                      // max: 50000,
                      // text: ['High', 'Low'],
                      // realtime: false,
                      // calculable: true,
                      inRange: {
                          color: ['#0077fd']
                      }
                  },
                  series: [
                      {
                          name: '香港18区人口密度',
                          type: 'map',
                          mapType: 'HK', // 自定义扩展图表类型
                          label: {
                              show: true,
                              textStyle: {
                                  color: '#FFFFFF'
                              }
                          },
                          data: this.areaList,
                          // 自定义名称映射
                          nameMap: {
                              'Central and Western': '中西区',
                              'Eastern': '东区',
                              'Islands': '离岛',
                              'Kowloon City': '九龙城',
                              'Kwai Tsing': '葵青',
                              'Kwun Tong': '观塘',
                              'North': '北区',
                              'Sai Kung': '西贡',
                              'Sha Tin': '沙田',
                              'Sham Shui Po': '深水埗',
                              'Southern': '南区',
                              'Tai Po': '大埔',
                              'Tsuen Wan': '荃湾',
                              'Tuen Mun': '屯门',
                              'Wan Chai': '湾仔',
                              'Wong Tai Sin': '黄大仙',
                              'Yau Tsim Mong': '油尖旺',
                              'Yuen Long': '元朗'
                          }
                      }
                  ]
              });
          });
      },
  },
}
</script>

<style scoped>
#mapID {
  /* width: 600px;
  height: 400px; */
  width: 840px;
  height: 620px;
}
</style>

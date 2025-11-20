<!-- 近12月能耗 -->
<template>
    <div style="margin: 0 auto">
        <!-- <Echarts :option="option" id="barChart" :width="'500px'" :height="'260px'"/> -->
        <Echarts :option="computedOption" id="barChart" :width="'500px'" :height="'260px'" style="margin: 0 auto"/>
    </div>
</template>

<script>
import Echarts from '../../echarts/charts.vue'
import { barChart } from '../../mock.js'
import { getBarChartOption } from '../../mockFunction.js'
import store from '@/store'
import { mapState } from "vuex";

export default {
    components: {
        Echarts
    },
    props: {
    },
    data() {
        return {
            chart: null,
            rotate: 0,
            option: barChart,
            // list:[
            //     {time: '2025-01', value: 100},
            //     {time: '2025-02', value: 200},
            //     {time: '2025-03', value: 300},
            //     {time: '2025-04', value: 400},
            //     {time: '2025-05', value: 500},
            //     {time: '2025-06', value: 600},
            //     {time: '2025-07', value: 700},
            //     {time: '2025-08', value: 800},
            //     {time: '2025-09', value: 900},
            //     {time: '2025-10', value: 1000},
            //     {time: '2025-11', value: 1100},
            //     {time: '2025-12', value: 1200},
            // ],
            timer: null,
            resData:[]
        }
    },
    created() {
        this.requestData()
        this.unwatch = this.$watch(
            () => this.energyMonths,
            (newValue) => {
                this.resData = [...newValue]; // 使用展开运算符创建一个新数组
            },
            { deep: true } // 添加 deep: true 以便深度监听对象或数组的变化
        );
    },
    computed: {
        ...mapState({
            energyMonths: (state) => state.cockpit.energyMonths
        }),
        list(){
            if(this.resData && this.resData.length > 0){
                // console.log(this.resData)
                return this.resData
            } else {
                return []
            }
        },
        computedOption(){
            return getBarChartOption(this.list, this.textList);
        },
        legend1(){
            return this.$store.state.language == 'zh'? '实际能耗' : '實際能耗' 
        },
        legend2(){
            return this.$store.state.language == 'zh'? '预测能耗' : '預測能耗' 
        },
        hoverTitle1(){
            return this.$store.state.language == 'zh'? '时间' : '時間' 
        },
        textList(){
            return [
                this.legend1,
                this.legend2,
                this.hoverTitle1
            ]
        }
    },
    watch: {

    },
    mounted() {
      // 每分钟请求一次数据
      this.timer = setInterval(() => {
          this.requestData()
      }, 5 * 60000)
    },
    beforeDestroy() {
      // 组件销毁前清除定时器
      clearInterval(this.timer);
    },
    methods: {
      requestData() {
        //   console.log("re")
          store.dispatch('cockpit/ENERGY_MONTHS_ACTION', {

          }) 
      }
    },
}
</script>

<style scoped></style>

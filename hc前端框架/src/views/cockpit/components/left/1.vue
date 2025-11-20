<!-- 空调节能效益 -->
<template>
    <div>
        <div class="aiK">
            <p>{{ getYear }}年</p>
            <div class="aiK-image">
                <img src="../../image/Group 326.png" alt="">
            </div>
        </div>
        <div class="echbox_t">
            <div class="echBox" style="margin: 0 auto">
                <!-- <Echarts :option="option" id="meter1" :width="'165px'" :height="'165px'" />
                <Echarts :option="option" id="meter2" :width="'165px'" :height="'165px'" /> -->
                <Echarts :option="computedOption1" id="meter1" :width="'165px'" :height="'165px'" />
                <Echarts :option="computedOption2" id="meter2" :width="'165px'" :height="'165px'" />
            </div>
           <div class="echBox">
            <p>{{ech1}}(kW·h)</p> 
            <p>{{ech2}}(tCO₂)</p>
           </div>
        </div>
    </div>
</template>

<script>
import Echarts from '../../echarts/charts.vue'
import { meterOption } from '../../mock.js'
import { getMeterOption1, getMeterOption2 } from '../../mockFunction.js'
import { getChartOption } from './chartOptions1.js'
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
            option: meterOption,
            // electricity: 66666,
            // carbon: 50000,
            timer: null,
            resData:{}
        }
    },
    created() {
        this.requestData()
        this.unwatch=this.$watch(()=>this.saveEnergy,
        (newValue={})=>{
            this.resData=newValue
        })
    },
    computed:{
        ...mapState({
            saveEnergy: (state) => state.cockpit.saveEnergy
        }),
        electricity() {
            if(this.resData && this.resData.energy){
                return this.resData.energy
            } else {
                return 0
            }
        },
        carbon() {
            if(this.resData && this.resData.carbon){
                return this.resData.carbon
            } else {
                return 0
            }
        },
        ech1(){
            return this.$store.state.language == 'zh'? '本年预计节能' : '本年預計節能'
        },
        ech2(){
            return this.$store.state.language == 'zh'? '本年预计减碳' : '本年預計減碳'
        },
        getYear(){
            return new Date().getFullYear()
        },
        computedOption1(){
            // return getChartOption(this.electricity) 
            return getMeterOption1(this.electricity) 
        },
        computedOption2(){
            // return getChartOption(this.carbon) 
            return getMeterOption2(this.carbon) 
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
          store.dispatch('cockpit/SAVE_ENERGY_ACTION', {

          }) 
      }
    },
}
</script>

<style scoped lang="scss">
.echbox_t{
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 15px;
    color: #57FFE7;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    
    p{
        width: 165px;
        text-align: center;
    }
}
.echBox {
    display: flex;
    justify-content: space-evenly;
}

.aiK {
    position: relative;
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 14px;
    color: #20D7FF;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    display: flex;
    justify-content: center;
    margin: 36px 0 12px 0;

    p {
        position: absolute;
        left: 050%;
        line-height: 42px;
        transform: translateX(-65%)
    }
    .aiK-image {
        display: flex;
        justify-content: center;
        img {
            // width: 95%;
            height: 45px;
            text-align: center;
        }
    }
}
</style>

<!-- 累计用能 -->
<template>
    <div class="boxContainer">
        <div class="title">{{title}}</div>
        <div class="box">
            <div v-for="(item, index) in consumeValueCC" :key="index" class="numBox">{{ item }}</div>
            <div class="box-unit">{{ unit }}</div>
        </div>
        <div class="subtitle">
            <div >
                <div style="margin: 20px 0 10px;"> {{ electircity }} <span class="subtitle-unit">kW·h</span></div>
                <div class="subtitle-num">{{ yearValue }}</div>
            </div>
            <div style="margin-left: 12px;">
                <div style="margin: 20px 0 10px;"> {{ carbon }} <span class="subtitle-unit">tCO₂</span></div>
                <div class="subtitle-num">{{ annualCarbonEmissions }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import { mapState } from "vuex";
export default {
    components: {
    },
    props: {
    },
    data() {
        return {
            timer: null,
            // consumeValue: 4930800,
            // yearValue: 164.360,
            // annualCarbonEmissions: 19.653,
            resData:{}
        }
    },
    created() {
        this.requestData()
        this.unwatch=this.$watch(()=>this.totalEnergy,
        (newValue={})=>{
            this.resData=newValue
        })
    },
    computed:{
        ...mapState({
            totalEnergy: (state) => state.cockpit.totalEnergy
        }),
        title() {
            return this.$store.state.language == 'zh'? '空调累计用能' : '空調累計用能' 
        },
        electircity() { 
            return this.$store.state.language == 'zh'? '项目年度用能' : '項目年度用能' 
        },
        carbon() { 
            return this.$store.state.language == 'zh'? '项目年度碳排' : '項目年度碳排' 
        },
        consumeValue() {
            if(this.resData && this.resData.totalEnergy){
                return this.resData.totalEnergy
            } else {
                return 0
            }
        },
        yearValue() {
            if(this.resData && this.resData.yearEnergy){
                return this.resData.yearEnergy
            } else {
                return 0
            }
        },
        annualCarbonEmissions() {
            if(this.resData && this.resData.yearCarbon){
                return this.resData.yearCarbon
            } else {
                return 0
            }
        },
        consumeValueCC() {
            // let val = this.consumeValue + ''  
            
            // return val.slice(0, 3) + ',' + val.slice(3);

            let num = this.consumeValue;
            
            // 判断是否大于 100 万，进行相应的处理
            if (num >= 1000000) {
                num = num / 10000; // 转换为万
                let val =  Math.floor(num).toString() + ''; // 格式化并返回
                // 补充0直到至少6位
                while (val.length < 6) {
                    val = '0' + val; // 在前面补充0
                }
                return val.slice(0, 3) + ',' + val.slice(3)
            } else {
                let val = num.toString() + ''; // 直接格式化小于 100 万的值
                // 补充0直到至少6位
                while (val.length < 6) {
                    val = '0' + val; // 在前面补充0
                }
                return val.slice(0, 3) + ',' + val.slice(3)
            }
        },
        unit() {
            // 如果值大于等于100万，单位显示“万kW·h”
            // return this.consumeValue >= 1000000 ? '万kW·h' : 'kW·h';
            return this.consumeValue >= 1000000 ? this.$store.state.language == 'zh'? '万kW·h' : '萬kW·h' : 'kW·h';
        }
    },
    watch: {

    },
    mounted() {
      this.timer = setInterval(() => {
          this.requestData()
      }, 5 * 60000)
    },
    beforeDestroy() {
        // 组件销毁前清除定时器
        clearInterval(this.timer);
    },
    methods: {
        
        // 格式化数字，每3位添加一个逗号
        formatNumber(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        requestData() {
            store.dispatch('cockpit/TOTAL_ENERGY_ACTION', {

            }) 
        }
    },
}
</script>

<style scoped lang="scss">
.boxContainer {
    width: 550px;
    height: 210px;
    position: absolute;
    inset: 0;
    margin: 30px auto 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .box {
        margin-left: 28px;
        display: flex;
        justify-content: space-between;
        .box-unit {
            margin-left: 8px;
            font-weight: 400;
            font-size: 14px;
            color: #ffffffba;
            line-height: 25px;
            text-align: left;
            font-style: normal;
            text-transform: none;margin-top: 53px; 
        }
    }

    .title {
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 25px;
        color: #FFFFFF;
        line-height: 25px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-bottom: 20px;
        text-align: center;
    }

    .subtitle {
        margin-left: 62px;

        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 19px;
        color: #FFFFFF;
        line-height: 25px;
        text-align: left;
        font-style: normal;
        text-transform: none;

        display: flex;
        justify-content: space-between;
        // padding: 0 10px;
        padding: 0 20px;

        .subtitle-unit {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 19px;
            color: #ffffffba;
            line-height: 25px;
            text-align: left;
            font-style: normal;
            text-transform: none;
        }
        .subtitle-num {
            width: 248px;
            font-family: PingFang SC, PingFang SC;
            font-weight: bold;
            font-size: 31px;
            color: #FFFFFF;
            line-height: 36px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            word-wrap: break-word; /* 强制换行 */
            word-break: break-word; /* 强制换行 */
            white-space: normal; /* 确保正常换行 */
        }
    }

    .numBox {
        width: 57px;
        height: 73px;
        background: linear-gradient(180deg, #005FA2 0%, #031E66 100%);
        box-shadow: inset 0px 0 8px 0px #0089DB;
        border-radius: 0px 0px 0px 0px;
        border: 1px solid;
        border-image: linear-gradient(360deg, rgba(65, 128, 221, 1), rgba(35, 98, 191, 1), rgba(149, 218, 255, 1)) 1 1;

        font-family: DINPro, DINPro;
        font-weight: 500;
        font-size: 64px;
        color: #FFFFFF;
        line-height: 49px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        text-align: center;
        line-height: 70px;

    }
}
</style>

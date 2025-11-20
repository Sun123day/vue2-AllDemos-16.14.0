

<template>
    <div style="margin: 0 auto">
        <p class='title'>{{ computedProjectName }}</p>
        <Echarts 
            :option="computedOption" 
            :id="'meterup-' + computedProjectId" 
            :width="'400px'" 
            :height="'240px'"  
            style="margin: 0 auto"
        />
        <p class='subtitle'>{{subtitle}}</p>
        <div class="aiK">
            <p :style="{color: projectStatus == 'ai' ? '#20D7FF' : '#F28911'}">{{ computedStatus }}</p>
            <div class="aiK-image">
                <img src="../../image/Group 326.png" alt="">
            </div>
        </div>

        <div style="display: flex; justify-content: center;">
            <div class="box">
                <div v-for="(item, index) in computedBoxData" :key="index" class="item_box">
                    <div class="image">
                        <img :src="item.img" alt="" style="width: 100%;">
                        <!-- <p class="numberF">{{ item.key }}</p> -->
                    </div>
                    <div class="info">
                        <p 
                            v-for="(it, infoIndex) in item.info" 
                            :class="`info_item_${infoIndex}`" 
                            :key="infoIndex"
                        >
                            {{ it.name }}:{{ it.value }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Echarts from '../../echarts/charts.vue'
import { codeTable } from '../../mock.js'
import { getCodeTableOption } from '../../mockFunction.js'
import store from '@/store'
import { mapState } from "vuex";
export default {
    components: {
        Echarts
    },
    props: {
        projectStatus: {
            type: String,
            default: 'ai',
        },
        projectItem: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {
            option: codeTable,
        }
    },
    created() {
    },
    computed: {
        subtitle() {
           return this.$store.state.language == 'zh'? '机房总功率' : '机房總功率' 
        },
        computedProjectId() {
            return this.projectItem?.projectId || ''
        },
        computedProjectName(){
            return this.projectItem?.projectName || ''
        },
        computedStatus() {
            let status = ''
            if (this.projectStatus == 'ai') {
                status = this.$store.state.language == 'zh' ? 'AI寻优控制中' : 'AI優化控制中'
            } else {
                status = this.$store.state.language == 'zh' ? '本地站控中' : '本地站控中'
            }
            return status
        },
        computedOption() {
            return getCodeTableOption(this.projectItem?.totalPower || 0)
        },
        computedBoxData(){
            let list = [
                {
                    img: require('../../image/Group 447.png'),
                    info: [
                    {
                        name: this.$store.state.language == 'zh' ? '冷机开启数量' : '冷機開啟數量',
                        value: this.cooler || 0
                    },
                    {
                        name: this.$store.state.language == 'zh' ? '实时冷量(kW)' : '即時冷量(kW)',
                        value: this.actualCool || 0
                    },
                    {
                        name: this.$store.state.language == 'zh' ? '冷机总功率(kW)' : '冷機總功率(kW)',
                        value: this.coolPower || 0
                    },
                    ]
                }, 
                {
                    img: require('../../image/Group 448.png'),
                    info: [
                    {
                        name: this.$store.state.language == 'zh' ? "水泵开启数量" : "水泵開啟數量",
                        value: this.waterPump || 0
                    },
                    {
                        name: this.$store.state.language == 'zh' ? '实时流量(m³/h)' : '即時流量(m³/h)',
                        value: this.actualTraffic || 0
                    },
                    {
                        name: this.$store.state.language == 'zh' ? '水泵总功率(kW)' : '水泵總功率(kW)',
                        value: this.waterPumpPower || 0
                    },
                    ]
                }
            ]
            return list
        },
        cooler() {
            return this.projectItem?.cooler || 0
        },
        actualCool() {
            return this.projectItem?.actualCool || 0
        },
        coolPower() {
            return this.projectItem?.coolPower || 0
        },
        waterPump() {
            return this.projectItem?.waterPump || 0
        },
        actualTraffic() {
            return this.projectItem?.actualTraffic || 0
        },
        waterPumpPower() {
            return this.projectItem?.waterPumpPower || 0
        },
    },
    watch: {
        computedProjectId(newVal) {
            // 当项目名称发生变化时重新渲染Echarts
            this.$nextTick(() => {
                // 假设Echarts组件有一个方法可以重新渲染图表
                this.$refs.chart && this.$refs.chart.updateChart()
            })
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
    },
}
</script>

<style scoped lang="scss">
.title, .subtitle {
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 15px;
    color: #FFFFFF;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    text-transform: none;text-align: center;
}
.title {
    font-size: 22px;
    margin: 10px 0;
}
.aiK {
    position: relative;
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 14px;
    color: #20D7FF;
    text-transform: none;
    display: flex;
    justify-content: center;
    margin: 6px 0 30px 0;

    p {
        position: absolute;
        left: 050%;
        line-height: 42px;
        transform: translateX(-55%)
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

.box {
    display: flex;
    justify-content: space-between;
    width: 500px;
    .image {
        position: relative;

        p {
            position: absolute;
            margin: 0 auto;
            font-family: DINPro, DINPro;
            font-weight: 400;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 18px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            margin: 0 auto;
        }
    }
}

.item_box {
    width: 50%;
    display: flex;

    .info {
        font-family: PingFang SC, PingFang SC;
        font-weight: 300;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        text-transform: none;
    }
}

.info_item_0 {
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 15px;
    color: #FFFFFF;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 15px;
}

.info_item_1,
.info_item_2 {
    font-family: PingFang SC, PingFang SC;
    font-weight: 300;
    font-size: 14px;
    color: #ffffffa8;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 8px;
}
</style>

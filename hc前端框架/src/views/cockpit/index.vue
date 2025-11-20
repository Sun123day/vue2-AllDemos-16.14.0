<!-- 大区信息 -->
<template>
    <!-- <dv-full-screen-container class="box" id="screen"> -->
    <div class="box" id="screen">
        <div class="header">
            <!-- <div class="log"><img src="./image/华润数科品牌原件_简体（0926）_专色反白@2x.png" alt=""> <span style="color: #ffffff54;"> | </span> 智慧节能管理云平台</div> -->
            <div class="log"><img src="./image/logo.png" alt=""> <span style="color: #ffffff54;"> | </span>{{ computedLogoTxt }}</div>
            <div style="line-height: 88px; width: 640px;">{{title}}</div>
            <div class="opst">
                <span>{{  dateVal }}</span>
                <span>{{ dateTimeVal }}</span>
                <span>{{ weekVal }}</span>
                <span style="color: rgba(255, 255, 255, 0.5);">|</span>

                <div class="getInto" @click="goBack">
                    <img src="./image/编组备份 2@2x.png" alt="">
                    <p>{{intoBTN}}</p> 
                </div>
                <el-tooltip class="item" effect="light" :content="outBTN" placement="bottom-end">
                    <div class="getLogOut" @click="goLogOut">
                        <img src="./image/logout.png" alt="">
                        <!-- <p>{{outBTN}}</p>  -->
                    </div>
                </el-tooltip>
            </div>
        </div>

        <div class="item">
            <div class="left">
                <div v-for="(item, index) in leftData" :key="index" class="item_box">
                    <div class="title">{{ item.name }} <span class="tail">{{ item.tail }}</span></div>
                    <div v-if="item.type == 'meter'">
                        <meterCompone />
                    </div>
                    <div v-if="item.type == 'barChart'">
                        <barChart />
                    </div>
                    <!-- <div v-if="item.type == 'transverse'">
                        <transverse />
                    </div> -->
                </div>
                <div class="item_box">
                    <el-carousel height="480px" :autoplay="true" :interval="5000" direction="horizontal">
                        <el-carousel-item 
                            v-for="(item, index) in sortData" 
                            :key="index"
                        >
                            <div class="title">{{ item.name }} <span class="tail">{{ item.tail }}</span></div>
                            <transverseElec v-if="index == 0 || index == 2" />
                            <transverseCold v-if="index == 1 || index == 3" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="content">
                <div style=" position: relative; display: flex; align-items: center; justify-content: center;">
                    <img src="./image/Mask group.png" alt="">
                    <consume />
                </div>
                <div>
                    <mapCompone />
                </div>
            </div>
            <div class="right">
                <div v-for="(item, index) in rightData" :key="index" class="item_box">
                    <div class="title">{{ item.name }}</div>
                    <div v-if="item.type == 'coldWar'">
                        <!-- <upCompone /> -->
                        <el-carousel height="480px" :autoplay="true" :interval="5000" direction="horizontal">
                            <!-- v-for="(item, projectIndex) in projectList" -->
                            <el-carousel-item 
                                v-for="(item, projectIndex) in projectDataList" 
                                :key="projectIndex"
                            >
                                <!-- <upCompone
                                    :projectName="item.key"
                                    :projectId="item.value"
                                    :projectIndex="projectIndex"
                                /> -->
                                <upCompone
                                    :projectItem="item"
                                />
                                
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div v-if="item.type == 'AI'">
                        <!-- <downCompone /> -->
                        <el-carousel height="480px" :autoplay="true" :interval="5000" direction="horizontal">
                            <el-carousel-item 
                                v-for="(item, aiIndex) in aiData" 
                                :key="aiIndex"
                            >
                                <downComponeElec v-if="aiIndex == 0 || aiIndex == 2" />
                                <downComponeDevice v-if="aiIndex == 1 || aiIndex == 3" />
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
        </div>

    <!-- </dv-full-screen-container> -->
    </div>
</template>
  
<script>
import meterCompone from './components/left/1.vue'
import barChart from './components/left/2.vue'
import transverseElec from './components/left/3.vue'
import transverseCold from './components/left/4.vue'
import mapCompone from './components/centet/map.vue'
import consume from './components/centet/consume.vue'
import upCompone from './components/right/up.vue'
import downComponeElec from './components/right/electricAI.vue'
import downComponeDevice from './components/right/deviceAI.vue'

import autofit from 'autofit.js'
import store from '@/store'

import { mapState } from "vuex";

import { findProArchiveOptions } from '@/api/proArchive'
import { loginOut } from '@/api/system'

export default {
    components: {
        meterCompone, 
        barChart, 
        transverseElec, 
        transverseCold,
        mapCompone, 
        upCompone, 
        downComponeElec, 
        downComponeDevice,
        consume
    },
    data() {
        return {
            timer: null,
            heartbeat: null,
            dateVal:'',
            dateTimeVal:'',
            weekVal:'',
            // leftData: [
            //     {
            //         name: '空调节能效益',
            //         type: 'meter',
            //         // com: {
            //         //     style: {},
            //         //     data: {},
            //         // },
            //     }, 
            //     {
            //         name: '近12月能耗',
            //         type: 'barChart',
            //         // com: {
            //         //     style: {},
            //         //     data: {},

            //         // },
            //     }, 
            // ],
            // sortData: [
            //     {
            //         name: '用能指标排名',
            //         tail: '空调末端能耗指标',
            //         type: 'transverse',
            //         // com: {
            //         //     style: {},
            //         //     data: {},

            //         // },
            //     },
            //     {
            //         name: '空调指标排名',
            //         tail: '制冷系统能耗强度指标',
            //         type: 'transverse',
            //         // com: {
            //         //     style: {},
            //         //     data: {},
            //         // },
            //     }, 
            // ],
            // rightData: [
            //     {
            //         name: '冷站实况',
            //         type: 'coldWar',

            //         // data: {},
            //     },
            //     {
            //         name: 'AI运行状态',
            //         type: 'AI',
            //         // data: {},
            //     },
            // ],
            aiData: [
                {
                    name: '节能AI',
                },
                {
                    name: '设备AI', 
                },
                {
                    name: '节能AI',
                },
                {
                    name: '设备AI', 
                },
            ],
            // projectList: [],
            projectDataList: [],
            timerRightUp: null
        }
    },
    created() {
        // this.getProjectList()
        
        this.timer=setInterval(()=>{
            const date=new Date();
            const year = date.getFullYear(); //当前年份
            const month = date.getMonth()+1; //当前月份
            const data = date.getDate(); //天
            const hours = date.getHours(); //小时
            const minute = date.getMinutes(); //分
            const second = date.getSeconds(); //秒
            this.dateVal=`${year}-${month}-${data}`
            // this.dateTimeVal=`${this.fnW(hours)}:${this.fnW(minute)}:${this.fnW(second)}`
            this.dateTimeVal=`${this.fnW(hours)}:${this.fnW(minute)}`
            this.weekVal=this.getMyDay(date)
        },1000)

        this.requestRightUpData()
        this.unwatch = this.$watch(
            () => this.coldStationData,
            (newValue) => {
                this.projectDataList = [...newValue];
            },
            { deep: true }
        );
    },
    computed: {
        ...mapState({
            coldStationData: (state) => state.cockpit.coldStationData
        }),

        title() {
            return this.$store.state.language == 'zh'? '华创建投智慧节能管理云平台驾驶舱' : '華創建投智慧节能管理雲平台駕駛舱' 
        },
        intoBTN() {
            return this.$store.state.language == 'zh'? '进入系统' : '進入系統' 
        },
        outBTN() {
            return this.$store.state.language == 'zh'? '退出系统' : '退出系統' 
        },
        
        leftData(){
            return [
                {
                    name: this.$store.state.language == 'zh'? '空调节能效益' : '空調效益',
                    type: 'meter',
                }, 
                {
                    name: '近12月能耗',
                    type: 'barChart',
                }, 
            ]
        },
        sortData(){
            return [
                {
                    name: this.$store.state.language == 'zh'? '用能指标排名' : '用能指標排名',
                    tail: this.$store.state.language == 'zh'? '空调末端能耗指标' : '空調末端能耗指標',
                    type: 'transverse',
                },
                {
                    name: this.$store.state.language == 'zh'? '空调指标排名' : '空調指標排名',
                    tail: this.$store.state.language == 'zh'? '制冷系统能耗强度指标' : '制冷系統能耗強度指標',
                    type: 'transverse',
                }, 
                {
                    name: this.$store.state.language == 'zh'? '用能指标排名' : '用能指標排名',
                    tail: this.$store.state.language == 'zh'? '空调末端能耗指标' : '空調末端能耗指標',
                    type: 'transverse',
                },
                {
                    name: this.$store.state.language == 'zh'? '空调指标排名' : '空調指標排名',
                    tail: this.$store.state.language == 'zh'? '制冷系统能耗强度指标' : '制冷系統能耗強度指標',
                    type: 'transverse',
                }, 
            ]
        },
        rightData(){
            return  [
                {
                    name: this.$store.state.language == 'zh'? '冷站实况': '冷站實況',
                    type: 'coldWar',
                },
                {
                    name: this.$store.state.language == 'zh'? 'AI运行状态' : 'AI運行狀態',
                    type: 'AI',
                },
            ]
        },
        computedLogoTxt(){
                return this.$store.state.language == 'zh'? '智慧节能管理云平台' : '智慧节能管理雲平台';
        }
    },
    mounted() {
        this.timerRightUp = setInterval(() => {
            this.requestRightUpData()
        }, 5 * 60000)
    },
    mounted() {
        autofit.init({
            dh: 1080,
            dw: 1920,
            el: '#screen',
            //忽略缩放的元素
            ignore: [],
            resize: true,
        })
    },
    methods: {
        fnW(str){
            let num;
            str >= 10 ? num = str : num = "0" + str;
            return num;
        },
        getMyDay(date){
            let week;
            if(date.getDay()==0) week="星期日"
            if(date.getDay()==1) week="星期一"
            if(date.getDay()==2) week="星期二"
            if(date.getDay()==3) week="星期三"
            if(date.getDay()==4) week="星期四"
            if(date.getDay()==5) week="星期五"
            if(date.getDay()==6) week="星期六"
            return week;
        },
        requestRightUpData() {
          //   console.log("re")
            store.dispatch('cockpit/COLD_STATION_ACTION', {

            }) 
        },
        // getProjectList() {
        //   findProArchiveOptions().then((res) => {
        //       if (res.code == '200') {
        //           this.projectList = res.data || []
        //       }
        //   })
        // },
        goBack() {
            // this.$router.replace('/index')
            this.$router.replace('/energyManage/energyPlan')
        },
        // 退出登录
        goLogOut() {
                // this.$confirm('确认退出当前账号吗？', '安全退出', {
                this.$confirm(
                    this.$store.state.language == 'zh' ? '确认退出当前账号吗？' : '確認退出當前賬號嗎？',
                    '安全退出',
                {
                    confirmButtonText: '退出',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        this.logout()
                        clearInterval(this.heartbeat)
                    })
                    .catch(() => {
                        // this.logout()
                        clearInterval(this.heartbeat)
                    })
            },
            async logout() {
                this.$store.dispatch('userLoginOut').then(() => {
                    this.$message({
                        message: '退出成功',
                        type: 'success',
                    })
                    setTimeout(() => {
                        this.$router.push(`/login`)
                    }, 1000)
                })
            },
    },
    beforeDestroy() {
        // 组件销毁前清除定时器
        if(this.timer){
            clearInterval(this.timer)
            this.timer=null
        }
        clearInterval(this.timerRightUp);
        store.dispatch('cockpit/CLEAR_CO_STORE_ACTION')
    },
}
</script>
  
<style>
* {
    margin: 0;
    padding: 0;
}
</style>
<style lang="scss" scoped>
::v-deep .el-carousel__indicator--horizontal{
    display: none;
}
::v-deep .el-carousel__arrow--left{
    display: none!important;;
}
::v-deep .el-carousel__arrow--right{
    display: none!important;;
}
.box {
    background-color: #011639;
    width: 1920px;
    height: 1080px;
    font-family: PingFang SC, PingFang SC;
}

.header {
    width: 100%;
    height: 118px;
    background: url('./image/组合 29.png') no-repeat center;
    display: flex;
    justify-content: space-between;
    line-height: 118px;
    font-family: PangMenZhengDao, PangMenZhengDao;
    font-weight: 400;
    font-size: 37px;
    color: #FFFFFF;
    line-height: 42px;
    letter-spacing: 3px;
    text-align: center;
    font-style: normal;
    text-transform: none;

    .log {
        width: 640px;
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 70px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        img{
            margin:  0 0 0 22px;
            vertical-align: middle;
            // height: 30px;
            height: 58px;
        }
    }

    .opst {
        width: 640px;
        float: right;
        font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
        font-weight: 400;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 88px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        display: flex;
        justify-content: flex-end;

        
        span{
            margin-right: 15px
        }
        .getInto{
            cursor: pointer;
            position: relative;
            // margin: 22px 14px 0 0;
            margin: 28px 14px 0 0;
            line-height: 30px;
            background-image: url('./image/BTN.png');
            background-size: 108px 30px;
            background-repeat: no-repeat;
            width: 108px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 6px;
            img {
                position: absolute;
                // z-index: 1;
                // width: 103px;
                // height: 30px;
                width: 19px;
                height: 17px;
                margin-left: 10px;
            }
            p{  
                // position: relative;
                // z-index: 1;
                font-size: 14px;
                text-indent: 34px;
            }
        }
        .getLogOut{
            cursor: pointer;
            position: relative;
            // margin: 22px 14px 0 0;
            margin: 28px 14px 0 0;
            line-height: 30px;
            background-image: url('./image/BTN.png');
            background-size: 40px 30px;
            background-repeat: no-repeat;
            width: 40px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 6px;
            img {
                position: absolute;
                width: 19px;
                height: 17px;
                margin-left: 10px;
            }
        }
    }
}

.item {
    display: flex;

}

.left,
.right {
    // width: 494px;
    min-width: 500px;
    flex: 1;
    height: 100%;
    padding: 0 30px;

    .title {

        // width: 480px;
        width: 100%;
        height: 36px;
        background: url('./image/Group 584.png') no-repeat center;
        background-size: cover;
        font-family: PangMenZhengDao, PangMenZhengDao;
        font-weight: 400;
        font-size: 18px;
        color: #FFFFFF;
        text-align: left;
        font-style: normal;
        text-transform: none;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        // text-indent: 40px;
        text-indent: 60px;
        line-height: 42px;

        span {
            font-family: PingFang SC, PingFang SC;

            font-weight: 400;
            font-size: 12px;
            color: #08FDFD;
            line-height: 34px;
            text-align: left;
            font-style: normal;
            text-transform: none;
        }

    }

    .item_box {
        // width: 480px;
        width: 100%;
        height: 300px;
    }
   
}
.left{
    .item_box:nth-child(1){
        height: 330px;
    }
    .item_box:nth-child(2){
        height: 270px;
    }
}
.content {
    // width: 40%;
    width: 840px;
    min-width: 840px;
    height: 100%;
    flex-grow: 1;
    margin: 0 auto;

    img {
        // width: 100%;
        width: 840px;
        height: 330px;
    }
}

.right {
    padding-right: 0;

    .item_box {
        // width: 480px;
        width: 100%;
        height: 530px;
    }
}

// @font-face {
//     font-family: 'PangMenZhengDao';
//     src: url('./庞门正道标题体.ttf') format('truetype');
// }
</style>
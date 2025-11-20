
<script>
export default {
    props:{
        options:{
            type:Object,
            default:()=>{return {}}
        },
        isActive: {
          type: Boolean,
          default: false,
        },
    },
    computed:{
        computedY(){
            return this.options?.y || 335;
        },
        computedX(){
            return this.options?.x || 442;
        },
        computedTitle(){
            return this.$store.state.language == 'zh'? '商场' : '商場' 
        },
        computedAddr(){
            return this.$store.state.language == 'zh'? '项目地址' : '項目地址' 
        },
        computedArea(){
            return this.$store.state.language == 'zh'? '建筑面积' : '建築面積' 
        },
        computedUnit1(){
            return this.$store.state.language == 'zh'? '万' : '萬' 
        },
        computedUnit2(){
            return this.$store.state.language == 'zh'? '个' : '個' 
        },
        computedDevice(){
            return this.$store.state.language == 'zh'? '项目设备' : '項目設備' 
        },
        computedMonitor(){
            return this.$store.state.language == 'zh'? '数据监控' : '數據監控' 
        },
    },
    methods:{
        handleClick(){
            // console.log('options', this.options);
            this.$emit('requestShow');
        }
    }
}
</script>
<template>
    <el-popover
        popper-class="point-popover"
        placement="top"
        :value="isActive"
    >
            
        <div 
            class="point" 
            :style="{'top':options.y+'px',left:options.x+'px'}" 
            slot="reference"
            @click="handleClick"
        />
            <!-- :style="{
                top: computedY +'px',
                left: computedX +'px'
            }"  -->
        <div class="content">
            <div class="content-name">{{ options.name }}{{ computedTitle }}</div>
            <div style="display: flex; padding: 10px 0;">
                <img class="content-image" :src="options.image" alt="">
                <div class="content-main">
                    <div style="margin-bottom: 9px;">{{ computedAddr }} ：{{ options.address }}</div>
                    <!-- <div style="margin-bottom: 9px;">{{ computedArea }}：{{ options.buildArea }} {{ computedUnit1 }} ㎡</div> -->
                    <div style="margin-bottom: 9px;">{{ computedArea }}：{{ options.buildArea }} ㎡</div>
                    <div style="margin-bottom: 9px;">{{ computedDevice }}：{{ options.device }} 台</div>
                    <div >{{ computedMonitor }}：{{ options.data }} {{ computedUnit2 }}</div>
                </div>
            </div>
        </div>
    </el-popover>
</template>

<style>
.point-popover {
    background: #50526f8c !important;
    z-index: 10 !important;
    position: absolute;
}
.el-popper[x-placement^=top] .popper__arrow::after {
    border-top-color: #50526f8c !important;
}
</style>
<style lang="scss" scoped>
.point {
    position: absolute;
    cursor: pointer;
    width:40px;
    height:58px;
    background: url('~@/views/cockpit/image/marker.png');
    z-index: 10 !important;
    background-repeat: no-repeat;
    background-size: 100%;
}
.content {
    width: 275px;
    height: 155px;
    background: #1d4a92;
    border-radius: 6px;
    border: 1px solid #0263B2;
    padding: 10px;
    box-sizing: border-box;
    .content-name {
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
    }
    .content-image {
        width: 90px;
        height: 90px;
        margin-right: 6px;
    }
    .content-main {
        height: 24px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 10px;
        color: #FFFFFF;
        line-height: 12px;
        text-align: left;
        font-style: normal;
        text-transform: none;
    }
}
</style>
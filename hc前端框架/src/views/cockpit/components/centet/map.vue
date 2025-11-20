<template>
    <div class="content">
        <div id="mapID" class="map" />
        <PointMarker 
            v-for="(item, index) in pointDataList"
            :key="index"
            :options="item"
            :isActive="activeIndex === index"
            @requestShow="handleRequestShow(index)"
        />
    </div>
</template>

<script>
import * as echarts from 'echarts'
import store from '@/store'
import { mapState } from "vuex";

import PointMarker from './PointMarker.vue'
import pointConfig from './pointConfig'

export default {
    components: {
        PointMarker,
        pointConfig,
    },
    data() {
        return {
            chart: null,
            timer: null,
            resData: [],
            // activeIndex: -1, // PointMarker 在组件挂载后并不会立即显示，而是等待第一次定时器触发后才显示第一个 PointMarker
            activeIndex: 0, // 组件挂载后立即显示第一个 PointMarker 的内容
        }
    },
    created() {
        this.requestData()
        this.unwatch = this.$watch(
            () => this.mapData,
            (newValue) => {
                this.resData = [...newValue]; // 使用展开运算符创建一个新数组
            },
            { deep: true } // 添加 deep: true 以便深度监听对象或数组的变化
        );
    },
    watch: {

    },
    computed:{
        ...mapState({
            mapData: (state) => state.cockpit.mapData
        }),
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
        },
        pointDataList() {
            if (this.resData && this.resData.length > 0) {
                return this.resData.map(item => {
                    // 从pointConfig中找到匹配的id
                    const proItem = pointConfig['project'].find(pro => pro.id === item.id);
                    // console.log("proItem", proItem);
                    // 如果找到了匹配的id，则使用它的x和y值
                    if (proItem) {
                        let obj = {
                            id: item.id,
                            name: item.name,
                            // 项目地址
                            address: item.address,
                            // 建筑面积
                            buildArea: item.buildArea || 0,
                            // 项目设备
                            device: item.device || 0,
                            // 数据监控
                            data: item.data || 0,
                            image: item.image,
                            x: proItem.x,
                            y: proItem.y,
                        };
                        return obj;
                    }
                });
            }
            return [];
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.chart = echarts.init(document.getElementById('mapID'))
            this.initChart()
        })
        this.timer = setInterval(() => {
            this.requestData()
        }, 5 * 60000)

        this.intervalId = setInterval(() => {
            this.activeIndex = (this.activeIndex + 1) % this.pointDataList.length; 
        }, 5000)
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
        // 组件销毁前清除定时器
        clearInterval(this.timer);
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
    },
    methods: {
        handleRequestShow(index) {
          this.activeIndex = index;
        },
        initChart() {
            this.chart.showLoading();
            fetch('map.json').then(response => response.json()).then((geoJson) => {
            
                this.chart.hideLoading();

                echarts.registerMap('HK', geoJson);

                this.chart.setOption({
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '110%',
                    visualMap: {
                        show: false,
                        inRange: {
                            color: ['#0077fd']
                        },
                    },
                    series: [
                        {
                            type: 'map',
                            mapType: 'HK', // 自定义扩展图表类型
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#FFFFFF'
                                }
                            },
                            selectedMode: false,
                            itemStyle: {
                                normal: {
                                    color: '#FFFFFF',
                                    areaColor: '#0077fd', // 默认区域颜色
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#FFFFFF'
                                        }
                                    },
                                },
                                emphasis: {
                                    color: '#FFFFFF',
                                    areaColor: '#0077fd', // 鼠标悬浮时的颜色，保持不变
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#FFFFFF'
                                        }
                                    },
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
        requestData() {
            store.dispatch('cockpit/MAP_DATA_ACTION', {

            }) 
        },
    },
}
</script>

<style scoped>
.content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* #mapID {
        width: 840px;
        height: 620px;
        position: absolute;
        top: 0;
    } */
    .map {
        width: 840px;
        height: 620px;
        position: absolute;
        top: 0;
    }
}
</style>

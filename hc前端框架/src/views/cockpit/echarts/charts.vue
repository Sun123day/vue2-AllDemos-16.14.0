<template>
    <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'

export default {
    props: {
        className: {
            type: String,
            default: 'chart',
        },
        id: {
            type: String,
            default: 'chart',
        },
        width: {
            type: String,
            default: '200px',
        },
        height: {
            type: String,
            default: '200px',
        },
        option: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            chart: null,
            rotate: 0,
        }
    },
    watch: {
        id: {
            handler() {
                this.updateChart()
            },
        },
        option: {
            handler() {
                this.updateChart()
            },
            deeep: true,
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.chart = echarts.init(document.getElementById(this.id))
            // this.initChart()
            this.updateChart()
        })
    },
    beforeDestroy() {
        // if (!this.chart) {
        //     return
        // }
        // this.chart.dispose()
        // this.chart = null
        
        if (this.chart) {
            this.chart.dispose()
        }
    },
    methods: {
        // initChart() {
        //     this.chart.setOption(this.option)
        // },
        initChart() {
            if (!this.chart) {
                this.chart = echarts.init(document.getElementById(this.id))
            }
        },
        updateChart() {
            this.initChart()
            this.chart.setOption(this.option, true)
        },
    },
}
</script>

<style scoped></style>

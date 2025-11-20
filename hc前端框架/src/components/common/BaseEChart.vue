<template>
    <div ref="chartContainer" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import * as echarts from 'echarts'
import { debounce } from 'lodash'

export default {
    name: 'BaseEChart',
    props: {
        // 图表配置项
        option: {
            type: Object,
            required: true
        },
        // 图表主题
        theme: {
            type: [String, Object],
            default: null
        },
        // 是否自动调整大小
        autoResize: {
            type: Boolean,
            default: true
        },
        // 加载状态
        loading: {
            type: Boolean,
            default: false
        },
        // loading配置项
        loadingOptions: {
            type: Object,
            default: () => ({
                text: '加载中...',
                color: '#00DDFF',
                textColor: '#9AC0EF',
                maskColor: 'rgba(0, 35, 92, 0.8)',
            })
        }
    },

    data() {
        return {
            chart: null
        }
    },

    mounted() {
        this.initChart()
        if (this.autoResize) {
            this.__resizeHandler = debounce(() => {
                this.resize()
            }, 100)
            window.addEventListener('resize', this.__resizeHandler)
        }
    },

    beforeDestroy() {
        if (!this.chart) {
            return
        }
        if (this.autoResize) {
            window.removeEventListener('resize', this.__resizeHandler)
        }
        this.dispose()
    },

    methods: {
        // 初始化图表
        initChart() {
            if (this.chart) {
                return
            }

            this.chart = echarts.init(this.$refs.chartContainer, this.theme)
            if (this.loading) {
                this.chart.showLoading(this.loadingOptions)
            }
            if (this.option) {
                this.chart.setOption(this.option)
            }

            // 触发图表已准备好的事件
            this.$emit('ready', this.chart)
        },

        // 设置图表配置项
        setOption(option, notMerge = false) {
            if (this.chart) {
                this.chart.setOption(option, notMerge)
            }
        },

        // 获取图表实例
        getChart() {
            return this.chart
        },

        // 调整图表大小
        resize() {
            if (this.chart) {
                this.chart.resize()
            }
        },

        // 销毁图表实例
        dispose() {
            if (this.chart) {
                this.chart.dispose()
                this.chart = null
            }
        }
    },

    watch: {
        option: {
            handler(val) {
                if (this.chart) {
                    this.setOption(val)
                }
            },
            deep: true
        },
        loading: {
            handler(val) {
                if (!this.chart) return
                if (val) {
                    this.chart.showLoading(this.loadingOptions)
                } else {
                    this.chart.hideLoading()
                }
            }
        }
    }
}
</script>

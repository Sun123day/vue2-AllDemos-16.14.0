import * as echarts from 'echarts'
export default {
    props: {
        source: {
            type: [Array, Object],
            default: () => [],
        },
        title: {
            type: String,
            default: '',
        },
        textList: {
            type: Array,
            default: () => [],
        },
    },
    watch: {
        source: {
            handler(newVal) {
                this._$setChartOptions(newVal, this.textList)
            },
            immediate: true,
        },
        textList: {
            handler(newVal) {
                // console.log("11111111111111")
                this._$setChartOptions(this.source, newVal)
            },
            deep: true,
            immediate: true,
        },
    },
    async mounted() {
        this.chartHook = undefined
        this.$nextTick(() => {
            this.chartHook = echarts.init(this.$refs.containerRef)

            this._$setChartOptions(this.source, this.textList)
        })
        window.addEventListener('resize', this._$resizeChart)
    },
    destroyed() {
        window.removeEventListener('resize', this._$resizeChart)
    },
    methods: {
        _$resizeChart() {
            this.chartHook?.resize()
        },
        _$formatterTooltip({ params, unit }) {
            let html = params && params.length !== 0 ? params[0].name : ''
            params.forEach((item) => {
                html += `<div>${item.marker} ${
                    item.seriesName
                }  <span style="display:inline-block;width:30px"></span> ${item.value} ${
                    unit || ''
                } </div>`
            })
            return html
        },
    },
}

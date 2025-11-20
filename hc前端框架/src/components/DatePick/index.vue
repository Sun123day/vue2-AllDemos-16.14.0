<script>
    import dayjs from 'dayjs'
    export default {
        name: 'datePick',
        props: {
            value: {
                type: [String, Number, Array],
                // default: '',
            },
            type: {
                type: String,
                default: '',
            },
            options: {
                type: Object,
                default: () => ({}),
            },
            clearable: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'small',
            },
            keyword: {
                type: String,
                default: 'dataPick',
            },
            pickerOptions:{
                type:Object
            }
        },
        watch: {
            type: {
                handler() {
                    this.timeDate = ''
                    this.startDate = ''
                    this.endDate = ''
                    this.setTimeData()
                },
                immediate: true,
            },
        },
        data() {
            return {
                timeDate: '',
                startDate: '',
                endDate: '',
                maxDay: 10,
                
                pickerOptionsEnd: {
                    disabledDate(time) {
                        return time.getTime() > Date.now()
                    },
                },
                pickerOptionsStart: {
                    disabledDate: (time) => {
                        const state = {
                            year: dayjs().subtract(10, 'year').format('YYYY-MM-DD'),
                            month: dayjs().subtract(36, 'month').format('YYYY-MM-DD'),
                            day: dayjs().subtract(90, 'day').format('YYYY-MM-DD'),
                            week: dayjs().subtract(12, 'week').format('YYYY-MM-DD'),
                        }
                        return (
                            time.getTime() > Date.now() ||
                            time.getTime() < new Date(state[this.type])
                        )
                    },
                },
            }
        },
        computed: {
            dateType() {
                const state = {
                    day: 'date',
                    custom: 'daterange',
                }
                return state[this.type] || this.type
            },
            valueFormat() {
                const state = {
                    year: 'yyyy',
                    month: 'yyyy-MM',
                    day: 'yyyy-MM-dd',
                    week: 'yyyy-MM-dd',
                    custom: 'yyyy-MM-dd',
                }
                return state[this.type] || ''
            },
            format() {
                const state = {
                    year: 'yyyy',
                    month: 'yyyy-MM',
                    day: 'yyyy-MM-dd',
                    week: 'yyyy 第 WW 周',
                    custom: 'yyyy-MM-dd',
                }
                return state[this.type] || ''
            },
            placeholder() {
                const state = {
                    year: '年',
                    month: '月',
                    day: '日',
                    week: '周',
                }
                return '选择' + (state[this.type] || '')
            },
            signKey() {
                return this.type === 'custom' ? 'custom' : 'single'
            },
        },
        methods: {
            setTimeData() {
                const state = {
                    year: dayjs().format('YYYY'),
                    month: dayjs().format('YYYY-MM'),
                    day: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
                    week: dayjs().format('YYYY-MM-DD'),
                    custom: dayjs().format('YYYY-MM-DD'),
                }
                const startState = {
                    year: dayjs().subtract(1, 'year').format('YYYY'),
                    month: dayjs().subtract(1, 'month').format('YYYY-MM'),
                    day: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
                    week: dayjs().subtract(4, 'week').format('YYYY-MM-DD'),
                }
                let defaultValue = state[this.type]
                if (this.type === 'custom') {
                    defaultValue = [defaultValue, defaultValue]
                }
                this.timeDate = defaultValue
                this.endDate = state[this.type]
                this.startDate = startState[this.type]
                if (this.keyword == 'rangePick') {
                    this.$emit('input', [this.startDate, this.endDate])
                }
                if (this.keyword == 'dataPick') {
                    this.$emit('input', this.timeDate)
                }
                this.pickerOptionsStart = {
                    disabledDate: (time) => {
                        const state = {
                            year: dayjs().subtract(10, 'year').format('YYYY-MM-DD'),
                            month: dayjs().subtract(36, 'month').format('YYYY-MM-DD'),
                            day: dayjs().subtract(90, 'day').format('YYYY-MM-DD'),
                            week: dayjs().subtract(12, 'week').format('YYYY-MM-DD'),
                        }
                        return (
                            time.getTime() > Date.now() ||
                            time.getTime() < new Date(state[this.type])
                        )
                    },
                }
            },
            handleChange() {
                let result = null
                if (this.keyword == 'rangePick') {
                    result = [this.startDate, this.endDate]
                }
                if (this.keyword == 'dataPick') {
                    result = this.timeDate
                }
                this.$emit('input', result)
                this.$emit('change', result)
            },
        },
    }
</script>
<template>
    <fragment v-if="keyword == 'rangePick'">
        <el-date-picker
            v-model="startDate"
            :type="dateType"
            size="small"
            :value-format="valueFormat"
            :format="format"
            :placeholder="placeholder"
            @change="handleChange"
            :clearable="false"
            style="width: 48%; margin-right: 2px"
            :picker-options="pickerOptionsStart"
            class="calendar-single"
        >
        </el-date-picker>

        <el-date-picker
            v-model="endDate"
            :type="dateType"
            size="small"
            :clearable="false"
            :value-format="valueFormat"
            :format="format"
            :placeholder="placeholder"
            @change="handleChange"
            style="width: 48%"
            :picker-options="pickerOptionsEnd"
            class="calendar-single"
        >
        </el-date-picker>
    </fragment>
    <el-date-picker
        v-else-if="keyword == 'dataPick'"
        :key="signKey"
        v-model="timeDate"
        :type="dateType"
        :size="size"
        :clearable="clearable"
        :value-format="valueFormat"
        :format="format"
        :placeholder="placeholder"
        @change="handleChange"
        v-bind="options"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        class="calendar-single"
    />
</template>
<style lang="scss">
    .el-date-table td.disabled div {
        background-color: #ffffff2e !important;
    }
</style>

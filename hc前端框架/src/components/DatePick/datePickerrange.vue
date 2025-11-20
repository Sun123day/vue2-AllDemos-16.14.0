<script>
    import dayjs from 'dayjs'
    const ONE_DAY = 24 * 3600 * 1000
    import { cloneDeep } from 'lodash-es'
    export default {
        name: 'datePickerrange',
        props: {
            defaultValue: {
                type: [String, Number, Array],
                default: '',
            },
            value: {
                type: [String, Number, Array],
                default: '',
            },
            type: {
                type: String,
                default: '',
            },
            options: {
                type: Object,
                default: () => ({
                    size: 'small',
                    clearable: false,
                }),
            },
        },
        watch: {
            type: {
                handler(newValue) {
                    this.timeDate = ''
                    if (newValue) {
                        this._defaultValue = cloneDeep(this.defaultValue)
                        this.setTimeData()
                    }
                },
                immediate: true,
            },
        },
        data() {
            return {
                _defaultValue: null,
                startYear: '',
                endYear: '',
                timeDate: '',
                astrict: 30 * ONE_DAY,
                pickerMinDate: null,
                startYearMinDate: null,
                pickerOptions: {
                    onPick: ({ minDate }) => {
                        if (minDate && this.pickerMinDate) {
                            this.pickerMinDate = null
                            return
                        }
                        if (this.type !== 'custom' && minDate) {
                            if (typeof minDate === 'number') {
                                this.pickerMinDate = dayjs(`${minDate}`).valueOf()
                            } else {
                                this.pickerMinDate = minDate.getTime()
                            }
                        }
                    },
                    disabledDate: (time) => {
                        const pickerMinDate = this.pickerMinDate
                        if (pickerMinDate) {
                            return (
                                time.getTime() > pickerMinDate + this.astrict ||
                                time.getTime() < pickerMinDate - this.astrict
                            )
                        }
                        return time.getTime() > Date.now()
                    },
                },
                pickerNextYearOptions: {
                    disabledDate: (time) => {
                        if (this.startYear) {
                            const pickerMinDate = dayjs(`${this.startYear}`).valueOf()
                            return (
                                time.getTime() > pickerMinDate + this.astrict ||
                                time.getTime() < pickerMinDate
                            )
                        }
                        return false
                    },
                },
            }
        },
        computed: {
            dateType() {
                const state = {
                    hour: 'datetimerange',
                    day: 'daterange',
                    month: 'monthrange',
                    week: 'week',
                    year: 'yearrange',
                    custom: 'daterange',
                }
                return state[this.type] || this.type
            },
            valueFormat() {
                const state = {
                    year: 'yyyy',
                    month: 'yyyy-MM',
                    day: 'yyyy-MM-dd',
                    hour: 'yyyy-MM-dd HH',
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
                    hour: 'yyyy-MM-dd HH:mm',
                    week: 'yyyy 第 WW 周',
                    custom: 'yyyy-MM-dd',
                }
                return state[this.type] || ''
            },
            placeholder() {
                const state = {
                    hour: '小时',
                    year: '年',
                    month: '月',
                    day: '日',
                    week: '周',
                }
                return '选择' + (state[this.type] || '')
            },
        },
        methods: {
            setTimeData() {
                this.pickerMinDate = null
                let result = []

                switch (this.type) {
                    case 'year':
                        result = [
                            dayjs().subtract(5, 'year').endOf('year').format('YYYY'),
                            dayjs().startOf('year').format('YYYY'),
                        ]
                        this.astrict = 1825 * ONE_DAY
                        break
                    case 'month':
                        result = [
                            dayjs().subtract(36, 'month').startOf('month').format('YYYY-MM'),
                            dayjs().endOf('month').format('YYYY-MM'),
                        ]
                        this.astrict = 1080 * ONE_DAY
                        break
                    case 'day':
                        result = [
                            dayjs().subtract(31, 'day').format('YYYY-MM-DD'),
                            dayjs().format('YYYY-MM-DD'),
                        ]
                        this.astrict = 31 * ONE_DAY
                        break
                    case 'hour':
                        result = [
                            dayjs().subtract(6, 'day').format('YYYY-MM-DD HH:00'),
                            dayjs().format('YYYY-MM-DD HH:00'),
                        ]
                        this.astrict = 6 * ONE_DAY
                        break
                    case 'week':
                        result = dayjs().format('YYYY-MM-DD')
                        break
                    case 'custom':
                        result = [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
                        break
                }
                if (this.type === 'year') {
                    this.startYear = result[0]
                    this.endYear = result[1]
                } else {
                    this.timeDate =
                        this._defaultValue && this._defaultValue.length !== 0
                            ? this._defaultValue
                            : result
                }
                this._defaultValue = null
                this.$emit('input', this.transformDateTime())
            },
            handleChange() {
                this.$emit('input', this.transformDateTime())
            },
            handleChangeYear(value) {
                this.endYear = value
                this.$emit('input', this.transformDateTime())
            },
            transformDateTime() {
                let result = ''
                switch (this.type) {
                    case 'year':
                        result = [
                            dayjs(this.startYear).startOf('year').format('YYYY-MM-DD 00:00:00'),
                            dayjs(this.endYear).endOf('year').format('YYYY-MM-DD 23:59:59'),
                        ]
                        break
                    case 'month':
                        result = [
                            dayjs(this.timeDate[0]).startOf('month').format('YYYY-MM-DD 00:00:00'),
                            dayjs(this.timeDate[1]).endOf('month').format('YYYY-MM-DD 23:59:59'),
                        ]
                        break
                    case 'hour':
                        result = [
                            dayjs(this.timeDate[0]).format('YYYY-MM-DD HH:00:00'),
                            dayjs(this.timeDate[1]).format('YYYY-MM-DD HH:59:59'),
                        ]
                        break
                    case 'day':
                    case 'custom':
                        result = [
                            dayjs(this.timeDate[0]).format('YYYY-MM-DD 00:00:00'),
                            dayjs(this.timeDate[1]).format('YYYY-MM-DD 23:59:59'),
                        ]
                }
                return result
            },
        },
    }
</script>
<template>
    <fragment>
        <div class="datePick" v-if="type !== 'year'">
            <el-date-picker
                v-bind="options"
                key="single"
                v-model="timeDate"
                :type="dateType"
                :value-format="valueFormat"
                :format="format"
                :placeholder="placeholder"
                @change="handleChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
            />
        </div>
        <div class="datePick" v-else>
            <el-date-picker
                size="small"
                :clearable="false"
                v-model="startYear"
                type="year"
                :value-format="valueFormat"
                :format="format"
                style="width: 140px"
                :placeholder="placeholder"
                @change="handleChangeYear"
            >
            </el-date-picker>
            <span class="line">至</span>
            <el-date-picker
                :value-format="valueFormat"
                :format="format"
                :placeholder="placeholder"
                :picker-options="pickerNextYearOptions"
                size="small"
                v-model="endYear"
                type="year"
                :clearable="false"
                style="width: 140px"
                @change="handleChange"
            >
            </el-date-picker>
        </div>
    </fragment>
</template>
<style scoped lang="scss">
    .datePick {
        display: inline-block;
    }
    .line {
        color: #fff;
        padding: 0 4px;
    }
</style>

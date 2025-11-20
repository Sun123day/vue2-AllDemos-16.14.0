<template>
    <fragment>
        <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :popper-class="popperClass"
            v-bind="selectOptions"
            :clearable="false"
            prefix-icon=""
            @change="handleChange"
            :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:30',
            }"
        >
        </el-time-select>
        <span class="line">-</span>
        <el-time-select
            :popper-class="popperClass"
            v-bind="selectOptions"
            placeholder="结束时间"
            prefix-icon=""
            v-model="endTime"
            @change="handleEnd"
            :clearable="false"
            :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:30',
                minTime: startTime,
            }"
        >
        </el-time-select>
    </fragment>
</template>

<script>
    export default {
        name: '',
        props: {
            value: [String, Array, Number],
            selectOptions: {
                type: Object,
                default: () => ({
                    // size: 'small',
                }),
            },
            popperClass: {
                type: String,
                default: '',
            },
        },
        watch: {
            value: {
                handler(newValue) {
                    if (newValue && newValue.length) {
                        this.startTime = newValue[0]
                        this.endTime = newValue[1]
                    }
                },
                immediate: true,
            },
        },
        data() {
            return {
                startTime: '',
                endTime: '',
            }
        },
        methods: {
            handleChange() {
                this.endTime = ''
                this.$emit('input', '')
            },
            handleEnd() {
                this.$emit('input', [this.startTime, this.endTime])
            },
        },
    }
</script>

<style lang="scss" scoped>
    .line {
        color: #fff;
        padding: 0 6px;
    }
</style>

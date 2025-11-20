<script>
    export default {
        name: 'Space',
        props: {
            //是否垂直布局
            vertical: { type: Boolean, default: false },
            //水平排列方式
            justify: { type: String, default: 'start' },
            //垂直排列方式
            align: { type: String },
            spaceNum: { type: Number, default: 5 },
        },
        data() {
            return {}
        },
        computed: {
            getStyle() {
                const flexDirection = this.$props.vertical == true ? 'column' : 'inherit'
                return {
                    flexDirection: `${flexDirection}`,
                    '--space-num': this.spaceNumber,
                }
            },
            getClassWaper() {
                if (this.$props.vertical) {
                    return 'space-box-vertical'
                } else {
                    return 'space-box-justify'
                }
            },
            spaceNumber() {
                return this.$props.spaceNum + 'px'
            },
        },
    }
</script>

<template>
    <div :style="getStyle" class="space-waper" :class="getClassWaper">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .space-waper {
        display: flex;
        width: 100%;
        align-items: center;
    }
    .space-box-justify {
        > * {
            margin-right: var(--space-num);
        }
    }
    .space-box-vertical {
        > * {
            margin-bottom: var(--space-num);
        }
    }
</style>

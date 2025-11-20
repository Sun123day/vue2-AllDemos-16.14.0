<script>
    export default {
        name: 'Grid',
        props: {
            //显示的栅格数量
            cols: {
                type: Object,
                default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
            },
            //是否默认折叠
            collapsed: {
                type: Boolean,
                default: false,
            },
            //默认展示的行数
            collapsedRows: {
                type: Number,
                default: 1,
            },
            gap: {
                type: [Number, Array],
                default: 0,
            },
        },
        provide() {
            return {
                gridRoot: this,
            }
        },
        data() {
            return {
                breakPoint: '',
                //开始折叠的 index
                hiddenIndex: -1,
            }
        },
        computed: {
            getGap() {
                if (typeof this.gap === 'number') return `${this.gap}px`
                if (Array.isArray(this.gap)) return `${this.gap[1]}px ${this.gap[0]}px`
                return 'unset'
            },

            style() {
                return {
                    display: 'grid',
                    gridGap: this.getGap,
                    gridTemplateColumns: `repeat(${this.cols[this.breakPoint]}, minmax(0, 1fr))`,
                }
            },
        },
        beforeMount() {},
        mounted() {
            this.resize({ target: { innerWidth: window.innerWidth } })
            window.addEventListener('resize', this.resize)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resize)
        },
        activated() {
            this.resize({ target: { innerWidth: window.innerWidth } })
            window.addEventListener('resize', this.resize)
        },
        deactivated() {
            window.removeEventListener('resize', this.resize)
        },
        watch: {
            breakPoint() {
                if (this.collapsed) this.findIndex()
            },
            collapsed(value) {
                if (value) return this.findIndex()
                this.hiddenIndex = -1
            },
        },
        methods: {
            resize(e) {
                let width = e.target.innerWidth
                switch (!!width) {
                    case width < 768:
                        this.breakPoint = 'xs'
                        break
                    case width >= 768 && width < 992:
                        this.breakPoint = 'sm'
                        break
                    case width >= 992 && width < 1200:
                        this.breakPoint = 'md'
                        break
                    case width >= 1200 && width < 1920:
                        this.breakPoint = 'lg'
                        break
                    case width >= 1920:
                        this.breakPoint = 'xl'
                        break
                }
            },
            /**
             * @name: findIndex
             * @msg: 寻找需要开始折叠的字段 index
             * @return {*}
             */
            findIndex() {
                let suffix = null
                // 计算 suffix 所占用的列
                let suffixCols = 0
                if (suffix) {
                    suffixCols =
                        (suffix.props[this.breakPoint]?.span ?? suffix.props?.span ?? 1) +
                        (suffix.props[this.breakPoint]?.offset ?? suffix.props?.offset ?? 0)
                }

                this.hiddenIndex = this.cols[this.breakPoint] - 1
            },
        },
    }
</script>

<template>
    <div :style="style">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped></style>

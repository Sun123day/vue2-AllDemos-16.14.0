<script>
    export default {
        name: 'GridItem',
        props: {
            offset: {
                type: Number,
                default: 0,
            },
            span: {
                type: Number,
                default: 1,
            },
            suffix: {
                type: Boolean,
                default: false,
            },
            xs: Object,
            sm: Object,
            md: Object,
            lg: Object,
            xl: Object,
        },
        inject: ['gridRoot'],
        data() {
            return {
                isShow: true,
                attrs: this.$attrs,
            }
        },
        computed: {
            getHiddenIndex() {
                return this.gridRoot.hiddenIndex
            },
            style() {
                let span = this.$props[this.gridRoot.breakPoint]?.span ?? this.$props.span
                let offset = this.$props[this.gridRoot.breakPoint]?.offset ?? this.$props.offset

                const gap = this.gridRoot.gap || 0
                const cols = this.gridRoot.cols[this.gridRoot.breakPoint]
                if (this.$props.suffix) {
                    return {
                        gridColumnStart: cols - span - offset + 1,
                        gridColumnEnd: `span ${span + offset}`,
                        marginLeft:
                            offset !== 0
                                ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})`
                                : 'unset',
                    }
                } else {
                    return {
                        gridColumn: `span ${span + offset > cols ? cols : span + offset}/span ${
                            span + offset > cols ? cols : span + offset
                        }`,
                        marginLeft:
                            offset !== 0
                                ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})`
                                : 'unset',
                    }
                }
            },
        },
        watch: {
            getHiddenIndex() {
                if (!!this.attrs.index) {
                    this.isShow = !(
                        this.gridRoot.hiddenIndex !== -1 &&
                        parseInt(this.attrs.index) >= this.gridRoot.hiddenIndex
                    )
                }
            },
            breakPoint() {
                if (!!this.attrs.index) {
                    this.isShow = !(
                        this.gridRoot.hiddenIndex !== -1 &&
                        parseInt(this.attrs.index) >= this.gridRoot.hiddenIndex
                    )
                }
            },
        },
    }
</script>

<template>
    <div :style="style" v-show="isShow">
        <slot></slot>
    </div>
</template>

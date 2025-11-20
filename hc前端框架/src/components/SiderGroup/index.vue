<template>
    <div class="siderGroup" :style="wrapStyles" v-show="!collapsible">
        <transition name="el-fade-in-linear">
            <div class="pageList">
                <div>
                    <slot name="condition"></slot>
                </div>
                <div class="childClass">
                    <slot />
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Emitter from '@/mixins/emitter'
    export default {
        name: 'siderGroup',
        mixins: [Emitter],
        props: {
            width: {
                type: Number,
                default: () => {
                    return 240
                },
            },
            collapsedWidth: {
                type: Number,
                default: 0,
            },
            collapsible: {
                type: Boolean,
                default() {
                    return false
                },
            },
        },
        data() {
            return {}
        },
        created() {
            this.$on('on-collapse', (bloo) => {
                this.collapsible = bloo
            })
        },
        computed: {
            wrapStyles() {
                return {
                    width: `${this.siderWidth}px`,
                    minWidth: `${this.siderWidth}px`,
                    maxWidth: `${this.siderWidth}px`,
                }
            },
            siderWidth() {
                return this.collapsible ? this.collapsedWidth : this.width
            },
        },
    }
</script>
<style lang="scss" scoped>
    .siderGroup {
        width: 232px;
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: $table-search-bg-color;
        margin-right: 16px;
        padding: 10px;
        box-sizing: border-box;
        .childClass {
            flex-grow: 1;
            position: relative;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        .pageList {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }
    }
</style>

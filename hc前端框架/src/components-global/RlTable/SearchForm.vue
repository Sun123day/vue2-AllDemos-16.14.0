<script>
    import Grid from '@/components-global/Grid/index.vue'
    import GridItem from '@/components-global/Grid/GridItem.vue'
    export default {
        name: 'SearchForm',
        components: { Grid, GridItem },
        props: {
            columns: {
                type: Array,
                default: () => {
                    return []
                },
            },
            searchParam: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            isShowRest: {
                type: Boolean,
                default: () => true,
            },
            isShowMore: {
                type: Boolean,
                default: () => true,
            },
            searchName: {
                type: String,
                // default: '搜索',
                default: '查询',
            },
            cols: {
                type: Object,
                default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            initCollapsed: {
                type: Boolean,
                default: false,
            },
            isExport: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                //是否默认折叠搜索项
                collapsed: this.$props.initCollapsed,
            }
        },
        mounted() {
            // console.log(this.$slots.default[0].componentInstance.$children,"ghaha")
            // if(this.$slots.default&&this.$slots.default.length==1){
            //     const solts=this.$slots.default[0].componentInstance.$children;
            //     const arr=[1,2,3]
            //     solts.reduce((prev, current) => {
            //         console.log(prev,"haha")
            //     })
            // }
        },
        computed: {
            showCollapse() {
                let show = false

                return true
            },
        },
        methods: {
            collapsedChange() {
                this.collapsed = !this.collapsed
            },
            searchOnClick() {
                this.$emit('on-search')
            },
            restOnClick() {
                this.$emit('on-rest')
            },
            exportOnClick() {
                this.$emit('on-export')
            },
        },
    }
</script>
<template>
    <div class="table-search">
        <el-form ref="formRef" :show-message="false">
            <Grid :collapsed="collapsed" :gap="[20, 20]" :cols="cols">
                <slot />
                <GridItem suffix>
                    <div class="operation">
                        <el-button
                            type="primary"
                            @click="searchOnClick"
                            size="small"
                            :disabled="disabled"
                        >
                            <!-- icon="el-icon-search" -->
                            {{ searchName }}
                        </el-button>
                        <el-button 
                            @click="restOnClick" 
                            size="small" 
                            v-if="isShowRest" 
                            type="info"
                            >重置</el-button
                        >
                        <el-button
                            @click="exportOnClick"
                            size="small"
                            v-if="isExport"
                            type="primary"
                            >导出</el-button
                        >
                        <el-button
                            v-if="showCollapse && isShowMore"
                            link
                            class="search-isOpen"
                            @click="collapsedChange"
                            icon="el-icon-arrow-down"
                            size="small"
                            type="primary"
                        >
                            {{ collapsed ? '展开' : '合并' }}
                        </el-button>
                        <slot name="search-button" />
                    </div>
                </GridItem>
            </Grid>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
    .el-form-item__label, .el-form-item {
        color: #000 !important;
    }
    ::v-deep .el-form-item__label{
        color: $table-search-text-color !important;
    }
    .table-search {
        // margin-bottom: 10px;
        margin-bottom: 16px;
        padding: 16px 24px 24px;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 0 12px #0000000d;
        background-color: $table-search-bg-color;
        color: #000;
        ::v-deep .el-form-item__label {
            color: $table-search-text-color !important;
        }
    }

    .operation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    ::v-deep .el-form-item {
        margin-bottom: 0px;
        display: flex;
        .el-form-item__label {
            color: $table-search-text-color !important;
        }
    }

    ::v-deep .el-form-item__content {
        flex: 1;
    }
</style>

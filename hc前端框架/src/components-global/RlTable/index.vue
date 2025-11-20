<script>
    import BaseProps from './baseProps'
    import SearchForm from './SearchForm.vue'
    import { isFunction } from 'lodash'
    import { createElement } from 'vue'
    export default {
        name: 'RlTable',
        components: { SearchForm },
        props: BaseProps,
        provide() {
            return {
                tableRoot: this,
            }
        },
        data() {
            return {
                //卡片网格默认列数
                gridCardColumn: this.$props.gridColumn || 4,
                //组件展示形式
                patternType: this.$props.showCard ? 'card' : 'table',
                //表格数据
                tableData: this.data || [],
                //表格选项
                currentSelection: [],
                //当前勾选行，取消勾选或选中
                currentSelectRow: null,
                //分页配置
                pagination: {
                    //每页显示条目个数
                    pageSize: this.pageSize || 20,
                    //总数
                    total: 0,
                    //每页显示个数选择器的选项设置
                    pageSizes: this.pageSizes || [10, 20, 30, 40, 50, 100],
                    //当前页
                    pageNum: this.currentPage || 1,
                    ascs: [],
                    descs: [],
                },
                //加载loding
                loading: false,
                searchParams: {},
                tableHeight: this.$props.height || '100%',
            }
        },
        watch: {
            pageSizes(newValue) {
                if (newValue) {
                    this.pagination.pageSizes = newValue
                }
            },
            pageSize(newValue) {
                if (newValue) {
                    this.pagination.pageSize = newValue
                }
            },
        },
        mounted() {
            //组件渲染完成事件，回传表格组件ref
            this.$emit('on-mounted', this.$refs.table)
            //是否组件渲染完成初始化请求加载数据
            if (this.initData) {
                this.handleOnChange()
            }

            this.windowChange()
            window.addEventListener('resize', this.windowChange)
        },
        beforeMount() {
            window.removeEventListener('resize', this.windowChange)
        },
        computed:{
            noDataText(){
                return this.$store.state.language == 'zh'? '暂无数据' : '暫無數據' 
            }
        },
        methods: {
            /**
             * @name: setFields/setFieldsValue
             * @msg: 设置表单数据
             * refresh 是否刷新/重新加载
             * @return {*}
             */
            setFields(key, value, options = { refresh: true }) {
                this.$set(this.searchParams, key, value)
                if (options && options.refresh) {
                    this.handleOnChange()
                }
            },
            setFieldsValue(fields, options = { refresh: true }) {
                if (!fields) return
                Object.keys(fields).forEach((filed) =>
                    this.$set(this.searchParams, filed, fields[filed])
                )
                if (options && options.refresh) {
                    this.handleOnChange()
                }
            },
            /**
             * @name: 浏览器窗口变换
             * @test: test font
             * @msg:
             * @return {*}
             */
            windowChange() {
                if (window.innerWidth <= 1440) {
                    const _column =
                        this.$props.gridColumn && this.$props.gridColumn < 2
                            ? this.$props.gridColumn
                            : 2
                    this.gridCardColumn = this.$props.gridColumns
                        ? this.$props.gridColumns[0]
                        : _column
                } else if (window.innerWidth > 1440 && window.innerWidth <= 1600) {
                    const _column =
                        this.$props.gridColumn && this.$props.gridColumn < 3
                            ? this.$props.gridColumn
                            : 3
                    this.gridCardColumn = this.$props.gridColumns
                        ? this.$props.gridColumns[1]
                        : _column
                } else if (window.innerWidth > 1600) {
                    const _column =
                        // this.$props.gridColumn && this.$props.gridColumn < 4
                        //     ? this.$props.gridColumn
                        //     : 4
                        this.$props.gridColumn && this.$props.gridColumn < 3
                            ? this.$props.gridColumn
                            : 3
                    this.gridCardColumn = this.$props.gridColumns
                        ? this.$props.gridColumns[2]
                        : _column
                }
                if (this.$props.resizeH && this.$refs.tableRef) {
                    //计算表格的高度
                    // let comH=this.$refs.tableRef.offsetHeight;
                    // if(this.$refs.tableHeaderRef){
                    //     const headerH=this.$refs.tableHeaderRef.offsetHeight
                    //     comH=comH-headerH
                    // }
                    // if(this.$refs.tableBottomRef){
                    //     const bottomH=this.$refs.tableBottomRef.offsetHeight
                    //     console.log(bottomH)
                    //     comH=comH-bottomH
                    // }
                    // this.tableHeight=comH
                    // console.log(this.tableHeight)
                }
            },
            /**
             * @name: handleSizeChange
             * @msg: 每页面显示个数改变回调事件
             * @return {*}
             */
            handleSizeChange(val) {
                this.pagination.pageSize = val
                this.handleOnChange()
            },
            /**
             * @name: handleSortChange
             * @msg: 当表格的排序条件发生变化的时候会触发该事件
             * @param {*} column
             * @param {*} prop
             * @param {*} order
             * @return {*}
             */
            handleSortChange({ column, prop, order }) {
                console.log(column, prop, order)
            },
            /**
             * @name: handleCurrentChange
             * @msg: 表格分页改变事件
             * @param {*} val当前页面
             * @return {*}
             */
            handleCurrentChange(val) {
                this.pagination.pageNum = val
                this.handleOnChange()
            },
            /**
             * @name: handleOnChange
             * @msg:  需要表格查询数据改变方法
             * @return {*}
             */
            handleOnChange() {
                this.loading = true
                this.$emit('on-change', {
                    resolve: this.rejectTableData,
                    params: {
                        pageSize: this.pagination.pageSize,
                        pageNum: this.pagination.pageNum,
                        condition: this.searchParams,
                    },
                })
            },
            /**
             * @name: rejectTableData
             * @msg: 回传表格请求后的数据
             * @param {*} {records,total}
             * @return {*}
             */
            rejectTableData({ records, total }) {
                if (records) {
                    this.tableData = records
                }
                if (total >= 0) {
                    this.pagination.total = Number(total)
                }
                this.loading = false
            },
            /**
             * @name: onSearchChange
             * @msg: 查询事件
             * @return {*}
             */
            onSearchChange() {
                this.handleOnChange()
            },
            /**
             * @name: 重置
             * @msg:
             * @return {*}
             */
            onResetChange() {
                this.pagination.pageNum = 1
                Object.keys(this.searchParams).map((key) => {
                    this.searchParams[key] = this.$props.resetSearchParams[key] || null
                })
                this.handleOnChange()
            },
            /**
             * @name: 当选择项发生变化时会触发该事件
             * @test: test font
             * @msg:
             * @return {*}
             */
            handleSelectionChange(selection) {
                this.currentSelection = selection
                this.$emit('selection-change', selection)
            },
            /**
             * @name: 当用户手动勾选数据行的 Checkbox 时触发的事件
             * @test: test font
             * @msg:
             * @param {*} selection
             * @param {*} row
             * @return {*}
             */
            handleSelect(selection, row) {
                this.currentSelectRow = row
                this.$emit('select', selection, row)
            },
            /**
             * @name: 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态
             * @test: test font
             * @msg:
             * @return {*}
             */
            setCurrentRow(row) {
                if (this.$refs.eltableRef) {
                    this.$refs.eltableRef.setCurrentRow(row)
                } else {
                    throw error('表格设置当前行eltableRef error')
                }
            },
            changeTypeModle(type) {
                this.patternType = type
            },
            updateTableLayout() {
                this.$nextTick(() => {
                    this.$refs.eltableRef.doLayout()
                })
            },
            handleChangeCard(value) {
                this.$emit('changeToggle', value)
            },
            handleExpandChange(row, expandedRows) {
                this.$emit('expand-change', row, expandedRows)
            },
        },
    }
</script>
<template>
    <div ref="table" class="conataner" :class="resizeH == true ? 'conataner-resize' : ''">
        <SearchForm
            ref="searchRef"
            @on-search="onSearchChange"
            @on-rest="onResetChange"
            :isShowRest="isShowRest"
            :isShowMore="isShowMore"
            :cols="cols"
            v-if="search"
            :searchName="searchName"
        >
            <slot name="search" />
            <template #search-button>
                <slot name="search-button" />
            </template>
        </SearchForm>
        <div class="rltable" v-loading="loading" ref="tableRef">
            <div class="rltable-head" ref="tableHeaderRef" v-if="showTableHeader">
                <div class="left">
                    <slot name="head-left-button" />
                </div>
                <div class="right">
                    <el-radio-group
                        size="small"
                        v-model="patternType"
                        v-if="showCard"
                        @change="handleChangeCard"
                    >
                        <el-radio-button label="table">
                            <i class="iconfont icon-liebiao"></i>
                        </el-radio-button>
                        <el-radio-button label="card">
                            <i class="iconfont icon-table"></i>
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="rltable-body">
                <el-table
                    :data="tableData"
                    :stripe="stripe"
                    :border="border"
                    v-bind="options"
                    :showHeader="showHeader"
                    @sort-change="handleSortChange"
                    v-if="patternType == 'table' ? true : false"
                    @selection-change="handleSelectionChange"
                    @select="handleSelect"
                    ref="eltableRef"
                    :height="tableHeight"
                    :max-height="tableHeight"
                    :size="size"
                    :row-key="rowKey"
                    :row-style="rowStyle"
                    :default-expand-all="defaultExpandAll"
                    :expand-row-keys="expandRowKeys"
                    :spanMethod="spanMethod"
                    @expand-change="handleExpandChange"
                    :empty-text="noDataText"
                >
                    <!-- 默认表格表头组件插槽 -->
                    <slot />
                </el-table>
                <div
                    v-if="patternType == 'card' ? true : false"
                    :style="{
                        height: tableHeight + 'px',
                        overflow: resizeH ? 'auto' : '',
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                    }"
                >
                    <div class="table-empty" v-if="tableData.length <= 0">
                        <div class="emptyBox">
                            <!-- <div class="empty-image">
                                <img src="@/assets/null-data.png" />
                            </div> -->
                            <span class="table__empty-text">暂无数据</span>
                        </div>
                    </div>
                    <div
                        v-if="tableData && tableData.length > 0"
                        class="rltable-card-body"
                        :style="{ gridTemplateColumns: `repeat(${gridCardColumn}, 1fr)` }"
                    >
                        <div v-for="(item, index) in tableData" :key="item[rowKey] || index">
                            <slot name="cardItem" :data="item" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref="tableBottomRef"
                style="
                    min-height: 32px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    display: flex;
                    justify-content: flex-end;
                "
                v-if="isPagination"
            >
                <slot name="pagination">
                    <el-pagination
                        :row-key="rowKey"
                        :page-size="pagination.pageSize"
                        :total="pagination.total"
                        :page-sizes="pagination.pageSizes"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.pageNum"
                        layout="total, sizes, prev, pager, next, jumper"
                    />
                </slot>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .conataner {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        ::v-deep .el-table {
            background: $table-bg;
            tr {
                background: $table-defalut-tr-bg;
            }
            .el-table__expand-icon {
                color: $table-search-text-color;
            }
        }
    }

    .rltable {
        width: 100%;
        overflow: hidden;
        background: $table-search-bg-color;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding-left: 24px;
        padding-right: 24px;
        border-radius: 4px;
        padding-top: 15px;

        ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
            background: $table-striped-bg; //此处修改奇数行表格颜色
        }
        ::v-deep .el-table::before,
        .el-table--group::after,
        .el-table--border::after {
            //去掉表格最下面的横线
            // background-color: $table-before-line-color;
            background-color: #EBEEF0;
            // background-color: transparent;
        }
        ::v-deep .el-table__fixed-right::before {
            // background-color: $table-before-line-color;
            background-color: #EBEEF0;
            // background-color: transparent;
        }
        ::v-deep .el-pagination__total {
            color: $table-pagination-total-color;
        }
        ::v-deep .el-pagination__jump {
            color: $table-pagination-total-color;
        }
        ::v-deep .el-table__fixed::before {
            // background-color: $table-before-line-color;
            background-color: #EBEEF0;
            // background-color: transparent;
        }
        ::v-deep .el-pagination button:disabled {
            background-color: $com-bg-color;
        }
        ::v-deep .el-pager li {
            background: $com-bg-color;
        }
        ::v-deep .el-loading-mask {
            background-color: rgba(255, 255, 255, 0.1);
        }
        &-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        &-body {
            padding: 0px 0;
            flex: 1;
            overflow: hidden;
            position: relative;

            .cardBody {
                width: 100%;
                display: flex;
                box-sizing: border-box;
            }
        }

        &-card-body {
            display: grid;
            grid-gap: 25px;
        }

        .table-empty {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10% 0;

            .emptyBox {
                margin: 0 8px;
                font-size: 14px;
                line-height: 1.5715;
                text-align: center;

                .empty-image {
                    width: 140px;
                    height: 72px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .table__empty-text {
                    color: #909399;
                    line-height: 60px;
                }
            }
        }
    }

    .table-search {
        // margin-bottom: 10px;
        margin-bottom: 16px;
        padding: 16px 24px 24px;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 0 12px #0000000d;
    }

    ::v-deep .el-table__body-wrapper {
        height: inherit;
    }
    ::v-deep .el-table__fixed-right-patch {
        background: transparent;
    }
    // ::v-deep .el-table__fixed-body-wrapper {
    //     top: 40px !important;
    // }
    .conataner-resize {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        display: flex;
        flex-direction: column;

        .rltable {
            flex-grow: 1;
        }
    }
    ::v-deep {
        .el-radio-button__inner,
        .el-radio-button:first-child .el-radio-button__inner {
            border-color: rgba(255, 255, 255, 0.2) !important;
        }
    }
</style>

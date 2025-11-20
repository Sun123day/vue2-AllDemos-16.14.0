<template>
    <div class="baseTree">
            <!-- placeholder="请输入你想搜索的内容" -->
        <el-input
            :placeholder="placeholderSearch"
            v-if="isSearch"
            v-model="searchText"
            icon="ios-search"
            size="small"
            class="pa-input"
            prefix-icon="iconfont icon-sousuo"
            @input="treeInputChange"
            clearable
            style="margin-top: 15px; margin-bottom: 15px;"
        />
        <div class="baseTreeList">
            <el-tree
                :default-expand-all="defaultExpandAll"
                :node-key="defaultProps['id']"
                :props="defaultProps"
                :data="data"
                :lazy="lazy"
                :load="dataOnLoad"
                :check-strictly="checkStrictly"
                :show-checkbox="showCheckbox"
                :highlight-current="highlightCurrent"
                :filter-node-method="filterNode"
                :default-expanded-keys="defaultExpandedkeys"
                :expand-on-click-node="expandOnClickNode"
                @check="handleCheckChange"
                @node-click="treeNodeClick"
                @node-expand="treeNodeExpand"
                @node-collapse="treeNodeCollapse"
                :current-node-key="currentNodeKey"
                :default-checked-keys="defaultCheckedKeys"
                ref="myTree"
                class="energy-tree"
                node-key="id"
                :empty-text="noDataText"
            >
                <span class="custom-tree-node tree-node-text" slot-scope="{ node, data }">
                    <Space>
                        <!-- <i v-if="!data.children" class="el-icon-folder"></i>
                        <i v-else class="el-icon-folder-opened"></i> -->
                        <span class="nodeContent">
                            <!--    <slot :node="node" :data="data" name="lefticon" /> -->
                            <span class="tree-node-label" :title="node.label">{{
                                node.label
                            }}</span>
                            <!-- <span v-if="data.children">({{ data.children.length }})</span> -->
                            <slot name="rightTools" :node="node" :data="data" />
                        </span>
                    </Space>
                </span>
            </el-tree>
        </div>
    </div>
</template>
<script>
    import { Tree } from 'element-ui'
    export default {
        components: { Tree },
        props: {
            defaultProps: {
                type: Object,
                default: () => {
                    return {
                        isLeaf: 'isLeaf',
                        children: 'children',
                        label: 'label',
                        id: 'id',
                    }
                },
            },
            //是否展示搜索
            isSearch: {
                type: Boolean,
                default() {
                    return false
                },
            },
            checkStrictly: {
                type: Boolean,
                default() {
                    return false
                },
            },
            //是否异步加载
            lazy: {
                type: Boolean,
                default() {
                    return false
                },
            },
            data: {
                type: Array,
                default() {
                    return []
                },
            },
            //是否高亮当前选中节点
            highlightCurrent: {
                type: Boolean,
                default() {
                    return true
                },
            },

            //展开节点
            expandClick: {
                type: Boolean,
                default() {
                    return true
                },
            },
            expandOnClickNode: {
                type: Boolean,
                default() {
                    return false
                },
            },
            //异步加载
            dataOnLoad: { type: Function },
            nodeClick: { type: Function },
            nodeExpand: { type: Function },
            nodeCollapse: { type: Function },
            //勾选的节点
            defaultCheckedKeys: {
                type: Array,
                default() {
                    return []
                },
            },
            //展开节点的id
            defaultExpandedkeys: {
                type: Array,
                default() {
                    return []
                },
            },
            //是否展示checkbox
            showCheckbox: {
                type: Boolean,
                default() {
                    return false
                },
            },
            //当前选中的节点；
            currentNodeKey: { type: String },
            //默认展示全部节点;
            defaultExpandAll: {
                type: Boolean,
                default() {
                    return false
                },
            },
        },
        created(){
        },
        data() {
            return {
                searchText: '',
            }
        },
        watch: {
            currentNodeKey: function (value) {
                this.$nextTick(() => {
                    if (value) {
                        this.$refs.myTree.setCurrentKey(value)
                    }
                })
            },
            searchText(val) {
                this.$refs.myTree.filter(val)
            },
        },
        computed:{
            placeholderSearch() {
                if(this.$store.state.language == 'zh'){
                    return '请输入你想搜索的内容'
                }else{
                    return '請輸入你想搜尋的內容'
                }
            },
            noDataText(){
                return this.$store.state.language == 'zh'? '暂无数据' : '暫無數據' 
            }
        },
        methods: {
            handleCheckChange(checkedNodes, data, node) {
                this.$emit('checkChange', { checkedNodes, data, node })
            },
            treeNodeExpand(data, node, self) {
                this.$emit('nodeExpand', { data, node, self })
            },
            treeNodeCollapse(data, node, self) {
                this.$emit('nodeCollapse', { data, node, self })
            },
            treeNodeClick(data, node, slef) {
                this.$emit('nodeClick', { data, node, slef })
            },
            searchClick(text) {
                if (!this.lazy) {
                    this.$refs.myTree.filter(text)
                } else {
                    this.$emit('on-enter', text)
                }
            },
            treeInputChange(text) {
                if (!this.lazy) {
                    this.$refs.myTree.filter(text)
                } else {
                    this.$emit('input', text)
                }
            },
            filterNode(value, data) {
                if (!value) return true
                return data[this.defaultProps.label].indexOf(value) !== -1
            },
        },
    }
</script>
<style lang="scss" scoped>
    .el-checkbox__input .el-checkbox__inner {
        width: 16px;
        height: 16px;
        // border: 2px solid #DCDFE6 !important;
        border: 1px solid #E1E4E6 !important;
        border-radius: 2px;
        background-color: #fff !important;
    }
    // .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    //     background-color: $primary-color !important;
    // }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: $primary-color !important;
    }
    .baseTree {
        background: transparent !important;
        .el-checkbox__inner:hover {
            border-color: rgba(255, 255, 255, 1) !important;
        }
        height: 100%;
        width: 100%;
        display: flex;
        flex-grow: 1;
        -webkit-flex-grow: 1;
        -ms-flex-grow: 1;
        flex-direction: column;
        position: relative;
        ::v-deep .el-tree-node__expand-icon.is-leaf {
            //display: none !important;
            // color: #919a9e;
            // width: 14px;
            width: 20px;
        }
        ::v-deep .custom-tree-node .nodeContent {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 140px;
            .tree-node-label {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .ivu-icon {
            color: #2f64f7;
            padding-right: 8px;
            font-size: 18px;
        }
        .ivu-icon-md-mail {
            color: #adb9da;
        }
        .baseTreeList {
            flex-grow: 1;
            -webkit-flex-grow: 1;
            -ms-flex-grow: 1;
            overflow-y: auto;
            overflow-x: auto;
            height: 0;
            padding-top: 6px;
            .el-tree {
                height: 100%;
                background-color: transparent !important;
            }
        }
        .baseTreeList::-webkit-scrollbar {
            width: 4px;
        }
        .baseTreeList::-webkit-scrollbar-thumb {
            border-radius: 3px;
        }
        .tree-node-text {
            display: flex;
            align-items: center;
            vertical-align: middle;
            height: 26px;
            overflow: hidden;
            display: flex;
        }
        ::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            background-color: $primary-color;
            // background-color: #E8EFFF !important;
        }

        ::v-deep .el-tree-node .is-focusable:hover {
            background-color: transparent !important;
        }

        ::v-deep .el-tree-node__content:hover {
            background-color: $nav-bar-bg-color;
        }

        ::v-deep .el-tree-node .is-focusable:hover {
            background-color: $primary-color;
        }
    }
</style>

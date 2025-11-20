const BaseProps = {
    size: {
        type: String, //medium / small / mini
        default: () => {
            return 'small'
        },
    },
    resizeH: {
        type: Boolean,
        default: () => true,
    },
    //是否展示card和表格切换
    showCard: {
        type: Boolean,
        default: () => false,
    },
    //行数据的 Key，用来优化 Table 的渲染
    rowKey: {
        type: String,
        default: 'id',
    },
    //表格组件数据属性
    data: {
        type: Array,
        default: () => {
            return []
        },
    },
    //带斑马纹表格
    stripe: {
        type: Boolean,
        default: () => true,
    },
    //是否带有纵向边框
    border: {
        type: Boolean,
        default: () => false,
    },
    height: {
        type: [String, Number],
    },
    maxHeight: {
        type: [String, Number],
    },
    //是否显示表头
    showHeader: {
        type: Boolean,
        default: () => {
            return true
        },
    },
    //每页显示条目个数
    pageSize: {
        type: Number,
        default: 20,
    },
    //每页显示个数选择器的选项设置
    pageSizes: {
        type: Array,
        default: () => [10, 20, 30, 40, 50, 100],
    },
    //当前页
    currentPage: {
        type: Number,
        default: 1,
    },
    //是否需要分页组件
    isPagination: {
        type: Boolean,
        default: () => {
            return true
        },
    },
    showTableHeader: {
        type: Boolean,
        default: () => true,
    },
    //是否初始化加载数据
    initData: {
        type: Boolean,
        default: () => true,
    },
    search: {
        type: Boolean,
        default: () => true,
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
    // 列尺寸？
    cols: {
        type: Object,
        default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
    },
    /**
     * 用于不同分辨率
     * gridColumns[0] 1366 ~ 1440 分辨率；
     * gridColumns[1] 1440 ~  1600 分辨率；
     * gridColumns[2] > 1600 分辨率；
     */
    gridColumns: {
        type: Array,
    },
    gridColumn: {
        type: Number,
    },
    cardRender: {
        type: Function,
    },
    rowStyle: {
        type: Function,
    },
    options: {
        type: Object,
        default: () => ({}),
    },
    resetSearchParams: {
        type: Object,
        default: () => ({}),
    },
    defaultExpandAll: {
        type: Boolean,
        default: () => false,
    },
    spanMethod: {
        type: Function,
    },
    expandRowKeys: {
        type: Array,
        default: () => [],
    },
}
export default BaseProps

export default {
    // 路由
    route: {
        dashboard: '首页',
    },
    // 导航栏
    navbar: {
        dashboard: '首页',
    },
    login: {
        logIn: '登录',
        username: '账号',
        password: '密码',
    },
    // 表格常用
    components: {
        operation: '操作',
        order: '序号',
        createTime: '创建时间',
        updateTime: '更新时间',
        tel: '联系电话',
    },
    // 常用按钮
    table: {
        search: '查询',
        reset: '重置',
        add: '新增',
        export: '导出',

        edit: '编辑',
        delete: '删除',
        detail: '详情',
        config: '配置',
        handle: '处理',

        cancel: '取消',
        confirm: '确认',
        save: '保存',
    },
    // 常用输入提示
    placeholder: {
        input: '请输入',
        choose: '请选择',
    },
    // 大区管理
    regionMessage: {
        // 输入提示
        placeholderName: '请输入地区名称',
        placeholderCode: '请输入地区编码',

        // 搜索条件
        searchName: '地区名称',
        searchCode: '地区编码',

        // 表格列
        tableName: '地区名字',
        tableCode: '地区编码',

        // 操作栏
        operAddChild: '新增子区域',

        // 弹窗
        dialogParentName: '上级地区名称',
        dialogName: '地区名称',
        dialogCode: '地区编码',
    },
    // 项目档案
    proArchive: {
        // 输入提示
        placeholderKeyWord: '请输入项目名称/负责人',

        // 搜索条件
        searchKeyWord: '项目关键字',

        // 表格列
        tableName: '项目名称',
        tablePerson: '项目负责人',
        
        // 弹窗
        dialogName: '项目名称',
        dialogENG: '英文名称',
        dialogPerson: '负责人',
        dialogTel: '联系方式',
        dialogArea: '所属区域',
        dialogAddr: '详细地址',
        dialogBuild: '建筑面积',
        dialogPublic: '公区面积',
        dialogRental: '租户面积',
        dialogPark: '车场面积',
        dialogImg: '项目图片',

    },
    // 分组管理
    groupManage:{
        // 输入提示
        // placeholderName: '请输入分组名称',
        placeholderSearch: '请输入你想搜索的内容',

        // 搜索条件
        // searchTxt: '绑定计量器具',

        // 表格列
        tableDevice: '计量器具',
        tableType: '计量器具类型',
        tableUnbind: '解绑',

        // 弹窗
        dialogTopName: '分类标准名称',
        dialogCatorName: '分项名称',
        dialogEnergyName: '能耗类型',
        dialogTopLevel: '上级分类',
        dialogAddTop: '新增分类标准',
        dialogAddChild: '新增子分项',

        // 按钮
        btnAdd: '新增分组',
        btnBind: '绑定',
        btnAddGroup: '添加',
        btnEditGroup: '编辑',
        btnDeleteGroup: '删除',

        // 提示
        tipBind: '绑定计量器具',

    },

    // 因子管理
    factorManage: {
        // 输入提示

        // 搜索条件
        searchArea: '地区',
        searchYear: '年份',

        // 表格列
        tableArea: '地区',
        tableYear: '年份',
        tableEnergy: '能源类型',
        tableCarbon: '碳因子值',

        // 弹窗
        dialogArea: '所属区域',
        dialogEnergy: '能源类型',
        dialogYear: '启用年份',
        dialogCarbon: '因子值',

    },
    // 采集配置

    // 测点管理
    measurePoint: {
        // tab类
        tabType: '计量器具类型',
        tabDevice: '计量器具',

        // 输入提示
        placeholderTypeName: '请输入类型名称',

        placeholderName: '请输入名称',
        placeholderDeviceCode: '请输入计量器具编码',

        // 搜索条件
        searchTypeName: '类型名称',

        searchName: '名称',
        searchVirtual: '是否虚拟',
        searchDeviceCode: '计量器具编码',
        searchType: '计量器具类型',
        

        // 表格列
        tableTypeName: '计量器具类型名称',
        tableTypeCode: '计量器具类型编码',
        tableEnergyType: '能源类型',

        tableDeviceName: '计量器具名称',
        tableDeviceCode: '计量器具编码',
        tableTypeName: '计量器具类型',
        tableVirtual: '是否虚拟计量器具',
        tableModel: '型号名称',
        tableBrand: '品牌名称',
        tableContainerNo: '计量器具柜号',
        tablePointCount: '测点数量',
        tableOnlineStatus: '在线状态',

        // 弹窗
        dialogTypeName: '计量器具类型名称',
        dialogEnergyType: '能源类型',

        dialogPropertyName: '属性名称',
        dialogProperty: '属性',
        dialogPropertyDataType: '属性数据类型',
        dialogPoint: '测点',
        dialogMaster: '是否是计量属性',
        dialogTags: '标签',
        dialogUnit: '单位',
        
        dialogName: '名称',
        dialogDataType: '数据类型',
        dialogIndex: '排序',
        dialogFormula: '计算规则表达式',

        dialogBindProject: '绑定项目',
        dialogVirtual: '是否虚拟器具',
        dialogDeviceName: '计量器具名称',
        dialogDeviceCode: '计量器具编码',
        dialogType: '计量器具类型',
        dialogParent: '父级计量器具',
        dialogBrand: '计量器具品牌',
        dialogModel: '计量器具型号',
        dialogContainerNo: '计量器具柜号',

    },

    // 录入管理
    entryManage: {
        // tab类
        electric: '用电量录入',
        cold: '制冷面积录入',

        // 输入提示
        placeholderUpdateUser: '请输入更新人',
        placeholderProjectId: '请选择项目',
        placeholderInput: '请输入',
        placeholderChoose: '请选择',

        // 搜索条件
        searchYear: '补录年份',
        searchUpdateUser: '更新人',
        searchProject: '项目',

        // 表格列
        tableTime: '月份',
        tableUpdateTime: '更新时间',
        tableUpdateUser: '更新人',
        tableVersionName: '版本名称',
        tableUseDate: '版本生效日期',
        tableTotalArea: '制冷面积(㎡)',
        tableRemark: '备注',

        // 弹窗
        dialogMonth: '补录月份',
        dialogTotalDosage: '用电总量',
        dialogTotalPrice: '用总电费',
        dialogNeedPrice: '需量费用',
        dialogFuelPrice: '燃料费用',
        dialogOtherPrice: '其他费用',
        dialogPriceFactor: '电费系数',

        dialogProject: '项目',
        dialogVersionName: '版本名称',
        dialogUseDate: '启用时间',
        dialogStore: '店铺编号',
        dialogArea: '店铺面积(㎡)',
        dialogStatus: '店铺状态',
        dialogStart: '已租',
        dialogStop: '停租',
    },

    // 能源计划
    energyPlan: {
        // 输入提示

        // 搜索条件
        searchCode: '计划粒度',

        // 表格列
        tableTime: '时间',
        tablePlan: '能源计划',
        tableGrade: '能源实绩',
        tableRest: '计划余量',

        // 弹窗
        dialogTime: '计划时间',
        dialogCator: '选择分项',
        dialogPlan: '能源计划',
        dialogType: '计划分配方式',

        // 卡片
        cardPlan: '能源计划',
        cardGrade: '能源实绩',
        cardRest: '计划余量',
        cardRate: '计划余量占比',

        // 按钮
        btnConfig: '配置能源计划',
    },

    // 能源实绩
    actualConumption: {
        // 输入提示

        // 搜索条件
        // searchCode: '计划粒度',

        // 表格列
        tableTime: '日期',
        tablePlanValue: '能源计划',
        tableActualValue: '能源实绩',
        tableDiff: '差值',
        tableTemperature: '室外温度(℃)',

        // 弹窗
        // dialogTime: '计划时间',

        // 其余描述
        titleCalendar: '能耗日历',
        titleActual: '能耗实绩评分',
        tooltipContent1: '1.能源实绩值/能源计划=[95%,105%]，定义为优秀；',
        tooltipContent2: '2.能源实绩值/能源计划值=[0%,95%)U（105%,110%),定义为正常；',
        tooltipContent3: '3.能源实绩值/能源计划值=[110%,+∞),定义为超标；',
        tooltipContent4: '4.基准分值为100分，优秀每天+2分，超标每天-5分，正常每天不加减分；',
        gradeGood: '优秀',
        gradeNormal: '正常',
        gradeMore: '超标',
        gradeNotFound: '无数据',

        txtValidDays: '本月有效评价天数',
    },

    // 能耗趋势
    consumptionTrend: {
        // 输入提示

        // 搜索条件
        searchTime: '时间',
        searchTimeChoose: '选择时间',
        
        // 表格列
        tableTime: '日期/时间',
        tableRealPower: '实绩用电量',
        tablePrePower: '预测用电量',
        tableBasePower: '基准用电量',
        tableSavePower: '节能量',

        // 其他
        tooltipContentPre: 'AI节能算法根据中央空调实时运行情况预测的用电量',
        tooltipContentBase: 'AI节能算法根据客观环境下预测中央空调运行所需的用电量',
        tooltipContentSave: '空调实际用电量与基准用电量的差值',
    },

    // 能耗对比分析
    consumptionContrast: {
        // 输入提示

        // 搜索条件
        searchTime: '时间粒度',
        searchTimeChoose: '选择时间',

        // 表格列
        tableName: '名称',
        tableChain: '环比(%)',
        tableDiff: '差值',
        tableTime: '时间',
        tableNow: '本期数据',
        tableEx: '上期数据',
        tableYear: '同比(%)',

        // 弹窗
        // dialogTime: '时间',

        // 其他
        tabContrast: '能耗对比',
        tabYear: '同比分析',
        tabChain: '环比分析',
    },

    // 运行历史参数
    runHistoryParameter: {
        // 输入提示
        placeholderDataType: '请选择数据类型',
        placeholderFrequency: '请选择频率',

        // 搜索条件
        searchDataType: '数据类型',
        searchFrequency: '频率',
        searchTime: '时间',
    },

    // 能耗结构
    consumptionStruct: {
        // 输入提示
        placeholderProjectId: '请选择项目',

        // 搜索条件
        searchProject: '项目',
        searchTime: '时间粒度',
        searchTimeChoose: '选择时间',

        // 表格列
        tableTime: '时间',
        tableAir: '空调用电(kW·h)',
        // tableAirRate: '空调用电占比(%)',
        tableAirRate: '空调用电占比',
        tableOther: '其他用电(kW·h)',
        // tableOtherRate: '其他用电占比(%)',
        tableOtherRate: '其他用电占比',

        // box标题
        boxTrend: '占比趋势',
        boxStruct: '用电结构',
        boxTable: '数据报表',
    },

    // 能耗费用
    consumptionFee: {
        // 搜索条件
        searchTime: '时间粒度',
        searchTimeChoose: '选择时间',

        // 表格列
        tableTime: '时间',
        tableRealFee: '实际电费(HK$)',
        tablePreFee: '预测电费(HK$)',
    },

    // 操作日志
    operationLog: {
        // 输入提示
        placeholderKeyWord: '请输入用户名称/分组节点',
        placeholderSource: '请选择操作源',
        placeholderType: '请选择操作类型',

        // 搜索条件
        searchSource: '操作源',
        searchType: '操作类型',
        searchTime: '操作时间',

        // 表格列
        tableTime: '时间',
        tableUser: '用户',
        tableSource: '操作源',
        tableGroup: '分组/节点',
        tableType: '类型',
        tableDetail: '详情',
    },

    // 告警历史
    alarmHistory: {
        // 输入提示
        placeholderKeyWord: '请输入消息源/描述',
        placeholderInput: '请输入',
        // 搜索条件
        searchProject: '项目名称',
        searchAlarm: '告警状态',
        searchOrder: '工单状态',
        searchTime: '告警时间',
        // 表格列
        tableTime: '时间',
        tableProject: '项目名称',
        tableSource: '消息源',
        tableRecover: '是否恢复',
        tableRecoverTime: '恢复时间',
        tableDescription: '描述',
        tableOrder: '工单状态',
    },

    // 能耗环评 
    consumptionChain: {
        // 输入提示
        
        // 搜索条件
        searchIndicator: '能耗指标',
        searchTime: '时间粒度',
        searchTimeChoose: '选择时间',

        // box标题
        boxProfile: '指标概览',
        boxIndicator: '指标评价',
        boxCompare: '指标对比',

        // 表格列
        tableName: '项目',
        tableActual: '实际值',
        tableStandard: '标杆值',
        tableDiff: '绝对值差',

        // 其他
        commentIndicator: '指标评价',

    },

    // 能耗指标分析
    consumptionIndicator: {
        // 输入提示
        
        // 搜索条件
        searchIndicator: '能耗指标',
        searchTime: '时间粒度',
        searchTimeChoose: '选择时间',

        // 表格列
        tableTime: '时间',
        tableStandard: '数据标杆值(kWh/m²)',
        tableControl: '数据约束值(kWh/m²)',
        tableStandardDiff: '数据标杆值差(kWh/m²)',
        tableControlDiff: '数据约束值差(kWh/m²)',
    },

    // 能效指标分析
    efficiencyIndicator: {
        // 输入提示

        // 搜索条件
        searchIndicator: '能效指标',
        searchTime: '时间粒度',
        searchTimeChoose: '选择时间',

        // 表格列
        tableTime: '时间',
        tableElectricity: '用电量(kW·h)',
        tableRT: '冷量(RT)',

        // box标题
        boxIndicator: '指标统计',

        // 评价条
        commentNew: '采用新技术',
        commentOutStanding: '杰出',
        commentExcellent: '优秀',
        commentGood: '良好',
        commentNormal: '普通',
        commentBad: '亟需改善',
        commentIndicator: '指標分析',

        // 卡片
        cardFatcor1: '制冷性能系数',
        cardFatcor2: '主机系统性能系数',
        cardConsumption: '累计能耗',
        cardCold: '累计冷量',
    },

    // 诊断分析
    diagnosisAnalysis: {
        // 输入提示
        placeholderInput: '请输入',

        // 搜索条件
        searchDevice: '诊断设备',
    },

    // 模型性能分析
    modelAnalysis: {
        // 其他
        boxTitle1: '冷水主机AI模型性能',
        boxTitle2: '冷冻水泵AI模型性能',
        boxTitle3: '冷却水泵AI模型性能',
        boxTitle4: '冷却塔AI模型性能',

        // 搜索条件
        searchDevice: '仿真设备',
        searchData: '输入数据',
        
        //其他 
        modelAccuracy: '当前模型精确度'
    }
}

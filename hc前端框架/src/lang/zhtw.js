export default {
    // 路由
    route: {
        dashboard: '首頁',
    },
    // 导航栏
    navbar: {
        dashboard: '首頁',
    },
    login: {
        logIn: '登入',
        username: '帳號',
        password: '密碼',
    },
    // 表格常用
    components: {
        operation: '操作',
        order: '序號',
        createTime: '創建時間',
        updateTime: '更新時間',
        tel: '聯繫電話',
    },
    // 常用按钮
    table: {
        search: '查詢',
        reset: '重置',
        add: '新增',
        export: '導出',

        edit: '編輯',
        delete: '刪除',
        detail: '詳情',
        config: '配置',
        handle: '處理',

        cancel: '取消',
        confirm: '確認',
        save: '儲存',
    },
    // 常用输入提示
    placeholder: {
        input: '請輸入',
        choose: '請選擇',
    },
    // 大区管理
    regionMessage: {
        // 输入提示
        placeholderName: '請輸入地區名稱',
        placeholderCode: '請輸入地區編碼',

        // 搜索条件
        searchName: '地區名稱',
        searchCode: '地區編碼',

        // 表格列
        tableName: '地區名稱',
        tableCode: '地區編碼',

        // 操作栏
        operAddChild: '新增子區域',

        // 弹窗
        dialogParentName: '上級地區名稱',
        dialogName: '地區名稱',
        dialogCode: '地區編碼',
    },
    // 项目档案
    proArchive: {
        // 输入提示
        placeholderKeyWord: '請輸入項目名稱/負責人',

        // 搜索条件
        searchKeyWord: '項目關鍵字',

        // 表格列
        tableName: '項目名稱',
        tablePerson: '項目負責人',
        
        // 弹窗
        dialogName: '項目名稱',
        dialogENG: '英文名稱',
        dialogPerson: '負責人',
        dialogTel: '聯繫方式',
        dialogArea: '所屬區域',
        dialogAddr: '詳細地址',
        dialogBuild: '建築面積',
        dialogPublic: '公區面積',
        dialogRental: '租戶面積',
        dialogPark: '車場面積',
        dialogImg: '項目圖片',

    },
    // 分组管理
    groupManage:{
        // 输入提示
        // placeholderName: '请输入分组名称',
        placeholderSearch: '請輸入你想搜尋的內容',

        // 搜索条件
        // searchTxt: '绑定计量器具',

        // 表格列
        tableDevice: '計量器具',
        tableType: '計量器具類型',
        tableUnbind: '解綁',

        // 弹窗
        dialogTopName: '分類標準名稱',
        dialogCatorName: '分項名稱',
        dialogEnergyName: '能耗類型',
        dialogTopLevel: '上級分類',
        dialogAddTop: '新增分類標準',
        dialogAddChild: '新增子分項',

        // 按钮
        btnAdd: '新增分組',
        btnBind: '綁定',
        btnAddGroup: '添加',
        btnEditGroup: '編輯',
        btnDeleteGroup: '刪除',

        // 提示
        tipBind: '綁定計量器具',

    },

    // 因子管理
    factorManage: {
        // 输入提示

        // 搜索条件
        searchArea: '地區',
        searchYear: '年份',

        // 表格列
        tableArea: '地區',
        tableYear: '年份',
        tableEnergy: '能源類型',
        tableCarbon: '碳因子值',

        // 弹窗
        dialogArea: '所屬區域',
        dialogEnergy: '能源類型',
        dialogYear: '啟用年份',
        dialogCarbon: '因子值',

    },
    // 采集配置

    // 测点管理
    measurePoint: {
        // tab类
        tabType: '計量器具類型',
        tabDevice: '計量器具',

        // 输入提示
        placeholderTypeName: '請輸入類型名稱',

        placeholderName: '請輸入名稱',
        placeholderDeviceCode: '請輸入計量器具編碼',

        // 搜索条件
        searchTypeName: '類型名稱',

        searchName: '名稱',
        searchVirtual: '是否虛擬',
        searchDeviceCode: '計量器具編碼',
        searchType: '計量器具類型',
        

        // 表格列
        tableTypeName: '計量器具類型名稱',
        tableTypeCode: '計量器具類型編碼',
        tableEnergyType: '能源類型',

        tableDeviceName: '計量器具名稱',
        tableDeviceCode: '計量器具編碼',
        tableTypeName: '計量器具類型',
        tableVirtual: '是否虛擬計量器具',
        tableModel: '型號名稱',
        tableBrand: '品牌名稱',
        tableContainerNo: '計量器具櫃號',
        tablePointCount: '測點數量',
        tableOnlineStatus: '在線狀態',

        // 弹窗
        dialogTypeName: '計量器具類型名稱',
        dialogEnergyType: '能源類型',

        dialogPropertyName: '屬性名稱',
        dialogProperty: '屬性',
        dialogPropertyDataType: '屬性數據類型',
        dialogPoint: '測點',
        dialogMaster: '是否是計量屬性',
        dialogTags: '標籤',
        dialogUnit: '單位',
        
        dialogName: '名稱',
        dialogDataType: '數據類型',
        dialogIndex: '排序',
        dialogFormula: '計算規則表達式',

        dialogBindProject: '綁定項目',
        dialogVirtual: '是否虛擬器具',
        dialogDeviceName: '計量器具名稱',
        dialogDeviceCode: '計量器具編碼',
        dialogType: '計量器具類型',
        dialogParent: '父級計量器具',
        dialogBrand: '計量器具品牌',
        dialogModel: '計量器具型號',
        dialogContainerNo: '計量器具櫃號',

    },

    // 录入管理
    entryManage: {
      // tab类
      electric: '用電量輸入',
      cold: '制冷面積輸入',

      // 输入提示
      placeholderUpdateUser: '請輸入更新人',
      placeholderProjectId: '請選擇項目',
      placeholderInput: '請輸入',
      placeholderChoose: '請選擇',

      // 搜索条件
      searchYear: '補錄年份',
      searchUpdateUser: '更新人',
      searchProject: '項目',

      // 表格列
      tableTime: '月份',
      tableUpdateTime: '更新時間',
      tableUpdateUser: '更新人',
      tableVersionName: '版本名稱',
      tableUseDate: '版本生效日期',
      tableTotalArea: '制冷面積(㎡)',
      tableRemark: '備註',

      // 弹窗
      dialogMonth: '補錄月份',
      dialogTotalDosage: '用電總量',
      dialogTotalPrice: '用總電費',
      dialogNeedPrice: '需量費用',
      dialogFuelPrice: '燃料費用',
      dialogOtherPrice: '其他費用',
      dialogPriceFactor: '電費係數',
      
      dialogProject: '項目',
      dialogVersionName: '版本名稱',
      dialogUseDate: '啟用時間',
      dialogStore: '店鋪編號',
      dialogArea: '店鋪面積(㎡)',
      dialogStatus: '店鋪狀態',
      dialogStart: '已租',
      dialogStop: '停租',
    },

    // 能源计划
    energyPlan: {
        // 输入提示

        // 搜索条件
        searchCode: '計劃粒度',

        // 表格列
        tableTime: '時間',
        tablePlan: '能源計劃',
        tableGrade: '能源實績',
        tableRest: '計劃余量',

        // 弹窗
        dialogTime: '計劃時間',
        dialogCator: '選擇分項',
        dialogPlan: '能源計劃',
        dialogType: '計劃分配方式',

        // 卡片
        cardPlan: '能源計劃',
        cardGrade: '能源實績',
        cardRest: '計劃余量',
        cardRate: '計劃余量佔比',

        // 按钮
        btnConfig: '配置能源計劃',
    },

    // 能源实绩
    actualConumption: {
        // 输入提示

        // 搜索条件
        searchCode: '計劃粒度',

        // 表格列
        tableTime: '日期',
        tablePlanValue: '能源計劃',
        tableActualValue: '能源實績',
        tableDiff: '差值',
        tableTemperature: '室外溫度(℃)',

        // 弹窗
        // dialogTime: '计划时间',

        // 其余描述
        titleCalendar: '能耗日曆',
        titleActual: '能耗實績評分',
        tooltipContent1: '1.能源實績值/能源計劃=[95%,105%]，定義為優秀；',
        tooltipContent2: '2.能源實績值/能源計劃值=[0%,95%)U（105%,110%),定義為正常；',
        tooltipContent3: '3.能源實績值/能源計劃值=[110%,+∞),定義為超標；',
        tooltipContent4: '4.基準分值為100分，優秀每天+2分，超標每天-5分，正常每天不加减分；',
        gradeGood: '優秀',
        gradeNormal: '正常',
        gradeMore: '超標',
        gradeNotFound: '無數據',

        txtValidDays: '本月有效評價天數',
    },

    // 能耗趋势
    consumptionTrend: {
        // 输入提示

        // 搜索条件
        searchTime: '時間',
        searchTimeChoose: '選擇時間',
        
        // 表格列
        tableTime: '日期/時間',
        tableRealPower: '實績用電量',
        tablePrePower: '預測用電量',
        tableBasePower: '基準用電量',
        tableSavePower: '節能量',

        // 其他
        tooltipContentPre: 'AI節能算法根據中央空調實時運行情況預測的用電量',
        tooltipContentBase: 'AI節能算法根據客觀環境下預測中央空調運行所需的用電量',
        tooltipContentSave: '空調實際用電量與基準用電量的差值',
    },

    // 能耗对比分析
    consumptionContrast: {
        // 输入提示

        // 搜索条件
        searchTime: '時間粒度',
        searchTimeChoose: '選擇時間',

        // 表格列
        tableName: '名稱',
        tableChain: '環比(%)',
        tableDiff: '差值',
        tableTime: '時間',
        tableNow: '本期數據',
        tableEx: '上期數據',
        tableYear: '同比(%)',

        // 弹窗
        // dialogTime: '时间',

        // 其他
        tabContrast: '能耗對比',
        tabYear: '同比分析',
        tabChain: '環比分析',
    },

    // 运行历史参数
    runHistoryParameter: {
        // 输入提示
        placeholderDataType: '請選擇數據類型',
        placeholderFrequency: '請選擇頻率',

        // 搜索条件
        searchDataType: '數據類型',
        searchFrequency: '頻率',
        searchTime: '時間',
    },

    // 能耗结构
    consumptionStruct: {
        // 输入提示
        placeholderProjectId: '請選擇項目',

        // 搜索条件
        searchProject: '項目',
        searchTime: '時間粒度',
        searchTimeChoose: '選擇時間',

        // 表格列
        tableTime: '時間',
        tableAir: '空調用電(kW·h)',
        // tableAirRate: '空調用電佔比(%)',
        tableAirRate: '空調用電佔比',
        tableOther: '其他用電(kW·h)',
        // tableOtherRate: '其他用電佔比(%)',
        tableOtherRate: '其他用電佔比',

        // box标题
        boxTrend: '佔比趨勢',
        boxStruct: '用電結構',
        boxTable: '數據報表',
    },

    // 能耗费用
    consumptionFee: {
        // 搜索条件
        searchTime: '時間粒度',
        searchTimeChoose: '選擇時間',

        // 表格列
        tableTime: '時間',
        tableRealFee: '實際電費(HK$)',
        tablePreFee: '預測電費(HK$)',
    },

    // 操作日志
    operationLog: {
        // 输入提示
        placeholderKeyWord: '請輸入用戶名稱/分組節點',
        placeholderSource: '請選擇操作源',
        placeholderType: '請選擇操作類型',

        // 搜索条件
        searchSource: '操作源',
        searchType: '操作類型',
        searchTime: '操作時間',

        // 表格列
        tableTime: '時間',
        tableUser: '用戶',
        tableSource: '操作源',
        tableGroup: '分組/節點',
        tableType: '類型',
        tableDetail: '詳情',
    },

    // 告警历史
    alarmHistory: {
        // 输入提示
        placeholderKeyWord: '請輸入消息源/描述',
        placeholderInput: '請輸入',
        // 搜索条件
        searchProject: '項目名稱',
        searchAlarm: '告警狀態',
        searchOrder: '工單狀態',
        searchTime: '告警時間',
        // 表格列
        tableTime: '時間',
        tableProject: '項目名稱',
        tableSource: '消息源',
        tableRecover: '是否恢復',
        tableRecoverTime: '恢復時間',
        tableDescription: '描述',
        tableOrder: '工單狀態',
    },

    // 能耗环评 
    consumptionChain: {
        // 输入提示
        
        // 搜索条件
        searchIndicator: '能耗指標',
        searchTime: '時間粒度',
        searchTimeChoose: '選擇時間',

        // box标题
        boxProfile: '指標概覽',
        boxIndicator: '指標評價',
        boxCompare: '指標對比',

        // 表格列
        tableName: '項目',
        tableActual: '實際值',
        tableStandard: '標桿值',
        tableDiff: '絕對值差',

        // 其他
        commentIndicator: '指標評價',

    },

    // 能耗指标分析
    consumptionIndicator: {
        // 输入提示
        
        // 搜索条件
        searchIndicator: '能耗指標',
        searchTime: '時間粒度',
        searchTimeChoose: '選擇時間',

        // 表格列
        tableTime: '時間',
        tableStandard: '數據標桿值(kWh/m²)',
        tableControl: '數據約束值(kWh/m²)',
        tableStandardDiff: '數據標桿值差(kWh/m²)',
        tableControlDiff: '數據約束值差(kWh/m²)',
    },

    // 能效指标分析
    efficiencyIndicator: {
        // 输入提示

        // 搜索条件
        searchIndicator: '能效指標',
        searchTime: '時間粒度',
        searchTimeChoose: '選擇時間',

        // 表格列
        tableTime: '時間',
        tableElectricity: '用電量(kW·h)',
        tableRT: '冷量(RT)',

        // box标题
        boxIndicator: '指標統計',

        // 评价条
        commentNew: '採用新技術',
        commentOutStanding: '傑出',
        commentExcellent: '優秀',
        commentGood: '良好',
        commentNormal: '普通',
        commentBad: '亟需改善',
        commentIndicator: '指標分析',

        // 卡片
        cardFatcor1: '制冷性能係數',
        cardFatcor2: '主機系統性能係數',
        cardConsumption: '累計能耗',
        cardCold: '累計冷量',
    },

    // 诊断分析
    diagnosisAnalysis: {
        // 输入提示
        placeholderInput: '請輸入',

        // 搜索条件
        searchDevice: '診斷設備',
    },

    // 模型性能分析
    modelAnalysis: {
        // 其他
        boxTitle1: '冷水主機AI模型性能',
        boxTitle2: '冷凍水泵AI模型性能',
        boxTitle3: '冷卻水泵AI模型性能',
        boxTitle4: '冷卻塔AI模型性能',

        // 搜索条件
        searchDevice: '仿真設備',
        searchData: '輸入數據',
        
        //其他 
        modelAccuracy: '當前模型精確度'
    }
}

<template>
    <div :class="{ 'has-logo': showLogo }">
        <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
        <el-scrollbar wrap-class="scrollbar-wrapper" style="overflow-x: hidden">
            <el-menu
                :default-active="activeMenu"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <div v-for="menuItem in menuData" :key="menuItem.key">
                    <el-submenu
                        v-if="!menuItem.hidden && menuItem.resourceType === '1'"
                        :index="menuItem.path"
                    >
                        <template slot="title">
                            <Item
                                :icon="menuItem.meta && menuItem.meta.icon"
                                :title="generateTitle(menuItem.meta.title)"
                            />
                        </template>
                        <AppLink
                            v-for="subItem in menuItem.children || []"
                            :key="subItem.key"
                            :to="resolvePath(subItem.path)"
                            :options="subItem"
                            v-if="!subItem.hidden"
                        >
                            <el-menu-item :key="subItem.key" :index="subItem.path">
                                <Item
                                    :icon="subItem.meta && subItem.meta.icon"
                                    :title="generateTitle(subItem.meta.title)"
                                />
                            </el-menu-item>
                        </AppLink>
                    </el-submenu>
                    <AppLink
                        v-if="!menuItem.hidden && menuItem.resourceType === '2'"
                        :key="menuItem.key"
                        :to="resolvePath(menuItem.path)"
                        :options="menuItem"
                    >
                        <el-menu-item :index="menuItem.path">
                            <Item
                                :icon="menuItem.meta && menuItem.meta.icon"
                                :title="generateTitle(menuItem.meta.title)"
                            />
                        </el-menu-item>
                    </AppLink>
                </div>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import variables from '@/styles/variables.scss'
    import AppLink from './Link'
    import path from 'path'
    import { generateTitle } from '@/utils/i18n'
    import { isExternal } from '@/utils/validate'
    import Item from './Item'
    export default {
        components: {
            AppLink,
            Item,
        },
        data() {
            return {
                num: 0,
                // menuData: [],
            }
        },
        computed: {
            ...mapState({
                navMenu: (state) => state.navMenu,
                sidebarLogo: (state) => state.settings.sidebarLogo,
                sidebarOpened: (state) => state.sidebar.opened,
            }),
            activeMenu() {
                const route = this.$route
                const { meta, path } = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            showLogo() {
                return this.sidebarLogo
            },
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebarOpened
            },
            computedNavMenu() {
                const list = this.$lodash.cloneDeep(this.navMenu) // 创建深拷贝副本
      
                const simpToTradMap = {
                    '看板': '看板',
                    '能源驾驶舱': '能源駕駛艙',
                    '能源管理': '能源管理',
                    '能源计划': '能源計劃',
                    '能源实绩': '能源實績',
                    '能耗环评': '能耗環評',
                    '能耗结构': '能耗結構',
                    '能耗费用': '能耗費用',
                    '能耗趋势分析': '能耗趨勢分析',
                    '能耗对比分析': '能耗對比分析',
                    '能耗指标分析': '能耗指標分析',
                    '能效指标分析': '能效指標分析',
                    '运行分析': '運行分析',
                    '实时运行组态': '實時運行組態',
                    '组态编辑': '組態編輯',
                    '运行历史参数': '運行歷史參數',
                    '运行诊断分析': '運行診斷分析',
                    '模型性能分析': '模型性能分析',
                    'AI设备管理': 'AI設備管理',
                    '工作单': '工作單',
                    '工单详情': '工單詳情',
                    '创建工单': '創建工單',
                    '智能问答': '智能問答',
                    '问答日志': '問答日誌',
                    '知识库管理': '知識庫管理',
                    '数据看板': '數據看板',
                    '人员管理': '人員管理',
                    '物料信息管理': '物料信息管理',
                    '物业信息管理': '物業信息管理',
                    '系统日志': '系統日誌',
                    '告警历史': '告警歷史',
                    '系统管理': '系統管理',
                    '大区管理': '大區管理',
                    '项目档案': '項目檔案',
                    '分组管理': '分組管理',
                    '因子管理': '因子管理',
                    '采集配置': '採集配置',
                    '测点管理': '測點管理',
                    '录入管理': '錄入管理'
                }

                // 函数用于递归转换列表中的简体为繁体
                const convertToTraditional = (items) => {
                    return items.map(item => {
                        const tradLabel = simpToTradMap[item.label] || item.label
                        let tradMeta = {}
                        if (item.meta) {
                            tradMeta = {
                                ...item.meta,
                                title: simpToTradMap[item.meta.title] || item.meta.title
                            }
                        }
                        const tradChildren = item.children ? convertToTraditional(item.children) : null
                        return {
                            ...item,
                            label: tradLabel,
                            meta: tradMeta,
                            children: tradChildren
                        }
                    })
                }
                // 获取转换后的繁体列表
                const zhtwList = convertToTraditional(list)

                return this.$store.state.language == 'zh'? this.navMenu : zhtwList
            },
            menuData() {
                // console.log("navMenu", this.navMenu)
                // console.log("这里应该是侧边栏显示", this.computedNavMenu)
                return this.$lodash.cloneDeep(this.computedNavMenu)
                // return this.$lodash.cloneDeep(this.navMenu)
            }
        },
        watch: {},
        // mounted() {
        //     this.initMenuData()
        // },
        methods: {
            // initMenuData() {
            //     console.log("这里应该是侧边栏显示", this.computedNavMenu)
            //     // this.menuData = this.$lodash.cloneDeep(this.navMenu)
            //     // this.menuData = this.$lodash.cloneDeep(this.computedNavMenu)
            // },
            countNum(val) {
                let arr = val.filter(
                    (item) =>
                        item.conversationID !== '@TIM#SYSTEM' &&
                        item.conversationID !== 'C2Cadministrator'
                )
                this.num = arr.reduce((acc, cur) => {
                    return acc + cur.unreadCount
                }, 0)
                this.num = this.num < 100 ? this.num : '99+'
            },
            resolvePath(routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }

                return path.resolve(this.basePath || '', routePath)
            },
            generateTitle,
        },
    }
</script>
<style lang="scss" scoped>
    ::v-deep .el-scrollbar {
        height: 100%;
    }
    ::v-deep .el-scrollbar__view {
        height: 100%;
        background: $menuBg;
    }
    ::v-deep .el-menu {
        border-right: none;
        .el-menu-item.is-active {
            //border-right: 4px solid $primary-color;
            background-color: $menuActiveBgColor !important;
        }
        .el-submenu.is-active {
            .el-submenu__title {
                color: $primary-color;
            }
        }
        .el-submenu__title:hover {
            background-color: $menuActiveBgColor !important;
        }
        .el-menu-item:hover,
        .el-menu-item:focus {
            background-color: $menuActiveBgColor !important;
        }
    }
</style>

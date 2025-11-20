<!--
 * @Author: your name
 * @Date: 2021-11-02 09:39:24
 * @LastEditTime: 2021-11-02 09:54:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \management-system\src\components\Breadcrumb\index.vue
-->
<template>
    <el-breadcrumb class="app-breadcrumb" separator=">">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <span
                    v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                    class="no-redirect"
                >
                    {{ generateTitle(item.meta.title) }}
                </span>
                <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
    import { generateTitle } from '@/utils/i18n'
    import pathToRegexp from 'path-to-regexp'

    export default {
        data() {
            return {
                levelList: null,
            }
        },
        watch: {
            $route(route) {
                // if you go to the redirect page, do not update the breadcrumbs
                if (route.path.startsWith('/redirect/')) {
                    return
                }
                this.getBreadcrumb()
            },
            '$store.state.language': {
                handler() {
                    this.getBreadcrumb()
                }
            }
        },
        created() {
            this.getBreadcrumb()
        },
        computed: {
          computedMatched() {
            const matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
            const list = this.$route.matched.filter((item) => item.meta && item.meta.title)
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
            const convertToTraditional = (items) => {
                return items.map(item => {
                    let tradMeta = {}
                    if (item.meta) {
                        tradMeta = {
                            ...item.meta,
                            title: simpToTradMap[item.meta.title] || item.meta.title
                        }
                    }
                    return {
                        ...item,
                        meta: tradMeta,
                    }
                })
            }
            // 获取转换后的繁体列表
            const zhtwList = convertToTraditional(list)
            // console.log("这里是navbar显示", zhtwList)
            return this.$store.state.language == 'zh'? matched : zhtwList
          }  
        },
        methods: {
            generateTitle,
            getBreadcrumb() {
                // only show routes with meta.title
                // const matched = this.$route.matched.filter((item) => item.meta && item.meta.title)

                // const first = matched[0]

                // if (!this.isDashboard(first)) {
                //   matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
                // }

                // this.levelList = matched.filter(
                this.levelList = this.computedMatched.filter(
                    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
                )
            },
            isDashboard(route) {
                const name = route && route.name
                if (!name) {
                    return false
                }
                return name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase()
            },
            pathCompile(path) {
                // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
                const { params } = this.$route
                var toPath = pathToRegexp.compile(path)
                return toPath(params)
            },
            handleLink(item) {
                const { redirect, path } = item
                if (redirect) {
                    this.$router.push(redirect)
                    return
                }
                this.$router.push(this.pathCompile(path))
            },
        },
    }
</script>

<style lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        // line-height: 40px;
        line-height: 32px;
        margin-left: 24px;

        .no-redirect {
            color: #999999;
            cursor: text;
        }
    }
</style>

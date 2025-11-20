import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import settings from '@/settings'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    state: {
        //登录token
        token: null,
        //登录用户信息
        userInfo: null,
        //系统菜单
        navMenu: [],
        //动态路由
        routes: [],
        //功能按钮权限
        permissionList: [],
        //缓存页面
        keepAliveComponents: [],
        device: 'desktop',
        settings: {
            fixedHeader: settings.fixedHeader,
            sidebarLogo: settings.sidebarLogo,
            tagsView: settings.tagsView,
        },
        sidebar: {
            opened: true,
            withoutAnimation: false,
        },
        size: 'small',
        // language: 'zh',
        language: 'zhtw',
        projectId: '1', // Hook:测试使用 勿删
        logoPath: '',
        // languageFlag: true,
        // 设置存储实时运行组态中的点位数据
        realTimeList1: [],
        realTimeList2: [],
        realTimeList3: [],
        realTimeList4: [],
    },
    modules,
    mutations,
    actions,
    getters,
})
export default store

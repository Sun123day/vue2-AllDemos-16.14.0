import router, { dynamicRoutes } from '@/router'
import store from './store'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress' // progress bar
import { getToken, getRedirectLogin } from '@/utils/auth'
import { redirect } from '@/utils/index'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/auth-redirect']

const NODE_ENV = process.env.NODE_ENV

router.beforeEach((to, from, next) => {
    NProgress.start()

    if (getToken()) {
        /**
         * 如果有token登陆则进入页面
         */
        getStartResouce(to, from, next)
    } else {
        /**
         * 如果没有token则进入登陆页面.
         * 1、开发环境则进入本地项目登陆界面.
         * 2、其他环境则进入安全平台登陆界面
         */
        // console.log(2222222, to)

        /**
         * 如果采用单点登录，这里的逻辑就是看有没有ticket，没有ticket，则跳向统一的登录页面，如果有，则调用统一的认证中心，通过认证后放行，否则跳向统一的登录中心
         */
        if (NODE_ENV == 'development') {
            /**
             * 1、开发环境，本地登陆
             */
            //1、如果进入的路由是不需要权限验证则执行
            if (whiteList.indexOf(to.path) !== -1) {
                next()
                return
            }
            //判断如果本身就是进入登录路由则执行，否则重定向登录界面
            if (to.path == '/login') {
                next()
                return
            } else {
                next(`/login?redirect=${from.path}`)
            }
        } else {
            /**
             * 其他环境;
             * 1、如果环境变量配置了（VUE_LOCAHOST_LOGIN）为true；那么正式环境为本地项目登录界面。
             *
             * 2、VUE_LOCAHOST_LOGIN）为false，环境则进入安全平台登陆界面（从定向安全云登陆界面）
             */
            redirect(next, from, to)
        }
    }
})

/**
 * @function 判断是否首次登陆，首次登陆需获取用户信息和菜单
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const getStartResouce = (to, from, next) => {
    //判断store缓存里是否有登录用户信息，用于判断是否首次登录
    if (!store.state.userInfo) {
        //1、首次登录，需要先发送获取登录用户信息、菜单数据接口请求,
        store
            .dispatch('loginUserInfo')
            .then(() => {
                store.dispatch('GenerateRoutes').then((routeData) => {
                    router.addRoutes(routeData)
                    next({ ...to })
                    NProgress.done()
                    return
                })
            })
            .catch(() => {
                store.dispatch('userLoginOut').then(() => {
                    next({ path: '/' })
                })
            })
    } else {
        if (to.path === '/login') {
            //1、如果进入的是登陆界面,则进入首页
            next({ path: '/' })
        } else {
            next()
        }
    }
}
/**
 * @function 路由跳转后执行
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
router.afterEach((to, from, next) => {
    //缓存功能权限按钮到store
    // 从当前路由的元信息中获取 `permissionList`，如果不存在则默认为空数组
    const { permissionList = [] } = router.currentRoute.meta
    // 将获取到的 `permissionList` 赋值给 Vuex store 中的 `permissionList` 状态
    store.state.permissionList = permissionList

    /**
     * @descrptions 缓存组件
     */
    // console.log("permission - from", from)
    // 从 `from` 路由的元信息中获取 `keepAlive`，如果不存在则默认为 `false`
    const { keepAlive = false } = from.meta
    if (keepAlive) {
        // 从 Vuex store 中获取 `keepAliveComponents` 数组，如果不存在则默认为空数组
        const keepAliveArr = store.state.keepAliveComponents || []
        // 检查 `from` 路由的名称是否已经存在于 `keepAliveArr` 中
        if (keepAliveArr.indexOf(from.name) < 0) {
            // console.log("进入了")
            // 如果不存在，则将 `from` 路由的名称添加到 `keepAliveArr` 中
            keepAliveArr.push(from.name)
            // 更新 Vuex store 中的 `keepAliveComponents` 数组
            store.state.keepAliveComponents = keepAliveArr
        }
        // console.log("11111permission - keepAliveArr", keepAliveArr)
    }
    NProgress.done()
})
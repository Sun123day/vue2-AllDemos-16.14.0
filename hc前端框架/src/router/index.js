import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const HomeRoute = {
    // path: '/index',
    // name: 'Index',
    // hidden: false,
    // resourceType: '2',
    // component: () => import('@/views/billBoard/index'),
    // meta: { title: '看板', icon: 'nav-billboard', affix: true },
    path: '/cockpit',
    name: 'Cockpit',
    hidden: false,
    resourceType: '2',
    component: () => import('@/views/cockpit/index'),
    meta: { title: '驾驶舱', icon: 'nav-billboard', affix: true },
}
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
        meta: {
            title: 'login',
        },
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true,
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true,
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true,
    },
    {
        path: "/mine",
        component: Layout,
        hidden: true,
        children: [
            {
                path: "/mine/reset",
                component: () => import("@/views/mine/reset"),
                meta: {
                    title: "账户设置",
                    icon: "documentation",
                    affix: true
                }
            }
        ]
    },
    {
        // path: '',
        // component: Layout,
        // // component: () => import('@/views/billBoard/index'),
        // redirect: '/index',
        // children: [HomeRoute],
        path: '',
        // component: Layout,
        component: () => import('@/views/cockpit/index'),
        redirect: '/cockpit',
        children: [HomeRoute],
    },
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = []

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({
            y: 0,
        }),
        routes: [...constantRoutes, ...dynamicRoutes],
    })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router

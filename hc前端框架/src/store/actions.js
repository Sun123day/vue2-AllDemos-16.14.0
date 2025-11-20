import { getLoginUserInfo, getNavMenu, loginOut } from '@/api/system'
import { generatorRoutes } from '@/router/parseRoute'
import Cookies from 'js-cookie'
import { clearCookies, removeToken } from '@/utils/auth'
import store from '@/store'

// 设置存储实时运行组态中的点位数据相关内容
import { findProArchiveOptions } from '@/api/proArchive'
import { findConfigurationDataList } from '@/api/realtimeConfiguration'

const actions = {
    /**
     * @function 获取实时运行组态中的点位数据；
     * @param {*} param0
     */
    realTimeList({ commit, list }) {
        return new Promise((resolve, reject) => {
            findProArchiveOptions().then((res) => {
               const mallList = res.data || []
               if (mallList && mallList.length > 0) {
                    findConfigurationDataList(mallList[0].value)
                    .then((res) => {
                       commit('SET_REALTIME_LIST1', res.data)
                       resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
                    findConfigurationDataList(mallList[1].value)
                    .then((res) => {
                       commit('SET_REALTIME_LIST2', res.data)
                       resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
                    findConfigurationDataList(mallList[2].value)
                    .then((res) => {
                       commit('SET_REALTIME_LIST3', res.data)
                       resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
                    findConfigurationDataList(mallList[3].value)
                    .then((res) => {
                       commit('SET_REALTIME_LIST4', res.data)
                       resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
               } 
            })
        })
    },

    /**
     * @function 登录用户信息action；
     * @param {*} param0
     */
    loginUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getLoginUserInfo()
                .then((result) => {
                    const resultData = result.data
                    resultData.avatar = require('@/assets/image/defaultImg.png')
                    commit('SET_USERINFO', resultData)
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    /**
     * @function 获取路由
     * @param {*} param0
     */
    async GenerateRoutes({ commit, state }) {
        return new Promise(async (resolve) => {
            const result = await getNavMenu()
            //获取到配置菜单路由数据.
            const resultData = result.data || []

            //解析成路由
            const routers = generatorRoutes(resultData)
            // console.log("store/actions => routers", routers)
            commit('SAVE_NAV_MENU', routers)
            resolve(routers)
        })
    },
    /**
     * @function 退出登录
     */
    userLoginOut() {
        return new Promise((resolve, reject) => {
            loginOut()
                .then((result) => {
                    if (result.code == '200') {
                        const rememberMe = Cookies.get('rememberMe')
                        if (!rememberMe) {
                            //清除cookies
                            clearCookies()
                        } else {
                            removeToken()
                        }
                        store.state.userInfo = null
                        resolve()
                    } else {
                        reject()
                    }
                })
                .catch(() => {
                    reject()
                })
        })
    },
    setLogoPath({ commit }, path) {
        commit('SET_LOGO_PATH', path)
    },
}
export default actions

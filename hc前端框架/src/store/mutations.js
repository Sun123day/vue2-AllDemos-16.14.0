const mutations = {
    /**
     * @function 保存登录用户信息
     * @param {*} state
     * @param {*} userInfo
     */
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
    },
    SAVE_NAV_MENU: (state, navMenu) => {
        state.navMenu = navMenu
    },
    SET_LOGO_PATH: (state, path) => {
        state.logoPath = path
    },
    SET_REALTIME_LIST1: (state, list) => {
        state.realTimeList1 = list
        // console.log("state.realTimeList1", list)
    },
    SET_REALTIME_LIST2: (state, list) => {
        state.realTimeList2 = list
        // console.log("state.realTimeList2", list)
    },
    SET_REALTIME_LIST3: (state, list) => {
        state.realTimeList3 = list
        // console.log("state.realTimeList3", list)
    },
    SET_REALTIME_LIST4: (state, list) => {
        state.realTimeList4 = list
        // console.log("state.realTimeList4", list)
    },
}
export default mutations

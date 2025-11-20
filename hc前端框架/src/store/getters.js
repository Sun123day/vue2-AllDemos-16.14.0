const getters = {
    //缓存登录token
    token: (state) => state.token,
    language: (state) => state.language,
    size: (state) => state.size,
    projectId: (state) => state.projectId,
    logoPath: (state) => state.logoPath,
    // languageFlag: (state) => state.languageFlag,
    realTimeList1: (state) => state.realTimeList1,
    realTimeList2: (state) => state.realTimeList2,
    realTimeList3: (state) => state.realTimeList3,
    realTimeList4: (state) => state.realTimeList4
}
export default getters

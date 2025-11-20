import {
  getSaveEnergy,
  getEnergyMonths,
  getEnergyIndex,

  getTotalEnergy,
  getMapData,

  getColdStation,

  getElectricAiStatus,
  getDeviceAiStatus,
} from '@/api/cockpit'

const state = {
  currentTypeCode: '',
  // 空调节能效益
  saveEnergy: {},
  // 近12月能耗
  energyMonths: [],
  // 用能指标排名
  energyElecIndex: [],
  // 空调指标排名
  energyAirIndex: [],
  // 累计用能
  totalEnergy: {},
  // 地图数据
  mapData: [],
  // 冷站数据
  coldStationData: [], 

  // 节能AI运行状态
  aiElectricStatusData: {},
  // 设备AI运行状态
  aiDeviceStatusData: {},
}

const mutations = {
  // 空调节能效益
  SAVE_ENERGY_AJAX: (state, params) => {
      getSaveEnergy(params).then((result) => {
          // console.log("空调节能效益", result)
          state.saveEnergy = result.data || {}
      })
  },
  // 近12月能耗
  ENERGY_MONTHS_AJAX: (state, params) => {
      getEnergyMonths(params).then((result) => {
          // console.log("近12月能耗", result)
          state.energyMonths = result.data || []
      })
  },
  // 能耗指标排名
  ENERGY_INDEX_AJAX: (state, params) => {
      getEnergyIndex(params).then((result) => {
          // console.log("能耗指标排名", result)
          state.energyElecIndex = result.data?.end || []
          state.energyAirIndex = result.data?.air || []
      })
  },

  // 累计用能
  TOTAL_ENERGY_AJAX: (state, params) => {
      getTotalEnergy(params).then((result) => {
          // console.log("累计用能", result)
          state.totalEnergy = result.data || {}
      })
  },
  // 地图数据
  MAP_DATA_AJAX: (state, params) => {
      getMapData(params).then((result) => {
        //   console.log("地图数据", result)
          state.mapData = result.data || []
      })  
  },

  // 冷站数据
  COLD_STATION_AJAX: (state, params) => {
      getColdStation(params).then((result) => {
          // console.log("冷站数据", result)
          state.coldStationData = result.data || []
      })
  },

  // ai运行状态
  ELECTRICITY_AI_STATUS_AJAX: (state, params) => {
      // 节能AI运行状态
      getElectricAiStatus(params).then((result) => {
        //   console.log("节能ai运行状态", result)
          state.aiElectricStatusData = result.data || {}
      })
  },
  DEVICE_AI_STATUS_AJAX: (state, params) => {
      // 设备AI运行状态
      getDeviceAiStatus(params).then((result) => {
          // console.log("设备ai运行状态", result)
          state.aiDeviceStatusData = result.data || {}
      }) 
  },
  ENERGY_TYPE_CODE: (state, code) => {
      state.currentTypeCode = code
  },
  CLEAR_CO_STORE: (state) => {
      state.saveEnergy = {}
      state.energyMonths = []
      state.energyElecIndex = []
      state.energyAirIndex = []

      state.totalEnergy = {}
      state.mapData = []

      state.coldStationData = []

      state.aiElectricStatusData = {}
      state.aiDeviceStatusData = {}
  },
}

const actions = {
  // 空调节能效益
  SAVE_ENERGY_ACTION({ commit }, params) {
      commit('SAVE_ENERGY_AJAX', params)
  },
  // 近12月能耗
  ENERGY_MONTHS_ACTION({ commit }, params) {
      commit('ENERGY_MONTHS_AJAX', params)
  },
  // 能耗指标排名
  ENERGY_INDEX_ACTION({ commit }, params) {
      commit('ENERGY_INDEX_AJAX', params)
  },

  // 累计用能
  TOTAL_ENERGY_ACTION({ commit }, params) {
      commit('TOTAL_ENERGY_AJAX', params)
  },
  // 地图数据
  MAP_DATA_ACTION({ commit }, params) {
      commit('MAP_DATA_AJAX', params)
  },

  // 冷站数据
  COLD_STATION_ACTION({ commit }, params) {
      commit('COLD_STATION_AJAX', params)
  },

  // ai运行状态
  ELECTRICITY_AI_STATUS_ACTION({ commit }, params) {
      commit('ELECTRICITY_AI_STATUS_AJAX', params) 
  },
  DEVICE_AI_STATUS_ACTION({ commit }, params) {
      commit('DEVICE_AI_STATUS_AJAX', params) 
  },

  
  CLEAR_CO_STORE_ACTION({ commit }, params) {
      commit('CLEAR_CO_STORE', params)
  },
  ENERGY_TYPE_CODE_ACTION({ commit }, code) {
      commit('ENERGY_TYPE_CODE', code)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

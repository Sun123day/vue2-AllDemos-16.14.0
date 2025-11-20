import request from '@/utils/request'

// 能源计划新增和更新
export const updateEnergyPlan = (data) => request({ url: '/energy/plan', method: 'post', data })

//根据条件获取能源计划信息
export const getEnergyPlanOne = (data) =>
    request({ url: '/energy/plan/getOne', method: 'POST', data })

export const findEnergyPlanData = (data) =>
    request({ url: '/energy/plan/data', method: 'POST', data })

// 获取历史能源计划 
export function getHistoryPlan(params) {
    return request({
      url: "/energy/plan/history",
      method: "POST",
      data: params || {}
    });
  }
  

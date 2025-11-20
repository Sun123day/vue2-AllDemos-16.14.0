import request from '@/utils/request'
export const findTrendData = (data) =>
    request({ url: '/consumption/trend/list', method: 'POST', data })
export const exportTrendData = (data) =>
    request({ url: '/consumption/trend/list-export', method: 'POST', data, responseType: 'blob' })

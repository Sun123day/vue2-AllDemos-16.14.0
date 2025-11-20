import request from '@/utils/request'

// 设备及参数
export function getModelAnalysisDeviceParam(projectId) {
    return request({
        url: `/model/device/param/${projectId}`,
        method: 'GET',
    })
}
// 获取实际值和预测值
export function findModelAnalysisRealPre(params) {
    return request({
        url: '/model/device/real-pre',
        method: 'POST',
        data: params,
    })
}
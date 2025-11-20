import request from '@/utils/request'
export function categoryTreeGet(projectId) {
    return request({
        url: `/subitem/tree/${projectId}`,
        method: 'get',
    })
}

export function categorySave(data) {
    return request({
        url: '/subitem',
        method: 'post',
        data,
    })
}

export function categoryUpdate(data) {
    return request({
        url: '/subitem',
        method: 'put',
        data,
    })
}

export function categoryDelete(id) {
    return request({
        url: `/subitem/${id}`,
        method: 'delete',
    })
}

export function categoryDeviceQuery(subitemId) {
    return request({
        url: `/subitem/meter-utensils/${subitemId}`,
        method: 'get',
    })
}

export function categoryDeviceBind(data) {
    return request({
        url: `/subitem/meter-utensils`,
        method: 'post',
        data,
    })
}

export function categoryDeviceUnbind(id) {
    return request({
        url: `/subitem/meter-utensils/${id}`,
        method: 'delete',
    })
}

export function meterTreeGet(data) {
    return request({
        url: `/meter/getEnergyTypeTree`,
        method: 'post',
        data,
    })
}
export function findMeterCommonTree(projectId) {
    return request({
        url: `/meter/getCommonTree/${projectId}`,
        method: 'get',
    })
}

import request from '@/utils/request'

export const finPageTree = (params) => {
    return request({
        url: '/area/list-page',
        method: 'POST',
        data: params,
    })
}

export function addRequest(params) {
    return request({
        url: '/area',
        method: 'POST',
        data: params || {},
    })
}

export function deleteTableRow(id) {
    return request({
        url: `/area/${id}`,
        method: 'DELETE',
    })
}

export function updateRequest(params) {
    return request({
        url: '/area',
        method: 'PUT',
        data: params || {},
    })
}
// 获取地区树
export function getAreaTree() {
    return request({
        url: '/area/tree',
        method: 'GET',
    })
}
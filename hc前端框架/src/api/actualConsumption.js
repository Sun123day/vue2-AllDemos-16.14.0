import request from '@/utils/request'

// 查询
export function findActualList(params) {
    return request({
        url: '/actual/consumption/amount',
        method: 'POST',
        data: params,
    })
}

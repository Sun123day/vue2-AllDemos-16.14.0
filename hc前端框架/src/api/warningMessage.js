import request from '@/utils/request'

/**
 * @function 分页查询
 * @param {*} params
 * @return {*}
 */
export const finPageList = (params) => {
    return request({
        url: '/alarm/list-page',
        method: 'post',
        data: params,
    })
}
/**
 * @function 等级数据查询
 * @param {*} params
 * @return {*}
 */
export const findlevelList = (params) => {
    return request({
        url: '/alarm/count',
        method: 'post',
        data: params,
    })
}

// 更新
export function updateAlarmHandle(id) {
    return request({
        url: `/alarm/handle/${id}`,
        method: 'PUT',
    })
}

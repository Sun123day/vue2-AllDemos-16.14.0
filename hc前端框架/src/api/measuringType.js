/***
 * @description 计量器具类型管理接口
 */

import request from '@/utils/request'

/**
 * @function: finPageList查询
 * @param {*} params
 * @return {*}
 */
export function finPageList(params) {
    return request({
        url: '/meter/type/list-page',
        method: 'POST',
        data: params || {},
    })
}

/**
 * @function: deleteTableRow删除
 * @param {*} id
 * @return {*}
 */
export function deleteTableRow(id) {
    return request({
        url: `/meter/type/${id}`,
        method: 'delete',
    })
}

/**
 * @function:addRequest新增
 * @param {*} params
 * @return {*}
 */
export function addRequest(params) {
    return request({
        url: '/meter/type',
        method: 'POST',
        data: params || {},
    })
}

/**
 * @function:updateRequest更新
 * @param {*} params
 * @return {*}
 */
export function updateRequest(params) {
    return request({
        url: '/meter/type',
        method: 'PUT',
        data: params || {},
    })
}
/**
 * @function:getMeterTypeParaList 获取参数列表
 * @param {*} params
 * @return {*}
 */
export function getMeterTypeParaList(id) {
    return request({
        url: `/meter/type/property/${id}`,
        method: 'get',
    })
}
/**
 * @function:saveMeterTypeParaList 属性列表保存
 * @param {*} params
 * @return {*}
 */
export function saveMeterTypeParaList(id, data) {
    return request({
        url: `/meter/type/property/${id}`,
        method: 'post',
        data,
    })
}

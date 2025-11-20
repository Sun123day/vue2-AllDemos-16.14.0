/***
 * @description 计量器具管理接口
 */

import request from '@/utils/request'

/**
 * @function: finPageList查询
 * @param {*} params
 * @return {*}
 */
export function finPageList(params) {
    return request({
        url: '/meter/list-page',
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
        url: `/meter/${id}`,
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
        url: '/meter',
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
        url: '/meter',
        method: 'PUT',
        data: params || {},
    })
}

/**
 * @function: 计量器具属性详情数据
 * @param {*} params
 * @return {*}
 */
export function finMeterTypeProperty(meterUtensilTypeId) {
    return request({
        url: `/meter/type/property/${meterUtensilTypeId}`,
        method: 'GET',
    })
}
//计量器具历史数据
export function findHistoryList(data) {
    return request({
        url: `/meter/history`,
        method: 'post',
        data,
    })
}

export function findMeterPropertyByUtilId(meterUtensilId) {
    return request({
        url: `/meter/property/${meterUtensilId}`,
        method: 'GET',
    })
}
export function updateMeterPropertyByUtilId(meterUtensilId, data) {
    return request({
        url: `/meter/property/${meterUtensilId}`,
        method: 'post',
        data,
    })
}

export function findPropertyCalExpression(meterUtensilId) {
    return request({
        url: `/meter/property-cal-expression/${meterUtensilId}`,
        method: 'GET',
    })
}

export function updatePropertyCalExpression(meterUtensilId, data) {
    return request({
        url: `/meter/property-cal-expression/${meterUtensilId}`,
        method: 'post',
        data,
    })
}

// 根据计量器具id获取测点下拉
export function getPointsByMeterUtensilId(meterUtensilId) {
    return request({
        url: `/meter/points/${meterUtensilId}`,
        method: 'GET',
    })
}

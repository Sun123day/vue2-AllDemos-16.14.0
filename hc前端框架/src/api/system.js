/***
 * @description:系统相关api接口
 */

import request from '@/utils/request'

import { getAesString } from '@/utils/aesUtil'

/**
 * @function 登录
 * @param {*} username用户名称
 * @param {*} password用户密码
 * @param {*} validateCode验证码
 * @return {*} validateCodeKey
 */
export function login(loginParams) {
    const aesString = getAesString(
        JSON.stringify(loginParams),
        'hj7x89H$yuBI0456',
        'NIfb&95GUY86Gfgh'
    )
    // console.log(loginParams, "&&&&&&&&&&&&&&&&&");
    const postData = { ciphertext: aesString }  //加密操作，需要后端进行解析
    // console.log(postData, "))))))))))))))))");
    return request({
        url: '/user/login',
        method: 'post',
        headers: {
            isToken: false,
        },
        data: postData,
    })
}

/**
 * @function 退出登录
 * @return {*}
 */
export const loginOut = () => {
    return request({
        url: '/user/logout',
        method: 'get',
    })
}

/**
 * @function 验证码
 * @return {*}
 */
export const captchaImage = () => {
    return request({
        url: '/getCaptcha',
        headers: {
            isToken: false,
        },
        method: 'get',
        timeout: 20000,
    })
}

/**
 * @function 获取登录用户信息
 * @return {*}
 */
export const getLoginUserInfo = () => {
    return request({
        url: '/getLoginUser',
        method: 'get',
    })
}

/**
 * @function 获取菜单
 * @returns
 */
export const getNavMenu = () => {
    return request({
        url: '/findTree?endpointCode=WEB',
        method: 'get',
    })
}


/**
 * @name: 修改密码
 * @test: test font
 * @msg: 
 * @param {*} params
 * @return {*}
 */
export function modifyPassword(params) {
    // const aesString = getAesString(
    //     JSON.stringify(params),
    //     'hj7x89H$yuBI0456',
    //     'NIfb&95GUY86Gfgh'
    // )
    // const postData = { ciphertext: aesString }
    const postData = params
    return request({
        url: '/user/modifyPassword',
        method: 'post',
        data: postData,
    })
}
/*
 * @Author: your name
 * @Date: 2021-10-28 15:58:43
 * @LastEditTime: 2021-10-29 10:28:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \management-system\src\utils\request.js
 */
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { redirect, tansParams, blobValidate } from '@/utils/index'
import { saveAs } from 'file-saver'
// create an axios instance
let downloadLoadingInstance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        if (getToken() && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        config.headers['APP_TYPE'] = process.env.VUE_APP_SUB_APP_CODE
        if (store.state.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    (error) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response.data
        if (res.code && res.code != 200) {
            //返回码错误,错误提示这里已经统一处理，单个请求可以不再弹出消息
            const { hideMessageCodes } = response.config.headers
            if (!hideMessageCodes || !hideMessageCodes.includes(res.code)) {
                //如果头部不含hideMessageCodes，则直接调用后端的message提示，否则，接口调用的时候自行判断处理
                Message({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000,
                })
            }
            return Promise.resolve(res || 'Error') // 错误结果返回
            //return new Error(res || 'Error')  //之前是为了处理message不需要取后端返回的情况，现在用hideMessageCodes处理
        } else {
            if (res.code == '450') {
                removeToken()
                store.state.userInfo = null
                redirect()
                // to re-login
            }
            return res
        }
    },
    (error) => {
        const { code, msg } = error.response.data
        Message({
            message: msg || '网络请求超时',
            type: 'error',
            duration: 5 * 1000,
        })
        if (code == '450') {
            removeToken()
            store.state.userInfo = null
            redirect()
            // to re-login
        }
        return Promise.reject(error)
        //return new Error(res || 'Error')
    }
)
// 通用下载方法
export function download(url, params, filename, config) {
    downloadLoadingInstance = Loading.service({
        text: '正在下载数据，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return service
        .post(url, params, {
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: 'blob',
            ...config,
        })
        .then(async (data) => {
            const isLogin = await blobValidate(data)
            if (isLogin) {
                const blob = new Blob([data])
                saveAs(blob, filename)
            } else {
                Message.error(data.msg)
            }
            downloadLoadingInstance.close()
        })
        .catch((r) => {
            Message.error(r)
            downloadLoadingInstance.close()
        })
}
export default service

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length
    for (var i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) s++
        else if (code > 0x7ff && code <= 0xffff) s += 2
        if (code >= 0xdc00 && code <= 0xdfff) i--
    }
    return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
    if (!json) return ''
    return cleanArray(
        Object.keys(json).map((key) => {
            if (json[key] === undefined) return ''
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        })
    ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach((v) => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach((property) => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's this.$lodash.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

function isIdExsit(id, roleAuthList) {
    let ret = false
    roleAuthList.forEach((item) => {
        if (item.fucnCode === id) {
            ret = true
        }
    })
    return ret
}

/**
 *预处理权限List，如果里面的节点没有父级，增加父级节点
 *
 * @param {*} roleAuthList
 */
export function preRoleAuthList(roleAuthList) {
    const addArr = []

    roleAuthList.forEach((item) => {
        const parentNodeId = item.fucnCode.split('.')[0]

        // 非父级
        if (item.fucnCode.split('.').length > 1) {
            // 如果父级不存在   则添加父级
            if (!isIdExsit(parentNodeId, roleAuthList)) {
                addArr.push({
                    fucnCode: parentNodeId,
                })
            }
        }
    })
    return roleAuthList.concat(addArr)
}

/**
 *根据后台返回的权限路由得到需要动态添加的路由
 *先只适应二级菜单,如果菜单超过二层需要进行优化改进
 * @export
 * @param {*} allRoutes   全部路由
 * @param {*} roleAuthList   后台返回的权限路由
 */
export function getAuthRoute(allRoutes, roleAuthList, vm) {
    const length = allRoutes.length
    const retRoute = []
    for (let index = 0; index < length; index++) {
        const oriNode = allRoutes[index]
        const node = vm.$lodash.cloneDeep(oriNode)
        const id = node.meta && node.meta.id
        // 如果第一层头节点存在授权的列表中，则保存
        const isExist = isIdExsit(id, roleAuthList)
        if (isExist) {
            retRoute.push(node)
            node.children = []
            oriNode.children.forEach((child) => {
                const id = child.meta && child.meta.id
                const hidden = child.hidden // 子菜单是隐藏的跳过，不做比较
                const isExist = isIdExsit(id, roleAuthList)
                if (isExist || hidden) {
                    node.children.push(child)
                }
            })
        }
    }
    return retRoute
}

/**
 * @name: 根据key值查找名称
 * @test: test font
 * @msg:
 * @param {*} val
 * @param {*} options
 * @param {*} id
 * @return {*}
 */
export function findListName(val, options, id = 'id', name = 'name') {
    if (Array.isArray(options) && options.length > 0) {
        const newArr = options.filter((item) => {
            return item[id] === val
        })
        if (newArr.length > 0) {
            return newArr[0][name]
        } else {
            return ''
        }
    } else {
        return ''
    }
}

const locahost_login = process.env.VUE_APP_LOCAHOST_LOGIN
const PROTAL_REDIRECT = process.env.VUE_APP_PROTAL_REDIRECT
const NODE_ENV = process.env.NODE_ENV
export const redirect = (next, from, to, store) => {
    if (locahost_login == 'true') {
        //本地登录
        if (next) {
            console.log('next跳转本地登录')
            if (to.path == '/login') {
                next()
                return
            } else {
                if (from && from.path) {
                    next(`/login?redirect=${from.path}`)
                } else {
                    next(`/login`)
                }

                return
            }
        } else {
            //location.href = process.env.VUE_PROTAL_REDIRECT
            console.log(
                'router跳转本地登录',
                (window.location.protocol ? window.location.protocol + '://' : 'http://') +
                    window.location.host +
                    '/#/login'
            )
            //路由跳转
            //store._vm.$router.push({ path: "/login" });

            window.location.href =
                (window.location.protocol ? window.location.protocol + '//' : 'http://') +
                window.location.host +
                '/#/login'
            //alert(window.location.href)
            return
        }
    } else {
        /**
         * protal页面登录
         */
        console.log('protal页面登录')
        //window.location.href=getRedirectLogin()
        if (PROTAL_REDIRECT) {
            window.location.href = PROTAL_REDIRECT
            return
        } else {
            console.log('没有配置protal页面重定向地址')
            return
        }
    }
}

/**
 * 处理二维数组构建动态表格数据
 * @param {*} source
 * @returns
 */
export function transformTableData(source) {
    const targetObj = { head: [], data: [] }
    if (!source.length) {
        return targetObj
    }
    const head = source[0]
    const currentData = source.slice(1)
    const result = []
    currentData.forEach((item) => {
        const target = {}
        item.forEach((subItem, subIndex) => {
            target[head[subIndex]] = subItem
        })
        result.push(target)
    })
    targetObj.head = head
    targetObj.data = result
    return targetObj
}
/**
 * 二维数组，纵向转换
 * @param {*} arr
 * @returns
 */
// [ [1,2,3],[4,5,6] ] => [[1,4],[2,5],[3,6]]
export function transposeArray(arr) {
    const transposed = []
    for (let i = 0; i < arr[0].length; i++) {
        const column = []

        for (let j = 0; j < arr.length; j++) {
            column.push(arr[j][i])
        }
        transposed.push(column)
    }
    return transposed
}

export function transformBaseToBlobFile(imgStr) {
    const base64String = imgStr.split(',')[1]
    const byteCharacters = atob(base64String)
    const fileType = imgStr.match(/^data:(.*);base64,/)[1]
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: fileType.type })
    return URL.createObjectURL(blob)
}
/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName]
        var part = encodeURIComponent(propName) + '='
        if (value !== null && value !== '' && typeof value !== 'undefined') {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (
                        value[key] !== null &&
                        value[key] !== '' &&
                        typeof value[key] !== 'undefined'
                    ) {
                        let params = propName + '[' + key + ']'
                        var subPart = encodeURIComponent(params) + '='
                        result += subPart + encodeURIComponent(value[key]) + '&'
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + '&'
            }
        }
    }
    return result
}
// 验证是否为blob格式
export async function blobValidate(data) {
    try {
        const text = await data.text()
        JSON.parse(text)
        return false
    } catch (error) {
        return true
    }
}

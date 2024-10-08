/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
    const reg =
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

export function validateEmailRlue(rule, value, callback) {
    if (value === '') {
        callback()
    } else {
        if (!validEmail(value)) {
            callback(new Error('请输入正确的邮箱'))
        } else {
            callback()
        }
    }
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
    const reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
        return true
    }
    return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}
/**
 * @param {String} idcode
 * @returns {Boolean}
 * 身份证号码校验
 */
export function checkIDCard(idcode) {
    // 加权因子
    const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    // 校验码
    const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

    const code = idcode + ''
    const last = idcode[17] // 最后一位

    const seventeen = code.substring(0, 17)

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    const arr = seventeen.split('')
    const len = arr.length
    let num = 0
    for (let i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i]
    }

    // 获取余数
    const resisue = num % 11
    const last_no = check_code[resisue]

    // 格式的正则
    // 正则思路
    /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X
  */
    const idcard_patter =
        /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

    // 判断格式是否正确
    const format = idcard_patter.test(idcode)

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && !!format
}

export function validatePhone(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入手机号'))
    } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号'))
        } else {
            callback()
        }
    }
}
export function validatePhoneForm(rule, value, callback) {
    // 如果值为空，不进行验证，直接通过
    if (!value) {
        return callback();
    }
    // 验证手机号码格式
    if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('请输入正确的手机号'));
    } else {
        return callback();
    }
}


export function validatePwd(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        let reg =
            /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{9,20}$/
        if (!reg.test(value)) {
            callback(new Error('请输入正确的密码，必须包含大小写字母、数字、特殊字符中的三种'))
        } else {
            callback()
        }
    }
}

export function validatePlateNo(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入车牌号码'))
    } else {
        const plateNoRegex = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
        if (!plateNoRegex.test(value)) {
            callback(new Error('请输入正确的车牌号码格式'))
        } else {
            callback()
        }
    }
}

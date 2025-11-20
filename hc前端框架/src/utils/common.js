import * as XLSX from 'xlsx'

/**
 * @function (用于数组里的对象时，获取相对的key)
 * @param {*} arr(Array)
 * @param {*} targetId 获取的key值
 * @returns {arr:Array}
 */
export const getArrItemId = function (arr, targetId) {
    let newArr = []
    if (Array.isArray(arr)) {
        arr.map((item) => {
            if (item[targetId]) {
                newArr.push(item[targetId])
            }
        })
        return newArr
    } else {
        return arr
    }
}

/***
 * @function (toTree用于树形：平级数据生成树形数据结构)
 * @param (data:Array平级的数据结构)
 */
export const toTree = function (data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        item.id = item.id
        item.label = item.name
        delete item.children
    })
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {}
    data.forEach(function (item) {
        map[item.id] = item
    })
    var val = []
    data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid]
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            ;(parent.children || (parent.children = [])).push(item)
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item)
        }
    })
    return val
}

export function export_excel_file(export_data, list_name) {
    let link = document.createElement('a')
    document.body.appendChild(link)
    link.style.display = 'none'
    let blogw = new Blob([export_data])
    let objectUrl = window.URL.createObjectURL(blogw)
    link.href = objectUrl
    let file_name = `${list_name}.xlsx`
    link.download = file_name
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(objectUrl)
}

export function down_file(blob, fileName) {
    let link = document.createElement('a')
    document.body.appendChild(link)
    link.style.display = 'none'
    let objectUrl = window.URL.createObjectURL(blob)
    link.href = objectUrl
    link.download = fileName
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(objectUrl)
}
export function downFileByAll({ data = [], fileName = '' }) {
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()

    const len = data[0].length
    const colWidths = []
    for (let i = 0; i < len; i++) {
        const wch = i === 0 ? 15 : 30
        colWidths.push({ wch })
    }
    if (colWidths && colWidths.length !== 0) {
        ws['!cols'] = colWidths
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, fileName)
}

function getDefaultVal(type) {
    switch (type) {
        case 'int':
            return 0
        case 'boolean':
            return false
        case 'text':
            return false
        case 'object':
            return {}
        case 'float':
            return 0.0
        default:
            return ''
    }
}

export function getJsonParam(arr) {
    let jsonObj = {}
    arr.forEach((item) => {
        if (item.valueType.type === 'array') {
            jsonObj[item.id || item.standardOutKey] = []
        } else if (item.valueType.type === 'object') {
            jsonObj[item.id || item.standardOutKey] = getJsonParam(item.valueType.properties)
        } else {
            jsonObj[item.id || item.standardOutKey] = getDefaultVal(item.valueType.type)
        }
    })
    return jsonObj
}

/**
 * 返回值大于等于0  则返回val+%LEL， 否则返回无
 */
export function addUnit(val) {
    if (val === null) return '无'
    return val >= 0 ? val + '%LEL' : '无'
}

/**
 * 返回值大于等于0  则返回val， 否则返回无
 */
export function showHandlerNumber(val) {
    return val >= 0 ? val : '无'
}

/**
 * 获取树的第一层数据结构，返回对象数组
 *
 * @export
 * @param {*} treeData
 * @return {*}
 */
export function getTreeTopLevel(treeData) {
    let arr = treeData.map((item) => ({
        name: item.name,
        code: item.id,
    }))
    return arr
}

/**
 *根据第一层的选中数据，获取树的剩余的树结构
 *
 * @export
 * @param {*} id 第一层的选中数据
 * @param {*} treeData
 */
export function getTreeDataExceptTopLevel(id, treeData) {
    let len = treeData.length
    let subTreeData = []
    for (let index = 0; index < len; index++) {
        if (treeData[index].id === id) {
            subTreeData = treeData[index].children ? treeData[index].children : []
        }
    }
    return subTreeData
}

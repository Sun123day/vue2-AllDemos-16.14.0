import Layout from '@/layout/index'

function getNameByUrl(menuUrl) {
    if (!menuUrl) {
        return undefined
    }
    const temp = menuUrl.split('/')
    return toHump(temp[temp.length - 1])
}
/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str) {
    if (!str) return str
    return str
        .replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase()
        })
        .replace(/(\s|^)[a-z]/g, function (char) {
            return char.toUpperCase()
        })
}
function isMenu(resourceType) {
    return resourceType === '2' ? true : false
}
export const generatorRoutes = (res) => {
    const tempRoutes = []
    res.forEach((it) => {
        const routeItem = {
            clientEndpointId: it.clientEndpointId,
            parentId: it.parentId,
            key: it.key,
            label: it.label,
            resourceType: it.resourceType,
            icons: it.icons,
            path: it.path,
            name: getNameByUrl(it.path),
            component: isMenu(it.resourceType) ? getComponent(it) : Layout,
            hidden: !it.isShow,
            isOutsideChain: it.isOutsideChain,
            meta: {
                icon: it.icons,
                title: it.label,
                keepAlive: it.isCache,
                key: it.key,
                parentId: it.parentId,
                permissionList: it.buttonResource || [],
            },
        }
        if (it.children) {
            routeItem.children = generatorRoutes(it.children)
        }
        tempRoutes.push(routeItem)
    })

    return tempRoutes
}

export const getComponent = (view) => {
    return (resolve) => require([`@/views${view.componentPath}`], resolve)
}

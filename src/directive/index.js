/**
 * @description 注册自定义指令
 */
import Vue from 'vue'
import store from '@/store'

Vue.directive('permission', {
    inserted: function (el, binding, vnode) {
        const permissionList = store.state.permissionList
        const requiredPermission = binding.value
        const hasPermission = permissionList.includes(requiredPermission)
        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    },
})

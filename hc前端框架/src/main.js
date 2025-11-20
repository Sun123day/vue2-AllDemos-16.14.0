import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import i18n from './lang'

import '@/styles/index.scss'
import './assets/icon/iconfont.css'
import 'codemirror/lib/codemirror.css'

//引入element组件
import './plugins/elementComponent'
//引入自定义全局组件
import './plugins/customComponents'

import '@/directive/index'

import dataV from '@jiaminghi/data-view'

Vue.use(dataV)

//路由拦截
import './permission'

import './icons'

import './utils/error-log'
import '@/styles/custom-theme.scss'
window.$store = store
window.$router = router
Vue.prototype.$store = store

import { downloadExcel } from "./api/load";
Vue.prototype.downloadExcel = downloadExcel;

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: (h) => h(App),
})

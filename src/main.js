import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//axios
import axios from 'axios'
Vue.prototype.$http = axios

//引入自定义全局组件
import './plugins/customComponents'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

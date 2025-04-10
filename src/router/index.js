import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    redirect: '/layout01'
  },
  {
    path: '/layout01',
    name: 'layout01',
    component: () => import('@/views/layoutDemo/index.vue')
  },
  {
    path: '/button01',
    name: 'button01',
    component: () => import('@/views/button01/index.vue')
  },
  {
    path: '/yuan',
    name: 'yuan',
    component: () => import('@/views/YUAN/index.vue')
  },
  {
    path: '/drawer01',
    name: 'drawer01',
    component: () => import('@/views/drawer01/index.vue')
  },
  {
    path: '/drawer02',
    name: 'drawer02',
    component: () => import('@/views/drawer02/index.vue')
  },
  {
    path: '/test01',
    name: 'test01',
    component: () => import('@/views/testRouter/index.vue')
  },
  {
    path: '/testvue',
    name: 'testvue',
    component: () => import('@/views/Test01/index.vue')
  },
  {
    path: '/button01',
    name: 'button01',
    component: () => import('@/views/button01/index.vue')
  },
  {
    path: '/testPDF',
    name: 'testPDF',
    component: () => import('@/views/testPDF/index.vue')
  },
  {
    path: '/table01',
    name: 'table01',
    component: () => import('@/views/table01/index.vue')
  },
  {
    path: '/table02',
    name: 'table02',
    component: () => import('@/views/table02/index.vue')
  },
  {
    path: '/tablehebing',
    name: 'tablehebing',
    component: () => import('@/views/tableHeBing/index.vue')
  },
  {
    path: '/tableRowEdit',
    name: 'tableRowEdit',
    component: () => import('@/views/tableRowEdit/index.vue')
  },
  {
    path: '/vedioPlayDialog',
    name: 'vedioPlayDialog',
    component: () => import('@/views/vedioPlayDialog/index.vue')
  },
  {
    path: '/VueSeamlessScroll',
    name: 'VueSeamlessScroll',
    component: () => import('@/views/VueSeamlessScroll/index.vue')
  },
  {
    path: '/uploadImg',
    name: 'uploadImg',
    component: () => import('@/views/upLoadImg/index.vue')
  },
  {
    path: '/multiSelect',
    name: 'multiSelect',
    component: () => import('@/views/multiSelect/index.vue')
  },
  {
    path: '/longFormItem',
    name: 'longFormItem',
    component: () => import('@/views/longFormItem/index.vue')
  },
  {
    path: '/dynamicTime',
    name: 'dynamicTime',
    component: () => import('@/views/dynamicTime/index.vue')
  },
  {
    path: '/jidu',
    name: 'jidu',
    component: () => import('@/views/jiduSeason/index.vue')
  },
  {
    path: '/allBTN',
    name: 'allBTN',
    component: () => import('@/views/allBTN/index.vue')
  },
  {
    path: '/tableXieXian',
    name: 'tableXieXian',
    component: () => import('@/views/tableXieXian/index.vue')
  },
  {
    path: '/txtChangeColor',
    name: '选中文字变色',
    component: () => import('@/views/txtChangeColor/index.vue')
  },
  {
    path: '/echartsWaterBall',
    name: 'echarts和水球',
    component: () => import('@/views/echartsWaterBall/index.vue')
  },
  {
    path: '/echartsRili',
    name: 'echarts日历',
    component: () => import('@/views/echartsRili/index.vue')
  },
  {
    path: '/echartsGauge',
    name: 'echartsGauge仪表盘',
    component: () => import('@/views/echartsGauge/index.vue')
  },
  {
    path: '/selectJilian',
    name: 'selectJilian级联选择器',
    component: () => import('@/views/selectJilian/index.vue')
  },
  {
    path: '/miyao',
    name: 'miyao密钥',
    component: () => import('@/views/miyao2048/index.vue')
  },
  {
    path: '/jietuScreenShot',
    name: 'jietuScreenShot网页截图',
    component: () => import('@/views/jietuScreenShot/index.vue')
  },
  {
    path: '/customChuanSuoKuang',
    name: 'customChuanSuoKuang仿NaiveUI的自定义穿梭框',
    component: () => import('@/views/customChuanSuoKuang/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router

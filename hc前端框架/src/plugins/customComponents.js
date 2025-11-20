import Vue from 'vue'

import ElTreeSelect from 'el-tree-select'
import Fragment from 'vue-fragment'
import progressive from 'progressive-image/dist/vue'
import VueCodemirror from 'vue-codemirror'
import xss from 'xss'
import pageModal from '../components/PageModal'
import sidelipPage from '../components/SidelipPage'
import dayjs from 'dayjs'
import ElementResizeDetectorMaker from 'element-resize-detector'
import globalComponents from './globalComponents'
import ValidateRules from '@/utils/ValidateRules'
import md5 from 'js-md5'
import lodash from 'lodash'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

const componentArr = [
    ElTreeSelect,
    Fragment.Plugin,
    xss,
    progressive,
    VueCodemirror,
    globalComponents,
]

componentArr.map((com) => {
    Vue.use(com)
})

Vue.prototype.$dayjs = dayjs
Vue.prototype.$xss = xss
Vue.prototype.$pageModal = pageModal
Vue.prototype.$sidelipPage = sidelipPage
Vue.prototype.$erd = ElementResizeDetectorMaker()

Vue.prototype.$lodash = lodash

Vue.prototype.ValidateRules = ValidateRules
Vue.prototype.$md5 = md5

import RlTable from '@/components-global/RlTable'
import SearchFormItem from '@/components-global/RlTable/SearchFormItem.vue'
import GridItem from '@/components-global/Grid/GridItem.vue'
import Space from '@/components-global/Space'
const globalComponents = [RlTable, Space, SearchFormItem, GridItem]
export default {
    install(Vue) {
        globalComponents.forEach((component) => {
            Vue.component(component.name, component)
        })
    },
}

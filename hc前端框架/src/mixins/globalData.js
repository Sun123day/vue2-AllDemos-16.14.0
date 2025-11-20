import { findComboOptions } from '@/api/common.js'
import { isEqual } from 'lodash'
export default {
    name: 'globalDictEnum',
    data() {
        return {
            // 字典枚举Map
            globalDictEnum: {},
        }
    },
    methods: {
        async fetchDictByCode(dictCode) {
            try {
                const { code, data } = await findComboOptions(dictCode)
                if (code === 200 && data) {
                    const currentDict = this.globalDictEnum[dictCode]
                    this.$set(this.globalDictEnum, dictCode, data)
                    return currentDict
                }
                return false
            } catch (error) {
                return false
            }
        },
    },
}

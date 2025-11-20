import { findProjectOptions } from '@/api/common.js'
export default {
    data() {
        return {
            projectList: [],
        }
    },
    created() {
        findProjectOptions().then((res) => {
            if (res.code === 200) {
                this.projectList = res.data
            }
        })
    },
}

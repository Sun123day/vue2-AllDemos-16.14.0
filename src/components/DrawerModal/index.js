import Vue from 'vue'
import OriginPageModal from './index.vue'

class PageModal {
    constructor(component = {}, option = {}, callback, modalOpt = {}) {
        const root = this
        this.instance = new Vue({
            el: document.createElement('div'),
            render: function (h) {
                return h(OriginPageModal, modalOpt, [
                    h(
                        component,
                        {
                            on: {
                                SetTitle: (title) => {
                                    root.pageInstance.setTitle(title)
                                },
                                SetPageActions: (data) => {
                                    root.pageInstance.setPageActions(data)
                                },
                                Close: (data) => {
                                    !!callback && callback(data)
                                    root.pageInstance.close()
                                },
                            },
                            ...option,
                        },
                        this.$slots.default
                    ),
                ])
            },
        })
        this.pageInstance = this.instance.$children[0]
        document.body.appendChild(this.instance.$el)

        let global = {}
        // 外部关闭，不执行回调
        global.close = () => {
            this.pageInstance.close()
        }
        return global
    }
}
export default PageModal

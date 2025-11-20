

<template>
    <div>
        <!-- <dv-scroll-ranking-board :config="config" style="width:500px;height:300px" /> -->
        <dv-scroll-ranking-board :config="config" style="width:100%;height:300px" />
    </div>
</template>

<script>
import store from '@/store'
import { mapState } from "vuex";
export default {
    props: {
    },
    data() {
        return {
            // config: {
            //     data: [
            //         {
            //             name: '沙河街道',
            //             value: 100
            //         },
            //         {
            //             name: '柳江街道',
            //             value: 90
            //         },
            //         {
            //             name: '东光街道',
            //             value: 80
            //         },
            //         {
            //             name: '水井坊街道',
            //             value: 70
            //         },
            //         {
            //             name: '狮子山街道',
            //             value: 60
            //         }
            //     ],
            //     unit: 'kW·h/㎡',
            //     valueFormatter({ value }) {
            //         // console.log(value);
            //         // console.warn(arguments)
                    
            //         let valueStr = value  + 'kW·h/㎡'
                    
            //         return valueStr
            //     }
            // },
            timer: null,
            resData:[],
        }
    },
    created() {
        this.requestData()
        this.unwatch = this.$watch(
            () => this.energyElecIndex,
            (newValue) => {
                this.resData = [...newValue]; // 使用展开运算符创建一个新数组
            },
            { deep: true } // 添加 deep: true 以便深度监听对象或数组的变化
        );
    },
    computed: {
        ...mapState({
            energyElecIndex: (state) => state.cockpit.energyElecIndex
        }),
        config(){
            return {
                data: this.resData,
                unit: 'kW·h/㎡',
                valueFormatter({ value }) {
                let valueStr = value  + 'kW·h/㎡'
                
                return valueStr
              }
            }
        }
    },
    watch: {

    },
    mounted() {
      // 每分钟请求一次数据
      this.timer = setInterval(() => {
          this.requestData()
      }, 5 * 60000)
    },
    beforeDestroy() {
      // 组件销毁前清除定时器
      clearInterval(this.timer);
    },
    methods: {
      requestData() {
        //   console.log("re")
          store.dispatch('cockpit/ENERGY_INDEX_ACTION', {

          }) 
      }
    },
}
</script>

<style scoped>
::v-deep .ranking-value {
    margin-right: 28px !important;
}
::v-deep .dv-scroll-ranking-board .ranking-column .inside-column{
    background: #01fbff !important;
}
::v-deep .dv-scroll-ranking-board .ranking-column {
    border-bottom: 2px solid #01fbffb0 !important;
}
::v-deep .dv-scroll-ranking-board .ranking-info .rank {
    color: #01fbff !important;
}
</style>

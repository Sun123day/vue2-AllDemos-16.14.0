<!-- 节能AI -->
<template>
  <div class="rightDown">
      <div class="image">
        <img src="../../image/Group 553@2x.png" alt="">
      </div>
      <div class="info">
          <p v-for="(item, index) in  infoCount" :key='index'>
            {{ item.name }} ：
            <span style="color: #00FFFF">{{ item.value || 0}}</span>
            <span style="color:#ffffffa8 ;font-size: 14px;font-weight: 400;">
              {{ item.unit }}
            </span>
          </p>
      </div>
      <div style="display: flex; justify-content: center;">
        <div class="down_o">
            <p v-for="(item, index) in  logList" :key='index' style="margin-bottom: 8px;">
                <!-- {{item.datetime}}：{{item.verbose}} -->
                {{item}}
            </p>
        </div>
      </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from "vuex";
import dayjs from 'dayjs'
export default {
  components: {
  },
  props: {
  },
  data() {
      return {
          timer: null,
          resData:{}
      }
  },
  created() {
      this.requestData()
      
      this.unwatch=this.$watch(()=>this.aiElectricStatusData,
      (newValue={})=>{
          this.resData=newValue
          console.log("newValue", newValue)
      })
  },
  computed: {
      ...mapState({
          aiElectricStatusData: (state) => state.cockpit.aiElectricStatusData
      }),
      infoCount(){
          let list = [
              { name: this.$store.state.language == 'zh' ? '累计入参' : '累計入參', value: 0, unit: '次' },
              { name: this.$store.state.language == 'zh' ? '累计寻优' : '累計尋優', value: 0, unit: '次' },
              { name: this.$store.state.language == 'zh' ? '今日入参' : '今日入參', value: 0, unit: '次' },
              { name: this.$store.state.language == 'zh' ? '今日寻优' : '今日尋優', value: 0, unit: '次' },
          ]
          
          if(this.resData){
              const today_messages = this.resData.totalInputData
              const total_messages = this.resData.totalOptimizeData
              const total_file = this.resData.todayInputData
              const total_tickets = this.resData.todayOptimizeData
              list[0].value = today_messages
              list[1].value = total_messages
              list[2].value = total_file
              list[3].value = total_tickets
          }
          return list
      },
      logList(){
          if(this.resData && this.resData.optHisData && this.resData.optHisData.length !== 0) {
              // return this.resData.optHisData
              // 只取前四条
              return this.resData.optHisData.slice(0, 4)
          }
          else if((this.resData && this.resData.optHisData && this.resData.optHisData.length === 0) || (this.resData && !this.resData.optHisData)) {
              return [
                //   { datetime: dayjs().format('YYYY-MM-DD'), verbose: this.$store.state.language == 'zh' ? '暂无数据' : '暫無數據' },
                  this.$store.state.language == 'zh' ? '暂无数据' : '暫無數據',
              ] 
          }
          else {
              return [
                  this.$store.state.language == 'zh' ? '暂无数据' : '暫無數據',
              ]
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
          store.dispatch('cockpit/ELECTRICITY_AI_STATUS_ACTION', {

          }) 
      }
  },
}
</script>

<style scoped lang="scss">
.rightDown {
  .image {
    display: flex;
    justify-content: center;
    img {
        margin: 16px 0 24px;
        height: 85px;
    }
  }

  .info {
      p {
          width: 50%;
          font-family: PingFang SC, PingFang SC;
          font-weight: bold;
          font-size: 15px;
          color: #FFFFFF;
          line-height: 22px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          text-align: center;
          margin-bottom: 10px;
      }

      p:nth-child(2),
      p:nth-child(4) {
          text-indent: 30px;
          text-align: left;
      }

      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 25px;

      span {}
  }

  .down_o {
      overflow-y: auto;
      padding: 16px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #00FFFF;
      line-height: 17px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      letter-spacing: 2px;
      width: 461px;
      height: 160px;
      border-radius: 0px;
      /* 0px 0px 0px 0px 可以简化为 0px */
      border-width: 1px;
      /* 显式设置边框宽度 */
      border-style: solid;
      /* 边框样式 */
      /* 使用 border-image 创建渐变边框 */
      border-image: linear-gradient(270deg, #157CFF, #011639, #011639, #053B80) 1;
  }
}
</style>

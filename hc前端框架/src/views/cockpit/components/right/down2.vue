

<template>
  <div class="rightDown">
      <div class="image">
        <img src="../../image/Group 575@2x.png" alt="">
      </div>
      <div class="info">
          <p v-for="(item, index) in  infoCount" :key='index'>{{ item.name }} <span style="color: #00FFFF">{{ item.value }}</span>
              <span style="color:#ffffffa8 ;font-size: 14px;font-weight: 400;">{{ index % 2 == 0 ? '万次' : '次' }}</span>
          </p>
      </div>
      <div style="display: flex; justify-content: center;">
        <div class="down_o">
            {{ txt }}
        </div>
      </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
export default {
  components: {
  },
  props: {
  },
  data() {
      return {
          infoCount: [
              { name: '累计入参：', value: '1228' },
              { name: '累计寻优：', value: '122' },
              { name: '今日入参：', value: '1225' },
              { name: '今日寻优：', value: '155' },
          ],
          txt: `
          [10:57:22]SIM传市路平滑编H(参考):
          冷海水得度-6.4，
          冷却甲频率=30，
          冷却诺频率=49，
          冷期水出塔度=31，
          冷泳水深差=5.6，
          冷却水温差=7
          [10:57:02]SIM优化策路平滑输出(参考):
          冷冻水温度-6.4，
          冷却京频率-30，
          冷加领率-49，
          冷加水出塔温点-31，
          冷水关-5.9，
          冷却水流关-7
          [10:56:41]SIM优化策路中滑购出(参考):
          冷游水流度-6.4，
          冷却风频客-30，
          冷如增铁率-49，
          冷期水出塔温度-31，
          冷冻水温差-6，
          冷却水温差-7`,
      }
  },
  created() {
      // this.unwatch=this.$watch(()=>this.energyAmountData,
      // (newValue={})=>{
      //     this.totalData=newValue
      // })
  },
  computed: {
      // ...mapState({
      //     energyAmountData: (state) => state.cockpit.energyAmountData
      // }),
  },
  watch: {

  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
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

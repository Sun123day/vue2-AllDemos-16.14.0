<template>
  <div class="homePage">
    <Header class="homeHeader"/>
    <div class="homeContainer">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="item" @click="goComment">
            <div class="item-top">
              <img src="./assets/comment.png" alt="">
            </div>
            <div class="item-btm">
              <div class="item-btm-title">
                用户评价
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="item" @click="goOverview">
            <div class="item-top">
              <img src="./assets/overview.png" alt="">
            </div>
            <div class="item-btm">
              <div class="item-btm-title">
                景区总评
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: {
    Header,
  },
  methods:{
    goComment(){
      this.$router.push({
        path: '/xm/comment',
      })
    },
    goOverview(){
      this.$router.push({
        path: '/xm/overview',
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.homePage {
  // min-height: 100%;
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100vw * 1440 / 1440);
  height: calc(100vh * 900 / 900);
  box-sizing: border-box;
}
.homeHeader {
  height: 48px !important;
  z-index: 999;

  position: fixed;
  top: 0;
  left: 0;

  width: calc(100% - 48px);
  background-color: #fff;
}
.homeContainer {
  // position: absolute;
  // top: 48px;
  // left: 0;
  flex: 1;
  padding: 0 20px;
  margin-top: 72px; // 48 + 24
  
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
}

.item {
  min-width: 365px;
  min-height: 365px;
  margin-bottom: 16px;
  border-radius: 15px;
  cursor: pointer;
  background-color: #f8fdff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  .item-top{
    margin-right: 24px;
    img {
      width: 165px;
      height: 165px;
    }
  }
  .item-btm{
    // flex: 1;
    .item-title {
      margin-top: 24px;
      font-size: 24px;
      font-weight: 400;
      color: #19272e;
    }
  }
}
</style>

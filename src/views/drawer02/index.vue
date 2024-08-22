<!-- 初步封装抽屉应用 -->
<template>
  <div>
    <h1>弹窗的封装移植测试</h1>
    <div>
      <el-button @click="hanleClickBtn" class="btn">点击展开的是原来封装的弹窗</el-button>
    </div>
  </div>
</template>

<script>
import DrawerModal from './DrawerModal'
export default {
components:{DrawerModal},
data(){
  return {
  }
},
methods:{
  hanleClickBtn(){
    new this.$drawerModal(
          DrawerModal,
          {
            
          }
      )
  },
}
}
</script>

<style lang="scss" scoped>
  .btn {
    cursor: pointer;
  }
</style>
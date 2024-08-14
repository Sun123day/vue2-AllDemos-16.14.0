<!-- 初步封装抽屉应用 -->
<template>
  <div>
    <h1>初步封装抽屉测试</h1>
    <div>
      <SpeBtn>这不素抽屉</SpeBtn>
      <el-button @click="hanleClickBtn" class="btn">点击展开抽屉</el-button>
      <DrawerTest 
        :task="taskFormData" 
        :drawer.sync="drawer" 
        :direction="direction"
        :titleTxt="title"
        @drawerClose="handleClose"
      />
    </div>
  </div>
</template>

<script>
import SpeBtn from '@/components/Spebutton'
import DrawerTest from '@/components/DrawerTest'
export default {
components:{
  SpeBtn,
  DrawerTest
},
data(){
  return {
    drawer: false,
    direction: 'rtl',
    taskFormData:{
      name: '巴巴托斯！！！'
    },
    title: "诶嘿~"
  }
},
methods:{
  hanleClickBtn(){
    this.drawer = true
  },
  handleClose(newVal){
    this.drawer = newVal
  }
}
}
</script>

<style lang="scss" scoped>
  .btn {
    cursor: pointer;
  }
</style>
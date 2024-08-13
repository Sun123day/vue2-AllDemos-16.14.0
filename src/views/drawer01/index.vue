<!-- 封装抽屉应用 -->
<template>
  <div>
    <h1>封装抽屉测试</h1>
    <div>
      <SpeBtn type="primary1" @click="hanleClickBtn">点击展开抽屉</SpeBtn>
      <DrawerTest 
        :task="taskFormData" 
        :drawer="drawer" 
        :direction="direction"
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
    taskData: [],// 任务数据
    drawer: false,
    direction: 'rtl',
    taskFormData:{
      name: '老登！！！'
    }
  }
},
methods:{
  hanleClickBtn(){
    this.drawer = !this.drawer;
  },
}
}
</script>

<style>

</style>
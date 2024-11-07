<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>金额转大写练习</h1>
    小写金额：<el-input
      v-model="xiaoxie"
      clearable 
      style="width: 600px;"
    />
    大写金额：<el-input
      v-model="daxie"
      disabled
      style="width: 600px;"
    />
  </div>
</template>

<script>
import num2str from 'financialconversion';
export default {
  data(){
    return{
      xiaoxie:'',
      daxie:'',
    }
  },
  watch:{
    'xiaoxie'(newVal, oldVal){
      this.daxie = num2str.numToStrMoney(newVal)
    }
  }
}
</script>

<style>

</style>
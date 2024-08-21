<template>
  <div>
    <h1>金额转大写练习</h1>
    小写金额：<el-input
      v-model="xiaoxie"
      clearable
    />
    大写金额：<el-input
      v-model="daxie"
      disabled
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
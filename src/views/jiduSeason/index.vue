<template>
  <div>
    <h1>季度选择器</h1>
    <h3>诶嘿~(*^▽^*)~</h3>
    <div>
      <h3>诶嘿~(*^▽^*)~默认显示格式</h3>
      <ElQuarterPicker v-model="value1" placeholder="选择季度" />
    </div>
    <div>
      <h3>诶嘿~(*^▽^*)~显示格式为一</h3>
      <ElQuarterPicker v-model="value2" format="Q" placeholder="选择季度" />
    </div>
    <div>
      <h3>诶嘿~(*^▽^*)~显示格式为01</h3>
      <ElQuarterPicker v-model="value3" format="qq" placeholder="选择季度" />
    </div>
    <div>
      <h3>诶嘿~(*^▽^*)~显示格式为1</h3>
      <ElQuarterPicker v-model="value4" format="q" placeholder="选择季度" />
    </div>
  </div>
</template>

<script>

import ElQuarterPicker from '@/components/ElQuarterPicker'
 
export default {
  components: { ElQuarterPicker },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    }
  }
}
</script>

<style>

</style>
<template>
  <div>
    <h1>季度选择器</h1>
    <h3>诶嘿~(*^▽^*)~</h3>
    <div>
      <ElQuarterPicker v-model="value" placeholder="选择季度" />
    </div>
  </div>
</template>

<script>

import ElQuarterPicker from '@/components/ElQuarterPicker'
 
export default {
  components: { ElQuarterPicker },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style>

</style>
<!-- 按钮的禁用启用联动 -->
<template>
  <div>
    <el-row>
      <el-button @click="click1" type="primary" :disabled="flag1">近天</el-button>
      <el-button @click="click2" type="primary" :disabled="flag2">近周</el-button>
      <el-button @click="click3" type="primary" :disabled="flag3">近月</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag1: false,
      flag2: false,
      flag3: false
    }
  },
  methods: {
    click1() {
      this.flag1 = true
      this.flag2 = false
      this.flag3 = false
    },
    click2() {
      this.flag1 = false
      this.flag2 = true
      this.flag3 = false
    },
    click3() {
      this.flag1 = false
      this.flag2 = false
      this.flag3 = true
    }
  }
}
</script>

<style>

</style>
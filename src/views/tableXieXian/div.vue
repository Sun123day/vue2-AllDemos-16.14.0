<!-- 表头斜线分割 -->
<template>
  <div>
    <div class="container">
      <div class="btm">{{btm}}</div>
      <div class="top">{{top}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top:'事件',
      btm:'指标',
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  /* flex-direction: column; */
}
.top, .btm {
  height: 56px;
  /* line-height: 40px; */
  display: flex;
}
.top {
  width: 102px;
  align-items: flex-start;
  justify-content: flex-end;
  background: linear-gradient(30deg, transparent 56px, red 0);
  margin-left: -66px;
  padding-top: 4px;
  padding-right: 11px;
}
.btm {
  width: 105px;
  background-color: rgb(143, 204, 69);
  justify-content: flex-start;
  background: linear-gradient(-150deg, transparent 59px, rgb(143, 204, 69) 0);
  margin-right: -61px;
  align-items: flex-end;
  padding-left: 15px;
  padding-bottom: 4px;

}
</style>
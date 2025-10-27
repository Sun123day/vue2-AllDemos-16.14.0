<template>
  <div class="headerContainer">
    <div class="header-left">
      <img src="../../assets/logo.png" alt="" class="logo">
      <div class="header-left-line"></div>
      <span>这个是系统名称</span>
    </div>
    <div class="header-right">
      <!-- <img src="../../assets/bell.png" alt=""> -->
      <i class="el-icon-help "></i>
      <img src="../../assets/avatar.png" alt="" class="avatar">
      <span>用户名称</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.headerContainer {
  width: 100%;
  height: 48px;
  background-color: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    .logo {
      width: 24px;
      height: 24px;
      // margin-right: 12px;
    }
    .header-left-line {    
      width: 1px;
      height: 16px;
      background: #dcdfe6;
      margin: 0 8px;
    }
    span {
      color: #19272e;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .header-right {
    width: 158px;
    // display: flex;
    display: none;
    align-items: center;
    i {
      font-size: 18px;
      color: #81888b;
      margin-right: 24px;
    }
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 12px;
    }
    span {
      color: #616a6e;
      font-size: 14px;
      font-weight: 400;
      margin-right: 24px;
      cursor: pointer;
    }
  }
}
</style>
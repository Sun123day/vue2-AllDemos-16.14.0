<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>选中文字变色</h1>
    <div class="title-btn-container">
      <span class="title-btn-txt" 
            @click="safeDayClick" 
            :class="{ 'selected': isSelected('今日') }">今日</span>
      <span class="title-btn-line"></span>
      <span class="title-btn-txt" 
            @click="safeWeekClick" 
            :class="{ 'selected': isSelected('周') }">周</span>
      <span class="title-btn-line"></span>
      <span class="title-btn-txt" 
            @click="safeMonthClick" 
            :class="{ 'selected': isSelected('月') }">月</span>
      <span class="title-btn-line"></span>
      <span class="title-btn-txt" 
            @click="safeYearClick" 
            :class="{ 'selected': isSelected('年') }">年</span>
      <span class="title-btn-line"></span>
      <span class="title-btn-txt" 
            @click="safeAllClick" 
            :class="{ 'selected': isSelected('全部') }">全部</span>
      <span class="title-btn-line"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '今日' // 默认选中今日
    };
  },
  methods: {
    safeDayClick() {
      this.selected = '今日';
    },
    safeWeekClick() {
      this.selected = '周';
    },
    safeMonthClick() {
      this.selected = '月';
    },
    safeYearClick() {
      this.selected = '年';
    },
    safeAllClick() {
      this.selected = '全部';
    },
    isSelected(value) {
      return this.selected === value;
    }
  }
};
</script>

<style lang="scss" scoped>
.title-btn-container {
    width: 400px;
    height: 400px;
    background: rgb(79, 79, 132);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.title-btn-txt {
    height: 16px;
    font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
    font-weight: 400;
    font-size: 16px;
    color: #00FFFF;
    line-height: 16px;
    text-align: left;
    font-style: normal;
    text-transform: none;
}
.title-btn-line {
    border: 1px solid #00FFFF;
    height: 18px;
}
.selected {
    color: #FFAB2D; // 选中时字体颜色变为#FFAB2D
}
</style>

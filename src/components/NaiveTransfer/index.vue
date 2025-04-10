<!-- 仿NaiveUI的穿梭框封装 -->
<template>
  <div class="transfer-box" v-loading="loading">
    <div class="left-column">
      <div class="column-header">
        <span class="column-title">未选标签</span>
        <div>
          <el-button v-if="this.selectedLeftOptions.length !== this.allOptions.length" size="mini" @click="selectAllLeft">全选</el-button>
          <el-button v-else size="mini" @click="deselectAllLeft">全不选</el-button>
          共 {{ allOptions.length }} 项
        </div>
      </div>
      <el-input v-model="leftSearchText" placeholder="搜索" size="mini" @input="filterLeftData" clearable />
      <ul>
        <li v-for="(option, index) in allOptions" :key="index">
          <input type="checkbox" v-model="selectedLeftOptions" :value="option" @change="moveToRight(option)" />
          {{ option.name }}
        </li>
      </ul>
    </div>
    <div class="right-column">
      <div class="column-header">
        <span class="column-title">已选标签</span>
        <div>
          <el-button size="mini" @click="clearRight">清除</el-button>
          已选 {{ selectedRightOptions.length }} 项
        </div>
      </div>
      <ul>
        <li v-for="(option, index) in selectedRightOptions" :key="index">
          {{ option.name }}
          <span class="delete-icon" @click="removeFromRight(option)">
            <i class="ivu-icon el-icon-close"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
export default {
  props:{
    allLists:{
      type: Array,
      default: () => [] 
    },
    selectedLists:{
      type: Array,
      default: () => [] 
    }
  },
  data(){
    return {
      // baseOptions: [],
      baseOptions: cloneDeep(this.$props.allLists) || [],
      // allOptions: [],
      allOptions: this.$props.allLists || [],
      selectedLeftOptions: this.$props.selectedLists.length > 0 ? this.$props.selectedLists : [],
      leftSearchText: '',
      // selectedRightOptions: [],
      selectedRightOptions: this.$props.selectedLists || [],
      loading: false,
    }
  },
  methods: {
    selectAllLeft() {
      this.selectedLeftOptions = this.allOptions.slice();
      this.selectedRightOptions = this.allOptions.slice();
    },
    deselectAllLeft() {
      this.selectedLeftOptions = [];
      this.selectedRightOptions = [];
    },
    moveToRight(option) {
      if (this.selectedLeftOptions.includes(option)) {
        if (!this.selectedRightOptions.includes(option)) {
          this.selectedRightOptions.push(option);
        }
      } else {
        this.selectedRightOptions = this.selectedRightOptions.filter(opt => opt.value!== option.value);
      }
    },
    removeFromRight(option) {
      this.selectedRightOptions = this.selectedRightOptions.filter(opt => opt!== option);
      this.selectedLeftOptions = this.selectedLeftOptions.filter(opt => opt!== option);
    },
    clearRight() {
      this.selectedRightOptions = [];
      this.selectedLeftOptions = [];
    },
    // 过滤左侧数据
    filterLeftData() {
      if (!this.leftSearchText) {
          this.allOptions = cloneDeep(this.baseOptions);
          return;
      }
      this.allOptions = this.baseOptions.filter(item => 
          item.name.includes(this.leftSearchText)
      );
    }, 
  }
}
</script>


<style scoped lang="scss">
::v-deep .el-dialog__header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
.transfer-box {
    display: flex;
    .left-column,.right-column {
            border: 1px solid #ccc;
            width: 50%;
            padding: 10px;
        }
    .el-button--mini {
        padding: 2px;
        margin: 0 4px 0 70px; 
    }
    .el-input--mini {
        margin: 8px 0;
    }
    .column-title {
      font-size: 18px;
      margin-right: 12px;
    }   
   .left-column {
      margin-right: 10px;
    }
    .column-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 36px;
      border-bottom: 1px solid #ccc;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin-top: 10px;
      height: 250px; 
      overflow: auto;
    }
    li {
        margin-bottom: 5px;
        display: flex;
        justify-content: flex-start;
    }
    .right-column li {
      padding: 4px 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
   .delete-icon {
      display: none;
      cursor: pointer;
      margin-left: 10px;
    }
    li:hover .delete-icon {
      display: inline-block;
    }
    .right-column li:hover {
      background-color:#f9f7f7;
    }
}
</style>
<template>
  <dir>
    <div>多选全选设置</div>
    <el-select v-model="selectOptions" multiple clearable collapse-tags> 
      <el-option 
        v-for="item in areaList"
        :key="item.areaCode"
        :label="item.areaName"
        :value="item.areaCode"
      />
    </el-select>
    <!-- <el-checkbox v-model="selectAll">点击全选</el-checkbox> -->
  </dir>
</template>

<script>
export default {
  data(){
    return {
      selectOptions:[],
      areaList:[
        { areaCode: "1", areaName: "区域1" },
        { areaCode: "2", areaName: "区域2" },
        { areaCode: "3", areaName: "区域3" },
        { areaCode: "4", areaName: "区域4" },
      ],
      // selectAll: false
      selectAll: "-1"
    }
  },
  created(){
    if(this.selectAll == '-1'){
        this.selectOptions = this.areaList.map(item => item.areaCode)
        console.log("list", this.selectOptions);
        console.log("typeof", typeof this.selectOptions);
    }
  },
  watch:{
    selectAll(val){
      if(val){
        this.selectOptions = this.areaList.map(item => item.areaCode)
        console.log("list", this.selectOptions);
        console.log("typeof", typeof this.selectOptions);
      } else {
        this.selectOptions = []
      }
    }
  }
}
</script>
<template>
  <div>
    <!-- <el-button type="primary" @click="handleInit" >点击开始</el-button> -->
    <!-- <div>
      <ul style="display: flex; justify-content: space-between; gap: 16px; color: skyblue">
            <li  
                v-for="(item, index) in tableData"
                :key="index"  
            >
                <CardItem :rowData="item" />
            </li>
        </ul>
    </div>
    <div>
      <ul style="color: red">
            <li  
                v-for="(item, index) in tripleTableData"
                :key="index"  
            >
                {{ item }}
            </li>
        </ul>
    </div>
    <div>
      <ul style="color: blue">
            <li  
                v-for="(item, index) in afterDivide"
                :key="index"  
            >
                {{ item }}
            </li>
        </ul>
    </div> -->
    <div
      style="overflow: hidden;  height: 300px; width: 100%;"
    >
      
      <vue-seamless-scroll
          :data="afterDivide"
          ref="seamlessScroll"
      >
          <ul>
              <li v-for="(group, groupIndex) in afterDivide" :key="groupIndex">
              <ul style="display: flex; justify-content: space-between; gap: 16px; color: skyblue">
                  <li v-for="(item, index) in group" :key="index" style="width: 100%;">
                    <CardItem :rowData="item" />
                  </li>
              </ul>
          </li>
          </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import VueSeamlessScroll from 'vue-seamless-scroll'
import CardItem from './CardItem.vue'
export default {
  components:{
    VueSeamlessScroll,
    CardItem
  },
  data(){
    return{
      startFlag: false,
      tableData:[
        {name: '测试1', code: 1},
        {name: '测试2', code: 2},
        {name: '测试3', code: 3},
        {name: '测试4', code: 4},
        {name: '测试5', code: 5},
      ],
      tripleTableData:[],
      afterDivide:[],
    }
  },
  methods:{
    handleInit(){
      if(this.tableData.length < 5){
        for (let i = 0; i < 15; i++) {
          this.tripleTableData.push(...this.tableData);
        }
      } else {
        for (let i = 0; i < 3; i++) {
          this.tripleTableData.push(...this.tableData);
        }
      }
      for (let i = 0; i < this.tripleTableData.length; i += 3) {
        this.afterDivide.push(this.tripleTableData.slice(i, i + 3));
      }
      // console.log(this.$refs.seamlessScroll);
      // // 没用，，，呢
      // this.$nextTick(() => {
      //     console.log(this.$refs.seamlessScroll);
      //     // this.$refs.seamlessScroll.reset()
      //     const rlTable = this.$refs.seamlessScroll
      //       if(rlTable){
      //           rlTable.reset()
      //       }
      // })
      // // this.$refs.seamlessScroll.reset()
      // //console.log(this.afterDivide.length);
      // // this.startFlag = true
    }
  },
  created(){
    this.handleInit()
  }

}
</script>

<style lang="scss" scoped>
ul, li {
    list-style: none; 
}
</style>
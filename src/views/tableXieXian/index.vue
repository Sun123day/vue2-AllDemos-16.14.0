<!-- 表头斜线分割 -->
<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>表头斜线分割</h1>
    <el-table
      :data="tableData"
      style="width: 600px"
      :cell-style="columnStyle"
      >
      <el-table-column
        label="信息"
        width="150"
        show-overflow-tooltip
        align="right"
      >
        <el-table-column
          prop="name"
          label="姓名"
          width="144"
          show-overflow-tooltip
          align="left"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2024-03-20',
          name: '张三',
          address: '北京市朝阳区'
        },
        {
          date: '2024-03-21',
          name: '李四',
          address: '上海市浦东新区'
        },
        {
          date: '2024-03-22',
          name: '王五',
          address: '广州市天河区'
        }
      ]
    };
  },

  methods: {
	    columnStyle({ row, column, rowIndex, columnIndex }) {
	           if (columnIndex == 0) {  
	            return 'background:	#FFF8DC;'
	  		  	}
	   	 },
   }
};
</script>

<style scoped>
::v-deep .el-table thead.is-group th {
  background: none;
}
::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type {
  border-bottom: none;
}
::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type:before {
  content: '';
  position: absolute;
  width: 1px;
  height: 100px;
  top: 0;
  left: 0;
  background-color: red;
  opacity: 0.3;
  display: block;
  /* 对不齐就调整角度和表格中的宽度 */
  transform: rotate(-56deg); 
  transform-origin: top;
}
::v-deep .el-table thead.is-group tr:last-of-type th:first-of-type:before {
  content: '';
  position: absolute;
  width: 1px;
  height: 100px;
  bottom: 0;
  right: 0;
  background-color: red;
  opacity: 0.3;
  display: block;
  /* 对不齐就调整角度和表格中的宽度 */
  transform: rotate(-57deg);
  transform-origin: bottom;
}
</style>
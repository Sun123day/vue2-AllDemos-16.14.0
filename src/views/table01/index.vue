<!-- 普通表格 -->
<template>
  <div>
    <h1>这是表格——并且单独</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="columnStyle"
      >
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
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
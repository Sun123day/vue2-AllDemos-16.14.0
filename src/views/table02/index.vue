<!-- 单列变双列 
header  id name => id name id name
row01   01 Tom  => 01 Tom  02 Jack
row02   02 Jack => 03 Jane
row03   03 Jane
-->
<template>
  <div>
    <h1>这是表格</h1>
    <el-table
      :data="formattedTableData"
      style="width: 100%">
      <el-table-column
        prop="date1"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name1"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date2"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="姓名"
        width="180">
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
          name: '张三'
        },
        {
          date: '2024-03-21',
          name: '李四'
        },
        {
          date: '2024-03-22',
          name: '王五'
        },
        {
          date: '2024-03-24',
          name: '单数'
        },
        {
          date: '2024-03-23',
          name: '赵六'
        },
        {
          date: '2024-03-24',
          name: '单数'
        },
        {
          date: '2024-03-23',
          name: '赵六'
        }
      ]
    }
  },
  computed: {
    formattedTableData() {
      const formattedData = [];
      // if (this.tableData.length % 2 !== 0) {
      //   this.tableData.push({});
      // }
      for (let i = 0; i < this.tableData.length; i += 2) {
        const rowData = {
          date1: this.tableData[i].date,
          name1: this.tableData[i].name,
          date2: this.tableData[i + 1] ? this.tableData[i + 1].date : '', // 避免undefined错误
          name2: this.tableData[i + 1] ? this.tableData[i + 1].name : '' // 避免undefined错误
        };
        formattedData.push(rowData);
      }
      return formattedData;
    }
  }
}
</script>
<template>
  <div>

    <!-- 合并列 -->
    <el-table
      :data="tableData1"
      :span-method="arraySpanMethod"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        sortable
        label="数值 1">
      </el-table-column>
    </el-table>


    <!-- 合并行 -->
    <el-table
      :data="tableData2"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '1-1',
          name: '王小虎',
          amount1: '234',
        }, {
          id: '1-2',
          name: '王小虎',
          amount1: '165',
        }, {
          id: '1-3',
          name: '王小虎',
          amount1: '324',
        }, {
          id: '1-4',
          name: '王小虎',
          amount1: '621',
        }, {
          id: '1-5',
          name: '王小虎',
          amount1: '539',
        }],

        tableData1: [{
          id: '1-1',
          name: '王小虎',
          amount1: '234',
        }, {
          id: '1-2',
          name: '王小虎',
          amount1: '165',
        }, {
          id: '1-3',
          name: '王小虎',
          amount1: '324',
        }, {
          id: '1-4',
          name: '王小虎',
          amount1: '621',
        }, {
          id: '1-5',
          name: '王小虎',
          amount1: '539',
        }],

        tableData2: [{
          id: '1-1',
          name: '王小虎',
          amount1: '234',
        }, {
          id: '1-2',
          name: '王小虎',
          amount1: '165',
        }, {
          id: '1-3',
          name: '王小虎',
          amount1: '324',
        }, {
          id: '1-4',
          name: '王小虎',
          amount1: '621',
        }, {
          id: '1-5',
          name: '王小虎',
          amount1: '539',
        }],
      }
    },
    methods: {
      // 行合并
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        // 检查当前行是否为偶数行
        // if (rowIndex % 2 === 0) {// 对于偶数行（以0为起始索引）：rowIndex = 0, 2, 4, ...
          // if (columnIndex === 0) {
          //   // 合并第一列的单元格
          //   // 将当前单元格与其下方的单元格合并
          //   return [1, 2];// [rowspan, colspan]
          // } else if (columnIndex === 1) {
          //   // 第二列的单元格不合并
          //   return [0, 0];// [rowspan, colspan]
          // }
        // }

        if (columnIndex === 0) {//如果是第1列（columnIndex === 0）
          if (rowIndex % 2 === 0) {//当 rowIndex 为偶数（rowIndex % 2 === 0），即第1、3、5行，将这行的三个单元格合并 [1, 3]。
            return [1, 3];
          } else {
            return [1, 1];//否则，返回 [1, 1] 以维持默认显示效果。
          }
        } else {//如果是其他列（columnIndex > 0）
          if (rowIndex % 2 === 0) {
            return [0, 0]; // 当 rowIndex 为偶数时，返回 [0, 0] 隐藏这些单元格。
          }
        }
      },

      // 列合并
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) { // 如果是第一列
          // if (rowIndex % 2 === 0) {//如果当前行索引 rowIndex 是偶数 (rowIndex % 2 === 0)
          if (rowIndex === 0) {// 如果是第一行
            return {
              // rowspan: 2,// 向下跨两行
              rowspan: this.tableData2.length, // 向下跨所有行,
              colspan: 1// 不跨列
            };
          } else {
            return {
              rowspan: 0,// 不跨行
              colspan: 0 // 不跨列
            };
          }
        }
      }
    }
  };
</script>
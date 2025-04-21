<!-- 自定义穿梭框的封装后的使用 -->
<template>
  <div>
    <h1>仿NaiveUI的穿梭框封装的使用【未完成】</h1>
    <h1>===》实际单独使用的场景不确定</h1>
    <h1>===》目前只有用在对话框的弹窗中</h1>
    <div>
      已完成内容：<br/>
      1.基本穿梭框的内容<br/>
      未完成内容：<br/>
      1.穿梭框返回的选中数据<br/>
    </div>
    <div>
      <el-button
        type="primary"
        @click="dialogFormVisible = true"
      >
        打开穿梭框
      </el-button>

      <el-dialog title="穿梭框" :visible.sync="dialogFormVisible">
        <NTransfer
          :allLists = "allList"
          :selectedLists = "selectedList"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import NTransfer from '@/components/NaiveTransfer'
export default {
  components: { 
    NTransfer 
  },
  data() {
    return {
      dialogFormVisible: false, // 控制对话框的显示
      allList: [ // 所有选项列表
          {
              "value": "14",
              "name": "1111"
          },
          {
              "value": "15",
              "name": "测试212"
          },
      ],
      selectedList: [ // 已选选项列表
          {
              "value": "15",
              "name": "测试212"
          }
      ]
    }
  },
}
</script>

<style>

</style>
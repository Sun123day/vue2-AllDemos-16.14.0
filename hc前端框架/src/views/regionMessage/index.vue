<!-- 大区管理 -->
<template>
  <div class="container">
    <div class="header">
      <el-form inline class="searchItem">
        <div style="display: flex;">
          <!-- <el-form-item label="地区名称"> -->
          <el-form-item :label="$t('regionMessage.searchName')">
              <el-input
                  v-model="name"
                  size="small"
                  :placeholder="$t('regionMessage.placeholderName')"
                  style="width: 100%;"
                  clearable
              />
                  <!-- placeholder="请输入地区名称" -->
          </el-form-item>
          <!-- <el-form-item label="地区编码"> -->
          <el-form-item :label="$t('regionMessage.searchCode')">
              <el-input
                  v-model="code"
                  size="small"
                  :placeholder="$t('regionMessage.placeholderCode')"
                  style="width: 100%;"
                  clearable
              />
                  <!-- placeholder="请输入地区名称" -->
          </el-form-item>
        </div>
        <div style="display: flex;">
          <el-form-item>
              <el-button
                  size="small"
                  type="primary"
                  @click="handleSearch" 
                  icon="el-icon-search"
                >{{ $t('table.search') }}</el-button
            >
            <!-- 查询 -->
              <el-button
                  size="small"
                  type="warning"
                  @click="handleReset"
                  icon="el-icon-refresh-left"
                >{{ $t('table.reset') }}</el-button
            >
            <!-- 重置 -->
              <el-button
                  size="small"
                  type="primary"
                  @click="addOnClick" 
                  icon="el-icon-plus"
                >{{ $t('table.add') }}</el-button
            >
            <!-- 新增 -->
          </el-form-item>
        </div>
        </el-form>
    </div>
    <div class="main">
      <RlTable
          :search="false"
          :is-pagination="true"
          @on-change="loadTableData"
          ref="rlTable"
          :defaultExpandAll="true"
      >
          <template #default>
              <!-- <el-table-column label="序号" type="index" width="80" fixed="left" />
              <el-table-column prop="name" label="地区名字" />
              <el-table-column prop="code" label="地区编码" />
              <el-table-column fixed="right" label="操作" width="240"> -->
              <el-table-column :label="$t('components.order')" type="index" width="80" fixed="left" />
              <el-table-column prop="name" :label="$t('regionMessage.tableName')" />
              <el-table-column prop="code" :label="$t('regionMessage.tableCode')" />
              <el-table-column fixed="right" :label="$t('components.operation')" width="240">
                  <template slot-scope="{ row }">
                      <Operation :rowData="row" />
                  </template>
              </el-table-column>
          </template>
      </RlTable>
    </div>
  </div>
</template>

<script>
import Operation from './components/Operation.vue'
import FormModal from './components/FormModal.vue'
import { finPageTree } from '@/api/regionMessage'
export default {
  components:{
    Operation
  },
  data(){
    return {
      name: '',
      code: '',
    }
  },
  created(){
    console.log("test for the created")
  },
  methods:{
    handleSearch(){
      this.$nextTick(() => {
          const rlTable = this.$refs.rlTable
          if(rlTable){
            rlTable.onSearchChange()
          }
        })
    },
    loadTableData({resolve, params}) {
          // resolve({
          //     records:this.list,
          //     total:0
          // })
      finPageTree({
        ...params,
        condition:{
          name: this.name,
          code: this.code,
        }
      }).then(res => {
        if(res.code == '200'){
          const resData = res.data ||{}
          resolve({
            records: resData.records || [],
            total: resData.total,
          })
        }else{
          resolve({
              records:[],
              total:0
          })
        }
      })
    },
    handleReset(){
      this.name = ''
      this.code = ''
      this.handleSearch()
    },
    addOnClick(){
      new this.$pageModal(
          FormModal,
          {
              props: {
                  title: '新增',
              },
          },
          (result) => {
              if (result) {
                const rlTable = this.$refs.rlTable
                if(rlTable){
                  rlTable.onSearchChange()
                }
              }
          }
      )
    }
  }

}
</script>

<style lang="scss" scoped>
.customSelectTree {
    .el-select {
        width: 100% !important;
    }
}
.container {
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.header {
  height: 36px;
  background-color: #0C2E64;
  padding: 20px 15px;
  display: flex;
  .searchItem {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  margin-bottom: 16px;
}
.main {
  height: calc(100vh - 200px);
  position: relative;
  box-sizing: border-box;
}
::v-deep .el-form-item {
  margin-bottom: 0 !important;
  line-height: 36px !important;
  height: 36px !important;
}
::v-deep .el-form-item__label {
  line-height: 36px !important;
  height: 36px!important;
}
::v-deep .el-form-item__content {
  line-height: 36px !important;
  height: 36px !important;
}
::v-deep .el-input__inner {
  line-height: 32px !important;
  height: 32px !important;
}
</style>
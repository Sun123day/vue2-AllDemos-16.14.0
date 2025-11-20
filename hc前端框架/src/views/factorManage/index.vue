<!-- 因子管理 -->
<template>
  <div class="container">
    <div class="header">
      <el-form inline class="searchItem">
        <div style="display: flex;">
          <!-- <el-form-item label="地区"> -->
          <el-form-item :label="$t('factorManage.searchArea')">
              <el-tree-select
                  v-if="areaFlag"
                  class="customSelectTree"
                  v-model="areaId"
                  :treeParams="areaOptions"
                  :select-params="selectParams"
              />
                  <!-- :select-params="{
                      // size: 'small',
                      clearable: true,
                      multiple: false,
                      collapseTags: true,
                  }" -->
          </el-form-item>
          <!-- <el-form-item label="年份"> -->
          <el-form-item :label="$t('factorManage.searchYear')">
              <el-date-picker
                  v-model="year"
                  size="small"
                  type="year"
                  :editable="false"
                  :clearable="false"
                  style="width: 100%;"
                  class="calendar-single"
                  :pickerOptions="pickerOptions"
                  :placeholder="$t('placeholder.choose')"
              />
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
          :is-pagination="false"
          @on-change="loadTableData"
          ref="rlTable"
      >
          <template #default>
              <!-- <el-table-column label="序号" type="index" width="80" fixed="left" />
              <el-table-column prop="areaName" label="地区" />
              <el-table-column prop="year" label="年份" />
              <el-table-column prop="energyCodeName" label="能源类型" />
              <el-table-column prop="carbon" label="碳因子值" />
              <el-table-column fixed="right" label="操作" width="140"> -->
              <el-table-column :label="$t('components.order')" type="index" width="80" fixed="left" />
              <el-table-column prop="areaName" :label="$t('factorManage.tableArea')" />
              <el-table-column prop="year" :label="$t('factorManage.tableYear')" />
              <el-table-column prop="energyCodeName" :label="$t('factorManage.tableEnergy')" />
              <el-table-column prop="carbon" :label="$t('factorManage.tableCarbon')" />
              <el-table-column fixed="right" :label="$t('components.operation')" width="140">
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
import dayjs from 'dayjs';
import Operation from './components/Operation.vue'
import FormModal from './components/FormModal.vue'
import { findAreaCarbonPageList } from '@/api/factorManage'
import { getAreaTree } from '@/api/regionMessage'
export default {
  components:{
    Operation
  },
  data(){
    return {
      areaId: '',
      // year: dayjs().format('YYYY'),
      year: '',
      areaFlag: false,
      areaOptions: {
          data: [],
          clickParent: true, // 父级可以点击
          props: {
              'node-key': 'id',
              children: 'children',
              label: 'name',
              value: 'id',
          },
          // checkStrictly: true  // 父子节点分离勾选
      },
      list: [
        {
          areaId: '123',
          year: '123',
          energy: '123',
          carbon: '123',
        },
      ],
      pickerOptions: {
          disabledDate(time) {
              return time.getTime() > new Date().getTime()    //使用这种方法实现
          },
      },
    }
  },
  created(){
    setTimeout(() => {getAreaTree().then(res => {
        if (res.code === 200) {
          this.areaOptions.data = res.data;
          this.areaFlag = true;
        }
    })}, 500); // 延时1秒（1000毫秒
  },
  computed: {
    computedPlaceHolder() {
      return this.$store.state.language == 'zh'? '请选择' : '請選擇'
    },
    selectParams() {
      return {
          // size: 'small',
          clearable: true,
          multiple: false,
          collapseTags: true,
          placeholder: this.computedPlaceHolder
      }
    }
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
      findAreaCarbonPageList({
        // ...params,
        // condition:{
          areaId: this.areaId,
          year: this.year ? dayjs(this.year).format('YYYY') : '',
        // }
      }).then(res => {
        if(res.code == '200'){
          const resData = res.data || []
          resolve({
            records: resData || [],
            total: res.total || 0
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
      this.areaId = ''
      // this.year = dayjs().format('YYYY')
      this.year = ''
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
// .calendar-single ::v-deep.el-icon-date:before {
//     content: '' !important;
// }
// .calendar-single ::v-deep.el-input__suffix {
//     width: 25px !important;
// }
// .calendar-single ::v-deep i:last-child {
//     background: url('~@/assets/image/operation/calendar.svg') center center no-repeat !important;
//     background-size: 18px 18px !important;
// }
// .calendar-single ::v-deep.el-range-separator {
//     line-height: 28px !important;
// }
</style>
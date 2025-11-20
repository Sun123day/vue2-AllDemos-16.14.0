<!-- 操作日志 -->
<template>
  <div class="container">
    
  <div class="header">
    <el-form inline class="searchItem">
      <div style="display: flex;">
        <!-- <el-form-item label="操作源"> -->
        <el-form-item :label="$t('operationLog.searchSource')">
              <el-select
                  v-model="operateFrom"
                  size="small"
                  filterable
                  :placeholder="$t('operationLog.placeholderSource')"
                  transfer
                  clearable
                  style="width: 150px"
              >
                  <!-- placeholder="请选择操作源" -->
                  <el-option
                      v-for="(item, index) in sourceList"
                      :key="index"
                      :value="item.name"
                      :label="item.name"
                  />
                      <!-- :value="item.code" -->
              </el-select>
        </el-form-item>
        <!-- <el-form-item label="操作类型"> -->
        <el-form-item :label="$t('operationLog.searchType')">
              <el-select
                  v-model="operateType"
                  size="small"
                  filterable
                  :placeholder="$t('operationLog.placeholderType')"
                  transfer
                  clearable
                  style="width: 150px"
              >
                  <!-- placeholder="请选择操作类型" -->
                  <el-option
                      v-for="(item, index) in typeList"
                      :key="index"
                      :value="item.name"
                      :label="item.name"
                  />
                      <!-- :value="item.code" -->
              </el-select>
        </el-form-item>
        <!-- <el-form-item label="操作时间"> -->
        <el-form-item :label="$t('operationLog.searchTime')">
          <el-date-picker
              v-model="startDate"
              type="date"
              size="small"
              :picker-options="pickerOptions"
              :editable="false"
              :clearable="false"
              class="datePicker"
              @change="handleStartDateChange"
          />
          <span style="color: #fff;">&nbsp;-&nbsp;</span>
          <el-date-picker
              v-model="endDate"
              type="date"
              size="small"
              :picker-options="pickerOptions"
              :editable="false"
              :clearable="false"
              class="datePicker"
              @change="handleEndDateChange"
          />
        </el-form-item>
        <el-form-item>
            <el-input
                v-model="keyword"
                size="small"
                :placeholder="$t('operationLog.placeholderKeyWord')"
                style="width: 100%"
                clearable
            />
                <!-- placeholder="请输入用户名称/分组节点" -->
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
                type="success"
                @click="handleExport" 
                icon="el-icon-download"
                >{{ $t('table.export') }}</el-button
            >
            <!-- 导出 -->
        </el-form-item>
      </div>
      </el-form>
  </div>
  <div class="main">
    <RlTable
        :is-pagination="true"
        :search="false"
        ref="rlTable"
        @on-change="loadTableData"
    >
    <template #default>
      <!-- <el-table-column prop="versionName" label="时间" />
      <el-table-column prop="useDate" label="用户" />
      <el-table-column prop="updateUser" label="操作源" />
      <el-table-column prop="updateTime" label="分组/节点" />
      <el-table-column prop="updateUser" label="类型" />
      <el-table-column prop="remark" label="详情" /> -->
      <el-table-column prop="time" :label="$t('operationLog.tableTime')" :width="150" />
      <el-table-column prop="user" :label="$t('operationLog.tableUser')" :width="200" />
      <el-table-column prop="operateFrom" :label="$t('operationLog.tableSource')" :width="200" />
      <el-table-column prop="operateNode" :label="$t('operationLog.tableGroup')" :width="200" />
      <el-table-column prop="operateType" :label="$t('operationLog.tableType')" :width="200" />
      <el-table-column prop="content" :label="$t('operationLog.tableDetail')">
        <template slot-scope="scope">
            <el-tooltip 
                v-if="scope.row.content && scope.row.content.length > 50" 
            >
                <div slot="content" class="tooltip-content">{{ scope.row.content }}</div>
                <div >{{scope.row.content.slice(0,49) + '...'}}</div>
                <div>{{scope.row.content}}</div>
            </el-tooltip>
            <span v-else>{{scope.row.content}}</span>
        </template>
      </el-table-column>
    </template>
    </RlTable>
  </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { findLogPageList } from '@/api/operationLog'
import { findEnumOptions } from '@/api/common'
import { download } from '@/utils/request'
export default {
  data(){
    return {
      startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      exportParams: null,
      keyword: '',
      operateFrom: '',
      operateType: '',
      sourceList: [],
      typeList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  async created(){
    const source = await findEnumOptions('operateFrom')
    this.sourceList = source.data || []
    const type = await findEnumOptions('operateType')
    this.typeList = type.data || []
  },
  methods:{
    handleStartDateChange() {
      // 如果开始日期改变，确保结束日期大于等于开始日期
      if (dayjs(this.endDate).isBefore(this.startDate)) {
        this.$message.warning(this.$store.state.language == 'zh'? '结束时间不能早于开始时间' : '結束時間不能早於開始時間');
        this.endDate = this.startDate; // 将结束时间设为开始时间
      }
    },
    handleEndDateChange() {
      // 如果结束日期改变，确保结束日期大于等于开始日期
      if (dayjs(this.endDate).isBefore(this.startDate)) {
        this.$message.warning(this.$store.state.language == 'zh'? '结束时间不能早于开始时间' : '結束時間不能早於開始時間');
        this.endDate = this.startDate; // 将结束时间设为开始时间
      }
    },
    handleSearch() {
        this.$nextTick(() => {
            const rlTable = this.$refs.rlTable
            if (rlTable) {
                rlTable.onSearchChange()
            }
        })
    },

    handleReset() {
        this.startDate = dayjs().startOf('month').format('YYYY-MM-DD')
        this.endDate = dayjs().format('YYYY-MM-DD')
        this.operateFrom = ''
        this.operateType = ''
        this.keyword = ''
        this.handleSearch()
    },

    loadTableData({ resolve, params }) {
        params.condition = {
            operateFrom: this.operateFrom,
            operateType: this.operateType,
            start: dayjs(this.startDate).format('YYYY-MM-DD 00:00:00'),
            end: dayjs(this.endDate).format('YYYY-MM-DD 23:59:59'),
            value: this.keyword
        }
        this.exportParams = params
        findLogPageList(params).then((res) => {
            if (res.code == '200') {
                const recordsData = res.data.records || []
                resolve({
                    records: recordsData || [],
                    total: res.data.total || 0,
                })
            } else {
                resolve({
                    records: [],
                    total: 0,
                })
            }
        })
    },
      handleExport() {
          download(
              '/operate/log/export',
              this.exportParams,
              // `操作日志_${new Date().getTime()}.xlsx`
              `操作日志.xlsx`
          )
      },
  }

}
</script>


<style lang="scss" scoped>
.tooltip-content {
  white-space: normal;
  word-wrap: break-word;
  max-width: 500px;
  max-height: 200px;
  overflow-y: auto;
}
.datePicker ::v-deep .el-input__inner {
    width: 140px !important;
}
::v-deep .el-date-editor.el-input {
    width: 140px !important;
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
  // height: calc(100vh - 285px);
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
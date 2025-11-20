<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <div class="table-search">
      <el-form :inline="true" :model="queryParams" ref="queryForm">
        <slot name="search-items">
          <!-- 默认搜索项 -->
          <el-form-item :label="searchLabel" prop="name">
            <el-input
              v-model="queryParams.name"
              :placeholder="'请输入' + searchLabel"
              clearable
              size="small"
            />
          </el-form-item>
        </slot>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作工具栏 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-table
      v-loading="loading"
      :data="list"
      border
    >
      <slot name="columns">
        <!-- 默认列 -->
        <el-table-column :label="searchLabel" align="center" prop="name" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </slot>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: 'CommonList',
  components: {
    Pagination
  },
  props: {
    searchLabel: {
      type: String,
      required: true
    },
    fetchData: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      total: 0,
      list: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      try {
        const { data, total } = await this.fetchData(this.queryParams)
        this.list = data
        this.total = total
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    handleAdd() {
      this.$emit('add')
    },
    handleUpdate(row) {
      this.$emit('update', row)
    },
    handleDelete(row) {
      this.$emit('delete', row)
    }
  }
}
</script> 
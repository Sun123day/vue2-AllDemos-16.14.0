<template>
  <div class="table-container">
    <div class="table-content">
      <el-table
        :data="paginatedData"
        style="width: 100%"
        height="554"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column type="index" width="50" fixed/>
        <el-table-column prop="name" label="景区名称" width="150" show-overflow-tooltip/>
        <el-table-column prop="provinceName" label="所在地区" min-width="90" />
        <el-table-column prop="recommendRate" label="推荐评分" min-width="90" />
        <el-table-column prop="scenicRate" label="景色评分" min-width="90" />
        <el-table-column prop="serviceRate" label="服务评分" min-width="90" />
        <el-table-column prop="facilityRate" label="价格评分" min-width="90" />
        <el-table-column prop="recommendRate" label="设施评分" min-width="90" />
        <el-table-column prop="comment" label="评论内容" width="120">        
            <template slot-scope="scope">
                <el-tooltip 
                    v-if="scope.row.comment && scope.row.comment.length > 15" 
                >
                    <div slot="content" class="tooltip-content">{{ scope.row.comment }}</div>
                    <div >{{scope.row.comment.slice(0,14) + '...'}}</div>
                    <!-- <div>{{scope.row.comment}}</div> -->
                </el-tooltip>
                <span v-else>{{scope.row.comment}}</span>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { comments } from './comments'
export default {
  data() {
    return {
      tableData: comments,  
      currentPage: 1,
      pageSize: 20,
      total: comments.length
    }
  },
  computed: {
    // 计算当前页显示的数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      // 切换每页条数后，回到第一页
      this.currentPage = 1;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    }
  }
}
</script>


<style lang="scss" scoped>
.tooltip-content {
  white-space: normal;
  word-wrap: break-word;
  max-width: 350px;
  max-height: 120px;
  overflow-y: auto;
  padding-right: 10px; 
}
.table-container {
  padding: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 632px;
  position: relative;
  overflow: hidden;
}
.table-content {
  overflow: auto;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  height: 32px;
  padding: 16px 16px 0;
  position: absolute;
  bottom: 16px;
  right: 0;
  width: calc(100% - 32px);
}
</style>
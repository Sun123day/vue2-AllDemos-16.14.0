<!-- // 要想表格行内编辑，则表单嵌套表格 -->
<template>
  <div>
    <el-button @click="addLine">添加行</el-button>
  	<el-form ref="form" :model="form" :rules="formRule">
		<el-table :data="form.tableData" border stripe>
		    <!-- // 序号 -->
			<el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
			<!-- //有必填校验的加 :rules、el-form-item ，scope.row.show控制当前行是否为可编辑状态 -->
			<el-table-column prop="prop" label="管控措施" align="center">
			  <!-- //作用域插槽 -->
	          <template slot-scope="scope">
	            <div style="margin-top:18px">
	              <el-form-item :prop="`tableData.${scope.$index}.measure`" :rules="formRule.measure">
	                <el-input v-model="scope.row.measure" size="mini" placeholder="请输入内容" v-show="scope.row.show" maxlength="500" />
	                <span v-show="!scope.row.show">{{ scope.row.measure }}</span>
	              </el-form-item>
	            </div>
	          </template>
	        </el-table-column>
	        <!-- // 无必填校验写法 -->
	        <el-table-column prop="prop" label="创建时间" align="center">
	          <template slot-scope="scope">
	            <el-input v-model="scope.row.createTime" size="mini" placeholder="请输入内容" v-show="scope.row.show" />
	            <span v-show="!scope.row.show">{{ scope.row.createTime }}</span>
	          </template>
	        </el-table-column>
	        <!-- // 操作列 -->
	        <el-table-column prop="" label="操作" align="center" min-width="80">
	          <template slot-scope="scope">
	            <div class="deomDiv">
	              <div size="mini" v-if="scope.row.state == 0" @click="handleClick(scope.$index, scope.row, '确定')">确定</div>
	              <div size="mini" v-if="scope.row.state == 0" @click="handleClick(scope.$index, scope.row, '取消')">取消</div>
	              <div size="mini" v-if="scope.row.state != 0" @click="handleClick(scope.$index, scope.row, '编辑')">编辑</div>
	              <div size="mini" v-if="scope.row.state != 0" @click="handleClick(scope.$index, scope.row, '删除')">删除</div>
	            </div>
	          </template>
	        </el-table-column>
		</el-table>
		<el-button @click="saveClick">保存</el-button>
	</el-form>
  </div> 
</template>

<script>
import { 
  saveEvalue,
} from '@/api/common'   // 表格保存接口
export default {
	data() {
		return {
			form:{
				tableData: [], //双向绑定的表格（）
			},
			tableData: [], // 储存后端给的初始表格
			formRule: {
			    measure: [{ required: true, message: '请输入', trigger: 'blur' }],
			}
		}
  },
		methods: {
			// 表格内嵌表单单条校验
		    validateField(form, index) {
		      let result = true;
		      for (let item of this.$refs[form].fields) {
		        if(item.prop.split(".")[1] == index){
		          this.$refs[form].validateField(item.prop, err => {
		            if(err != "") {
		                result = false;
		            }
		          });
		        }
		        if(!result) break;
		      }
		      return result;
		    },
		    // 添加行
		    addLine() {
		      this.form.tableData.push({
		        measure: '',
		        createTime: '',
		        state: 0,  // 0时显示确认、取消，1时显示编辑、删除
		        show: true, // true为编辑状态，false为表格行状态
		      })
		    },
		    // 操作
   			handleClick(index, row, type) {
   				switch (type) {
        			case '确定':
        			  if (!this.validateField('form',index)) return  // 必填校验
        			  row.show = false  // 点击确定后，该行变为不可编辑状态
          			  row.state = 1  // 操作列变为编辑、删除
          			  break
          			// 取消时，已保存过的数据恢复原样，未保存的数据直接清空
          			case '取消':
          			  // 假设存在数据库里的数据有的唯一标识id，若该行无id,则表示数据库未曾保存过，点击取消前端直接删除该数据
			          if (row.id == undefined) {
			            this.form.tableData.splice(index, 1)
			            // 数据库中有该数据，恢复到未修改前的状态
			          } else {
			            row.show = false
			            row.state = 1
			            this.tableData.forEach(item => {
			              if(item.id == row.id) {
			                row.measure = item.measure
			                row.createTime = item.createTime
			              }
			            })
			          }
			          break
			        case '编辑':
			          console.log("当前是编辑操作", row);
			          row.show = true
			          row.state = 0
			          break
			        case '删除':
			          this.$confirm('确定删除?', '提示', {
			            confirmButtonText: '确定',
			            cancelButtonText: '取消',
			            type: 'warning'
			          }).then(() => {
			            this.form.tableData.splice(index, 1)
			          })
			          break
   			}
      },
   			// 数组1在数组2中查找自己不存在的数据，并返回查找键值组成的数组
		    filterArr(arr1, arr2) {
		      var key1=[]
		      var key2=[]
		      for(var i in arr1){
		        key1.push( arr1[i].id)
		      }
		      for(var i in arr2){
		        key2.push( arr2[i].id)
		      }
		      const arr = [...key1,...key2];
		      const newArr = arr.filter(item => {
		        return !(key1.includes(item) && key2.includes(item));
		      });
		      return newArr;
		    },
   			saveClick() {
		      // flag为true,整个表格的数据都已点击确认为不可编辑状态了。flag为false,表格数据还有没保存的。
		      let flag = true
		      // 表格数组长度不为0，说明内部可能存在状态为1是之前保存过的数据 2新添加的数据 3以被删除的数据
		      if (this.form.tableData.length != 0) {
		        // 如果表格有数据没保存，flag为false
		        this.form.tableData.forEach(item => {
		          if (item.show == true) {
		            flag = false
		          }
		        })
		        if (!flag) {
		          this.$message.warning("请确认列表信息")
		        } else {
		          // 表格数据都已确认可以保存
		          let arr = []   // 之前存在的（也就是已经存入数据库当中的）
		          let arr1 = []   // 被新增的（还未进入数据库）
		          let arr2 = []   // 被删除的（已经进入数据库但是被删除的）
		          // 表格实时数据区分
		          this.form.tableData.forEach(item => {
		            if (item.id) {
		              // 之前存在的
		              arr.push(item)
		            } else {
		              // 新增的
		              arr1.push(item)
		            }
		          })
		          // 初始表格数据 与 目前表格 中已保存的数据对比
		          // 返回被删除数据的id
		          let m = this.filterArr(arr, this.tableData)
		          // 被删除数据形成数组(被删除的数据在初始表格中)
		          this.tableData.forEach(item => {
		            m.forEach(val => {
		              if (item.id == val) {
		                // deletedFlag
		                item.deletedFlag = 0
		                arr2.push(item)
		              }
		            })
		          })
		          console.log("之前存在的", arr);
		          console.log("被新增的", arr1);
		          console.log("被删除的", arr2);
		          // 三个类型拼接一起
		          let allArr = arr.concat(arr1).concat(arr2)
		          // 前端自用的show,state不传给后端
		          allArr.forEach(item => {
		            delete item.show
		            delete item.state
		          })
		          // 保存接口
		          saveEvalue(allArr).then(res => {
		            if (res.code == 200) {
		              this.$message.success(res.msg)
		            } else {
		              this.$message.warning(res.errorMsg)
		            }
		          })
		        }
		      // 如果当前表格数据长度为空
		      } else {
		        this.$confirm('未添加任何数据?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          // 初始表格数据不为空，则数据全部删除
		          if (this.tableData.length != 0) {
		            this.tableData.forEach(item => {
		              item.deletedFlag = 0
		              delete item.show
		              delete item.state
		            })
		            saveEvalue(this.tableData).then(res => {
		              if (res.code == 200) {
		                this.$message.success(res.msg)
		              } else {
		                this.$message.warning(res.errorMsg)
		              }
		            })
		          // 初始表格数据为空，实时表格数据也为空，直接传个空数据
		          } else {
		            saveEvalue([]).then(res => {
		              if (res.code == 200) {
		                this.$message.success(res.msg)
		              } else {
		                this.$message.warning(res.errorMsg)
		              }
		            })
		          }
		        }).catch((e) => {
		          if(e==='close'){
		          }else if(e==='cancel'){
		          }
		        });
		      }
		    }
		}
    }
</script>
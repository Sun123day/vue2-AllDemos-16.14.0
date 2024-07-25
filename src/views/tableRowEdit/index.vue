<template>
  <div>
    <el-button @click="addLine" :disabled="addDisableFlag">添加行</el-button>
    <el-form 
			ref="form" 
			:model="form" 
			:rules="formRule"
			>
      <el-table :data="form.tableData" border>
        <el-table-column label="车牌号码" align="center">
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.plateNo`" :rules="formRule.plateNo">
              <el-input v-model="scope.row.plateNo" size="small" clearable placeholder="请输入内容" @blur="handlePlateNoBlur(scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="进出凭证" align="center">
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.etcNo`" :rules="formRule.etcNo">
              <el-input v-model="scope.row.etcNo" size="small" clearable placeholder="请输入" @blur="handleEtcNoBlur(scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { validatePlateNo } from "@/utils/validate.js";

export default {
  data() {
    return {
			addDisableFlag: false,
      form: {
        tableData: [],
      },
      formRule: {
        plateNo: [
          { required: true, message: "请输入车牌号码", trigger: "blur" },
          { validator: validatePlateNo, trigger: "blur" }
        ],
        etcNo: [
          { required: true, message: "请输入进出凭证", trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    addLine() {
      const newRow = {
        plateNo: "",
        etcNo: ""
      };
      this.form.tableData.push(newRow);
    },
    handlePlateNoBlur(row) {
      this.validateField('plateNo', row);
    },
    handleEtcNoBlur(row) {
      this.validateField('etcNo', row);
    },
    validateField(field, row) {
      this.$refs.form.validateField(`tableData.${this.form.tableData.indexOf(row)}.${field}`, (errorMessage) => {
        if (errorMessage) {
          // console.log(errorMessage);
					this.addDisableFlag = true
        } else {
					this.addDisableFlag = false
				}
      });
    }
  }
};
</script>

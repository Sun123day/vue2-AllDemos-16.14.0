<script>
import dayjs from "dayjs";
export default {
    data() {
        return {
            typeList:[
                {code: 1, name: "按月"},
                {code: 2, name: "按天"},
            ],

            formData:{
                chargeMethod: 1,//充值方式
                chargeNumber: 0,//充值数额
                freeNumber: 0,//免费赠送
                validFrom: dayjs().format('YYYY-MM-DD'),//开始时间
                validTo:  null,//结束时间
            },
            rules:{
                chargeNumber: [
                    { required: true, message: '请输入充值数', trigger: 'blur' },
                    { pattern: /^(?:0|[1-9]\d{0,5}|999999)$/, message: '请输入不超过999999并不以0作为开头的正整数', trigger: 'blur' }
                ],
                freeNumber: [
                    { pattern: /^(?:0|[1-9]\d{0,5}|999999)$/, message: '请输入不超过999999并不以0作为开头的正整数', trigger: 'blur' }
                ],
                validFrom:[
                    { required: true, message: "请选择开始时间", trigger: "change" },
                    { validator: this.validateValidFrom, trigger: 'change' }
                ],
                validTo:[
                    { required: true, message: "请选择结束时间", trigger: "change" },
                    { validator: this.validateValidTo, trigger: 'change' }
                ],
            }
        }
    },
    watch: {
        'formData.chargeMethod': {
            handler: 'calculateEndDate',
            immediate: true
        },
        'formData.chargeNumber': {
            handler: 'calculateEndDate',
            immediate: true
        },
        'formData.freeNumber': {
            handler: 'calculateEndDate',
            immediate: true
        },
    },
    methods:{
        handleValidFromChange(value) {
            this.$refs.ruleForm.validateField('validTo');
            this.calculateChargeNumbers();
            if (value) {
                this.resetFreeNumber();
            }
            this.autoAdjustEndDate();
        },
        handleValidToChange(value) {
            this.$refs.ruleForm.validateField('validFrom');
            this.calculateChargeNumbers();
            if (value) {
                this.resetFreeNumber();
            }
            this.autoAdjustEndDate();
        },
        resetFreeNumber() {
            if (this.formData.freeNumber !== 0) {
                this.formData.freeNumber = 0;
            }
        },
        validateValidTo(rule, value, callback) {
            if (value && this.formData.validFrom && dayjs(value).isBefore(this.formData.validFrom, 'day')) {
                callback(new Error('结束时间不能早于开始时间'));
            } else {
                callback();
            }
        },
        validateValidFrom(rule, value, callback) {
            if (value && this.formData.validTo && dayjs(value).isAfter(this.formData.validTo, 'day')) {
                callback(new Error('开始时间不能晚于结束时间'));
            } else {
                callback();
            }
        },

        calculateChargeNumbers() {
            let validFrom = dayjs(this.formData.validFrom);
            let validTo = dayjs(this.formData.validTo);
            
            if (validTo.isValid() && validTo.isAfter(validFrom)) {
                let diff;
                if (this.formData.chargeMethod === 1) {
                    diff = validTo.diff(validFrom, 'month');
                } else if (this.formData.chargeMethod === 2) {
                    diff = validTo.diff(validFrom, 'day');
                }
                this.formData.chargeNumber = Math.max(0, diff);
                this.formData.freeNumber = 0;
            } else {
                this.formData.chargeNumber = 0;
                this.formData.freeNumber = 0;
            }
        },

        calculateEndDate() {
            let validFrom = dayjs(this.formData.validFrom);
            let chargeNumber = parseInt(this.formData.chargeNumber) || 0;
            let freeNumber = parseInt(this.formData.freeNumber) || 0;

            if (validFrom.isValid()) {
                let validTo;

                if (this.formData.chargeMethod === 1) { // 按月
                validTo = validFrom.add(chargeNumber, 'month').add(freeNumber, 'month');
                } else if (this.formData.chargeMethod === 2) { // 按天
                validTo = validFrom.add(chargeNumber, 'day').add(freeNumber, 'day');
                }

                this.formData.validTo = validTo.format('YYYY-MM-DD');
                this.autoAdjustEndDate();
            } else {
                this.formData.validTo = null;
            }
        },

        autoAdjustEndDate() {
            let validFrom = dayjs(this.formData.validFrom);
            let validTo = dayjs(this.formData.validTo);
            if (validTo.isValid() && validTo.isAfter(validFrom)) {
                let diff;
                if (this.formData.chargeMethod === 1) {
                diff = validTo.diff(validFrom, "day");
                if (diff < 30) {
                    this.formData.chargeMethod = 2;
                    this.calculateChargeNumbers();
                }
                }
            }
        }
    }
}
</script>
<template>
    <el-form
        label-position="right"
        label-width="72px"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
    >
        <el-row :gutter="24">
            <el-col :span="24">
                <el-form-item label="充值选择" class="first-line">
                    <el-radio-group v-model="formData.chargeMethod" >
                        <el-radio
                            style="color: #19272E !important;"
                            v-for="item in typeList"
                            :key="item.code" 
                            :label="item.code">
                        {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item :label="formData.chargeMethod == 1 ? '充值月数' : '充值天数'" class="first-line" prop="chargeNumber">
                    <div class="txt-container">
                        <el-input
                            placeholder="请输入"
                            v-model.number="formData.chargeNumber"
                            clearable
                            style="width: 100%;"
                            maxlength="6"
                        />
                        <span class="txt-after" v-if="formData.chargeMethod == 1">月</span>
                        <span class="txt-after" v-if="formData.chargeMethod == 2">天</span>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item :label="formData.chargeMethod == 1 ? '赠送月数' : '赠送天数'" class="first-line" prop="freeNumber">
                    <div class="txt-container">
                        <el-input
                            placeholder="请输入"
                            v-model.number="formData.freeNumber"
                            clearable
                            style="width: 100%;"
                            maxlength="6"
                        />
                        <span class="txt-after" v-if="formData.chargeMethod == 1">月</span>
                        <span class="txt-after" v-if="formData.chargeMethod == 2">天</span>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="开始时间" class="first-line" prop="validFrom">
                  <el-date-picker
                      :clearable="false"
                      v-model="formData.validFrom"
                      type="date"
                      format="yyyy-MM-dd"
                      size="small"
                      style="margin-right: 0; width: 100%;"
                      :editable="false"
                      class="custom-datepicker"
                      placeholder="请选择开始时间"
                      @input="handleValidFromChange"
                  />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="结束时间" class="first-line" prop="validTo">
                  <el-date-picker
                      :clearable="false"
                      v-model="formData.validTo"
                      type="date"
                      format="yyyy-MM-dd"
                      size="small"
                      style="margin-right: 0; width: 100%;"
                      :editable="false"
                      class="custom-datepicker"
                      placeholder="请选择结束时间"
                      @input="handleValidToChange"
                  />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<style lang="scss" scoped>
.txt-container {
    display: flex;
}
.txt-after {
    width: 14px;
    height: 32px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #19272E;
    line-height: 32px;
    text-align: left;
    font-style: normal;
    margin-left: 8px;
}

  ::v-deep .el-form-item__error {
    padding-top: 2px;
  } 
::v-deep .custom-datepicker.el-input--prefix .el-input__inner {
    padding: 0 30px !important;
}
::v-deep .el-input__inner {
    padding: 0 8px !important;
    height: 32px;
    line-height: 32px;
}

::v-deep .el-form-item {
    margin-bottom: 16px !important;
    display: flex;
    align-items: center;
  }

  ::v-deep .el-form-item__label {
    height: 32px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #19272E !important;
    line-height: 32px;
    font-style: normal;
    padding: 0 !important;
  }
  ::v-deep .el-form-item__content {
    margin-left: 24px !important;
    width: 90%;
    height: 32px !important;
    line-height: 32px !important;
  }

  .first-line.el-form-item {
    height: 32px !important;
  }
  ::v-deep .charge-line {
    label {
        text-align: center !important;
    }
  }
  .second-line.el-form-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px !important;
  }
</style>
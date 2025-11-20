<template>
    <el-form 
        label-position="left" 
        label-width="100px"
        :model="formData" 
        :rules="rules" 
        ref="ruleForm"
        
    >
        <el-row :gutter="24">
            <el-col :span="24">
                <!-- <el-form-item label="所属区域：" prop="areaId"> -->
                <el-form-item :label="dialogArea" prop="areaId">
                    <el-tree-select
                        v-if="areaFlag"
                        class="customSelectTree"
                        v-model="formData.areaId"
                        :treeParams="areaOptions"
                        :select-params="{
                            // size: 'small',
                            clearable: true,
                            multiple: false,
                            collapseTags: true,
                            placeholder: placeholderChoose
                        }"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <!-- <el-form-item label="能源类型：" prop="energyCode"> -->
                <el-form-item :label="dialogEnergy" prop="energyCode">
                    <el-select
                        v-model="formData.energyCode"
                        filterable
                        :placeholder="placeholderChoose"
                        transfer
                        style="width: 100%"
                    >
                        <!-- placeholder="请选择"  -->
                        <el-option
                            v-for="item in energyList"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <!-- <el-form-item label="启用年份：" prop="year"> -->
                <el-form-item :label="dialogYear" prop="year">
                    <el-date-picker
                        v-model="formData.year"
                        type="year"
                        :editable="false"
                        :clearable="false"
                        style="width: 100%;"
                        class="calendar-single"
                        :pickerOptions="pickerOptions"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <!-- <el-form-item label="因子值：" prop="carbon"> -->
                <el-form-item :label="dialogCarbon" prop="carbon">
                    <el-input 
                        :placeholder="placeholderInput" 
                        v-model="formData.carbon"
                        clearable
                    />
                        <!-- placeholder="请输入"  -->
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
<style lang="scss" scoped>
.customSelectTree ::v-deep.el-select.el-tree-select-input.el-popover__reference {
    width: 100% !important;
    margin-left: 0 !important;
}
.customSelectTree {
    margin-left: 0 !important;
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
<script>
    import dayjs from "dayjs";
    import { 
        addAreaCarbonInfo,
        updateAreaCarbonInfo,
    } from "@/api/factorManage";
    import { getAreaTree } from '@/api/regionMessage'
    import { findEnumOptions } from '@/api/common'
    export default {
        name: "FormModal",
        props: {
            title: String,
            rowData: Object
        },
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > new Date().getTime()    //使用这种方法实现
                    },
                },
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
                energyList:[],
                formData:{
                    projectId:this.$store.state.projectId,
                    areaId:this.$props.rowData?.areaId || null,                
                    energyCode:this.$props.rowData?.energyCode || null,
                    year:this.$props.rowData?.year || dayjs().format('YYYY'),
                    carbon:this.$props.rowData?.carbon || 0,
                },
                rules:{
                    areaId: [
                        { required: true, message: "請選擇地區", trigger: "change" }
                    ],
                    energyCode: [
                        { required: true, message: "請選擇能源類型", trigger: "change" }
                    ],
                    year: [
                        { required: true, message: "請選擇啟用年份", trigger: "change" }
                    ],
                    carbon: [
                        { required: true, message: "請輸入碳排因子", trigger: "blur" }
                    ],
                }
            }
        },
        created(){
            this.initSetModal()
            this.initArea()
            this.initEnergyList()
        },
        computed:{
            dialogArea() {
                if(this.$store.state.language == 'zh'){
                    return '所属区域'
                }else{
                    return '所屬區域'
                }
            },
            dialogEnergy() {
                if(this.$store.state.language == 'zh'){
                    return '能源类型'
                }else{
                    return '能源類型'
                }
            },
            dialogYear() {
                if(this.$store.state.language == 'zh'){
                    return '启用年份'
                }else{
                    return '啟用年份'
                }
            },
            dialogCarbon() {
                if(this.$store.state.language == 'zh'){
                    return '因子值'
                }else{
                    return '因子值'
                }
            },
            placeholderInput() {
                if(this.$store.state.language == 'zh'){
                    return '请输入'
                }else{
                    return '請輸入'
                }
            },
            placeholderChoose() {
                if(this.$store.state.language == 'zh'){
                    return '请选择'
                }else{
                    return '請選擇'
                }
            },
            tableSave() {
                if(this.$store.state.language == 'zh'){
                    return '保存'
                }else{
                    return '儲存'
                }
            },
            tableCancel() {
                if(this.$store.state.language == 'zh'){
                    return '取消'
                }else{
                    return '取消'
                }
            },
            tableAdd() {
                if(this.$store.state.language == 'zh'){
                    return '新增'
                }else{
                    return '新增'
                }
            },
            tableEdit() {
                if(this.$store.state.language == 'zh'){
                    return '编辑'
                }else{
                    return '編輯'
                }
            },
        },
        methods:{
            initEnergyList() {
                findEnumOptions('energyType').then(res => {
                    if (res.code === 200) {
                        this.energyList = res.data || [];
                    }
                })
            },
            initArea() {
                getAreaTree().then(res => {
                    if (res.code === 200) {
                        this.areaOptions.data = res.data;
                        this.areaFlag = true;
                    }
                })
            },
            initSetModal() {
                if (this.$props.rowData) {
                    // this.$emit("SetTitle", "编辑");
                    this.$emit("SetTitle", this.tableEdit);
                } else {
                    // this.$emit("SetTitle", "新增");
                    this.$emit("SetTitle", this.tableAdd);
                }
                this.$emit("SetPageWidth", 600);
                this.$emit("SetPageActions", [
                    {
                        // text: "取消",
                        text: this.tableCancel,
                        theme: "info",
                        handle: () => {
                            this.$emit("Close");
                        }
                    },
                    {
                        // text: "保存",
                        text: this.tableSave,
                        theme: "primary",
                        handle: () => {
                            this.submitForm();
                        },
                        loading: false
                    }
                ]);
            },
            submitForm() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                    //验证成功,发送请求
                    if (this.$props.rowData) {
                        //编辑更新
                        this.sendUpdateRequestFun();
                    } else {
                        //新增
                        this.sendAddRequestFun();
                    }
                    } else {
                    //验证失败
                    }
                });
            },
            sendAddRequestFun() {
                    addAreaCarbonInfo({
                    ...this.formData,
                    year: dayjs(this.formData.year).format('YYYY')
                }).then(result => {
                    if (result.code == 200) {
                        this.$message.success(result.msg);
                        this.$emit("Close", true);
                    }
                }).catch((err) => {
                    this.$message.error(err)
                })
            },
            sendUpdateRequestFun() {
                const params={
                    ...this.formData,
                    id: this.$props.rowData?.id,
                    year: dayjs(this.formData.year).format('YYYY')
                }
                    updateAreaCarbonInfo(params).then(result => {
                    if (result.code == 200) {
                        this.$message.success(result.msg);
                        this.$emit("Close", true);
                    }
                }).catch((err) => {
                    this.$message.error(err)
                })
            },
        }
    }
</script>

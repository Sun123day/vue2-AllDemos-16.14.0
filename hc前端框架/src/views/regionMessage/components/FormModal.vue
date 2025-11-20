<template>
    <el-form 
        label-position="left" 
        label-width="100px"
        :model="formData" 
        :rules="rules" 
        ref="ruleForm"
    >
        <el-row :gutter="24">
            <el-col :span="24" v-if="formData.parentId && formData.parentId != -1">
                <!-- <el-form-item label="上级地区名称"> -->
                <el-form-item :label="dialogParentName">
                    <el-input v-model="formData.parentName" disabled />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <!-- <el-form-item label="地区名称" prop="name"> -->
                <el-form-item :label="dialogName" prop="name">
                    <el-input 
                        :placeholder="placeholderName"
                        v-model="formData.name"
                    />
                        <!-- placeholder="请输入"  -->
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <!-- <el-form-item label="地区编码" prop="code"> -->
                <el-form-item :label="dialogCode" prop="code">
                    <el-input 
                        :placeholder="placeholderCode"
                        v-model="formData.code"
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
}
</style>
<script>
    import { addRequest, updateRequest } from '@/api/regionMessage'
    export default {
        props: {
            title: String,
            rowData: Object,
            type: String,
        },
        data() {
            return {
                formData:{
                    id: this.$props.rowData?.id || null,
                    parentId: this.$props.rowData?.parentId || null,
                    parentName: this.$props.rowData?.parentName || '',
                    name:this.$props.rowData?.name || null,
                    code:this.$props.rowData?.code || null,
                },
                rules:{
                    name: [
                        { required: true, message: "請輸入地區名稱", trigger: "blur" }
                    ],
                    code: [
                        { required: true, message: "請選擇地區編碼", trigger: "blur" }
                    ],
                }
            }
        },
        created() {
            console.log(this.$props.rowData)
            if (this.$props.type === 'ADD') {
                // this.formData.parentName =
                //     this.$props.rowData?.parentName + '/' + this.$props.rowData?.name
                this.formData.parentName =
                    this.$props.rowData.parentName ? this.$props.rowData.parentName + '/' + this.$props.rowData?.name : this.$props.rowData?.name
                this.formData.name = ''
                this.formData.code = ''
            }
            this.initSetModal()
        },
        mounted() {},
        computed:{
            placeholderName() {
                if(this.$store.state.language == 'zh'){
                    return '请输入地区名称'
                }else{
                    return '請輸入地區名稱'
                }
            },
            placeholderCode() {
                if(this.$store.state.language == 'zh'){
                    return '请输入地区编码'
                }else{
                    return '請輸入地區編碼'
                }
            },
            dialogParentName() {
                if(this.$store.state.language == 'zh'){
                    return '上级地区名称'
                }else{
                    return '上級地區名稱'
                }
            },
            dialogName() {
                if(this.$store.state.language == 'zh'){
                    return '地区名称'
                }else{
                    return '地區名稱'
                }
            },
            dialogCode() {
                if(this.$store.state.language == 'zh'){
                    return '地区编码'
                }else{
                    return '地區編碼'
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
                            if (this.$props.type === 'EDIT') {
                                this.sendUpdateRequestFun()
                            }
                            //新增子节点
                            if (this.$props.type === 'ADD') {
                                this.sendAddRequestFun()
                            }
                        } else {
                            //新增父节点
                            this.sendAddRequestFun()
                        }
                    } else {
                    //验证失败
                    }
                });
            },
            sendAddRequestFun() {
                let { id, parentId, name, code } = {
                    ...this.formData,
                }
                if (this.$props.type === 'ADD') {
                    parentId = id
                } else {
                    parentId = null
                }
                const params = {
                    name,
                    code,
                    parentId,
                }
                addRequest(params).then((result) => {
                    if (result.code == 200) {
                        this.$message.success(result.msg)
                        this.$emit('Close', true)
                    }
                })
            },
            sendUpdateRequestFun() {
                const params = {
                    ...this.formData,
                    id: this.$props.rowData?.id
                }
                updateRequest(params).then((result) => {
                    if (result.code == 200) {
                        this.$message.success(result.msg)
                        this.$emit('Close', true)
                    }
                })
            },
        }
    }
</script>

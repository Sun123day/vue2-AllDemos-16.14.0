<template>
    <div style="width: 98%">
        <el-form label-position="top" :model="formData" :rules="rules" ref="ruleForm">
            <el-row :gutter="24">
                <el-col :span="24">
                    告警说明: {{ rowData.alarmDescription || rowData.alarmDesc }}
                </el-col>
                <el-col :span="24">
                    <el-form-item label="处理说明" prop="cureOpinion">
                        <el-input
                            placeholder="请输入"
                            v-model="formData.cureOpinion"
                            clearable
                            type="textarea"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    import HandlerForm from '@/components/HandlerForm'
    export default {
        props: {
            title: String,
            isAssert: Boolean,
            rowData: Object,
        },
        data() {
            return {
                formData: {
                    cureOpinion: '',
                },
                rules: {
                    cureOpinion: [{ required: true, message: '请输入处理说明', trigger: 'change' }],
                },
            }
        },
        created() {
            this.initSetModal()
        },
        methods: {
            /**
             * @name: initSetModal
             * @msg: 初始化设置modal弹窗属性
             * @return {*}
             */

            initSetModal() {
                this.$emit('SetTitle', this.$props.title)
                this.$emit('SetPageWidth', 800)
                this.$emit('SetPageActions', [
                    {
                        text: '取消',
                        theme: 'default',
                        handle: () => {
                            this.$emit('Close')
                        },
                    },
                    {
                        text: '保存',
                        theme: 'primary',
                        handle: () => {
                            this.submitForm()
                        },
                        loading: false,
                    }
                ])
            },
            /**
             * @name: submitForm提交form表单数据
             * @msg:
             * @return {*}
             */

            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //验证成功,发送请求
                        this.$emit('Close', {
                            ...this.rowData,
                            ...{ cureOpinion: this.formData.cureOpinion },
                        })
                    } else {
                        //验证失败
                    }
                })
            },
            /**
             * @name: 新增请求
             * @test: test font
             * @msg:
             * @return {*}
             */

            sendAddRequestFun() {
                const params = this.formData
                addUser(params).then((result) => {
                    if (result.code == 200) {
                        this.$message.success(result.msg)
                        this.$emit('Close', true)
                    }
                })
            },
            /**
             * @name: 编辑更新请求
             * @test: test font
             * @msg:
             * @return {*}
             */

            sendUpdateRequestFun() {
                const params = this.formData
                updateUser({
                    ...params,
                    id: this.$props.rowData?.id,
                }).then((result) => {
                    if (result.code == 200) {
                        this.$message.success(result.msg)
                        this.$emit('Close', true)
                    }
                })
            },
        },
    }
</script>

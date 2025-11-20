<script>
    import { modifyPassword } from '@/api/system'
    import { removeToken } from '@/utils/auth'
    import { redirect } from '@/utils/index'
    export default {
        data() {
            const regular = {
                password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
            }
            const validatePass = (rule, value, callback) => {
                if (value && !regular.password.test(value)) {
                    return callback(new Error('密码格式输入有误'))
                } else {
                    callback()
                }
            }
            const validatePass2 = (rule, value, callback) => {
                if (value !== this.formData.newPassword) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                passwordType: 'password',
                newPasswordType: 'password',
                oldPasswordType: 'password',
                formData: {},
                rules: {
                    oldPassword: [{ required: true, message: '舊密碼不能為空', trigger: 'blur' }],
                    newPassword: [
                        { required: true, message: '新密碼不能為空', trigger: 'blur' },
                        {
                            pattern: /[a-z]/g,
                            message: '必須包含小寫字母',
                            trigger: 'blur',
                        },
                        {
                            pattern: /[A-Z]/g,
                            message: '必須包含大寫字母',
                            trigger: 'blur',
                        },
                        {
                            pattern: /[0-9]/g,
                            message: '必須包含數字',
                            trigger: 'blur',
                        },
                        {
                            pattern: /[\W_!@#$%^&*`~()-+=]/g,
                            message: '必須包含特殊字符',
                            trigger: 'blur',
                        },
                        { min: 8, max: 16, message: '長度在 8 到 32 個字符', trigger: 'blur' },
                    ],
                    repeat: [
                        { required: true, message: '新密碼不能為空', trigger: 'blur' },
                        {
                            pattern: /[a-z]/g,
                            message: '必須包含小寫字母',
                            trigger: 'blur',
                        },
                        {
                            pattern: /[A-Z]/g,
                            message: '必須包含大寫字母',
                            trigger: 'blur',
                        },
                        {
                            pattern: /[0-9]/g,
                            message: '必須包含數字',
                            trigger: 'blur',
                        },
                        {
                            pattern: /[\W_!@#$%^&*`~()-+=]/g,
                            message: '必須包含特殊字符',
                            trigger: 'blur',
                        },
                        { min: 8, max: 16, message: '長度在 8 到 32 個字符', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' },
                    ],
                },
            }
        },
        computed:{
            saveButton(){
                return this.$store.state.language == 'zh'? '保存' : '儲存'
            },
            labelText1() {
                return this.$store.state.language == 'zh'? '旧密码' : '舊密碼'
            },
            labelText2() {
                return this.$store.state.language == 'zh'? '新密码' : '新密碼'
            },
            labelText3() {
                return this.$store.state.language == 'zh'? '确认新密码' : '確認新密碼'
            },
            placeholderText1() {
                return this.$store.state.language == 'zh'? '请输入旧密码' : '請輸入舊密碼' 
            },
            placeholderText2() {
                return this.$store.state.language == 'zh'? '8-16个字符，包含数字、字母、特殊字符，区分大小写' : '8-16個字符，包含數字、字母、特殊字符，區分大小寫' 
            },
            placeholderText3() {
                return this.$store.state.language == 'zh'? '请再次输入密码' : '請再次輸入密碼' 
            }
        },
        methods: {
            //保存
            onSave() {
                const { userId } = this.$store.state.userInfo || {}
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        modifyPassword({
                            password: this.formData.repeat,
                            oldPassword: this.formData.oldPassword,
                            id: userId,
                        }).then((result) => {
                            if (result && result.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success',
                                })
                                removeToken()
                                setTimeout(() => {
                                    redirect()
                                }, 1000)
                            }
                        })
                    } else {
                        return false
                    }
                })
            },
            onCancel() {
                this.$router.go(-1)
            },
        },
    }
</script>
<template>
    <div class="reset-container">
        <div class="handle-box">
            <i />
            <Space>
                <el-button type="info" @click="onCancel">返回</el-button>
                <!-- <el-button type="primary" @click="onSave"> 保存 </el-button> -->
                <el-button type="primary" @click="onSave"> {{ saveButton }} </el-button>
            </Space>
        </div>
        <el-form :model="formData" :rules="rules" class="reset-form" label-width="120px" ref="form">
            <!-- <el-form-item label="旧密码" prop="oldPassword"> -->
            <el-form-item :label="labelText1" prop="oldPassword">
                <el-input
                    v-model="formData.oldPassword"
                    :type="oldPasswordType"
                    :placeholder="placeholderText1"
                >
                    <!-- placeholder="请输入旧密码" -->
                    <template slot="suffix">
                        <span
                            @click="
                                () => {
                                    this.oldPasswordType =
                                        this.oldPasswordType === 'password' ? '' : 'password'
                                }
                            "
                        >
                            <svg-icon
                                :icon-class="oldPasswordType === 'password' ? 'eye' : 'eye-open'"
                            />
                        </span>
                    </template>
                </el-input>
            </el-form-item>
            <!-- <el-form-item label="新密码" prop="newPassword"> -->
            <el-form-item :label="labelText2" prop="newPassword">
                <el-input
                    v-model="formData.newPassword"
                    :type="newPasswordType"
                    :placeholder="placeholderText2"
                >
                    <!-- placeholder="8-16个字，包含数字、字母、特殊字符，区分大小写" -->
                    <template slot="suffix">
                        <span
                            @click="
                                () => {
                                    this.newPasswordType =
                                        this.newPasswordType === 'password' ? '' : 'password'
                                }
                            "
                        >
                            <svg-icon
                                :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'"
                            />
                        </span>
                    </template>
                </el-input>
            </el-form-item>
            <!-- <el-form-item label="确认新密码" prop="repeat"> -->
            <el-form-item :label="labelText3" prop="repeat">
                <el-input
                    v-model="formData.repeat"
                    :type="passwordType"
                    :placeholder="placeholderText3"
                >
                    <!-- placeholder="请再次输入密码" -->
                    <template slot="suffix">
                        <span
                            @click="
                                () => {
                                    this.passwordType =
                                        this.passwordType === 'password' ? '' : 'password'
                                }
                            "
                        >
                            <svg-icon
                                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                            />
                        </span>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
    .reset-container {
        height: 100%;
    }
    .reset-form {
        width: 600px;
        margin: 0 auto;
        padding-top: 70px;
    }
</style>

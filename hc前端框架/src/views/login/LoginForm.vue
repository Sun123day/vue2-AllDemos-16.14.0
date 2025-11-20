<script>
    import { captchaImage, login } from '@/api/system'
    import Cookies from 'js-cookie'
    import { encrypt, decrypt } from '@/utils/jsencrypt'
    
    // 设置存储实时运行组态中的点位数据相关内容
    import { findProArchiveOptions } from '@/api/proArchive'
    import { findConfigurationDataList } from '@/api/realtimeConfiguration'
    import store from '@/store'

    export default {
        data() {
            return {
                passwordType: 'password',
                codeUrl: '',
                loginForm: {
                    username: '',
                    password: '',
                    
                    validateCodeKey: null,
                    validateCode: null,
                },
                rememberMe: Boolean(Cookies.get('rememberMe')),
                loginRules: {
                    username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
                    password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
                    code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
                },
                loading: false,
                captchaEnabled: true,
                register: false,
                redirect: undefined,
                capsTooltip: false,
                otherQuery: {},
            }
        },
        created() {
            this.getCode()
            this.getCookie()
        },
        
        methods: {
            getCode() {
                captchaImage().then((result) => {
                    const { image = '', validateCodeKey = '' } = result.data || {}
                    this.codeUrl = 'data:image/gif;base64,' + image || ''
                    this.loginForm.validateCodeKey = validateCodeKey
                })
            },
            getCookie() {
                const username = Cookies.get('username')
                const password = Cookies.get('password')
                this.loginForm = {
                    username: username === undefined ? this.loginForm.username : username,
                    password: password === undefined ? this.loginForm.password : decrypt(password),
                }
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            checkCapslock(e) {
                const { key } = e
                this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
            },
            handleLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true
                        if (this.rememberMe) {
                            Cookies.set('username', this.loginForm.username, { expires: 30 })
                            Cookies.set('password', encrypt(this.loginForm.password), {
                                expires: 30,
                            })
                            Cookies.set('rememberMe', this.rememberMe, {
                                expires: 30,
                            })
                        } else {
                            Cookies.remove('username')
                            Cookies.remove('password')
                            Cookies.remove('rememberMe')
                        }
                        //登录
                        login({
                            username: this.loginForm.username,
                            password: this.loginForm.password,
                            validateCodeKey: this.loginForm.validateCodeKey,
                            validateCode: this.loginForm.validateCode,
                        }).then((result) => {
                            if (result.code == 200) {
                                const { access_token, refresh_token, expires_in } =
                                    result.data || {}
                                this.$message.success(result.msg)
                                Cookies.set('token', access_token)
                                Cookies.set('refresh_token', refresh_token)
                                this.$router.push({ path: this.redirect || '/' })
                                store.dispatch('realTimeList', {}) 
                            } else {
                                this.getCode()
                            }
                            this.loading = false
                        })
                    }
                })
            },
        },
    }
</script>
<template>
    <el-form
        autocomplete="on"
        label-position="left"
        class="login-el-form"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
    >
        <div class="login-form-title"> 账号登录 </div>
        <el-form-item prop="username">
            <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入账号"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
            >
                <template slot="prefix">
                    <span class="svg-container">
                        <svg-icon icon-class="user" />
                    </span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
            >
                <template slot="prefix">
                    <span>
                        <svg-icon icon-class="password" />
                    </span>
                </template>
                <template slot="suffix">
                    <span @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="validateCode" v-if="captchaEnabled">
            <div style="display: flex; align-items: center; width: 100%">
                <el-input
                    v-model="loginForm.validateCode"
                    auto-complete="off"
                    placeholder="验证码"
                    style="flex: 1"
                    clearable
                    @keyup.enter.native="handleLogin"
                >
                    <template slot="prefix">
                        <span>
                            <svg-icon icon-class="validCode" />
                        </span>
                    </template>
                </el-input>
                <div class="login-code">
                    <img
                        width="100"
                        height="40"
                        :src="codeUrl"
                        @click="getCode"
                        class="login-code-img"
                    />
                </div>
            </div>
        </el-form-item>
        <el-checkbox v-model="rememberMe" style="margin: 0px 0px 25px 0px">
            记住密码
        </el-checkbox>
        <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
        >
            <!-- {{ $t("login.logIn") }} -->
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
        </el-button>
    </el-form>
</template>
<style lang="scss" scoped>
.login-el-form ::v-deep  .el-input__inner {
    color: #fff !important;
}
input ::v-deep  .el-input__inner {
   background: transparent !important;
}
    .login-el-form {
        width: 100%;
        .login-form-title {
            width: 100%;
            // padding-top: 65px;
            // padding-bottom: 25px;
            margin-top: 65px;
            margin-bottom: 25px;

            height: 30px;
            font-family: PingFang SC, PingFang SC;
            font-weight: bold;
            font-size: 30px;
            line-height: 30px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            background: linear-gradient(36deg, #E9EFFA 25%, #7390C4 100%);
            -webkit-background-clip: text;  /* 使背景渐变应用到文本 */
            color: transparent;  /* 让文本本身透明，这样背景渐变才会显示 */
        }
        .login-code {
            width: 100px;
            box-sizing: border-box;
            overflow: hidden;
            img {
                cursor: pointer;
                vertical-align: middle;
                width: 100%;
                height: 40px;
            }
        }
        ::v-deep .el-input__inner {
            color: #333;
        }
    }
    ::v-deep .el-input__inner {
        color: #c0c4cc;
    }
    ::v-deep .el-checkbox__label {
        color: #c0c4cc;
    }
    ::v-deep .el-checkbox__inner::after{
        border-color: $primary-color;
    }
</style>

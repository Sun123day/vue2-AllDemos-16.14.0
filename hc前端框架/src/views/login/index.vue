<script>
    import Logo from './logo.vue'
    import LoginForm from './LoginForm.vue'
    export default {
        components: {
            Logo,
            LoginForm,
        },
    }
</script>
<template>
    <!-- <div class="login-page">
        <Logo />
        <div class="login-form-box">
            <LoginForm />
        </div>
    </div> -->
    <div class="login-page">
        <div class="login-bg-img">
            <div class="title">华创建投智慧节能管理云平台</div>
            <Logo />
            <div class="login-form-box">
                <LoginForm />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .login-page {
        // position: absolute;
        // left: 0;
        // right: 0;
        // bottom: 0;
        // top: 0;
        // overflow: hidden;
        // background-image: url('~@/assets/image/login/background-login.png');
        background-image: url('~@/assets/login_background_color.png');
        background-size: cover;

        height: 100%;
        width: 100%;
    }
    .login-bg-img {
        position: relative;
        background-image: url('~@/assets/login_background_img.png');
        background-size: calc(100vw * 1661 / 1920) calc(100vh * 833 / 1080);
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;

        background-position: 60% 70%;
        background-repeat: no-repeat;

        height: 100%;
        width: 100%;
    }

    .title {
        // z-index: 10;

        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: normal;
        font-size: 48px;
        line-height: 48px;
        letter-spacing: 7px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        
        background: linear-gradient(36deg, #E9EFFA 25%, #7390C4 100%);
        -webkit-background-clip: text;  /* 使背景渐变应用到文本 */
        color: transparent;  /* 让文本本身透明，这样背景渐变才会显示 */

        position: absolute;
        // top: 135px;
        // left: 130px;
        top: 18%;
        left: 170px;
    }

    .login-form-box {
        border-radius: 6px;
        // background: #ffffff;
        width: calc(100vw * 468 / 1920);
        height: calc(100vh * 520 / 1080);
        min-width: 360px;
        min-height: 454px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 63%;
        z-index: 10;
        margin: auto;
        padding: 0px calc(100vw * 50 / 1920) 0px calc(100vw * 50 / 1920);
    }
</style>

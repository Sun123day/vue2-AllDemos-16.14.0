<template>
    <div class="navbar">
        <div class="navbar-box">
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'

    export default {
        components: {
            Breadcrumb,
        },
        computed: {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 40px;
        width: 100%;
        overflow: hidden;
        position: relative;
        // margin-bottom: $nav-bar-margin-top;
        // margin-bottom: 16px;
        margin-bottom: 8px;
        // margin-top: $nav-bar-margin-top;
        margin-top: 8px;
        border-radius: 4px;
        .hamburger-container {
            line-height: 40px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background 0.3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }
        ::v-deep .el-breadcrumb__inner a,
        .el-breadcrumb__inner.is-link {
            color: $nav-bar-text-color !important;
        }
        ::v-deep.app-breadcrumb.el-breadcrumb .no-redirect {
            color: $nav-bar-text-color !important;
        }
        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 40px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: $nav-bar-text-color;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background 0.3s;

                    &:hover {
                        background: rgba(0, 0, 0, 0.025);
                    }
                }
            }

            .avatar-container {
                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .navbar-box {
        position: absolute;
        left: 16px;
        right: 16px;
        height: 100%;
        background: $nav-bar-bg-color;
    }
</style>

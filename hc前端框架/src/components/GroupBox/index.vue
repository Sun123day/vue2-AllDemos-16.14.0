<script>
    export default {
        props: {
            title: {
                type: String,
                default: '',
            },
            bodyContent: {
                type: Object,
            },
        },
    }
</script>

<template>
    <div class="group-box">
        <div class="header">
            <div class="title-box">
                <template v-if="title">
                    <div class="line" />
                    <span>{{ title }}</span>
                </template>
                <slot v-else name="left" />
            </div>
            <div class="right-box">
                <slot name="right" />
            </div>
        </div>
        <div class="group-box-body" :style="bodyContent">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .group-box {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 6px;
        border: $group-box-border;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .header {
            height: 55px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding: 0 15px;
            border-bottom: $group-box-border;
            box-sizing: border-box;
            .title-box {
                font-size: 16px;
                color: #ffffff;
                height: 100%;
                align-items: center;
                display: flex;
                .line {
                    width: 3px;
                    height: 15px;
                    background: #257de8;
                    border-radius: 1px;
                    margin-right: 10px;
                }
            }
            .right-box {
                font-size: 16px;
                // color: #ffffff;
            }
        }
        .group-box-body {
            min-height: 100px;
            padding: 15px;
            flex-grow: 1;
            position: relative;
            color: #257de8;
        }
    }
</style>

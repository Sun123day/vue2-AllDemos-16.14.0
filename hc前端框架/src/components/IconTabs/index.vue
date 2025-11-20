<template>
    <div class="tabs-container">
        <div
            v-for="item in sourceData"
            :key="item.code"
            :class="[
                'item',
                {
                    active: value === item.code,
                },
            ]"
            @click="handleClickItem(item)"
        >
            <span class="icon"> <img class="img" :src="item.url" alt="" /></span>
            <span class="text">{{ item.text }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: String,
            sourceData: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            handleClickItem({ code }) {
                this.$emit('input', code)
                this.$emit('change', code)
            },
        },
    }
</script>
<style lang="scss" scoped>
    .tabs-container {
        display: inline-flex;
        border-radius: 4px;
        // border: 1px solid #2b8eff;
        border: 1px solid #2F67DE;
        color: #fff;
        .item {
            // flex: 1;
            // color: #2b8eff;
            // color: #12a3e8;
            color: #2F67DE;
            display: inline-flex;
            align-items: center;
            padding: 10px 10px;
            cursor: pointer;
            .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 8px;
                padding-left: 4px;
                vertical-align: top;
                .img {
                    // width: 16px;
                    height: 16px;
                    vertical-align: top;
                }
            }
            .text {
                display: inline-block;
                padding-right: 10px;
                line-height: 19px;
            }
            &.active,
            &:hover {
                // background: #2b8eff;
                // background: #12a3e8;
                background: #2F67DE;
                color: #fff;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            content: {
                type: String,
                default: '暂无数据',
            },
        },
    }
</script>
<template>
    <div class="emptyBox">
        <div class="empty-image">
            <img src="@/assets/null-data.png" />
        </div>
        <span class="table__empty-text">{{ content }}</span>
    </div>
</template>
<style lang="scss" scoped>
    .emptyBox {
        margin: 0 8px;
        font-size: 14px;
        line-height: 1.5715;
        text-align: center;

        .empty-image {
            width: 140px;
            height: 72px;
            margin: 0 auto;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .table__empty-text {
            color: #909399;
            line-height: 60px;
        }
    }
</style>

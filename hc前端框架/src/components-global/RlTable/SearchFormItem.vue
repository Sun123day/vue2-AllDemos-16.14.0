<script>
    import GridItem from '@/components-global/Grid/GridItem.vue'
    export default {
        name: 'SearchFormItem',
        components: { GridItem },
        props: {
            label: {
                type: String,
                default: '',
            },
            required: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>
<template>
    <el-form-item :label="label" :required="required">
        <slot />
    </el-form-item>
</template>

<style lang="scss" scoped>
    .el-form-item__label, .el-form-item {
        color: #000 !important;
    }
    ::v-deep .el-form-item__label{
        color: $table-search-text-color !important;
    }
    ::v-deep .el-form-item {
        color: $table-search-text-color !important;
        margin-bottom: 0px;
        display: flex;
        .el-form-item__label {
            color: $table-search-text-color !important;
        }
    }
</style>

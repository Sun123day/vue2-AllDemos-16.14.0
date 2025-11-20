<script>
    export default {
        name: 'ImgList',
        props: {
            rowData: {
                type: Object,
            },
            filePath: {
                type: String,
                default:"filePath"
            },
        },
        computed: {
            getImgList() {
                if (this.$props.rowData) {
                    const filePath = this.$props.rowData[this.filePath] || []
                    
                    if (filePath.length <= 0) {
                        return []
                    } else {
                        const filePathList = filePath.split(',')
                        return filePathList
                    }
                } else {
                    return []
                }
            },
        },
    }
</script>
<template>
    <Space>
        <el-image
            v-for="url in getImgList"
            style="width: 26px; height: 26px"
            :src="url"
            :key="url"
            fit="fill"
            :preview-src-list="[url]"
        >
        </el-image>
    </Space>
</template>

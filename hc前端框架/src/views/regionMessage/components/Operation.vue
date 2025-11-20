<template>
    <Space>
        <el-button type="text" @click="editClick" class="btn">
            <span style="display: flex;">
                <img class="icon" src="@/assets/image/operation/editIcon.png" alt="">
                <!-- <span class="edit-txt">编辑</span> -->
                <span class="edit-txt">{{ $t('table.edit') }}</span>
            </span>
        </el-button>
        <el-button type="text" @click="onDeleteClick" class="btn">
            <span style="display: flex;">
                <img class="icon" src="@/assets/image/operation/deleteIcon.png" alt="">
                <!-- <span class="delete-txt">删除</span> -->
                <span class="delete-txt">{{ $t('table.delete') }}</span>
            </span>
        </el-button>
        <el-button type="text" @click="addClick" class="btn" 
        >
            <!-- v-if="!this.$props.rowData.parentId == -1" -->
            <span style="display: flex;">
                <img class="icon" src="@/assets/image/operation/addIcon.svg" alt="">
                <!-- <span class="add-txt">新增子区域</span> -->
                <span class="add-txt">{{ $t('regionMessage.operAddChild') }}</span>
            </span>
        </el-button>
    </Space>
</template>
<style lang="scss" scoped>
.btn {
    display: flex;
    align-content: center;
}
.icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
}
.delete-txt {
    color: #FF4444;
    font-size: 14px;
    line-height: 16px;
    height: 14px;
}
.edit-txt {
    color: #00E0FF;
    font-size: 14px;
    line-height: 16px;
    height: 14px;
}
.add-txt {
    color: #1db5f6;
    font-size: 14px;
    line-height: 16px;
    height: 14px;
}
</style>
<script>
    import FormModal from './FormModal.vue'
    import { deleteTableRow } from '@/api/regionMessage'
    export default {
        name: 'Operation',
        props: {
            rowData: {
                type: Object,
                default: () => {
                    return {}
                },
            },
        },
        inject: ['tableRoot'],
        computed: {
          text1() {
            return this.$store.state.language == 'zh' ? '您确认要删除数据吗？' : '您確認要刪除數據嗎？'
          },
          text2() {
            return this.$store.state.language == 'zh'? '确定' : '確定' 
          }
        },
        methods: {
            editClick() {
                new this.$pageModal(
                    FormModal,
                    {
                        props: {
                            title: '编辑',
                            rowData: this.$props.rowData,
                            type: 'EDIT',
                        },
                    },
                    (result) => {
                        if (result) {
                            this.tableRoot.onSearchChange()
                        }
                    }
                )
            },
            onDeleteClick() {
                // this.$confirm('您确认要删除数据吗？', '提示', {
                this.$confirm(this.text1, '提示', {
                    // confirmButtonText: '确定',
                    confirmButtonText: this.text2,
                    cancelButtonText: '取消',
                    distinguishCancelAndClose: true,
                    type: 'warning',
                }).then(() => {
                    deleteTableRow(this.rowData.id).then((result) => {
                        if (result.code == 200) {
                            this.$message.success(result.msg)
                            this.tableRoot.onSearchChange()
                        }
                    })
                })
            },
            addClick() {
                new this.$pageModal(
                    FormModal,
                    {
                        props: {
                            title: '新增子项目',
                            rowData: this.$props.rowData,
                            type: 'ADD',
                        },
                    },
                    (result) => {
                        if (result) {
                            this.tableRoot.onSearchChange()
                        }
                    }
                )
            },
        },
    }
</script>

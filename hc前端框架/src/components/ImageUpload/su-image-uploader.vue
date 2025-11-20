<template>
    <div class="su-image-uploader__wrap">
        <!-- 外部描述 -->
        <div class="su-image-uploader__description">{{ description }}</div>
        <!-- 渲染框 -->
        <div
            v-loading="uploading"
            class="su-image-uploader"
            :class="{ 'su-image-uploader-notnull': fileObj }"
            :style="{ width: width + 'px', height: height + 'px' }"
        >
        <!-- 渲染框中的提示栏 -->
            <div v-if="!fileObj" class="su-image-uploader__handler">
                <em class="su-image-uploader__icon iconfont icon-add-new"></em>
                <span class="su-image-uploader__label">+上传{{ imgText }}</span>
            </div>
            <!-- 图片预览 -->
            <el-image
                v-if="fileObj"
                :preview-src-list="imageList"
                style="width: 100%; height: 100%"
                fit="cover"
                :src="fileObj"
            />
            <!-- 关闭按钮 -->
            <i 
                class="el-icon-circle-close su-image-uploader__close" 
                v-if="fileObj" 
                @click="clearFileObj"
                style="font-size: 22px; line-height: 22px; color: #fff;"
            ></i>
            <!-- 上传操作 -->
            <div class="su-image-uploader-filebox">
                <input
                    ref="fileInput"
                    :accept="accept"
                    :multiple="multiple"
                    class="su-image-uploader__input"
                    type="file"
                    @change="fileReaderChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SuImageUploader',
        props: {
            description: {
                type: String,
                default: '',
            },
            imgText: {
                type: String,
                default: '图片',
            },
            width: {
                type: Number,
                default: 200, // M
            },
            height: {
                type: Number,
                default: 200, // M
            },
            accept: {
                type: String,
                default: 'image/png, image/jpeg, image/gif',
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            maxSize: {
                type: Number,
                default: 30, // M
            },
            imgUrl: {
                type: String,
                default: '', 
            },
        },
        data() {
            return {
                uploading: false,
                fileObj: '',
                imageList: [],
                localImgUrl: this.imgUrl,
            }
        },
        methods: {
            // 设置大小限制
            checkSizeLimit(file) {
                const fileSize = file.size // 单位b
                const maxSize = this.maxSize * 1024 * 1024
                if (fileSize > maxSize) {
                    this.$message(`文件大小不得大于${this.maxSize}M`)
                    return false
                }
                return true
            },
            // 上传操作
            fileReaderChange() {
                const $input = this.$refs.fileInput;
                const files = $input.files;
                if (!files.length) return;
                const file = files[0];
                if (!this.checkSizeLimit(file)) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Data = event.target.result;
                    this.fileObj = base64Data;
                    // this.imgUrl = base64Data;
                    this.localImgUrl = base64Data;
                    this.$emit('update:imgUrl', this.localImgUrl);
                    this.$emit('success', this.fileObj);
                    // console.log(this.fileObj, "&&&&&&&&&&&&&&&&&&&&&&&&&&");
                };
                reader.readAsDataURL(file);
            },
            //清空选中的图片
            clearFileObj() {
                this.$refs.fileInput.value = ''; // 将文件输入框的值清空
                this.fileObj = '';
                this.imageList = [];
                this.localImgUrl = '';
                this.$emit('update:imgUrl', this.localImgUrl);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .su-image-uploader {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        box-sizing: border-box;
        position: relative;
        justify-content: center;
        align-items: center;
        border: 1px solid #dddddd5e;
        color: #999;
        cursor: pointer;
        border-radius: 10px;

        &.su-image-uploader-notnull {
            .su-image-uploader-filebox {
                right: auto;
                bottom: 10px;
                top: auto;
                left: 50%;
                min-width: 100px;
                height: 32px;
                transform: translate(-50%, 0);
                border-radius: 30px;
                background-color: var(--primary-color);
                color: #fff;
            }
        }

        &__icon {
            font-size: 20px;
        }

        &-filebox {
            position: absolute;
            z-index: 3;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            cursor: pointer;
        }

        &__wrap {
        }

        &__description {
            font-size: 12px;
            line-height: 1.6;
            color: #999;
            margin-bottom: 15px;
        }

        &__reload {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
        }

        &__input {
            font-size: 200px;
            position: absolute;
            z-index: 3;
            right: 0;
            top: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }

        &__handler {
            position: absolute;
            z-index: 2;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        &__close {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 12px;
            color: #999;
            cursor: pointer;
        }
    }
</style>

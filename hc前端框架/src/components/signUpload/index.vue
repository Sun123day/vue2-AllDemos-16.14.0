<template>
    <div>
        <!-- <span>请上传JPG、PNG格式的图片，图片大小在30M以内</span> -->
        <span>{{ computedMSG }}</span>
        <div class="signUpload" @click="handleWrapper">
            <input
                ref="fileRef"
                class="fileInput"
                type="file"
                @change="handleChange"
                accept="image/*"
                single
            />
            <div class="img-container" v-show="url">
                <img class="img" :src="url" alt="" />
                <i class="el-icon-error delete" @click.stop="handleDelete"></i>
            </div>
            <i v-show="!url" class="el-icon-plus plus"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'signUpload',
        props: {
            value: String,
            maxSize: {
                type: [String, Number],
                // default: () => 5,
                default: () => 100,
            },
        },
        data() {
            return {
                url: this.value,
            }
        },
        watch: {
            value(newValue) {
                this.url = newValue
            },
        },
        computed: {
            computedMSG() {
                if(this.$store.state.language == 'zh'){
                    return '请上传JPG、PNG格式的图片，图片大小在100kB以内'
                }else{
                    return '請上傳JPG、PNG格式的圖片，圖片大小在100kB以內'
                }
            },
        },
        methods: {
            handleWrapper() {
                const file = this.$refs.fileRef
                file.click()
            },
            handleChange(event) {
                const file = event.target.files[0]

                if (!file) {
                    return this.clearValue()
                }

                // if (file && file.size > this.maxSize * 1024 * 1024) { // M
                if (file && file.size > this.maxSize * 1024) { // kB
                    this.$message({
                        // message: `文件大小超过限制,最大为${this.maxSize}M！`,
                        message: `文件大小超过限制,最大为${this.maxSize}kB！`,
                        type: 'warning',
                    })
                    return this.clearValue()
                }
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (e) => {
                    this.url = reader.result
                    this.$emit('input', this.url)
                }
                reader.onerror = (e) => {
                    this.clearValue()
                }
            },
            handleDelete() {
                this.clearValue()
            },
            clearValue() {
                this.$refs.fileRef.value = ''
                this.url = ''
                this.$emit('input', this.url)
            },
        },
    }
</script>
<style scoped lang="scss">
    .signUpload {
        position: relative;
        width: 120px;
        height: 120px;
        border: 1px dashed $com-default-border-color;
        border-radius: 10px;
        background: $com-bg-color;
        text-align: center;
        cursor: pointer;
        .plus {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 36px;
            color: $com-default-border-color;
            transform: translate(-50%, -50%);
        }
        .img-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .img {
                object-fit: cover;
                max-height: 100%;
                max-width: 100%;
            }
            .delete {
                position: absolute;
                top: -8px;
                right: -8px;
                color: #ff6464;
                font-size: 24px;
            }
        }
        .fileInput {
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            height: 0;
            cursor: pointer;
            z-index: 0;
        }
    }
</style>

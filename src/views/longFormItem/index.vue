<template>
  <el-form
    label-width="80px"
  >
    <el-form-item label="你的问题标题">
      <span :title="txt" class="spanStyle">{{ txt }}</span>
    </el-form-item>
  </el-form>
</template>
 
<script>
export default {
  data() {
    return {
      txt: '这是一段非常非常长的文本，我们希望在鼠标悬浮时显示完整内容。'
    };
  },
};
</script>

<style lang="scss" scoped>
.spanStyle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
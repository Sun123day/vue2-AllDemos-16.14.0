<template>
  <div class="com">
    <el-drawer 
      :title="titleTxt" 
      :visible.sync="internalDrawer" 
      :direction="direction"
      @close="handleClose"
    >
      <span>干点正事吧! {{ task.name }}</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => ({})
    },
    drawer: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    titleTxt: {
      type: String,
      default: '标题捏'
    }
  },
  data() {
    return {
      internalDrawer: this.drawer
    }
  },
  watch: {
    drawer(newValue) {
      this.internalDrawer = newValue
    },
    internalDrawer(newValue) {
      this.$emit('drawerClose', newValue) // Emit `update:drawer` to sync with parent
    }
  },
  methods: {
    handleClose() {
      this.internalDrawer = false
    }
  }
}
</script>

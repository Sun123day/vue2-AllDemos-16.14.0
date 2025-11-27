<template>
  <div>
    111111
  </div>
</template>

<script>
export default {
  created() {
    this.initSetModal();
  },
  methods: {
    initSetModal() {
      this.$emit('SetTitle', '编辑');
      this.$emit('SetPageActions', [
        {
          text: '确认',
          theme: 'primary',
          handle: () => {
            this.$emit('Close');
          },
        },
        {
          text: '取消',
          theme: 'default',
          handle: () => {
            this.$emit('Close');
          },
        },
      ]);
    }
  }
}
</script>

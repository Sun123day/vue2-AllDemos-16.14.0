<!-- 表头斜线分割 -->
<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 24px;">
    <h1>表头斜线分割</h1>
    <Table />
    <Div />
  </div>
</template>

<script>
import Table from './table.vue';
import Div from './div.vue';
export default {
  components: {
    Table,
    Div
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
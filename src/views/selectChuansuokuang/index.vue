<template>
  <div>
    <div class="block">
      <span class="demonstration">默认 click 触发子菜单</span>
      <el-cascader
        v-model="value"
        :options="options"
        @change="handleChange"
        collapse-tags
        :props="props"
        :show-all-levels="false"
        clearable
      />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        props: { multiple: true },
        value: [],
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
              }, 
              {
                value: 'daohang',
                label: '导航',
              }
            ]
          }, 
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
              }, 
              {
                value: 'form',
                label: 'Form',
              }, {
                value: 'data',
                label: 'Data',
              }, {
                value: 'notice',
                label: 'Notice',
              }, {
                value: 'navigation',
                label: 'Navigation',
              }, {
                value: 'others',
                label: 'Others',
              }
            ]
          }, 
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              }, {
                value: 'sketch',
                label: 'Sketch Templates'
              }, {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>
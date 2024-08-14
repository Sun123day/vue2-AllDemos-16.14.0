<template>
  <div>
      <el-button :class="`my-btn btn-${type}`"><slot></slot></el-button>
  </div>
</template>
<script>
    export default {
        name: "Spebutton", //组件名称 Spebutton 必须的
        props: {
            type: {
              type: String,
              default: "primary1",
            },
        },
    }
</script>
<style>
    .btn-primary1{
       background: #1890FF;
       color: #fff;
       border: 0px; 
       padding:5px 10px;
       border-radius: 2px;
       margin: 5px;
    }
    .btn-primary2{
       background: #3d4145;
       color: #fff;
       border: 0px; 
       padding:5px 10px;
       border-radius: 2px;
       margin: 5px;
    }
    .btn-primary3{
       background:#285d0d;
       color: #fff;
       border: 0px; 
       padding:5px 10px;
       border-radius: 2px;
       margin: 5px;
    }
</style>

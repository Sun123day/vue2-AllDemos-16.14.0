<template>
  <div class="com">
      <el-drawer 
        title="我是标题" 
        :visible.sync="drawer" 
        :direction="direction"
      >
          <span>我来啦! {{task.name}}</span>
      </el-drawer>
  </div>
</template>

<script>
  export default {
      props:{
          task:{
              type:Object,
              default:()=>{}
          },
          drawer:{
              type:Boolean,
              default:false
          },
          direction:{
              type:String,
              default:'rtl'
          }
      },
      data(){
          return {
          }
      },
      created(){
        console.log("drawer", this.$props.drawer);
      },
      // computed: {
      //     drawer_:{
      //         get(){
      //             return this.drawer
      //         },
      //         set(v){
      //             this.$emit("changeDrawer",v)
      //        }
      //     }
      // },
  }

</script>
<style scoped>
</style>
<template>
  <div>
    {{ Name }}的序号为{{ Code }}
  </div>
</template>

<script>
export default {
  props:{
    rowData:Object
  },
  data(){
    return{
      Name:this.$props.rowData.name,
      Code:this.$props.rowData.code,
    }
  }
}
</script>

<style>

</style>
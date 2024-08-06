<!-- 二选一 -->
<!-- 废弃 -->
<template>
	<el-form ref="form" :model="form" :rule="rules">
  	<el-form-item label="名称" prop="name">
    	<el-input v-model="form.name" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
    	<el-input v-model="form.nickname" placeholder="请输入昵称" />
    </el-form-item>
    
    <el-form-item>
    	<el-button @click="sub">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
	export default {
  	data(){
    	return {
      	form: {
          name:'',
          nickname:'',
        },
        rules:{
        	name: [{required: true, trigger: 'blur'}],
          // nickname: [{validator: this.validateName,trigger: 'blur'}],
          nickname: [{required: true, trigger: 'blur'}],
        },
      }
    },
    methods: {
    	validateName(rule,value,callback) {
        console.log("进入了");
      	if(!this.form.name && !this.form.nickname) {
        console.log("触发了");
        	callback(new Error("名称和昵称至少填写一项"))
        } else if (this.form.name&&!/^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/.test(this.name)) {
        		callback(new Error("名称格式不对，支持中文或者英文(20位字符内)"));
        } else {
        	//如果一项已填取消另外一项的必填校验提示
        	if(this.name){//name已填取消nickname校验
          	this.$refs["form"].clearValidate('nickname');
          } else {//nickname已填取消name校验
          	this.$refs["form"].clearValidate('name');
          }
        }
        callback();//调用callback通过校验
      },
      sub() {
        console.log("sub方法");
      	this.$refs.form.validate((valid) => {
          console.log("valid", valid);
        	if(valid) {//校验通过
          	//接口请求等操作
          } else {
          	//校验未通过
             this.$message.error("请完善必填信息");
            return false;
          }
        })
      }
    },
  }
</script>
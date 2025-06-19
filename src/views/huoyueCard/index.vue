<template>
  <div class="content">
    <h1>活跃卡片点击</h1>
    <div class="container">
      <div 
        v-for="(item, index) in computedList"
        :key="index"
        class="card"
        :class="['card', item.checked ? 'card-select' : 'card-unselect']"
        @click="handleClick(item)"
      >
        {{ item.name }}
        <div 
          :class="['icon', item.checked ? 'el-icon-success' : '']" 
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        moudleList: [
          {
            name: 'AI节能策略',
            value: 'config1',
          },
        ],
      }
  },
  created(){
      this.initList()
  },
  computed:{
    titleName() {
        if(this.$store.state.language == 'zh'){
            return '切换模式'
        }else{
            return '切換模式'
        }
    },
    placeholderInput() {
        if(this.$store.state.language == 'zh'){
            return '请输入'
        }else{
            return '請輸入'
        }
    },
    tableSave() {
        if(this.$store.state.language == 'zh'){
            return '保存'
        }else{
            return '儲存'
        }
    },
    tableCancel() {
        if(this.$store.state.language == 'zh'){
            return '取消'
        }else{
            return '取消'
        }
    },
    computedList() {
      const cardList = this.moudleList
      return cardList
    },
  },
  methods:{
      initList() {
        const list = [
          {
            name: '本地站控策略',
            value: 'local',
            checked: false,
          }
        ]
        // 定义一个新的数组，将list和moudleList合并，并且为每个项添加一个checked属性，除去“本地站控策略”的checked属性为false
        const newList = list.concat(this.moudleList.map(item => ({ ...item, checked: false })))

        this.moudleList = newList
        // console.log("所有", newList)
        this.handleClick(newList[0])
      },
      handleClick(item) {
        // console.log("点击了", item.name)
        // 将选中的项的checked属性设置为true，其他项的checked属性设置为false
        this.computedList.forEach((item) => {
          item.checked = false
        })
        item.checked = true
        // console.log("所有", this.computedList)
        if(item.name !== '本地站控策略'){
        }
        
      },
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  .container {
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 116px;
  width: 400px; 
  border-radius: 5px;
  border: 10px solid rgba(255, 255, 255, 0.5);
  .icon {
    height: 16px; 
    width: 16px; 
    color: #37cd0c; 
    margin-left: 8px; 
    font-size: 24px; 
    line-height: 16px;
  }
}
.card-select {
  background: linear-gradient( 151deg, #28A5FF 0%, #006DED 100%); 
  // border: 10px solid #37cd0c;
}
.card-unselect {
  background: linear-gradient( 151deg, #3AACFF 0%, rgba(0,221,255,0.89) 100%);
}
</style>

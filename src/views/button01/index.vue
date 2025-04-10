
<template>
  <div>
    <Spebutton  type="primary1" class="notes">按钮primary1</Spebutton>
    <Spebutton  type="primary2" class="notes">按钮primary2</Spebutton>
    <Spebutton  type="primary3" class="notes">按钮primary3</Spebutton>
    <FancyButton>
      测试测试测试测试
    </FancyButton>
    <Dialog>
      <template #buttonClick>
        芝士按钮
      </template>
      <template #buttonContent>
        芝士内容
      </template>
    </Dialog>
    <el-date-picker
        v-model="timeRange"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :editable="false"
        :clearable="false"
    />
  </div>
</template>
<script>
import dayjs from 'dayjs'
import Spebutton from '@/components/Spebutton'
import FancyButton from '@/components/FancyButton'
import Dialog from '@/components/Dialog'
export default {
  components: {
    Spebutton,
    FancyButton,
    Dialog,
  },
   data(){
      return{
        timeRange: [
          dayjs().format('YYYY-MM-DD 00:00:00'), 
          dayjs().format('YYYY-MM-DD 23:59:59')
        ]
      }
   },
   methods:{},
}
</script>

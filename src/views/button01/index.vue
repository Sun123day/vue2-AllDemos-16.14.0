
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
  </div>
</template>
<script>
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
      return{}
   },
   methods:{},
}
</script>

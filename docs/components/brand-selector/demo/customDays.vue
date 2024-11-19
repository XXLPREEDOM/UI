<template>
  <div>
    <ElForm :model="form">
      <dp-date-start-end v-model:start="form.effected_at" v-model:end="form.expired_at" :optoins="form.optoins"></dp-date-start-end>
    </ElForm>

  </div>
</template>

<script setup lang="ts" name="DateStartEnd">
import { ElForm } from 'element-plus'
import { ref } from 'vue'
const handleStartChange = ()=>{
  console.log('我是开始时间change');
}
const handleEndChange = ()=>{
  console.log('我是结束时间change');
}
const form = ref({
  effected_at: '',
  expired_at: '',
  optoins:{
    timeRange:5,
    previousDate:true,
    startChange:handleStartChange,
    endChange:handleEndChange
  }
})

</script>

<style lang="scss" scoped></style>
  
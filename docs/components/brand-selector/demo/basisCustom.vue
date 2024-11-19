<template>
    <div>
      <ElForm :model="form">
        <dp-date-start-end v-model:start="form.effected_at" v-model:end="form.expired_at" :optoins="{type:'month'}"></dp-date-start-end>
      </ElForm>
    </div>
  </template>
  
  <script setup lang="ts" name="DateStartEnd">
  import { ElForm } from 'element-plus'
  import {ref} from 'vue'
  const form = ref({
    effected_at: '',
    expired_at: ''
  })
  </script>
  
  <style lang="scss" scoped></style>
    
<script setup lang="ts">
import { XButton, XInput } from '@xxl/xxl-ui'
import { ref } from 'vue';

const value = ref('')
</script>

<template>
  <h4>button</h4>
  <x-button type="danger" plain></x-button>
  <h4>input</h4>
  <x-input v-model="value"></x-input>

</template>

<style scoped lang="scss"> 

</style>

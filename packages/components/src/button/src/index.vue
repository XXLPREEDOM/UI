<template>
  <el-button class="xxl-button" v-bind="$attrs">
    <slot>default</slot>
  </el-button>
</template>

<script setup lang="ts" name="XButton">
import { ElButton } from "element-plus";
</script>

<style lang="scss" scoped>
.xxl-button {
  min-width: 100px;
}
</style>

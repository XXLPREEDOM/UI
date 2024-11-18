<template>
  <el-input
    class="xxl-input"
    v-bind="Object.assign($attrs, props)"
    :placeholder="placeholder"
    :clearable="clearable"
  >
    <template #[slotName] v-for="(slot, slotName) in $slots">
      {{ slot }}
      <slot :name="slotName" />
    </template>
  </el-input>
</template>

<script name="XInput" setup lang="ts">
import { ElInput } from "element-plus";

interface XInput {
  clearable: boolean;
  placeholder: string;
}

const props = withDefaults(defineProps<Partial<XInput>>(), {
  clearable: true,
  placeholder: "请输入",
});
</script>

<style lang="scss" scoped>
.xxl-input {
  min-width: 100px;
  color: aqua;
}
</style>

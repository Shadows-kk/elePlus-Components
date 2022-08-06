<template>
  <el-popover
    popper-class="notification-poper-class"
    placement="bottom"
    :width="300"
    trigger="click"
  >
    <template #reference>
      <el-badge :value="value" :max="max" :isDot="isDot">
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
    <template #default>
      <!-- el-popover预留了一个匿名插槽，可以替代content的内容,我们可以在这里设置一个自己的插槽动态决定内容 -->
      <slot></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { toLine } from "../../utils/index";
const props = defineProps({
  // 显示的图标
  icon: {
    type: String,
    default: "Bell",
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: "",
  },
  // 最大值
  max: {
    type: Number,
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>

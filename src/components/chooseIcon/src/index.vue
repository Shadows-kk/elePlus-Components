<template>
  <div>
    <el-button @click="handleClick" type="primary">
      <slot></slot>
    </el-button>
    <el-dialog v-model="dialogVisible" :title="title" width="30%"></el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
let props = defineProps<{
  // 弹出框的标题
  title: string;
  // 弹出框的显示
  visible: boolean;
}>();
let emits = defineEmits(["update:visible"]);
//拷贝父组件传过来的visible
let dialogVisible = ref<boolean>(props.visible);
const handleClick = () => {
  emits("update:visible", !props.visible);
};
// 监听visible的变化
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);
watch(
  () => dialogVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>

<style scoped></style>

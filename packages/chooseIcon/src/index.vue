<template>
  <div>
    <el-button @click="handleClick" type="primary">
      <slot></slot>
    </el-button>
    <div class="choose-icon-el-dialog__body-height">
      <el-dialog v-model="dialogVisible" :title="title">
        <div class="container">
          <div
            class="item"
            v-for="(item, index) in Object.keys(Icons)"
            :key="index"
            @click="handleCopy(item)"
          >
            <div><component :is="`el-icon-${toLine(item)}`"></component></div>
            <div>{{ item }}</div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import * as Icons from "@element-plus/icons-vue";
import { toLine } from "../../utils/index";
import { useCopy } from "../../hooks/useCopy";
let props = defineProps<{
  // 弹出框的标题
  title: string;
  // 弹出框的显示
  visible: boolean;
}>();
let emits = defineEmits(["update:visible"]);
//拷贝父组件传过来的visible
let dialogVisible = ref<boolean>(props.visible);
// 点击显示弹出框
const handleClick = () => {
  emits("update:visible", !props.visible);
};
// 点击复制组件名
const handleCopy = (item: string) => {
  let text = `< el-icon-${toLine(item)} />`;
  useCopy(text);
  dialogVisible.value = false;
};
// 监听visible的变化,只能监听父组件第一次传过来的值
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

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    height: 70px;
  }
}
svg {
  width: 2em;
  height: 2em;
}
</style>

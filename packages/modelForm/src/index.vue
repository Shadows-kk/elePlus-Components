<template>
  <div :class="{ 'choose-icon-el-dialog__body-height': isScroll }">
    <el-dialog v-model="dialogFormVisible" v-bind="$attrs">
      <template #default>
        <config-form
          :options="options"
          ref="form"
          label-width="100px"
          @on-change="onChange"
          @on-preview="handlePreview"
          @on-remove="handleRemove"
          @before-remove="beforeRemove"
          @on-exceed="handleExceed"
          @before-upload="beforeUpload"
          @on-success="onSuccess"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTips>
            <slot name="uploadTips"></slot>
          </template>
        </config-form>
      </template>
      <template #footer>
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { IFormInstance, IFormOptions } from "../../form/src/type/types";
const form = ref<IFormInstance | null>(null);
const emits = defineEmits(["update:visible"]);
const props = defineProps({
  // 子组件不能直接绑定父组件传过来的数据
  visible: {
    type: Boolean,
    default: false,
  },
  // 表单的配置
  options: {
    type: Array as PropType<IFormOptions[]>,
    required: true,
  },
  // 控制弹框只在屏幕区域内滚动
  isScroll: {
    type: Boolean,
    default: false,
  },
  // 上传的相关方法
  onChange: {
    type: Function,
  },
  handlePreview: {
    type: Function,
  },
  handleRemove: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  handleExceed: {
    type: Function,
  },
  beforeUpload: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
});
// 弹出框的显示与隐藏
let dialogFormVisible = ref<boolean>(props.visible);
watch(
  () => props.visible,
  (val) => {
    dialogFormVisible.value = val;
  }
);
watch(
  () => dialogFormVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>

<style scoped></style>

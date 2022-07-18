<template>
  <div class="ele-cpn-wrapper">
    <el-form
      ref="form"
      v-if="model"
      v-bind="$attrs"
      :model="model"
      :rules="rules"
      :validate-on-rule-change="false"
    >
      <template v-for="(item, index) in options" :key="index">
        <el-form-item
          v-if="!item.children || !item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            v-if="item.type !== 'upload'"
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-model="model[item.prop!]"
          ></component>
          <el-upload
            v-else
            v-bind="item.uploadAttrs"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-success="onSuccess"
            :on-error="onError"
            :on-progress="onProgress"
            :on-change="onChange"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
          >
            <slot name="uploadArea"></slot>
            <slot name="uploadTips"></slot>
          </el-upload>
        </el-form-item>
        <el-form-item
          v-if="item.children && item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-model="model[item.prop!]"
            :placeholder="item.placeholder"
          >
            <component
              v-for="(child, index) in item.children"
              :key="index"
              :is="`el-${child.type}`"
              :value="child.value"
              :label="child.label"
            ></component>
          </component>
        </el-form-item>
      </template>
      <el-form-item>
        <!-- 表单操作项 -->
        <slot name="action" :form="form" :model="model"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from "vue";
import { IFormOptions, IFormInstance } from "./type/types";
// 打包的时候只会打包lodash下的cloneDeep包，不会把lodash整个打包
import cloneDeep from "lodash/cloneDeep";
import {
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestOptions,
} from "_element-plus@2.2.6@element-plus/lib/components/upload/src/upload";
const props = defineProps({
  // 表单的配置
  options: {
    type: Array as PropType<IFormOptions[]>,
    required: true,
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
});
const emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "on-exceed",
  "before-upload",
  "before-remove",
  "http-request",
]);
let model = ref<any>(null);
const rules = ref<any>(null);
const form = ref<IFormInstance | null>(null);

// 监听父组件传递过来的options改变
watch(
  () => props.options,
  (val) => {
    initFormDate();
  },
  { deep: true }
);
onMounted(() => {
  initFormDate();
});

// 初始化表单数据
const initFormDate = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item) => {
      m[item.prop] = item.value;
      r[item.prop] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};
// 上传组件的所有方法
const onPreview = (uploadFile: UploadFile) => {
  emits("on-preview", uploadFile);
};
const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-remove", { uploadFile, uploadFiles });
};
const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // 上传成功，给表单上传项赋值
  let uploadItem = props.options.find((item) => {
    return item.prop === "upload";
  });
  model.value[uploadItem.prop] = { response, uploadFile, uploadFiles };
  emits("on-success", { response, uploadFile, uploadFiles });
};
const onError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-error", { error, uploadFile, uploadFiles });
};
const onProgress = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  emits("on-progress", { evt, uploadFile, uploadFiles });
};
const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-change", { uploadFile, uploadFiles });
};
const onExceed = (files: File[], uploadFiles: UploadFiles) => {
  emits("on-exceed", { files, uploadFiles });
};
const beforeUpload = (rawFile: UploadRawFile) => {
  emits("before-upload", rawFile);
};
const beforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("before-remove", { uploadFile, uploadFiles });
};
</script>

<style scoped></style>

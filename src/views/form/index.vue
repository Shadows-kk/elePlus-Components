<template>
  <div>
    <config-form
      ref="form"
      :options="options"
      label-width="100px"
      @on-change="onChange"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-exceed="handleExceed"
      @before-upload="beforeUpload"
      @on-success="onSuccess"
    >
      <!-- 上传组件插槽内容 -->
      <template #uploadArea>
        <el-button type="primary">上传文件</el-button>
      </template>
      <template #uploadTips>
        <div style="color: #ccc; font-size: 12px; margin-left: 10px">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <!-- 表单操作按钮 -->
      <template #action="scope">
        <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
        <el-button @click="resetForm(scope)">重置</el-button>
      </template>
    </config-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import { IFormInstance, IFormOptions } from "../../components/form/src/type/types";
export interface IScope {
  form: IFormInstance;
  model: any;
}
const form = ref(null);

const options: IFormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "userName",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
      {
        min: 2,
        max: 6,
        message: "用户名在2-6位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: "input",
    value: "",
    label: "密码",
    prop: "password",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码在6-15位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: "select",
    value: "",
    label: "职位",
    placeholder: "请选择职位",
    prop: "role",
    attrs: {
      style: {
        width: "100%",
      },
    },
    rules: [
      {
        required: true,
        message: "职位不能为空",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "option",
        value: "1",
        label: "经理",
      },
      {
        type: "option",
        value: "2",
        label: "主管",
      },
      {
        type: "option",
        value: "3",
        label: "员工",
      },
    ],
  },
  {
    type: "checkbox-group",
    value: [],
    label: "爱好",
    prop: "likes",
    attrs: {
      style: {
        width: "100%",
      },
    },
    rules: [
      {
        required: true,
        message: "爱好不能为空",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "checkbox",
        value: "1",
        label: "足球",
      },
      {
        type: "checkbox",
        value: "2",
        label: "篮球",
      },
      {
        type: "checkbox",
        value: "3",
        label: "羽毛球",
      },
    ],
  },
  {
    type: "radio-group",
    value: [],
    label: "性别",
    prop: "gender",
    attrs: {
      style: {
        width: "100%",
      },
    },
    rules: [
      {
        required: true,
        message: "性别不能为空",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "radio",
        value: "man",
        label: "男",
      },
      {
        type: "radio",
        value: "famale",
        label: "女",
      },
    ],
  },
  {
    type: "upload",
    label: "上传",
    prop: "pic",
    uploadAttrs: {
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      multiple: true,
      limit: 3,
    },
    rules: [
      // {
      //   required: true,
      //   message: "图片不能为空",
      //   trigger: "blur",
      // },
    ],
  },
  {
    type: "editor",
    value: "初始内容",
    label: "描述",
    prop: "desc",
    placeholder: "请输入描述内容",
    rules: [
      {
        required: true,
        message: "描述不能为空",
        trigger: "blur",
      },
    ],
  },
];
const onChange = (val) => {
  console.log(val.uploadFile, val.uploadFiles);
};
const beforeUpload = (rawFile) => {
  console.log(rawFile);
};
const handleRemove = (val) => {
  console.log(val.file, val.uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed = (val) => {
  ElMessage.warning(
    `The limit is 3, you selected ${val.files.length} files this time, add up to ${
      val.files.length + val.uploadFiles.length
    } totally`
  );
};

const beforeRemove = (val) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${val.uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
const onSuccess = (val) => {
  console.log("success" + val.response, val.uploadFile, val.uploadFiles);
};
const onSubmit = (scope: IScope) => {
  scope.form.validate((valid) => {
    if (valid) {
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("表单填写有误,请重新填写");
    }
  });
};
const resetForm = (scope: IScope) => {
  // scope.form.resetFields();
  // 通过子组件的defineExpose分发出来的方法
  form.value.resetFields();
};
</script>

<style scoped></style>

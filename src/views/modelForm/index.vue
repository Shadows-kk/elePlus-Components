<template>
  <div>
    <el-button type="primary" @click="open">open</el-button>
    <model-form
      v-model:visible="visible"
      :options="options"
      title="编辑用户信息"
      width="45%"
      :onChange="onChange"
      :handlePreview="handlePreview"
      isScroll
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
      <template #footer="{ form }">
        <el-button @click="cancel(form)">Cancel</el-button>
        <el-button type="primary" @click="Confirm(form)">Confirm</el-button>
      </template>
    </model-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { IFormOptions } from "../../components/form/src/type/types";
let visible = ref<boolean>(false);
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
        trigger: "change",
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
        trigger: "change",
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
        trigger: "change",
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
    value: "",
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
const open = () => {
  visible.value = true;
};
const cancel = (form: any) => {
  visible.value = false;
  form.resetFields();
};
const Confirm = (form: any) => {
  // 拿到表单数据
  const model = form.getFormData();
  console.log(model);
  // 调用form表单的validate方法
  const validate = form.validate();
  validate((valid) => {
    if (valid) {
      ElMessage.success("验证成功");
    } else {
      ElMessage.error("验证失败");
    }
  });
};
const onChange = () => {
  console.log("onChange");
};
const handlePreview = () => {
  console.log("handlePreview");
};
</script>

<style scoped></style>

<template>
  <div>
    <config-form :options="options" label-width="100px"></config-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from "../../components/form/src/type/types";

const options: FormOptions[] = [
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
];
</script>

<style scoped></style>

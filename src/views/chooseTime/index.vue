<template>
  <div>
    <choose-time
      :clearable="true"
      @startChange="startChange"
      @endChange="endChange"
      :startOption="startOption"
      :endOption="endOption"
    ></choose-time>

    <choose-date
      style="margin-top: 50px"
      :disabletoday="false"
      @startDateChange="startDateChange"
      @endDateChange="endDateChange"
      :startOption="startOption"
      :endOption="endOption"
    ></choose-date>
  </div>
</template>

<script setup lang="ts">
export interface endTime {
  startTime: string;
  endTime: string;
}
export interface endDate {
  startDate: Date;
  endDate: Date;
}
// 用v-bind="$attrs.xxx" 分配给两个时间选择器传不同配置
let startOption = {
  size: "large",
  effect: "light",
};
let endOption = {
  size: "large",
  effect: "dark",
};
// 事件选择器事件
const startChange = (val: string) => {
  console.log(val);
};
const endChange = (val: endTime) => {
  console.log(val);
};
// 日期选择器事件
const startDateChange = (val: string) => {
  console.log(val);
};
const endDateChange = (val: endDate) => {
  console.log(val);
};
</script>

<style scoped></style>

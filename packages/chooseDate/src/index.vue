<template>
  <div style="display: flex" class="ele-cpn-wrapper">
    <div style="margin-right: 10px">
      <el-date-picker
        v-model="startDate"
        type="date"
        :placeholder="startPlaceholder"
        format="YYYY-MM-DD"
        :disabled-date="startDateDisable"
        v-bind="$attrs.startOption"
      />
    </div>
    <div style="margin-right: 10px">
      <el-date-picker
        v-model="endDate"
        type="date"
        :placeholder="endPlaceholder"
        :disabled="endDisableDate"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        :disabled-date="endDateDisable"
        v-bind="$attrs.endOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
let props = defineProps({
  startPlaceholder: {
    type: String,
    default: "请选择开始日期",
  },
  endPlaceholder: {
    type: String,
    default: "请选择结束日期",
  },
  // 是否禁用选择今天之前的日期
  disabletoday: {
    type: Boolean,
    default: true,
  },
});
// 开始日期
let startDate = ref<Date | null>(null);
// 结束日期
let endDate = ref<Date | null>(null);
//结束日期选择框的禁用状态
let endDisableDate = ref<boolean>(true);
// 禁选今天之前的日期函数
let startDateDisable = (time: Date) => {
  if (props.disabletoday) {
    // time.getTime()是选择的这一天的时间戳
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
  }
};
// 禁选起始日期之前的日期函数
let endDateDisable = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24;
  }
};

const emits = defineEmits(["startDateChange", "endDateChange"]);

watch(
  () => startDate.value,
  (val) => {
    if (!!val) {
      endDisableDate.value = false;
      emits("startDateChange", val);
    } else {
      endDate.value = null;
      endDisableDate.value = true;
    }
  }
);
watch(
  () => endDate.value,
  (val) => {
    if (!!val) {
      emits("endDateChange", {
        startDate: startDate.value,
        endDate: val,
      });
    }
  }
);
</script>

<style scoped></style>

<template>
  <div style="display: flex">
    <div style="margin-right: 10px">
      <el-time-select
        v-model="startTime"
        :max-time="endTime"
        class="mr-4"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startTimeStep"
        :end="startTimeEnd"
        v-bind="$attrs.startOption"
      />
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endTimeStep"
        :end="endTimeEnd"
        v-bind="$attrs.endOption"
        :disabled="disableEndTime"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// 用v-bind="$attrs.xxx" 分配给两个时间选择器传不同配置
import { ref, watch } from "vue";
let startTime = ref<string>("");
let endTime = ref<string>("");
let disableEndTime = ref<boolean>(true);
const props = defineProps({
  // 开始时间配置项
  startPlaceholder: {
    type: String,
    default: "请选择开始时间",
  },
  startTimeStart: {
    type: String,
    default: "08:00",
  },
  startTimeStep: {
    type: String,
    default: "00:30",
  },
  startTimeEnd: {
    type: String,
    default: "24:00",
  },
  // 结束时间配置项
  endPlaceholder: {
    type: String,
    default: "请选择结束时间",
  },
  endTimeStart: {
    type: String,
    default: "08:00",
  },
  endTimeStep: {
    type: String,
    default: "00:30",
  },
  endTimeEnd: {
    type: String,
    default: "24:00",
  },
});
const emits = defineEmits(["startChange", "endChange"]);
watch(
  () => startTime.value,
  (val) => {
    if (val) {
      disableEndTime.value = false;
      emits("startChange", val);
    } else {
      endTime.value = "";
      disableEndTime.value = true;
    }
  }
);
watch(
  () => endTime.value,
  (val) => {
    if (val) {
      emits("endChange", {
        startTime: startTime.value,
        endTime: endTime.value,
      });
    }
  }
);
</script>

<style scoped></style>

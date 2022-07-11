<template>
  <div>
    <el-progress :percentage="t" v-bind="$attrs"></el-progress>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps({
  // 进度条进度
  percentage: {
    type: Number,
    default: 0,
  },
  // 当前进度条是否有动画
  isAnimation: {
    type: Boolean,
    default: false,
  },
  // 动画时长
  time: {
    type: Number,
    default: 3000,
  },
});
let t = ref(0);
onMounted(() => {
  if (props.isAnimation) {
    //  p 每百分之一进度所需要的时间
    let p = props.time / props.percentage;
    let timer = setInterval(() => {
      t.value += 1;
      if (t.value >= props.percentage) {
        t.value = props.percentage;
        clearInterval(timer);
      }
    }, p);
  }
});
</script>

<style scoped></style>

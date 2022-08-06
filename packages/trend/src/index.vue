<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <!-- 有插槽先显示插槽内容，插槽没传值显示组件传递过来的内容 -->
      <slot v-if="slot.default"></slot>
      <div v-else>{{ title }}</div>
    </div>
    <div class="icon">
      <!-- <el-icon-arrowup
        :style="{ color: !reverseColor ? upColor : '#52c41a' }"
        v-if="type === 'up'"
      ></el-icon-arrowup>
      <el-icon-arrowdown
        :style="{ color: !reverseColor ? downColor : '#f5222d' }"
        v-else
      ></el-icon-arrowdown> -->
      <component
        :is="`el-icon-${toLine(upIcon)}`"
        :style="{ color: !reverseColor ? upColor : '#52c41a' }"
        v-if="type === 'up'"
      ></component>
      <component
        :is="`el-icon-${toLine(downIcon)}`"
        :style="{ color: !reverseColor ? downColor : '#f5222d' }"
        v-else
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";
import { toLine } from "../../utils";
let props = defineProps({
  // 类型
  type: {
    type: String,
    default: "up",
  },
  // 标题
  title: {
    type: String,
    default: "标题",
  },
  // 图标颜色
  upColor: {
    type: String,
    default: "#f5222d",
  },
  downColor: {
    type: String,
    default: "#52c41a",
  },
  // 反转颜色，只在默认颜色下生效，自定义颜色不生效
  reverseColor: {
    type: Boolean,
    default: false,
  },
  // 文字颜色
  upTextColor: {
    type: String,
    default: "#f5222d",
  },
  downTextColor: {
    type: String,
    default: "#52c41a",
  },
  // 上升/下降趋势显示图标
  upIcon: {
    type: String,
    default: "ArrowUp",
  },
  downIcon: {
    type: String,
    default: "ArrowDown",
  },
});
// 可以拿到插槽的内容，匿名插槽默认名字是default
const slot = useSlots();
const textColor = computed(() => {
  return props.type === "up" ? props.upTextColor : props.downTextColor;
});
</script>

<style scoped>
.trend {
  display: flex;
  align-items: center;
}
.text {
  margin-right: 5px;
}
</style>

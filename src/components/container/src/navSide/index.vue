<template>
  <m-menus
    :data="data"
    router
    :defaultActive="$route.path"
    :collapse="collapse"
  ></m-menus>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
let props = defineProps<{ collapse: boolean }>();
const router = useRouter();
let data = [
  {
    name: "首页",
    index: "/",
    icon: "HomeFilled",
  },
  {
    name: "图标选择器",
    index: "/chooseIcon",
    icon: "Check",
  },
  {
    name: "省市区选择",
    index: "/chooseArea",
    icon: "MapLocation",
  },
  {
    name: "趋势标记",
    index: "/trend",
    icon: "Sort",
  },
  {
    name: "通知菜单",
    index: "/notification",
    icon: "Bell",
  },
  {
    name: "导航菜单",
    index: "/menus",
    icon: "Menu",
  },
  {
    name: "时间选择",
    index: "/chooseTime",
    icon: "Timer",
  },
  {
    name: "城市选择",
    index: "/chooseCity",
    icon: "Position",
  },
  {
    name: "进度条",
    index: "/progress",
    icon: "Operation",
  },
  {
    name: "日历",
    index: "/calendar",
    icon: "Calendar",
  },
  {
    name: "表单",
    index: "/form",
    icon: "Notebook",
  },
  {
    name: "表格",
    index: "/table",
    icon: "List",
  },
];
</script>

<style scoped></style>

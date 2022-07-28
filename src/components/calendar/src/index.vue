<template>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import "@fullcalendar/core/vdom";
import { Calendar, EventClickArg, EventContentArg } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction, { DateClickArg } from "@fullcalendar/interaction";
import { onMounted, PropType, ref, watch } from "vue";
import { IEventItem } from "./types";

let props = defineProps({
  // 语言
  local: {
    type: String,
    default: "zh-cn",
  },
  // 视图模式
  initialView: {
    type: String,
    default: "dayGridMonth",
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: "今天",
        month: "月",
        week: "周",
        day: "日",
        prevYear: "上一年",
        nextYear: "下一年",
        prev: "上一月",
        next: "下一月",
      };
    },
  },
  // 顶部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: "title",
        center: "",
        end: "prev today next",
      };
    },
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 事件源
  events: {
    type: Array as PropType<IEventItem[]>,
    default: [],
  },
  // 展示结束时间
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
});
//分发事件
let emits = defineEmits(["dateClick", "eventClick"]);
// 日历实例
let calendar = ref<Calendar>();

onMounted(() => {
  renderCalendar();
});
// 监听父组件传递的事件源
watch(
  () => props.events,
  (val) => {
    renderCalendar();
  },
  { deep: true }
);
// 渲染日历的方法
const renderCalendar = () => {
  const el = document.getElementById("calendar");
  if (el) {
    calendar.value = new Calendar(el, {
      // 日历插件
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initialView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      // 事件源
      eventSources: [
        {
          // 生成事件
          events(e, callback) {
            if (props.events.length) callback(props.events);
            else callback([]);
          },
        },
      ],
      displayEventEnd: props.displayEventEnd,
      // 自定义事件内容
      eventContent: (info: EventContentArg) => {
        let el = document.createElement("div");
        let timeTextArr = info.timeText.split("-");
        let start = timeTextArr[0]
          .replace("上午", "")
          .replace("下午", "")
          .replace("时", "");
        let end = timeTextArr[1]
          .replace("上午", "")
          .replace("下午", "")
          .replace("时", "");
        el.innerHTML = `
          <div>开始时间：${start}</div>
          <div>结束时间：${end}</div>
          <div>标题：${info.event._def.title}</div>
        `;
        return {
          domNodes: [el],
        };
      },
      // 点击日历上的某一天
      dateClick(info: DateClickArg) {
        emits("dateClick", info);
      },
      // 点击日历的事件
      eventClick(info: EventClickArg) {
        emits("eventClick", info);
      },
    });
    calendar.value.render();
  }
};
</script>

<style scoped lang="scss"></style>

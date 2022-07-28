<template>
  <div>
    <calendar
      :events="events"
      @dateClick="dateClick"
      @eventClick="eventClick"
      displayEventEnd
    ></calendar>
  </div>
</template>

<script setup lang="ts">
import { EventClickArg } from "@fullcalendar/common";
import { DateClickArg } from "@fullcalendar/interaction";
import { IEventItem } from "../../components/calendar/src/types";
import { ref } from "vue";
const events = ref<IEventItem[]>([
  {
    title: "购物",
    start: "2022-7-26 08:00",
    end: "2022-7-26 18:00",
  },
  {
    title: "写代码",
    start: "2022-7-27 08:00",
    end: "2022-7-27 18:00",
  },
  {
    title: "睡觉",
    start: "2022-7-28 08:00",
    end: "2022-7-28 18:00",
  },
]);
// 点击某一天
const dateClick = (info: DateClickArg) => {
  // console.log(info);
  events.value.push({
    title: "摸鱼",
    start: info.dateStr + "08:00",
    end: info.dateStr + "18:00",
  });
};
const eventClick = (info: EventClickArg) => {
  console.log(info);
};
</script>

<style scoped></style>

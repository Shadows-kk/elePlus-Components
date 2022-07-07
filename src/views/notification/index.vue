<template>
  <div class="wrapper">
    <h5>通知图标组件</h5>
    <div class="basic">
      <notification :value="50">
        <!-- 通知组件我们自己留的插槽 -->
        <template #default>
          <m-list
            :list="list"
            :operateOption="operateOption"
            @clickItem="clickItem"
            @clickAction="clickAction"
          ></m-list>
        </template>
      </notification>
      <notification :value="50" :max="10"></notification>
      <notification :value="50" isDot></notification>
      <notification icon="ChatLineRound" :value="50"></notification>
    </div>
  </div>
</template>

<script setup lang="ts">
import { list, operateOption } from "./data";
const clickItem = (obj: any) => {
  console.log(obj);
};
const clickAction = (obj: any) => {
  console.log(obj);
};
</script>

<style scoped>
.wrapper {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.basic {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
}
</style>

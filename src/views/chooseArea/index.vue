<template>
  <div>
    <chooseArea @change="changeArea"></chooseArea>
  </div>
</template>

<script setup lang="ts">
import chooseArea from "@/components/chooseArea/src/index.vue";
const changeArea = (val: any) => {
  console.log(val);
};
</script>

<style scoped></style>

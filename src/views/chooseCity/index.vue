<template>
  <div>
    <choose-city @selectCity="selectCity" @selectProvince="selectProvince"></choose-city>
  </div>
</template>

<script setup lang="ts">
const selectCity = (val) => {
  console.log(val);
};
const selectProvince = (val) => {
  console.log(val);
};
</script>

<style scoped></style>

<template>
  <div>
    <m-progress isAnimation :percentage="50"></m-progress>
    <m-progress isAnimation type="circle" status="success" :percentage="60"></m-progress>

    <m-progress
      isAnimation
      :text-inside="true"
      :stroke-width="24"
      :percentage="70"
    ></m-progress>
    <m-progress
      isAnimation
      type="dashboard"
      color="#f56c6c"
      :percentage="80"
    ></m-progress>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

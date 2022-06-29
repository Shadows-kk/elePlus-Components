<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        default-active="2"
      >
        <el-menu-item index="1">
          <el-icon><el-icon-menu /></el-icon>
          <span>导航1</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><el-icon-menu /></el-icon>
          <span>导航2</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><el-icon-menu /></el-icon>
          <span>导航3</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="changeCollapse">
          <el-icon-expand v-if="isCollapse"></el-icon-expand>
          <el-icon-fold v-else></el-icon-fold>
        </span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let isCollapse = ref(false);
let asideWidth = ref(200);
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

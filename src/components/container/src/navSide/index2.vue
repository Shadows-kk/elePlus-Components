<template>
  <!-- <el-menu
    class="el-menu-vertical-demo"
    :collapse="collapse"
    default-active="2"
  >
    <el-menu-item index="1">
      <el-icon><el-icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><el-icon-menu /></el-icon>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><el-icon-menu /></el-icon>
      <span>趋势标记</span>
    </el-menu-item>
  </el-menu> -->
  <div class="navgation" :class="{ active: isActive }">
    <ul>
      <li class="list active" @click="barHref('/chooseArea')">
        <b></b>
        <b></b>
        <a href="#">
          <span class="icon"> <ion-icon name="home"></ion-icon></span>
          <span class="title">Home</span>
        </a>
        <div class="tooltip"></div>
      </li>
      <li class="list" @click="barHref('/chooseIcon')">
        <b></b>
        <b></b>
        <a href="#">
          <span class="icon"><ion-icon name="person"></ion-icon></span>
          <span class="title">Profile</span>
        </a>
      </li>
      <li class="list" @click="barHref('/chooseArea')">
        <b></b>
        <b></b>
        <a href="#">
          <span class="icon"><ion-icon name="notifications"></ion-icon></span>
          <span class="title">Message</span>
        </a>
      </li>
      <li class="list" @click="barHref('/trend')">
        <b></b>
        <b></b>
        <a href="#">
          <span class="icon"><ion-icon name="settings"></ion-icon></span>
          <span class="title">Setting</span>
        </a>
      </li>
      <li class="list" @click="barHref('/notification')">
        <b></b>
        <b></b>
        <a href="#">
          <span class="icon"><ion-icon name="help-circle"></ion-icon></span>
          <span class="title">Help</span>
        </a>
      </li>
      <li class="list" @click="barHref('/chooseArea')">
        <b></b>
        <b></b>
        <a href="#">
          <span class="icon"><ion-icon name="log-out"></ion-icon></span>
          <span class="title">Logout</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="toggle" @click="toggleActive" :class="{ active: isActive }">
    <ion-icon name="menu" class="open"></ion-icon>
    <ion-icon name="close" class="close"></ion-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// let props = defineProps<{ collapse: boolean }>();
const router = useRouter();

let isActive = ref(false);

const toggleActive = () => {
  isActive.value = !isActive.value;
};
const barHref = (url) => {
  router.push(url);
};
onMounted(() => {
  const list = document.querySelectorAll("li");
  list.forEach((item) => {
    item.addEventListener("click", () => {
      removeClass();
      item.classList.add("active");
    });
  });
  function removeClass() {
    list.forEach((item) => {
      item.classList.remove("active");
    });
  }
});
</script>

<style scoped>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
@import url("https://fonts.googleapis.com/css?family=Muli&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  background-color: #fff;
}
.navgation {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 70px;
  /* overflow-x: hidden; */
  /* border-radius: 10px; */
  box-sizing: initial;
  border-left: 5px solid #4d5bf9;
  background: #4d5bf9;
  transition: width 0.5s;
}
.navgation.active {
  width: 300px;
  overflow-x: auto;
}
.navgation .title {
  opacity: 0;
}
.navgation.active .title {
  opacity: 1;
}
.navgation.active .tooltip {
  display: none;
}
.navgation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 40px;
  padding-left: 5px;
}
.navgation ul li {
  list-style: none;
  position: relative;
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.navgation ul li .tooltip {
  position: absolute;
  left: 80px;
  top: 0;
  width: 122px;
  height: 30px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%);
  opacity: 0;
  transition: 0s;
  pointer-events: none;
}
.navgation ul li:hover .tooltip {
  transition: all 0.5s ease;
  top: 50%;
  opacity: 1;
}
.navgation ul li.active {
  background: #fff;
}
.navgation ul li b:nth-child(1) {
  position: absolute;
  top: -20px;
  height: 20px;
  width: 100%;
  background: #fff;
  display: none;
}
.navgation ul li.active b:nth-child(1) {
  display: block;
}
.navgation ul li b:nth-child(1)::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #4d5bf9;
  border-bottom-right-radius: 20px;
}
.navgation ul li b:nth-child(2) {
  position: absolute;
  bottom: -20px;
  height: 20px;
  width: 100%;
  background: #fff;
  display: none;
}
.navgation ul li.active b:nth-child(2) {
  display: block;
}
.navgation ul li b:nth-child(2)::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #4d5bf9;
  border-top-right-radius: 20px;
}
.navgation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: #fff;
}
.navgation ul li.active a {
  color: #333;
}
.navgation ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  line-height: 70px;
  text-align: center;
}
.navgation ul li a .icon ion-icon {
  font-size: 1.2em;
}
.navgation ul li a .title {
  position: relative;
  display: block;
  padding-left: 10px;
  min-height: 60px;
  line-height: 60px;
  white-space: normal;
}

.toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #4d5bf9;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle.active {
  background: #ff4d89;
}
.toggle ion-icon {
  position: absolute;
  color: #fff;
  font-size: 1.5em;
  display: none;
}
.toggle ion-icon.open,
.toggle.active .close {
  display: block;
}
.toggle.active .open,
.toggle ion-icon.close {
  display: none;
}
</style>

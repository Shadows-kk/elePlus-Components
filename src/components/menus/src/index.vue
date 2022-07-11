<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="defaultActive"
      :router="router"
      v-bind="$attrs"
    >
      <template v-for="(item, i) in data" :key="i">
        <el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
          <template #title>
            <component
              v-if="item[icon]"
              :is="`el-icon-${toLine(item[icon])}`"
            ></component>
            <span>{{ item[name] }}</span>
          </template>
          <el-menu-item
            v-for="(item1, index1) in item[children]"
            :key="item1[index]"
            :index="item1[index]"
          >
            <component
              v-if="item1[icon]"
              :is="`el-icon-${toLine(item1[icon])}`"
            ></component>
            <span>{{ item1[name] }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item[index]">
          <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
          <span>{{ item[name] }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { toLine } from "../../../utils";
const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 默认选中菜单
  defaultActive: {
    type: String,
    default: "",
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },

  // 键名 不再限制传递过来的data字段
  // 1.菜单标题的键名
  name: {
    type: String,
    default: "name",
  },
  // 2.菜单标识的键名
  index: {
    type: String,
    default: "index",
  },
  // 3.菜单图标的键名
  icon: {
    type: String,
    default: "icon",
  },
  // 4.菜单子菜单的键名
  children: {
    type: String,
    default: "children",
  },
});
</script>

<style scoped>
svg {
  margin-right: 10px;
  width: 1em;
  height: 1em;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

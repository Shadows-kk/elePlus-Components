<template>
  <div class="notification-tab-nav">
    <el-tabs>
      <el-tab-pane
        :label="item.title"
        v-for="(item, index) in list"
        :key="index"
      >
        <el-scrollbar max-height="300px">
          <div
            class="container"
            v-for="(item1, index1) in item.content"
            :key="index1"
            @click="clickItem(item1, index1)"
          >
            <div class="avatar" v-if="item1.avatar">
              <el-avatar size="small" :src="item1.avatar" />
            </div>
            <div class="content">
              <div v-if="item1.title" class="title">
                <div>{{ item1.title }}</div>
                <el-tag size="small" v-if="item1.tag" :type="item1.tagType">{{
                  item1.tag
                }}</el-tag>
              </div>
              <div v-if="item1.desc" class="time">{{ item1.desc }}</div>
              <div v-if="item1.time" class="time">{{ item1.time }}</div>
            </div>
          </div>
          <div class="action">
            <div
              class="a-item"
              v-for="(item, index) in operateOption"
              :key="index"
              :class="{ border: index + 1 !== operateOption.length }"
              @click="clickAction(item, index)"
            >
              <div class="a-icon" v-if="item.icon">
                <component :is="`el-icon-${toLine(item.icon)}`"></component>
              </div>
              <div class="a-text">{{ item.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Ilist, IlistItem, Ioperation } from "./types";
import { toLine } from "../../utils";
import { emit } from "process";
const props = defineProps({
  list: {
    type: Array as PropType<Ilist[]>,
    required: true,
  },
  operateOption: {
    type: Array as PropType<Ioperation[]>,
    default: () => [],
  },
});
const emits = defineEmits(["clickItem", "clickAction"]);
const clickItem = (item1: IlistItem, index1: number) => {
  emits("clickItem", { item1, index1 });
};
const clickAction = (item: Ioperation, index: number) => {
  emits("clickAction", { item, index });
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  height: 50px;
  .a-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    .a-icon {
      font-size: 14px;
      line-height: 14px;
      margin-right: 10px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>

<template>
  <div>
    <el-table :data="data">
      <template v-for="(item, index) in tableOptions" :key="index">
        <!-- 表格每一列 -->
        <el-table-column
          v-if="!item.slot"
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
        ></el-table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
        >
          <!-- 配置传了slot -->
          <template #default="scope">
            <!-- 动态绑定插槽的名字，根据配置来 -->
            <slot :name="item.slot" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>

      <!-- 操作列 -->
      <el-table-column
        :prop="actionOption.prop"
        :label="actionOption.label"
        :align="actionOption.align"
        :width="actionOption.width"
      >
        <template #default="scope">
          <!-- 预留插槽 -->
          <slot name="action" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { ITableOptions } from "./types";
const props = defineProps({
  // 表格的配置
  options: {
    type: Array as PropType<ITableOptions[]>,
    required: true,
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
// 过滤操作选项的配置
const tableOptions = computed(() => props.options.filter((item) => !item.action));
// 单独拿到操作项的配置
const actionOption = computed(() => props.options.find((item) => item.action));
</script>

<style scoped></style>

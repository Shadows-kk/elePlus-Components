<template>
  <div>
    <el-table :data="data">
      <template v-for="(item, index) in tableOptions" :key="index">
        <!-- 表格每一列 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
        ></el-table-column>

        <!-- <template v-if="item.label === '地址'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :width="item.width"
          >
            <template #default="scope">
              <el-popover placement="top-start" :width="200" trigger="hover">
                <template #reference>
                  <div
                    style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                  >
                    {{ scope.row.address }}
                  </div>
                </template>
                <template #default> {{ scope.row.address }}</template>
              </el-popover>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :width="item.width"
          ></el-table-column>
        </template> -->
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

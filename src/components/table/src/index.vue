<template>
  <div>
    <el-table
      style="width: 100%"
      :data="data"
      v-loading="isLoading"
      :element-loading-text="elementLoadingText"
      :element-loading-background="elementLoadingBackground"
      :element-loading-svg="elementLoadingSvg"
      :element-loading-svg-view-box="elementLoadingSvgViewBox"
    >
      <template v-for="(item, index) in tableOptions" :key="index">
        <!-- 表格每一列 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.width"
        >
          <!-- 配置传了slot -->
          <template #default="scope">
            <!-- 点击编辑后的单元格 -->
            <template v-if="editCell === scope.$index + scope.column.id">
              <div style="display: flex; align-items: center">
                <el-input v-model="scope.row[item.prop]" size="small"></el-input>
                <div @click="clickEditCell">
                  <!-- 传入了editCell插槽内容 -->
                  <slot v-if="$slots.editCell" name="editCell" :scope="scope"></slot>
                  <!-- 未传入editCell插槽内容 -->
                  <div class="icons" v-else>
                    <el-icon-check class="check" @click="check(scope)"></el-icon-check>
                    <el-icon-close
                      class="close"
                      @click="close(scope, item)"
                    ></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <!-- 点击编辑前的单元格 -->
            <template v-else>
              <!-- 动态绑定插槽的名字，根据配置来自定义，可选 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <!-- 默认单元格 -->
              <slot v-else>{{ scope.row[item.prop] }}</slot>
              <!-- 自定义的编辑图标，可选 -->
              <component
                :is="`el-icon-${toLine(editIcon)}`"
                v-if="item.editable"
                class="edit"
                @click="clickEdit(scope, item)"
              ></component>
            </template>
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
import { PropType, computed, ref } from "vue";
import { ITableOptions } from "./types";
import { toLine } from "../../../utils/index";
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
  // 加载内容
  elementLoadingText: {
    type: String,
  },
  // 加载的自定义图标
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 背景遮照颜色
  elementLoadingBackground: {
    type: String,
  },
  // 传入的编辑图标
  editIcon: {
    type: String,
    default: "edit",
  },
});
const emits = defineEmits(["check", "close"]);
// 单元格的唯一标识
const editCell = ref<string>("");
// 存储单元格的初始信息
let editCellData = ref<string>("");
// 过滤操作选项的配置
let tableOptions = computed(() => props.options.filter((item) => !item.action));
// 单独拿到操作项的配置
let actionOption = computed(() => props.options.find((item) => item.action));
// 表格是否在加载中
let isLoading = computed(() => !props.data || !props.data.length);
// 编辑单元格
const clickEdit = (scope: any, item) => {
  // 给定唯一标识
  editCell.value = scope.$index + scope.column.id;
  // 保存初始数据
  editCellData.value = scope.row[item.prop];
};
const check = (scope: any) => {
  emits("check", scope);
  editCell.value = "";
};
const close = (scope: any, item: any) => {
  emits("close", scope);
  editCell.value = "";
  // 取消时重新给单元格赋值初始数据
  scope.row[item.prop] = editCellData.value;
};
const clickEditCell = () => {
  editCell.value = "";
};
</script>

<style scoped lang="scss">
.edit {
  position: relative;
  top: 2px;
  left: 8px;
  cursor: pointer;
}
.icons {
  display: flex;
  margin-left: 10px;
  cursor: pointer;
  .check {
    color: #57c22d;
    width: 1em;
    height: 1em;
  }
  .close {
    color: #f5525d;
  }
}
</style>

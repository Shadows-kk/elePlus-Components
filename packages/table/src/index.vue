<template>
  <div>
    <el-table
      v-bind="$attrs"
      style="width: 100%"
      :data="tableData"
      v-loading="isLoading"
      :element-loading-text="elementLoadingText"
      :element-loading-background="elementLoadingBackground"
      :element-loading-svg="elementLoadingSvg"
      :element-loading-svg-view-box="elementLoadingSvgViewBox"
      @row-click="rowClick"
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
            <!-- 表格可编辑行 -->
            <template v-if="scope.row.rowEdit">
              <el-input size="small" v-model="scope.row[item!.prop]"></el-input>
            </template>
            <template v-else>
              <!-- 点击编辑后的单元格 -->
              <template v-if="editCell === scope.$index + scope.column.id">
                <div style="display: flex; align-items: center">
                  <el-input
                    v-model="scope.row[item.prop]"
                    size="small"
                  ></el-input>
                  <div @click="clickEditCell">
                    <!-- 传入了editCell插槽内容 -->
                    <slot
                      v-if="$slots.editCell"
                      name="editCell"
                      :scope="scope"
                    ></slot>
                    <!-- 未传入editCell插槽内容 -->
                    <div class="icons" v-else>
                      <el-icon-check
                        class="check"
                        @click.stop="confirm(scope)"
                      ></el-icon-check>
                      <el-icon-close
                        class="close"
                        @click.stop="cancel(scope, item)"
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
                  @click.stop="clickEdit(scope, item)"
                ></component>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>

      <!-- 操作列 -->
      <el-table-column
        :prop="actionOption!.prop"
        :label="actionOption!.label"
        :align="actionOption!.align"
        :width="actionOption!.width"
      >
        <template #default="scope">
          <slot name="editRow" v-if="scope.row.rowEdit"></slot>
          <!-- 预留插槽 -->
          <slot name="action" v-else :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="pagination table-pagination-wrapper"
      v-if="pagination"
      :style="{
        justifyContent: paginationJustify,
      }"
    >
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref, onMounted, watch } from "vue";
import { ITableOptions } from "./types";
import { toLine } from "../../utils/index";
import cloneDeep from "lodash/cloneDeep";
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
  // 表格行是否可编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑行按钮标识，用于确定哪一个按钮发生了点击
  editRowIndex: {
    type: String,
    default: "",
  },
  // 决定表格是否显示分页
  pagination: {
    type: Boolean,
    default: false,
  },
  // 当前页
  currentPage: {
    type: Number,
    default: 1,
  },
  // 每一页的数据
  pageSize: {
    type: Number,
    default: 10,
  },
  // 每一页数据可选值
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30, 40],
  },
  // 数据总数
  total: {
    type: Number,
  },
  // 分页器的排列方式
  paginationAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "center",
  },
});
const emits = defineEmits([
  "confirm",
  "cancel",
  "update:editRowIndex",
  "currentChange",
  "sizeChange",
]);
// 单元格的唯一标识
const editCell = ref<string>("");
// 存储单元格的初始信息
let editCellData = ref<string>("");
// 拷贝一份表格数据
let tableData = ref<any[]>(cloneDeep(props.data));
// 拷贝一份按钮标识
let cloneEditRowIndex = ref<string>(props.editRowIndex);
// 处理分页器的排列方式
let paginationJustify = computed(() => {
  // if (props.paginationAlign === "left") {
  //   return "flex-start";
  // } else if (props.paginationAlign === "center") {
  //   return "center";
  // } else {
  //   return "flex-end";
  // }
  switch (props.paginationAlign) {
    case "left":
      return "flex-start";
    case "center":
      return "center";
    case "right":
      return "flex-end";
  }
});
// 监听父组件传递过来的数据
watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val);
    tableData.value.map((item) => {
      // 增加一条数据，代表当前是否是可编辑状态
      item.rowEdit = false;
    });
  },
  { deep: true }
);
// 监听标识改变
watch(
  () => props.editRowIndex,
  (val) => {
    if (val) cloneEditRowIndex.value = val;
  }
);
// 初始化table的数据是否可编辑
onMounted(() => {
  tableData.value.map((item) => {
    // 增加一条数据，代表当前是否是可编辑状态
    item.rowEdit = false;
  });
});

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
const confirm = (scope: any) => {
  emits("confirm", scope);
  editCell.value = "";
};
const cancel = (scope: any, item: any) => {
  emits("cancel", scope);
  editCell.value = "";
  // 取消时重新给单元格赋值初始数据
  scope.row[item.prop] = editCellData.value;
};
//
const clickEditCell = () => {
  editCell.value = "";
};
// 点击每一行的事件
const rowClick = (row: any, column: any) => {
  // 判断当前点击的是否是操作项内容
  if (column.property === actionOption.value.prop) {
    // console.log("操作项");
    // 编辑行的操作
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      // 点击的按钮是做可编辑的操作
      row.rowEdit = !row.rowEdit;
      // 重置其他数据的isEditRow
      tableData.value.map((item) => {
        if (item !== row) item.rowEdit = false;
      });
      // 再次点击的时候取消编辑状态，重置按钮标识，需要修改父组件数据
      if (!row.rowEdit) {
        emits("update:editRowIndex", "");
      }
    }
  }
};
// 分页器的条数改变
const handleSizeChange = (val: number) => {
  emits("sizeChange", val);
};
// 分页器的页数改变
const handleCurrentChange = (val: number) => {
  emits("currentChange", val);
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

.pagination {
  margin-top: 10px;
  display: flex;
  .btn-prev,
  .btn-next .el-icon {
    display: inline-flex !important;
  }
}
</style>

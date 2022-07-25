<template>
  <div>
    <m-table
      :data="tableData"
      :options="tableOptions"
      elementLoadingText="加载中..."
      :elementLoadingSvg="svg"
      elementLoadingSvgViewBox="-10, -10, 50, 50"
      @confirm="confirm"
      editIcon="EditPen"
      isEditRow
      :editRowIndex="editRowIndex"
    >
      <template #date="{ scope }">
        <el-icon-timer class="iconTime"></el-icon-timer>
        {{ scope.row.date }}
      </template>
      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div style="padding: 10px">
              <div>name: {{ scope.row.name }}</div>
              <div>address: {{ scope.row.address }}</div>
            </div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #action="{ scope }">
        <el-button size="small" type="primary" @click="editClick(scope)">编辑</el-button>
        <el-button size="small" type="danger" @click="deleteClick(scope)">删除</el-button>
      </template>
      <!-- （可选）传入自定义的编辑单元格按钮 -->
      <!-- <template #editCell="{ scope }">
        <div style="display: flex; margin-left: 10px">
          <el-button type="primary" size="small" @click="editCell(scope)">修改</el-button>
          <el-button type="danger" size="small">取消</el-button>
        </div>
      </template> -->
    </m-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ITableOptions } from "../../components/table/src/types";
export interface ItableData {
  date: string;
  name: string;
  address: string;
}

let tableData = ref<ItableData[]>([]);
// edit是自己取的名字
let editRowIndex = ref<string>("edit");
// 定时器模拟数据延迟
setTimeout(() => {
  tableData.value = [
    {
      date: "2016-05-03",
      name: "Tom",
      address:
        "No. 189, Grove St, Los Angeles. No. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo.",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ];
}, 1000);

const tableOptions: ITableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    width: 300,
    slot: "date",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    align: "center",
    slot: "name",
  },
  {
    label: "地址",
    prop: "address",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    prop: "action",
    align: "center",
    action: true,
  },
];
// loading的svg图标
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
// 操作列的编辑按钮
const editClick = (scope: any) => {
  // console.log(scope.row);
};
// 操作列的删除按钮
const deleteClick = (scope: any) => {
  console.log(scope);
};
// 自定义单元格的修改确认
const confirm = (scope: any) => {
  console.log(scope);
};
const editCell = (scope) => {
  console.log(scope);
};
</script>

<style scoped>
svg {
  width: 1em;
  height: 1em;
}
.iconTime {
  position: relative;
  top: 2px;
  right: -5px;
}
</style>

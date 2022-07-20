<template>
  <div>
    <m-table :data="tableData" :options="tableOptions">
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
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
    </m-table>
  </div>
</template>

<script setup lang="ts">
import { ITableOptions } from "../../components/table/src/types";

const tableData = [
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
const tableOptions: ITableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    slot: "date",
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
    width: 200,
  },
  {
    label: "操作",
    prop: "action",
    align: "center",
    action: true,
  },
];
const editClick = (scope: any) => {
  console.log(scope.row);
};
const deleteClick = (scope: any) => {
  console.log(scope);
};
</script>

<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>

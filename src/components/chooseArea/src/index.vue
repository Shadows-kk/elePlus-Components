<template>
  <div>
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option
        v-for="item in allArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province"
      style="margin: 0 20px"
      placeholder="请选择城市"
      v-model="city"
    >
      <el-option
        v-for="item in selectedCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province || !city"
      placeholder="请选择区域"
      v-model="area"
    >
      <el-option
        v-for="item in selectedArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import allAreaData from "../lib/pca-code.json";

export interface AreaItem {
  name: string;
  code: string;
  children?: AreaItem[];
}
export interface Data {
  name: string;
  code: string;
}
// 选择框绑定的值
let province = ref<string>("");
let city = ref<string>("");
let area = ref<string>("");
// 所有省市数据
let allArea = ref(allAreaData);
// 城市下拉框的可选值
let selectedCity = ref<AreaItem[]>([]);
// 区域下拉框的可选值
let selectedArea = ref<AreaItem[]>([]);
// 向父组件派发事件
let emits = defineEmits(["change"]);
watch(
  () => province.value,
  (val) => {
    if (val) {
      let cities = allArea.value.find(
        (item) => item.code === province.value
      )!.children;
      selectedCity.value = cities;
    }
    city.value = "";
    area.value = "";
  }
);
watch(
  () => city.value,
  (val) => {
    if (val) {
      let area = selectedCity.value.find(
        (item: any) => item.code === city.value
      )!.children!;
      selectedArea.value = area;
    }
    area.value = "";
  }
);
watch(
  () => area.value,
  (val) => {
    if (val) {
      let provinceData: Data = {
        // 注意：province.value必须存在时才能进行find，否则修改省时会报错
        name:
          province.value &&
          allArea.value.find((item) => item.code === province.value)!.name,
        code: province.value,
      };
      let cityData: Data = {
        name:
          city.value &&
          selectedCity.value.find((item) => item.code === city.value)!.name,
        code: city.value,
      };
      let areaData: Data = {
        name: val && selectedArea.value.find((item) => item.code === val)!.name,
        code: area.value,
      };
      // 向父组件派发事件，传递数据
      emits("change", {
        province: provinceData,
        city: cityData,
        area: areaData,
      });
    }
  }
);
</script>

<style scoped></style>

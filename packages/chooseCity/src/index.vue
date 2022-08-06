<template>
  <el-popover placement="bottom-start" :width="400" trigger="click" :visible="visible">
    <template #reference>
      <div class="result" @click="handleClick">
        <div>{{ result }}</div>
        <div class="icon">
          <el-icon-arrowdown :class="{ rotate: visible }"></el-icon-arrowdown>
        </div>
      </div>
    </template>
    <div class="container">
      <!-- 单选及下拉框区域 -->
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :offset="2" :span="14">
          <el-select
            v-model="selectValue"
            placeholder="请搜索城市"
            size="small"
            clearable
            filterable
            :filterMethod="filterMethods"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <!-- 字母区域 -->
        <div class="city">
          <div
            class="city-item"
            @click="clickLetter(item, index)"
            v-for="(item, index) in Object.keys(cities)"
            :key="index"
            :class="{ acitiveItem: isActiveIndex === index }"
          >
            {{ item }}
          </div>
        </div>
        <!-- 城市滚动列表区域 -->
        <el-scrollbar max-height="300px" class="scrollbar" ref="scrollbarRef">
          <template v-for="(item, index) in Object.keys(cities)" :key="index">
            <el-row :id="item">
              <el-col :span="2">{{ item }}:</el-col>
              <el-col :span="22">
                <div class="cityGroup">
                  <div
                    class="cityItem"
                    @click="cityItemClick(v)"
                    v-for="(v, i) in cities[item]"
                    :key="v.id"
                  >
                    {{ v.name }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <!-- 字母区域 -->
        <div class="province">
          <div
            class="province-item"
            @click="clickLetter(item, index)"
            v-for="(item, index) in Object.keys(provinces)"
            :key="index"
            :class="{ acitiveItem: isActiveIndex === index }"
          >
            {{ item }}
          </div>
        </div>
        <!-- 城市滚动列表区域 -->
        <el-scrollbar max-height="300px" class="scrollbar" ref="scrollbarRef">
          <template v-for="(item, index) in Object.values(provinces)" :key="index">
            <template v-for="(item1, index) in item" :key="index">
              <el-row :id="item1.id">
                <el-col :span="3">{{ item1.name }}:</el-col>
                <el-col :span="21">
                  <div class="provinceGroup">
                    <div
                      class="provinceItem"
                      @click="provinceItemClick(v)"
                      v-for="(v, i) in item1.data"
                      :key="i"
                    >
                      {{ v }}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import city from "../lib/city";
import province from "../lib/province.json";
import { Icity, Iprovince } from "./types";
import { ElScrollbar } from "element-plus";
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
// 分发事件
const emits = defineEmits(["selectCity", "selectProvince"]);
const result = ref<string>("请选择城市");
const visible = ref<boolean>(false);
// 单选框的值
const radioValue = ref<string>("按城市");
// 下拉框的值
const selectValue = ref<string>("");
const options = ref<Icity[]>([]);
let isActiveIndex = ref<number>(0);
// 所有城市数据
const cities = ref(city.cities);
// 所有省份数据
const provinces = ref(province);
// 搜索框的值
let searchValue = ref<string>("");
// 所有的城市数据
const allCities = ref<Icity[]>([]);

onMounted(() => {
  // 获取下拉框的城市数据
  let values = Object.values(cities.value).flat(2);
  options.value = values;
  allCities.value = values;
});
// 监听搜索框的值
// watch(
//   () => searchValue.value,
//   (val) => {
//     filterMethods(val);
//   }
// );
watch(
  () => radioValue.value,
  (val) => {
    isActiveIndex.value = 0;
  }
);

// 点击展开/收起
const handleClick = () => {
  visible.value = !visible.value;
};
// 点击字母
const clickLetter = (item, index) => {
  isActiveIndex.value = index;

  const dom = document.getElementById(item);
  // 方式一 使用scroll滚动组件的api
  // scrollbarRef.value!.setScrollTop(dom.offsetTop);

  // 方式二 使用原生api
  if (dom) {
    dom.scrollIntoView(true); //true顶部 flase底部
  }
};
// 点击每个城市
const cityItemClick = (v: Icity) => {
  result.value = v.name;
  visible.value = false;
  emits("selectCity", v);
};
// 点击省份下的项
const provinceItemClick = (v) => {
  result.value = v;
  visible.value = false;
  emits("selectProvince", v);
};
// 自定义搜索过滤方法
const filterMethods = (val) => {
  // 每次输入都给搜索框重新赋值，用于监听
  // searchValue.value = val;
  let values = Object.values(cities.value).flat(2);
  if (val === "") {
    options.value = values;
  } else {
    if ((radioValue.value = "按城市")) {
      // 中文与拼音一起过滤
      options.value = values.filter((item) => {
        return item.name.includes(val) || item.spell.includes(val);
      });
    } else {
      // 只过滤中文
      options.value = values.filter((item) => {
        return item.name.includes(val);
      });
    }
  }
};
const changeSelect = (val) => {
  const city = allCities.value.find((item) => {
    return item.id === val;
  })!;
  result.value = city?.name;
  if (radioValue.value === "按城市") {
    emits("selectCity", city);
  } else {
    emits("selectProvince", city);
  }
};
</script>

<style scoped lang="scss">
.result {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  width: fit-content;

  .icon {
    position: relative;
    top: 2px;
    left: 4px;
    transition: all 300ms linear;
  }
}

.rotate {
  transform: rotate(180deg);
  transition: all 300ms linear;
}

.container {
  padding: 6px;
  .el-select {
    position: relative;
    top: 3px;
  }
  .city,
  .province {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    .city-item,
    .province-item {
      padding: 3px 6px;
      margin-right: 8px;
      margin-bottom: 6px;
      border: 1px solid #eee;
      cursor: pointer;
    }
  }
  .acitiveItem {
    background-color: #46a0fc;
    border: none;
    color: #fff;
  }
  .scrollbar {
    margin-top: 10px;
  }
  .cityGroup,
  .provinceGroup {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 10px;
    .cityItem,
    .provinceItem {
      margin-right: 8px;
      cursor: pointer;
    }
  }
}
</style>

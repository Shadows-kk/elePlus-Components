<template>
  <div class="ele-cpn-wrapper">
    <el-form
      v-if="model"
      v-bind="$attrs"
      :model="model"
      :rules="rules"
      :validate-on-rule-change="false"
    >
      <template v-for="(item, index) in options" :key="index">
        <el-form-item
          v-if="!item.children || !item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-model="model[item.prop!]"
          ></component>
        </el-form-item>
        <el-form-item
          v-if="item.children && item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-model="model[item.prop!]"
            :placeholder="item.placeholder"
          >
            <component
              v-for="(child, index) in item.children"
              :key="index"
              :is="`el-${child.type}`"
              :value="child.value"
              :label="child.label"
            ></component>
          </component>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from "vue";
import { FormOptions } from "./type/types";
// 打包的时候只会打包lodash下的cloneDeep包，不会把lodash整个打包
import cloneDeep from "lodash/cloneDeep";
const props = defineProps({
  // 表单的配置
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});
let model = ref<any>(null);
const rules = ref<any>(null);

// 初始化表单数据
const initFormDate = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item) => {
      m[item.prop] = item.value;
      r[item.prop] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

onMounted(() => {
  initFormDate();
});
// 监听父组件传递过来的options改变
watch(
  () => props.options,
  (val) => {
    initFormDate();
  },
  { deep: true }
);
</script>

<style scoped></style>

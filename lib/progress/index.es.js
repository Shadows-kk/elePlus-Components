import { defineComponent, ref, onMounted, resolveComponent, openBlock, createElementBlock, createVNode, mergeProps, unref } from "vue";
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = { class: "progress-circle-svg" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    isAnimation: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 3e3
    }
  },
  setup(__props) {
    const props = __props;
    let t = ref(0);
    onMounted(() => {
      if (props.isAnimation) {
        let p = props.time / props.percentage;
        let timer = setInterval(() => {
          t.value += 1;
          if (t.value >= props.percentage) {
            t.value = props.percentage;
            clearInterval(timer);
          }
        }, p);
      }
    });
    return (_ctx, _cache) => {
      const _component_el_progress = resolveComponent("el-progress");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_el_progress, mergeProps({ percentage: unref(t) }, _ctx.$attrs), null, 16, ["percentage"])
      ]);
    };
  }
});
var progress = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fef5415c"]]);
var index = {
  install(app) {
    app.component("m-progress", progress);
  }
};
export { index as default };

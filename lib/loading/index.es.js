import { openBlock, createElementBlock, createElementVNode } from "vue";
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "Loading2",
  props: {
    width: {
      type: [Number, String],
      default: "24"
    },
    height: {
      type: [Number, String],
      default: "30"
    },
    colors: {
      type: Array,
      default: ["#FF6700", "#01E4F2", "#12A3F6"]
    },
    duration: {
      type: [Number, String],
      default: 0.6
    }
  },
  setup(ctx) {
    return {};
  }
};
const _hoisted_1 = { class: "loading" };
const _hoisted_2 = ["width", "height"];
const _hoisted_3 = ["fill"];
const _hoisted_4 = ["dur"];
const _hoisted_5 = ["fill"];
const _hoisted_6 = ["dur"];
const _hoisted_7 = ["fill"];
const _hoisted_8 = ["dur"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(), createElementBlock("svg", {
      width: $props.width,
      height: $props.height,
      viewBox: "0 0 24 30"
    }, [
      createElementVNode("rect", {
        x: "0",
        y: "0",
        width: "4",
        height: "10",
        fill: $props.colors[0]
      }, [
        createElementVNode("animateTransform", {
          attributeType: "xml",
          attributeName: "transform",
          type: "translate",
          values: "0 0; 0 20; 0 0",
          begin: "0",
          dur: `${+$props.duration}s`,
          repeatCount: "indefinite"
        }, null, 8, _hoisted_4)
      ], 8, _hoisted_3),
      createElementVNode("rect", {
        x: "10",
        y: "0",
        width: "4",
        height: "10",
        fill: $props.colors[1]
      }, [
        createElementVNode("animateTransform", {
          attributeType: "xml",
          attributeName: "transform",
          type: "translate",
          values: "0 0; 0 20; 0 0",
          begin: "0.2s",
          dur: `${+$props.duration}s`,
          repeatCount: "indefinite"
        }, null, 8, _hoisted_6)
      ], 8, _hoisted_5),
      createElementVNode("rect", {
        x: "20",
        y: "0",
        width: "4",
        height: "10",
        fill: $props.colors[2]
      }, [
        createElementVNode("animateTransform", {
          attributeType: "xml",
          attributeName: "transform",
          type: "translate",
          values: "0 0; 0 20; 0 0",
          begin: "0.4s",
          dur: `${+$props.duration}s`,
          repeatCount: "indefinite"
        }, null, 8, _hoisted_8)
      ], 8, _hoisted_7)
    ], 8, _hoisted_2))
  ]);
}
var loading = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-60ee9ab4"]]);
var index = {
  install(app) {
    app.component("loading", loading);
  }
};
export { index as default };

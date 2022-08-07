import { defineComponent, useSlots, computed, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, renderSlot, toDisplayString, createBlock, resolveDynamicComponent } from "vue";
const toLine = (value) => {
  return value.replace(/(A-Z)g/, "-$1").toLocaleLowerCase();
};
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = { class: "trend" };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { class: "icon" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    type: {
      type: String,
      default: "up"
    },
    title: {
      type: String,
      default: "\u6807\u9898"
    },
    upColor: {
      type: String,
      default: "#f5222d"
    },
    downColor: {
      type: String,
      default: "#52c41a"
    },
    reverseColor: {
      type: Boolean,
      default: false
    },
    upTextColor: {
      type: String,
      default: "#f5222d"
    },
    downTextColor: {
      type: String,
      default: "#52c41a"
    },
    upIcon: {
      type: String,
      default: "ArrowUp"
    },
    downIcon: {
      type: String,
      default: "ArrowDown"
    }
  },
  setup(__props) {
    const props = __props;
    const slot = useSlots();
    const textColor = computed(() => {
      return props.type === "up" ? props.upTextColor : props.downTextColor;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", {
          class: "text",
          style: normalizeStyle({ color: unref(textColor) })
        }, [
          unref(slot).default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(__props.title), 1))
        ], 4),
        createElementVNode("div", _hoisted_3, [
          __props.type === "up" ? (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.upIcon)}`), {
            key: 0,
            style: normalizeStyle({ color: !__props.reverseColor ? __props.upColor : "#52c41a" })
          }, null, 8, ["style"])) : (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.downIcon)}`), {
            key: 1,
            style: normalizeStyle({ color: !__props.reverseColor ? __props.downColor : "#f5222d" })
          }, null, 8, ["style"]))
        ])
      ]);
    };
  }
});
var trend = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66685dda"]]);
var index = {
  install(app) {
    app.component("trend", trend);
  }
};
export { index as default };

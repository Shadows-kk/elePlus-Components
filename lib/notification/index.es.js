import { defineComponent, resolveComponent, openBlock, createBlock, withCtx, createVNode, resolveDynamicComponent, unref, renderSlot } from "vue";
const toLine = (value) => {
  return value.replace(/(A-Z)g/, "-$1").toLocaleLowerCase();
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    icon: {
      type: String,
      default: "Bell"
    },
    value: {
      type: [String, Number],
      default: ""
    },
    max: {
      type: Number
    },
    isDot: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_badge = resolveComponent("el-badge");
      const _component_el_popover = resolveComponent("el-popover");
      return openBlock(), createBlock(_component_el_popover, {
        "popper-class": "notification-poper-class",
        placement: "bottom",
        width: 300,
        trigger: "click"
      }, {
        reference: withCtx(() => [
          createVNode(_component_el_badge, {
            value: __props.value,
            max: __props.max,
            isDot: __props.isDot
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.icon)}`)))
            ]),
            _: 1
          }, 8, ["value", "max", "isDot"])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
var index = {
  install(app) {
    app.component("notification", _sfc_main);
  }
};
export { index as default };

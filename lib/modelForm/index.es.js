import { defineComponent, ref, watch, resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, mergeProps, unref, isRef, withCtx, renderSlot } from "vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function
    },
    handlePreview: {
      type: Function
    },
    handleRemove: {
      type: Function
    },
    beforeRemove: {
      type: Function
    },
    handleExceed: {
      type: Function
    },
    beforeUpload: {
      type: Function
    },
    onSuccess: {
      type: Function
    }
  },
  emits: ["update:visible"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const form = ref(null);
    let dialogFormVisible = ref(props.visible);
    watch(() => props.visible, (val) => {
      dialogFormVisible.value = val;
    });
    watch(() => dialogFormVisible.value, (val) => {
      emits("update:visible", val);
    });
    return (_ctx, _cache) => {
      const _component_config_form = resolveComponent("config-form");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ "choose-icon-el-dialog__body-height": __props.isScroll })
      }, [
        createVNode(_component_el_dialog, mergeProps({
          modelValue: unref(dialogFormVisible),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(dialogFormVisible) ? dialogFormVisible.value = $event : dialogFormVisible = $event)
        }, _ctx.$attrs), {
          default: withCtx(() => [
            createVNode(_component_config_form, {
              options: __props.options,
              ref_key: "form",
              ref: form,
              "label-width": "100px",
              onOnChange: __props.onChange,
              onOnPreview: __props.handlePreview,
              onOnRemove: __props.handleRemove,
              onBeforeRemove: __props.beforeRemove,
              onOnExceed: __props.handleExceed,
              onBeforeUpload: __props.beforeUpload,
              onOnSuccess: __props.onSuccess
            }, {
              uploadArea: withCtx(() => [
                renderSlot(_ctx.$slots, "uploadArea")
              ]),
              uploadTips: withCtx(() => [
                renderSlot(_ctx.$slots, "uploadTips")
              ]),
              _: 3
            }, 8, ["options", "onOnChange", "onOnPreview", "onOnRemove", "onBeforeRemove", "onOnExceed", "onBeforeUpload", "onOnSuccess"])
          ]),
          footer: withCtx(() => [
            renderSlot(_ctx.$slots, "footer", { form: form.value })
          ]),
          _: 3
        }, 16, ["modelValue"])
      ], 2);
    };
  }
});
var index = {
  install(app) {
    app.component("model-form", _sfc_main);
  }
};
export { index as default };

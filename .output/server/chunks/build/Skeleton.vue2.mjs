import { defineComponent, unref, mergeProps, withCtx, renderSlot } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { a as _appConfig } from './server.mjs';
import { t as tv } from './tv.mjs';

const theme = {
  "base": "animate-pulse rounded-[calc(var(--ui-radius)*1.5)] bg-(--ui-bg-elevated)"
};

var _a;
const appConfigSkeleton = _appConfig;
const skeleton = tv({ extend: tv(theme), ...((_a = appConfigSkeleton.ui) == null ? void 0 : _a.skeleton) || {} });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Skeleton",
  __ssrInlineRender: true,
  props: {
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        class: unref(skeleton)({ class: props.class })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=Skeleton.vue2.mjs.map

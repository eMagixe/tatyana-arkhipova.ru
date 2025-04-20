import { defineComponent, withCtx, createBlock, createCommentVNode, openBlock, mergeProps, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './index.vue.mjs';
import { _ as _sfc_main$2 } from './Skeleton.vue2.mjs';
import './useStrapi.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'vue-router';
import '@iconify/vue';
import 'qs';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import './asyncData.mjs';
import 'reka-ui';
import '@vueuse/core';
import './Link.vue2.mjs';
import './tv.mjs';
import 'tailwind-variants';
import './Icon.vue2.mjs';
import './index2.mjs';
import '@iconify/utils/lib/css/icon';
import './nuxt-link.mjs';
import 'embla-carousel-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    project: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_UCarousel = _sfc_main$1;
      const _component_USkeleton = _sfc_main$2;
      if (props.project) {
        _push(`<!--[--><div class="h-[60px] flex items-center justify-between header"><div class="h-[60px] flex gap-8 items-center"><div class="w-[2px] h-[60px] gradient-bg"></div><h2 class="max-md:!text-[18px] font-bold text-primary-500">${ssrInterpolate((_a = _ctx.project) == null ? void 0 : _a.name)}</h2></div><p class="mr-8 text-2xl text-primary-500">${ssrInterpolate((_b = _ctx.project) == null ? void 0 : _b.type)}</p></div><div class="grid grid-cols-1 gap-4 p-4">`);
        if (((_c = _ctx.project) == null ? void 0 : _c.photos.length) > 0) {
          _push(ssrRenderComponent(_component_UCarousel, {
            items: (_d = _ctx.project) == null ? void 0 : _d.photos,
            ui: { item: "md:basis-1/3 basis-1/1" },
            loop: "",
            dots: "",
            class: "w-full h-[350px] flex mb-[30px]"
          }, {
            default: withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (item.url) {
                  _push2(`<img loading="lazy"${ssrRenderAttr("alt", item.url)}${ssrRenderAttr("src", `http://tatyana-arkhipova.ru:1337${item.url}`)} class="rounded-lg cursor-pointer"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  item.url ? (openBlock(), createBlock("img", {
                    key: 0,
                    loading: "lazy",
                    onClick: ($event) => _ctx.$emit("openModal", props.project, index),
                    alt: item.url,
                    src: `http://tatyana-arkhipova.ru:1337${item.url}`,
                    class: "rounded-lg cursor-pointer"
                  }, null, 8, ["onClick", "alt", "src"])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><pre class="p-8">${ssrInterpolate(_ctx.project.about)}</pre><!--]-->`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-[200px] w-full" }, null, _parent));
        _push(`</div>`);
      }
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/project/item.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=item.vue.mjs.map

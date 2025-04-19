import { defineComponent, ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useStrapi } from './useStrapi.mjs';
import { u as useAsyncData } from './asyncData.mjs';
import { _ as _sfc_main$1 } from './Skeleton.vue2.mjs';
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
import 'reka-ui';
import './tv.mjs';
import 'tailwind-variants';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "education",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { find } = useStrapi();
    const educations = ref([]);
    const nativeData = ref();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "educations",
      () => find("educations")
    )), __temp = await __temp, __restore(), __temp);
    const { data: native } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "native",
      () => find("native")
    )), __temp = await __temp, __restore(), __temp);
    if (data.value !== null) {
      educations.value = data.value;
    }
    if (native.value !== null) {
      nativeData.value = native.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_USkeleton = _sfc_main$1;
      _push(`<!--[--><div class="bg-[url(&#39;/images/skills.jpg&#39;)] pl-[100px] w-full h-[200px] bg-cover bg-center"></div><div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start items-center"><h1 class="text-4xl text-white">Образование</h1></div><div class="px-[100px] py-[50px] w-full flex flex-row gap-10"><div class="w-[50%] h-full border-0"><h2>Курсы</h2>`);
      if (unref(educations).length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(educations), (education) => {
          _push(`<div class="w-full h-full mt-8 animation"><div class="h-[60px] flex items-center justify-start gap-8 header"><div class="w-[2px] h-[60px] gradient-bg"></div><h2 class="text-2xl font-bold text-primary-500">${ssrInterpolate(education.name)}</h2></div><div class="grid grid-cols-1 gap-4 p-4">${ssrInterpolate(education.description)}</div><div class="grid grid-cols-1 gap-4 p-4"><p>Дата: <span class="text-primary-500">${ssrInterpolate(education.date)}</span></p></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="w-full h-full"><template>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-[50px] w-full" }, null, _parent));
        _push(`</template>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-[200px] w-full" }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="w-[50%] h-full border-0"><h2>Университет</h2><pre class="mt-8">${ssrInterpolate((_a = unref(nativeData)) == null ? void 0 : _a.Graduate)}</pre></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/education.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=education.vue.mjs.map

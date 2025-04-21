import { defineComponent, ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useStrapi } from './useStrapi.mjs';
import { u as useAsyncData } from './asyncData.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { find } = useStrapi();
    const aboutData = ref();
    const { data: about } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "about",
      () => find("about")
    )), __temp = await __temp, __restore(), __temp);
    if (about.value !== null) {
      aboutData.value = about.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[--><div class="bg-[url(&#39;/images/jobs.jpg&#39;)] flex justify-start items-end w-full h-[280px] bg-cover bg-center"><div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center"><h1 class="text-4xl text-white">Обо мне</h1></div></div><div class="flex px-[100px] py-[50px] gap-8"><div class="w-[30%]"><img${ssrRenderAttr("src", `https://api.tatyana-arkhipova.ru${(_a = unref(aboutData)) == null ? void 0 : _a.my_photo[0].url}`)} alt="my_photo"></div><div class="w-[70%] flex flex-col gap-4"><h2 class="text-2xl font-bold text-primary-500">Почему я занимаюсь моделированием?</h2><!--[-->`);
      ssrRenderList((_b = unref(aboutData)) == null ? void 0 : _b.about_me.split("\n"), (item) => {
        _push(`<div class="w-full">${ssrInterpolate(item)}</div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about.vue.mjs.map

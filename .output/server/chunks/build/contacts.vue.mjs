import { defineComponent, ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useStrapi } from './useStrapi.mjs';
import { u as useAsyncData } from './asyncData.mjs';
import { _ as _sfc_main$1 } from './Icon.vue2.mjs';
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
import './index2.mjs';
import '@iconify/utils/lib/css/icon';
import 'reka-ui';
import '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contacts",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { find } = useStrapi();
    const contacts = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "contacts",
      () => find("contacts")
    )), __temp = await __temp, __restore(), __temp);
    if (data.value !== null) {
      contacts.value = data.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$1;
      _push(`<!--[--><div class="bg-[url(&#39;/images/jobs.jpg&#39;)] flex justify-start items-end w-full h-[280px] bg-cover bg-center"><div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center"><h1 class="text-4xl text-white">Контакты</h1></div></div><div class="px-[100px] py-[50px] w-full flex gap-4">`);
      if (unref(contacts).length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(contacts), (contact) => {
          _push(`<div class="w-full h-full border-0 animation"><div class="h-[60px] flex items-center justify-start gap-8 header"><div class="w-[2px] h-[60px] gradient-bg"></div><h2 class="text-2xl font-bold text-primary-500"><a${ssrRenderAttr("href", contact.text)} class="flex justify-center items-center gap-2">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: `i-lucide-${contact.icon}`
          }, null, _parent));
          _push(`<p>${ssrInterpolate(contact.text)}</p></a></h2></div><div class="grid grid-cols-1 gap-4 p-4">${ssrInterpolate(contact.description)}</div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contacts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contacts.vue.mjs.map

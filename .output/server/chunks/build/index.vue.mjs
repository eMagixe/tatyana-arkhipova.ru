import { computed, unref, isRef, ref, toRef, inject, defineComponent, useSlots, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, toDisplayString, createVNode, watch, Fragment, renderList, withAsyncContext, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useStrapi } from './useStrapi.mjs';
import { u as useAsyncData } from './asyncData.mjs';
import useEmblaCarousel from 'embla-carousel-vue';
import { useForwardProps, Primitive } from 'reka-ui';
import { createSharedComposable, reactivePick, computedAsync } from '@vueuse/core';
import { g as get, p as pickLinkProps, u as useButtonGroup, a as useComponentIcons, _ as _sfc_main$3, o as omit, b as _sfc_main$4, c as _sfc_main$6 } from './Link.vue2.mjs';
import { l as defu } from '../nitro/nitro.mjs';
import { a as _appConfig, b as useAppConfig } from './server.mjs';
import { t as tv } from './tv.mjs';
import { _ as _sfc_main$5 } from './Icon.vue2.mjs';
import { _ as _sfc_main$7 } from './Skeleton.vue2.mjs';
import './nuxt-link.mjs';
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
import 'tailwind-variants';
import './index2.mjs';
import '@iconify/utils/lib/css/icon';

function buildTranslator(locale) {
  return (path, option) => translate(path, option, unref(locale));
}
function translate(path, option, locale) {
  const prop = get(locale, `messages.${path}`, path);
  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${(option == null ? void 0 : option[key]) ?? `{${key}}`}`
  );
}
function buildLocaleContext(locale) {
  const lang = computed(() => unref(locale).name);
  const code = computed(() => unref(locale).code);
  const dir = computed(() => unref(locale).dir);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale)
  };
}

// @__NO_SIDE_EFFECTS__
function defineLocale(options) {
  return defu(options, { dir: "ltr" });
}

const en = defineLocale({
  name: "English",
  code: "en",
  messages: {
    inputMenu: {
      noMatch: "No matching data",
      noData: "No data",
      create: 'Create "{label}"'
    },
    calendar: {
      prevYear: "Previous year",
      nextYear: "Next year",
      prevMonth: "Previous month",
      nextMonth: "Next month"
    },
    inputNumber: {
      increment: "Increment",
      decrement: "Decrement"
    },
    commandPalette: {
      placeholder: "Type a command or search...",
      noMatch: "No matching data",
      noData: "No data",
      close: "Close"
    },
    selectMenu: {
      noMatch: "No matching data",
      noData: "No data",
      create: 'Create "{label}"',
      search: "Search..."
    },
    toast: {
      close: "Close"
    },
    carousel: {
      prev: "Prev",
      next: "Next",
      goto: "Go to slide {slide}"
    },
    modal: {
      close: "Close"
    },
    slideover: {
      close: "Close"
    },
    alert: {
      close: "Close"
    },
    table: {
      noData: "No data"
    }
  }
});

const localeContextInjectionKey = Symbol.for("nuxt-ui.locale-context");
const _useLocale = (localeOverrides) => {
  const locale = localeOverrides || toRef(inject(localeContextInjectionKey));
  return buildLocaleContext(computed(() => locale.value || en));
};
const useLocale = /* @__PURE__ */ createSharedComposable(_useLocale);

const formLoadingInjectionKey = Symbol("nuxt-ui.form-loading");

const theme$1 = {
  "slots": {
    "base": [
      "rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "active": {
      "true": {
        "base": ""
      },
      "false": {
        "base": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-primary) hover:bg-(--ui-primary)/75 disabled:bg-(--ui-primary) aria-disabled:bg-(--ui-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-secondary) hover:bg-(--ui-secondary)/75 disabled:bg-(--ui-secondary) aria-disabled:bg-(--ui-secondary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-success) hover:bg-(--ui-success)/75 disabled:bg-(--ui-success) aria-disabled:bg-(--ui-success) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-info) hover:bg-(--ui-info)/75 disabled:bg-(--ui-info) aria-disabled:bg-(--ui-info) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-warning) hover:bg-(--ui-warning)/75 disabled:bg-(--ui-warning) aria-disabled:bg-(--ui-warning) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-error) hover:bg-(--ui-error)/75 disabled:bg-(--ui-error) aria-disabled:bg-(--ui-error) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-error)"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-primary)/50 text-(--ui-primary) hover:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-secondary)/50 text-(--ui-secondary) hover:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-success)/50 text-(--ui-success) hover:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-info)/50 text-(--ui-info) hover:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-warning)/50 text-(--ui-warning) hover:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-error)/50 text-(--ui-error) hover:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-error)"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-(--ui-primary) bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 focus:outline-none focus-visible:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-(--ui-secondary) bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 focus:outline-none focus-visible:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-(--ui-success) bg-(--ui-success)/10 hover:bg-(--ui-success)/15 focus:outline-none focus-visible:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-(--ui-info) bg-(--ui-info)/10 hover:bg-(--ui-info)/15 focus:outline-none focus-visible:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-(--ui-warning) bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 focus:outline-none focus-visible:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-(--ui-error) bg-(--ui-error)/10 hover:bg-(--ui-error)/15 focus:outline-none focus-visible:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25 bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25 bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-(--ui-success) ring ring-inset ring-(--ui-success)/25 bg-(--ui-success)/10 hover:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-(--ui-info) ring ring-inset ring-(--ui-info)/25 bg-(--ui-info)/10 hover:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25 bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-(--ui-error) ring ring-inset ring-(--ui-error)/25 bg-(--ui-error)/10 hover:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-error)"
    },
    {
      "color": "primary",
      "variant": "ghost",
      "class": "text-(--ui-primary) hover:bg-(--ui-primary)/10 focus:outline-none focus-visible:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary",
      "variant": "ghost",
      "class": "text-(--ui-secondary) hover:bg-(--ui-secondary)/10 focus:outline-none focus-visible:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success",
      "variant": "ghost",
      "class": "text-(--ui-success) hover:bg-(--ui-success)/10 focus:outline-none focus-visible:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info",
      "variant": "ghost",
      "class": "text-(--ui-info) hover:bg-(--ui-info)/10 focus:outline-none focus-visible:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning",
      "variant": "ghost",
      "class": "text-(--ui-warning) hover:bg-(--ui-warning)/10 focus:outline-none focus-visible:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error",
      "variant": "ghost",
      "class": "text-(--ui-error) hover:bg-(--ui-error)/10 focus:outline-none focus-visible:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary",
      "variant": "link",
      "class": "text-(--ui-primary) hover:text-(--ui-primary)/75 disabled:text-(--ui-primary) aria-disabled:text-(--ui-primary) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": "text-(--ui-secondary) hover:text-(--ui-secondary)/75 disabled:text-(--ui-secondary) aria-disabled:text-(--ui-secondary) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "link",
      "class": "text-(--ui-success) hover:text-(--ui-success)/75 disabled:text-(--ui-success) aria-disabled:text-(--ui-success) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "link",
      "class": "text-(--ui-info) hover:text-(--ui-info)/75 disabled:text-(--ui-info) aria-disabled:text-(--ui-info) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "link",
      "class": "text-(--ui-warning) hover:text-(--ui-warning)/75 disabled:text-(--ui-warning) aria-disabled:text-(--ui-warning) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "link",
      "class": "text-(--ui-error) hover:text-(--ui-error)/75 disabled:text-(--ui-error) aria-disabled:text-(--ui-error) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-bg-inverted) hover:bg-(--ui-bg-inverted)/90 disabled:bg-(--ui-bg-inverted) aria-disabled:bg-(--ui-bg-inverted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-border-inverted)"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg) hover:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg) aria-disabled:bg-(--ui-bg) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 focus:outline-none focus-visible:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated)"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "color": "neutral",
      "variant": "ghost",
      "class": "text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": "text-(--ui-text-muted) hover:text-(--ui-text) disabled:text-(--ui-text-muted) aria-disabled:text-(--ui-text-muted) focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-2"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};

var _a$1;
const appConfigButton = _appConfig;
const button = tv({ extend: tv(theme$1), ...((_a$1 = appConfigButton.ui) == null ? void 0 : _a$1.button) || {} });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    label: {},
    color: {},
    activeColor: {},
    variant: {},
    activeVariant: {},
    size: {},
    square: { type: Boolean },
    block: { type: Boolean },
    loadingAuto: { type: Boolean },
    onClick: {},
    class: {},
    ui: {},
    icon: {},
    avatar: {},
    leading: { type: Boolean },
    leadingIcon: {},
    trailing: { type: Boolean },
    trailingIcon: {},
    loading: { type: Boolean },
    loadingIcon: {},
    as: {},
    type: {},
    disabled: { type: Boolean },
    active: { type: Boolean, default: void 0 },
    exact: { type: Boolean },
    exactQuery: { type: [Boolean, String] },
    exactHash: { type: Boolean },
    inactiveClass: { default: "" },
    to: {},
    href: {},
    external: { type: Boolean },
    target: {},
    rel: {},
    noRel: { type: Boolean },
    prefetchedClass: {},
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    activeClass: { default: "" },
    exactActiveClass: {},
    ariaCurrentValue: {},
    viewTransition: { type: Boolean },
    replace: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const linkProps = useForwardProps(pickLinkProps(props));
    const { orientation, size: buttonSize } = useButtonGroup(props);
    const loadingAutoState = ref(false);
    const formLoading = inject(formLoadingInjectionKey, void 0);
    async function onClickWrapper(event) {
      loadingAutoState.value = true;
      const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
      try {
        await Promise.all(callbacks.map((fn) => fn == null ? void 0 : fn(event)));
      } finally {
        loadingAutoState.value = false;
      }
    }
    const isLoading = computed(() => {
      return props.loading || props.loadingAuto && (loadingAutoState.value || (formLoading == null ? void 0 : formLoading.value) && props.type === "submit");
    });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
      computed(() => ({ ...props, loading: isLoading.value }))
    );
    const ui = computed(() => tv({
      extend: button,
      variants: {
        active: {
          true: {
            base: props.activeClass
          },
          false: {
            base: props.inactiveClass
          }
        }
      }
    })({
      color: props.color,
      variant: props.variant,
      size: buttonSize.value,
      loading: isLoading.value,
      block: props.block,
      square: props.square || !slots.default && !props.label,
      leading: isLeading.value,
      trailing: isTrailing.value,
      buttonGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(_sfc_main$3, mergeProps({
        type: _ctx.type,
        disabled: _ctx.disabled || isLoading.value,
        class: ui.value.base({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.base] })
      }, unref(omit)(unref(linkProps), ["type", "disabled", "onClick"]), { custom: "" }, _attrs), {
        default: withCtx(({ active, ...slotProps }, _push2, _parent2, _scopeId) => {
          var _a3, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, mergeProps(slotProps, {
              class: ui.value.base({
                class: [props.class, (_a3 = props.ui) == null ? void 0 : _a3.base],
                active,
                ...active && _ctx.activeVariant ? { variant: _ctx.activeVariant } : {},
                ...active && _ctx.activeColor ? { color: _ctx.activeColor } : {}
              }),
              onClick: onClickWrapper
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
                    var _a4, _b2, _c;
                    if (unref(isLeading) && unref(leadingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$5, {
                        name: unref(leadingIconName),
                        class: ui.value.leadingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.leadingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else if (!!_ctx.avatar) {
                      _push3(ssrRenderComponent(_sfc_main$6, mergeProps({
                        size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                      }, _ctx.avatar, {
                        class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar, active })
                      }), null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                    var _a4;
                    if (_ctx.label) {
                      _push3(`<span class="${ssrRenderClass(ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label, active }))}"${_scopeId2}>${ssrInterpolate(_ctx.label)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
                    var _a4;
                    if (unref(isTrailing) && unref(trailingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$5, {
                        name: unref(trailingIconName),
                        class: ui.value.trailingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.trailingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "leading", {}, () => {
                      var _a4, _b2, _c;
                      return [
                        unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$5, {
                          key: 0,
                          name: unref(leadingIconName),
                          class: ui.value.leadingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.leadingIcon, active })
                        }, null, 8, ["name", "class"])) : !!_ctx.avatar ? (openBlock(), createBlock(_sfc_main$6, mergeProps({
                          key: 1,
                          size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                        }, _ctx.avatar, {
                          class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar, active })
                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                      ];
                    }),
                    renderSlot(_ctx.$slots, "default", {}, () => {
                      var _a4;
                      return [
                        _ctx.label ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label, active })
                        }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true)
                      ];
                    }),
                    renderSlot(_ctx.$slots, "trailing", {}, () => {
                      var _a4;
                      return [
                        unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$5, {
                          key: 0,
                          name: unref(trailingIconName),
                          class: ui.value.trailingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.trailingIcon, active })
                        }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                      ];
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, mergeProps(slotProps, {
                class: ui.value.base({
                  class: [props.class, (_b = props.ui) == null ? void 0 : _b.base],
                  active,
                  ...active && _ctx.activeVariant ? { variant: _ctx.activeVariant } : {},
                  ...active && _ctx.activeColor ? { color: _ctx.activeColor } : {}
                }),
                onClick: onClickWrapper
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "leading", {}, () => {
                    var _a4, _b2, _c;
                    return [
                      unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$5, {
                        key: 0,
                        name: unref(leadingIconName),
                        class: ui.value.leadingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.leadingIcon, active })
                      }, null, 8, ["name", "class"])) : !!_ctx.avatar ? (openBlock(), createBlock(_sfc_main$6, mergeProps({
                        key: 1,
                        size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                      }, _ctx.avatar, {
                        class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar, active })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ];
                  }),
                  renderSlot(_ctx.$slots, "default", {}, () => {
                    var _a4;
                    return [
                      _ctx.label ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label, active })
                      }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true)
                    ];
                  }),
                  renderSlot(_ctx.$slots, "trailing", {}, () => {
                    var _a4;
                    return [
                      unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$5, {
                        key: 0,
                        name: unref(trailingIconName),
                        class: ui.value.trailingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.trailingIcon, active })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ];
                  })
                ]),
                _: 2
              }, 1040, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const theme = {
  "slots": {
    "root": "relative focus:outline-none",
    "viewport": "overflow-hidden",
    "container": "flex items-start",
    "item": "min-w-0 shrink-0 basis-full",
    "controls": "",
    "arrows": "",
    "prev": "absolute rounded-full",
    "next": "absolute rounded-full",
    "dots": "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
    "dot": [
      "cursor-pointer size-3 bg-(--ui-border-accented) rounded-full",
      "transition"
    ]
  },
  "variants": {
    "orientation": {
      "vertical": {
        "container": "flex-col -mt-4",
        "item": "pt-4",
        "prev": "-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
        "next": "-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90"
      },
      "horizontal": {
        "container": "flex-row -ms-4",
        "item": "ps-4",
        "prev": "-start-12 top-1/2 -translate-y-1/2",
        "next": "-end-12 top-1/2 -translate-y-1/2"
      }
    },
    "active": {
      "true": {
        "dot": "bg-(--ui-border-inverted)"
      }
    }
  }
};

var _a;
const appConfigCarousel = _appConfig;
const carousel = tv({ extend: tv(theme), ...((_a = appConfigCarousel.ui) == null ? void 0 : _a.carousel) || {} });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    as: {},
    prev: {},
    prevIcon: {},
    next: {},
    nextIcon: {},
    arrows: { type: Boolean, default: false },
    dots: { type: Boolean, default: false },
    orientation: { default: "horizontal" },
    items: {},
    autoplay: { type: [Boolean, Object], default: false },
    autoScroll: { type: [Boolean, Object], default: false },
    autoHeight: { type: [Boolean, Object], default: false },
    classNames: { type: [Boolean, Object], default: false },
    fade: { type: [Boolean, Object], default: false },
    wheelGestures: { type: Boolean, default: false },
    class: {},
    ui: {},
    align: { type: [String, Function], default: "center" },
    containScroll: { type: [Boolean, String], default: "trimSnaps" },
    slidesToScroll: { default: 1 },
    dragFree: { type: Boolean, default: false },
    dragThreshold: { default: 10 },
    inViewThreshold: { default: 0 },
    loop: { type: Boolean, default: false },
    skipSnaps: { type: Boolean, default: false },
    duration: { default: 25 },
    startIndex: { default: 0 },
    watchDrag: { type: [Boolean, Function], default: true },
    watchResize: { type: [Boolean, Function], default: true },
    watchSlides: { type: [Boolean, Function], default: true },
    watchFocus: { type: [Boolean, Function], default: true },
    active: { type: Boolean, default: true },
    breakpoints: { default: () => ({}) }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const appConfig = useAppConfig();
    const { dir, t } = useLocale();
    const rootProps = useForwardProps(reactivePick(props, "active", "align", "breakpoints", "containScroll", "dragFree", "dragThreshold", "duration", "inViewThreshold", "loop", "skipSnaps", "slidesToScroll", "startIndex", "watchDrag", "watchResize", "watchSlides", "watchFocus"));
    const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
    const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
    const ui = computed(() => carousel({
      orientation: props.orientation
    }));
    const options = computed(() => ({
      ...props.fade ? { align: "center", containScroll: false } : {},
      ...rootProps.value,
      axis: props.orientation === "horizontal" ? "x" : "y",
      direction: dir.value === "rtl" ? "rtl" : "ltr"
    }));
    const plugins = computedAsync(async () => {
      const plugins2 = [];
      if (props.autoplay) {
        const AutoplayPlugin = await import('embla-carousel-autoplay').then((r) => r.default);
        plugins2.push(AutoplayPlugin(typeof props.autoplay === "boolean" ? {} : props.autoplay));
      }
      if (props.autoScroll) {
        const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default);
        plugins2.push(AutoScrollPlugin(typeof props.autoScroll === "boolean" ? {} : props.autoScroll));
      }
      if (props.autoHeight) {
        const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default);
        plugins2.push(AutoHeightPlugin(typeof props.autoHeight === "boolean" ? {} : props.autoHeight));
      }
      if (props.classNames) {
        const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default);
        plugins2.push(ClassNamesPlugin(typeof props.classNames === "boolean" ? {} : props.classNames));
      }
      if (props.fade) {
        const FadePlugin = await import('embla-carousel-fade').then((r) => r.default);
        plugins2.push(FadePlugin(typeof props.fade === "boolean" ? {} : props.fade));
      }
      if (props.wheelGestures) {
        const { WheelGesturesPlugin } = await import('embla-carousel-wheel-gestures');
        plugins2.push(WheelGesturesPlugin(typeof props.wheelGestures === "boolean" ? {} : props.wheelGestures));
      }
      return plugins2;
    });
    const [emblaRef, emblaApi] = useEmblaCarousel(options.value, plugins.value);
    watch([options, plugins], () => {
      var _a2;
      (_a2 = emblaApi.value) == null ? void 0 : _a2.reInit(options.value, plugins.value);
    });
    function scrollPrev() {
      var _a2;
      (_a2 = emblaApi.value) == null ? void 0 : _a2.scrollPrev();
    }
    function scrollNext() {
      var _a2;
      (_a2 = emblaApi.value) == null ? void 0 : _a2.scrollNext();
    }
    function scrollTo(index) {
      var _a2;
      (_a2 = emblaApi.value) == null ? void 0 : _a2.scrollTo(index);
    }
    function onKeyDown(event) {
      const prevKey = props.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
      const nextKey = props.orientation === "vertical" ? "ArrowDown" : "ArrowRight";
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
        return;
      }
      if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    }
    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);
    const selectedIndex = ref(0);
    const scrollSnaps = ref([]);
    __expose({
      emblaRef,
      emblaApi
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        role: "region",
        "aria-roledescription": "carousel",
        tabindex: "0",
        class: ui.value.root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] }),
        onKeydown: onKeyDown
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(ui.value.viewport({ class: (_a3 = props.ui) == null ? void 0 : _a3.viewport }))}"${_scopeId}><div class="${ssrRenderClass(ui.value.container({ class: (_b = props.ui) == null ? void 0 : _b.container }))}"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.items, (item, index) => {
              var _a4;
              _push2(`<div role="group" aria-roledescription="slide" class="${ssrRenderClass(ui.value.item({ class: (_a4 = props.ui) == null ? void 0 : _a4.item }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {
                item,
                index
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (_ctx.arrows || _ctx.dots) {
              _push2(`<div class="${ssrRenderClass(ui.value.controls({ class: (_c = props.ui) == null ? void 0 : _c.controls }))}"${_scopeId}>`);
              if (_ctx.arrows) {
                _push2(`<div class="${ssrRenderClass(ui.value.arrows({ class: (_d = props.ui) == null ? void 0 : _d.arrows }))}"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, mergeProps({
                  disabled: !canScrollPrev.value,
                  icon: prevIcon.value,
                  size: "md",
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.prev")
                }, typeof _ctx.prev === "object" ? _ctx.prev : void 0, {
                  class: ui.value.prev({ class: (_e = props.ui) == null ? void 0 : _e.prev }),
                  onClick: scrollPrev
                }), null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$2, mergeProps({
                  disabled: !canScrollNext.value,
                  icon: nextIcon.value,
                  size: "md",
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.next")
                }, typeof _ctx.next === "object" ? _ctx.next : void 0, {
                  class: ui.value.next({ class: (_f = props.ui) == null ? void 0 : _f.next }),
                  onClick: scrollNext
                }), null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.dots) {
                _push2(`<div class="${ssrRenderClass(ui.value.dots({ class: (_g = props.ui) == null ? void 0 : _g.dots }))}"${_scopeId}><!--[-->`);
                ssrRenderList(scrollSnaps.value, (_2, index) => {
                  var _a4;
                  _push2(`<button${ssrRenderAttr("aria-label", unref(t)("carousel.goto", { slide: index + 1 }))} class="${ssrRenderClass(ui.value.dot({ class: (_a4 = props.ui) == null ? void 0 : _a4.dot, active: selectedIndex.value === index }))}"${_scopeId}></button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                ref_key: "emblaRef",
                ref: emblaRef,
                class: ui.value.viewport({ class: (_h = props.ui) == null ? void 0 : _h.viewport })
              }, [
                createVNode("div", {
                  class: ui.value.container({ class: (_i = props.ui) == null ? void 0 : _i.container })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                    var _a4;
                    return openBlock(), createBlock("div", {
                      key: index,
                      role: "group",
                      "aria-roledescription": "slide",
                      class: ui.value.item({ class: (_a4 = props.ui) == null ? void 0 : _a4.item })
                    }, [
                      renderSlot(_ctx.$slots, "default", {
                        item,
                        index
                      })
                    ], 2);
                  }), 128))
                ], 2)
              ], 2),
              _ctx.arrows || _ctx.dots ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.controls({ class: (_j = props.ui) == null ? void 0 : _j.controls })
              }, [
                _ctx.arrows ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: ui.value.arrows({ class: (_k = props.ui) == null ? void 0 : _k.arrows })
                }, [
                  createVNode(_sfc_main$2, mergeProps({
                    disabled: !canScrollPrev.value,
                    icon: prevIcon.value,
                    size: "md",
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.prev")
                  }, typeof _ctx.prev === "object" ? _ctx.prev : void 0, {
                    class: ui.value.prev({ class: (_l = props.ui) == null ? void 0 : _l.prev }),
                    onClick: scrollPrev
                  }), null, 16, ["disabled", "icon", "aria-label", "class"]),
                  createVNode(_sfc_main$2, mergeProps({
                    disabled: !canScrollNext.value,
                    icon: nextIcon.value,
                    size: "md",
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.next")
                  }, typeof _ctx.next === "object" ? _ctx.next : void 0, {
                    class: ui.value.next({ class: (_m = props.ui) == null ? void 0 : _m.next }),
                    onClick: scrollNext
                  }), null, 16, ["disabled", "icon", "aria-label", "class"])
                ], 2)) : createCommentVNode("", true),
                _ctx.dots ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: ui.value.dots({ class: (_n = props.ui) == null ? void 0 : _n.dots })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(scrollSnaps.value, (_2, index) => {
                    var _a4;
                    return openBlock(), createBlock("button", {
                      key: index,
                      "aria-label": unref(t)("carousel.goto", { slide: index + 1 }),
                      class: ui.value.dot({ class: (_a4 = props.ui) == null ? void 0 : _a4.dot, active: selectedIndex.value === index }),
                      onClick: ($event) => scrollTo(index)
                    }, null, 10, ["aria-label", "onClick"]);
                  }), 128))
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { find } = useStrapi();
    const projects = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "projects",
      () => find("projects")
    )), __temp = await __temp, __restore(), __temp);
    if (data.value !== null) {
      projects.value = data.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$1;
      const _component_USkeleton = _sfc_main$7;
      _push(`<!--[--><div class="bg-[url(&#39;/images/skills.jpg&#39;)] flex justify-start items-end w-full h-[280px] bg-cover bg-center"><div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center"><h1 class="text-4xl text-white">Проекты</h1></div></div><div class="px-[100px] py-[50px] w-full flex flex-col gap-4">`);
      if (unref(projects) && unref(projects).length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(projects), (project) => {
          _push(`<div class="w-full h-full border-0 animation"><div class="h-[60px] flex items-center justify-between header"><div class="h-[60px] flex gap-8 items-center"><div class="w-[2px] h-[60px] gradient-bg"></div><h2 class="text-2xl font-bold text-primary-500">${ssrInterpolate(project.name)}</h2></div><p class="mr-8 text-2xl text-primary-500">${ssrInterpolate(project.type)}</p></div><div class="grid grid-cols-1 gap-4 p-4">`);
          if (project.photos.length > 0) {
            _push(ssrRenderComponent(_component_UCarousel, {
              items: project.photos,
              dots: "",
              ui: { item: "basis-1/3" },
              class: "w-full h-[350px] flex mb-[30px]"
            }, {
              default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img${ssrRenderAttr("alt", item.url)}${ssrRenderAttr("src", `http://tatyana-arkhipova.ru:1337${item.url}`)} class="rounded-lg"${_scopeId}>`);
                } else {
                  return [
                    createVNode("img", {
                      alt: item.url,
                      src: `http://tatyana-arkhipova.ru:1337${item.url}`,
                      class: "rounded-lg"
                    }, null, 8, ["alt", "src"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><pre class="p-8">${ssrInterpolate(project.about)}</pre></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="w-full h-full"><template>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-[50px] w-full" }, null, _parent));
        _push(`</template>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-[200px] w-full" }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.vue.mjs.map

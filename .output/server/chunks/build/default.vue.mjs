import { defineComponent, unref, mergeProps, withCtx, renderSlot, computed, createBlock, openBlock, inject, provide, ref, watch, createVNode, resolveDynamicComponent, toDisplayString, toValue, createCommentVNode, useSlots, toRef, createTextVNode, createSlots, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderVNode, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Primitive, useForwardProps, Slot, useForwardPropsEmits, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, NavigationMenuRoot, NavigationMenuList, NavigationMenuIndicator, NavigationMenuViewport } from 'reka-ui';
import { reactivePick, reactiveOmit, createReusableTemplate } from '@vueuse/core';
import { c as useRoute, a as _appConfig, d as useAppConfig } from './server.mjs';
import { t as tv } from './tv.mjs';
import { _ as _sfc_main$7 } from './Icon.vue2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { E as serialize, A as isEqual } from '../nitro/nitro.mjs';
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
import './asyncData.mjs';
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

function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function isArrayOfArray(item) {
  return Array.isArray(item[0]);
}

function pickLinkProps(link) {
  const keys = Object.keys(link);
  const ariaKeys = keys.filter((key) => key.startsWith("aria-"));
  const dataKeys = keys.filter((key) => key.startsWith("data-"));
  const propsToInclude = [
    "active",
    "activeClass",
    "ariaCurrentValue",
    "as",
    "disabled",
    "exact",
    "exactActiveClass",
    "exactHash",
    "exactQuery",
    "external",
    "href",
    "inactiveClass",
    "noPrefetch",
    "noRel",
    "prefetch",
    "prefetchedClass",
    "rel",
    "replace",
    "target",
    "to",
    "type",
    "title",
    "onClick",
    ...ariaKeys,
    ...dataKeys
  ];
  return reactivePick(link, ...propsToInclude);
}

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "LinkBase",
  __ssrInlineRender: true,
  props: {
    as: { default: "button" },
    type: { default: "button" },
    disabled: { type: Boolean },
    onClick: {},
    href: {},
    navigate: {},
    target: {},
    rel: {},
    active: { type: Boolean },
    isExternal: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    function onClickWrapper(e) {
      if (props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
          onClick(e);
        }
      }
      if (props.href && props.navigate && !props.isExternal) {
        props.navigate(e);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps(_ctx.href ? {
        "as": "a",
        "href": _ctx.disabled ? void 0 : _ctx.href,
        "aria-disabled": _ctx.disabled ? "true" : void 0,
        "role": _ctx.disabled ? "link" : void 0,
        "tabindex": _ctx.disabled ? -1 : void 0
      } : _ctx.as === "button" ? {
        as: _ctx.as,
        type: _ctx.type,
        disabled: _ctx.disabled
      } : {
        as: _ctx.as
      }, {
        rel: _ctx.rel,
        target: _ctx.target,
        onClick: onClickWrapper
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

function diff(obj1, obj2) {
  const h1 = _toHashedObject(obj1);
  const h2 = _toHashedObject(obj2);
  return _diff(h1, h2);
}
function _diff(h1, h2) {
  const diffs = [];
  const allProps = /* @__PURE__ */ new Set([
    ...Object.keys(h1.props || {}),
    ...Object.keys(h2.props || {})
  ]);
  if (h1.props && h2.props) {
    for (const prop of allProps) {
      const p1 = h1.props[prop];
      const p2 = h2.props[prop];
      if (p1 && p2) {
        diffs.push(..._diff(h1.props?.[prop], h2.props?.[prop]));
      } else if (p1 || p2) {
        diffs.push(
          new DiffEntry((p2 || p1).key, p1 ? "removed" : "added", p2, p1)
        );
      }
    }
  }
  if (allProps.size === 0 && h1.hash !== h2.hash) {
    diffs.push(new DiffEntry((h2 || h1).key, "changed", h2, h1));
  }
  return diffs;
}
function _toHashedObject(obj, key = "") {
  if (obj && typeof obj !== "object") {
    return new DiffHashedObject(key, obj, serialize(obj));
  }
  const props = {};
  const hashes = [];
  for (const _key in obj) {
    props[_key] = _toHashedObject(obj[_key], key ? `${key}.${_key}` : _key);
    hashes.push(props[_key].hash);
  }
  return new DiffHashedObject(key, obj, `{${hashes.join(":")}}`, props);
}
class DiffEntry {
  constructor(key, type, newValue, oldValue) {
    this.key = key;
    this.type = type;
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case "added": {
        return `Added   \`${this.key}\``;
      }
      case "removed": {
        return `Removed \`${this.key}\``;
      }
      case "changed": {
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || "-"}\` to \`${this.newValue.toString()}\``;
      }
    }
  }
}
class DiffHashedObject {
  constructor(key, value, hash, props) {
    this.key = key;
    this.value = value;
    this.hash = hash;
    this.props = props;
  }
  toString() {
    if (this.props) {
      return `{${Object.keys(this.props).join(",")}}`;
    } else {
      return JSON.stringify(this.value);
    }
  }
  toJSON() {
    const k = this.key || ".";
    if (this.props) {
      return `${k}({${Object.keys(this.props).join(",")}})`;
    }
    return `${k}(${this.value})`;
  }
}

const theme$4 = {
  "base": "focus-visible:outline-(--ui-primary)",
  "variants": {
    "active": {
      "true": "text-(--ui-primary)",
      "false": [
        "text-(--ui-text-muted) hover:text-(--ui-text)",
        "transition-colors"
      ]
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  }
};

var _a$4;
const appConfigLink = _appConfig;
const link = tv({ extend: tv(theme$4), ...((_a$4 = appConfigLink.ui) == null ? void 0 : _a$4.link) || {} });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "Link",
  __ssrInlineRender: true,
  props: {
    as: { default: "button" },
    type: { default: "button" },
    disabled: { type: Boolean },
    active: { type: Boolean, default: void 0 },
    exact: { type: Boolean },
    exactQuery: { type: [Boolean, String] },
    exactHash: { type: Boolean },
    inactiveClass: { default: "" },
    custom: { type: Boolean },
    raw: { type: Boolean },
    class: {},
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
    ariaCurrentValue: { default: "page" },
    viewTransition: { type: Boolean },
    replace: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const nuxtLinkProps = useForwardProps(reactiveOmit(props, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "raw", "class"));
    const ui = computed(() => tv({
      extend: link,
      variants: {
        active: {
          true: props.activeClass,
          false: props.inactiveClass
        }
      }
    }));
    function isPartiallyEqual(item1, item2) {
      const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
        if (q.type === "added") {
          filtered.add(q.key);
        }
        return filtered;
      }, /* @__PURE__ */ new Set());
      const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)));
      const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)));
      return isEqual(item1Filtered, item2Filtered);
    }
    function isLinkActive({ route: linkRoute, isActive, isExactActive }) {
      if (props.active !== void 0) {
        return props.active;
      }
      if (props.exactQuery === "partial") {
        if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
      } else if (props.exactQuery === true) {
        if (!isEqual(linkRoute.query, route.query)) return false;
      }
      if (props.exactHash && linkRoute.hash !== route.hash) {
        return false;
      }
      if (props.exact && isExactActive) {
        return true;
      }
      if (!props.exact && isActive) {
        return true;
      }
      return false;
    }
    function resolveLinkClass({ route: route2, isActive, isExactActive }) {
      const active = isLinkActive({ route: route2, isActive, isExactActive });
      if (props.raw) {
        return [props.class, active ? props.activeClass : props.inactiveClass];
      }
      return ui.value({ class: props.class, active, disabled: props.disabled });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps(unref(nuxtLinkProps), { custom: "" }, _attrs), {
        default: withCtx(({ href, navigate, route: linkRoute, rel, target, isExternal, isActive, isExactActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.custom) {
              ssrRenderSlot(_ctx.$slots, "default", {
                ..._ctx.$attrs,
                ..._ctx.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              }, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_sfc_main$6, mergeProps({
                ..._ctx.$attrs,
                ..._ctx.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {
                      active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                    }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {
                        active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              _ctx.custom ? renderSlot(_ctx.$slots, "default", mergeProps({ key: 0 }, {
                ..._ctx.$attrs,
                ..._ctx.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              })) : (openBlock(), createBlock(_sfc_main$6, mergeProps({ key: 1 }, {
                ..._ctx.$attrs,
                ..._ctx.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {
                    active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                  })
                ]),
                _: 2
              }, 1040, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const ImageComponent = "img";

const avatarGroupInjectionKey = Symbol("nuxt-ui.avatar-group");
function useAvatarGroup(props) {
  const avatarGroup = inject(avatarGroupInjectionKey, void 0);
  const size = computed(() => props.size ?? (avatarGroup == null ? void 0 : avatarGroup.value.size));
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })));
  return {
    size
  };
}

const theme$3 = {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated)",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium leading-none text-(--ui-text-muted) truncate",
    "icon": "text-(--ui-text-muted) shrink-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

var _a$3;
const appConfigAvatar = _appConfig;
const avatar = tv({ extend: tv(theme$3), ...((_a$3 = appConfigAvatar.ui) == null ? void 0 : _a$3.avatar) || {} });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "Avatar",
  __ssrInlineRender: true,
  props: {
    as: { default: "span" },
    src: {},
    alt: {},
    icon: {},
    text: {},
    size: {},
    class: {},
    style: {},
    ui: {}
  },
  setup(__props) {
    const props = __props;
    const fallback = computed(() => props.text || (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2));
    const { size } = useAvatarGroup(props);
    const ui = computed(() => avatar({
      size: size.value
    }));
    const sizePx = computed(() => ({
      "3xs": 16,
      "2xs": 20,
      "xs": 24,
      "sm": 28,
      "md": 32,
      "lg": 36,
      "xl": 40,
      "2xl": 44,
      "3xl": 48
    })[props.size || "md"]);
    const error = ref(false);
    watch(() => props.src, () => {
      if (error.value) {
        error.value = false;
      }
    });
    function onError() {
      error.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        class: ui.value.root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] }),
        style: props.style
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b;
          if (_push2) {
            if (_ctx.src && !error.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(ImageComponent)), mergeProps({
                role: "img",
                src: _ctx.src,
                alt: _ctx.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                class: ui.value.image({ class: (_a3 = props.ui) == null ? void 0 : _a3.image }),
                onError
              }), null), _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(unref(Slot), _ctx.$attrs, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                      var _a4, _b2;
                      if (_ctx.icon) {
                        _push3(ssrRenderComponent(_sfc_main$7, {
                          name: _ctx.icon,
                          class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<span class="${ssrRenderClass(ui.value.fallback({ class: (_b2 = props.ui) == null ? void 0 : _b2.fallback }))}"${_scopeId2}>${ssrInterpolate(fallback.value || " ")}</span>`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {}, () => {
                        var _a4, _b2;
                        return [
                          _ctx.icon ? (openBlock(), createBlock(_sfc_main$7, {
                            key: 0,
                            name: _ctx.icon,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.fallback({ class: (_b2 = props.ui) == null ? void 0 : _b2.fallback })
                          }, toDisplayString(fallback.value || " "), 3))
                        ];
                      })
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            }
          } else {
            return [
              _ctx.src && !error.value ? (openBlock(), createBlock(resolveDynamicComponent(unref(ImageComponent)), mergeProps({
                key: 0,
                role: "img",
                src: _ctx.src,
                alt: _ctx.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                class: ui.value.image({ class: (_b = props.ui) == null ? void 0 : _b.image }),
                onError
              }), null, 16, ["src", "alt", "width", "height", "class"])) : (openBlock(), createBlock(unref(Slot), mergeProps({ key: 1 }, _ctx.$attrs), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, () => {
                    var _a4, _b2;
                    return [
                      _ctx.icon ? (openBlock(), createBlock(_sfc_main$7, {
                        key: 0,
                        name: _ctx.icon,
                        class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                      }, null, 8, ["name", "class"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: ui.value.fallback({ class: (_b2 = props.ui) == null ? void 0 : _b2.fallback })
                      }, toDisplayString(fallback.value || " "), 3))
                    ];
                  })
                ]),
                _: 3
              }, 16))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const buttonGroupInjectionKey = Symbol("nuxt-ui.button-group");
function useButtonGroup(props) {
  const buttonGroup = inject(buttonGroupInjectionKey, void 0);
  return {
    orientation: computed(() => buttonGroup == null ? void 0 : buttonGroup.value.orientation),
    size: computed(() => (props == null ? void 0 : props.size) ?? (buttonGroup == null ? void 0 : buttonGroup.value.size))
  };
}

function useComponentIcons(componentProps) {
  const appConfig = useAppConfig();
  const props = computed(() => toValue(componentProps));
  const isLeading = computed(() => props.value.icon && props.value.leading || props.value.icon && !props.value.trailing || props.value.loading && !props.value.trailing || !!props.value.leadingIcon);
  const isTrailing = computed(() => props.value.icon && props.value.trailing || props.value.loading && props.value.trailing || !!props.value.trailingIcon);
  const leadingIconName = computed(() => {
    if (props.value.loading) {
      return props.value.loadingIcon || appConfig.ui.icons.loading;
    }
    return props.value.leadingIcon || props.value.icon;
  });
  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value) {
      return props.value.loadingIcon || appConfig.ui.icons.loading;
    }
    return props.value.trailingIcon || props.value.icon;
  });
  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName
  };
}

const theme$2 = {
  "slots": {
    "base": "font-medium inline-flex items-center",
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
      "subtle": ""
    },
    "size": {
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-[calc(var(--ui-radius))]",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-[calc(var(--ui-radius))]",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-[calc(var(--ui-radius)*1.5)]",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-[calc(var(--ui-radius)*1.5)]",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-[calc(var(--ui-radius)*1.5)]",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-(--ui-primary) text-(--ui-bg)"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-(--ui-secondary) text-(--ui-bg)"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "bg-(--ui-success) text-(--ui-bg)"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "bg-(--ui-info) text-(--ui-bg)"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "bg-(--ui-warning) text-(--ui-bg)"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "bg-(--ui-error) text-(--ui-bg)"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-(--ui-primary) ring ring-inset ring-(--ui-primary)/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/50"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "text-(--ui-success) ring ring-inset ring-(--ui-success)/50"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "text-(--ui-info) ring ring-inset ring-(--ui-info)/50"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "text-(--ui-warning) ring ring-inset ring-(--ui-warning)/50"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "text-(--ui-error) ring ring-inset ring-(--ui-error)/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-(--ui-primary)/10 text-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-(--ui-secondary)/10 text-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "bg-(--ui-success)/10 text-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "bg-(--ui-info)/10 text-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "bg-(--ui-warning)/10 text-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "bg-(--ui-error)/10 text-(--ui-error)"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-(--ui-primary)/10 text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-(--ui-secondary)/10 text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "bg-(--ui-success)/10 text-(--ui-success) ring ring-inset ring-(--ui-success)/25"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "bg-(--ui-info)/10 text-(--ui-info) ring ring-inset ring-(--ui-info)/25"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "bg-(--ui-warning)/10 text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "bg-(--ui-error)/10 text-(--ui-error) ring ring-inset ring-(--ui-error)/25"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-bg-inverted)"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg)"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-(--ui-text) bg-(--ui-bg-elevated)"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg-elevated)"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};

var _a$2;
const appConfigBadge = _appConfig;
const badge = tv({ extend: tv(theme$2), ...((_a$2 = appConfigBadge.ui) == null ? void 0 : _a$2.badge) || {} });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    as: { default: "span" },
    label: {},
    color: {},
    variant: {},
    size: {},
    class: {},
    ui: {},
    icon: {},
    avatar: {},
    leading: { type: Boolean },
    leadingIcon: {},
    trailing: { type: Boolean },
    trailingIcon: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => badge({
      color: props.color,
      variant: props.variant,
      size: buttonGroupSize.value || props.size,
      buttonGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        class: ui.value.base({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.base] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
              var _a3, _b, _c;
              if (unref(isLeading) && unref(leadingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$7, {
                  name: unref(leadingIconName),
                  class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                }, null, _parent2, _scopeId));
              } else if (!!_ctx.avatar) {
                _push2(ssrRenderComponent(_sfc_main$4, mergeProps({
                  size: ((_b = props.ui) == null ? void 0 : _b.leadingAvatarSize) || ui.value.leadingAvatarSize()
                }, _ctx.avatar, {
                  class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              var _a3;
              if (_ctx.label) {
                _push2(`<span class="${ssrRenderClass(ui.value.label({ class: (_a3 = props.ui) == null ? void 0 : _a3.label }))}"${_scopeId}>${ssrInterpolate(_ctx.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
              var _a3;
              if (unref(isTrailing) && unref(trailingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$7, {
                  name: unref(trailingIconName),
                  class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", {}, () => {
                var _a3, _b, _c;
                return [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$7, {
                    key: 0,
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!_ctx.avatar ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
                    key: 1,
                    size: ((_b = props.ui) == null ? void 0 : _b.leadingAvatarSize) || ui.value.leadingAvatarSize()
                  }, _ctx.avatar, {
                    class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ];
              }),
              renderSlot(_ctx.$slots, "default", {}, () => {
                var _a3;
                return [
                  _ctx.label ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: ui.value.label({ class: (_a3 = props.ui) == null ? void 0 : _a3.label })
                  }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true)
                ];
              }),
              renderSlot(_ctx.$slots, "trailing", {}, () => {
                var _a3;
                return [
                  unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$7, {
                    key: 0,
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ];
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const theme$1 = {
  "slots": {
    "root": "",
    "content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
  }
};

var _a$1;
const appConfigCollapsible = _appConfig;
const collapsible = tv({ extend: tv(theme$1), ...((_a$1 = appConfigCollapsible.ui) == null ? void 0 : _a$1.collapsible) || {} });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Collapsible",
  __ssrInlineRender: true,
  props: {
    as: {},
    class: {},
    ui: {},
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    disabled: { type: Boolean },
    unmountOnHide: { type: Boolean, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultOpen", "open", "disabled", "unmountOnHide"), emits);
    const ui = collapsible();
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(CollapsibleRoot), mergeProps(unref(rootProps), {
        class: unref(ui).root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] })
      }, _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          var _a3, _b;
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(CollapsibleTrigger), { "as-child": "" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(CollapsibleContent), {
              class: unref(ui).content({ class: (_a3 = props.ui) == null ? void 0 : _a3.content })
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "content", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "content")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(CollapsibleTrigger), {
                key: 0,
                "as-child": ""
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true),
              createVNode(unref(CollapsibleContent), {
                class: unref(ui).content({ class: (_b = props.ui) == null ? void 0 : _b.content })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "content")
                ]),
                _: 3
              }, 8, ["class"])
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
    "root": "relative flex gap-1.5 [&>div]:min-w-0",
    "list": "isolate min-w-0",
    "label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-(--ui-text-highlighted) px-2.5 py-1.5",
    "item": "min-w-0",
    "link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingBadge": "shrink-0",
    "linkTrailingBadgeSize": "sm",
    "linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "inline-block size-3 align-top text-(--ui-text-dimmed)",
    "childList": "",
    "childItem": "",
    "childLink": "group size-full px-3 py-2 rounded-[calc(var(--ui-radius)*1.5)] flex items-start gap-2 text-start",
    "childLinkWrapper": "flex flex-col items-start",
    "childLinkIcon": "size-5 shrink-0",
    "childLinkLabel": "font-semibold text-sm relative inline-flex",
    "childLinkLabelExternalIcon": "inline-block size-3 align-top text-(--ui-text-dimmed)",
    "childLinkDescription": "text-sm text-(--ui-text-muted)",
    "separator": "px-2 h-px bg-(--ui-border)",
    "viewportWrapper": "absolute top-full left-0 flex w-full",
    "viewport": "relative overflow-hidden bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-(--ui-border) h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]",
    "content": "absolute top-0 left-0 w-full",
    "indicator": "absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200",
    "arrow": "relative top-[50%] size-2.5 rotate-45 border border-(--ui-border) bg-(--ui-bg) z-[1] rounded-[calc(var(--ui-radius)/2)]"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "focus-visible:before:ring-(--ui-primary)",
        "childLink": "focus-visible:outline-(--ui-primary)"
      },
      "secondary": {
        "link": "focus-visible:before:ring-(--ui-secondary)",
        "childLink": "focus-visible:outline-(--ui-secondary)"
      },
      "success": {
        "link": "focus-visible:before:ring-(--ui-success)",
        "childLink": "focus-visible:outline-(--ui-success)"
      },
      "info": {
        "link": "focus-visible:before:ring-(--ui-info)",
        "childLink": "focus-visible:outline-(--ui-info)"
      },
      "warning": {
        "link": "focus-visible:before:ring-(--ui-warning)",
        "childLink": "focus-visible:outline-(--ui-warning)"
      },
      "error": {
        "link": "focus-visible:before:ring-(--ui-error)",
        "childLink": "focus-visible:outline-(--ui-error)"
      },
      "neutral": {
        "link": "focus-visible:before:ring-(--ui-border-inverted)",
        "childLink": "focus-visible:outline-(--ui-border-inverted)"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": "",
      "link": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center justify-between",
        "list": "flex items-center",
        "item": "py-2",
        "link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
        "childList": "grid p-2"
      },
      "vertical": {
        "root": "flex-col",
        "link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0"
      }
    },
    "contentOrientation": {
      "horizontal": {
        "viewport": "",
        "viewportWrapper": "justify-center",
        "content": "data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]"
      },
      "vertical": {
        "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)",
        "content": ""
      }
    },
    "active": {
      "true": {
        "childLink": "bg-(--ui-bg-elevated) text-(--ui-text-highlighted)",
        "childLinkIcon": "text-(--ui-text)"
      },
      "false": {
        "link": "text-(--ui-text-muted)",
        "linkLeadingIcon": "text-(--ui-text-dimmed)",
        "childLink": [
          "hover:bg-(--ui-bg-elevated)/50 text-(--ui-text) hover:text-(--ui-text-highlighted)",
          "transition-colors"
        ],
        "childLinkIcon": [
          "text-(--ui-text-dimmed) group-hover:text-(--ui-text)",
          "transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "highlight": {
      "true": ""
    },
    "level": {
      "true": ""
    },
    "collapsed": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "contentOrientation": "horizontal",
      "class": {
        "childList": "grid-cols-2 gap-2"
      }
    },
    {
      "orientation": "horizontal",
      "contentOrientation": "vertical",
      "class": {
        "childList": "gap-1",
        "content": "w-60"
      }
    },
    {
      "orientation": "horizontal",
      "highlight": true,
      "class": {
        "link": [
          "after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "orientation": "vertical",
      "highlight": true,
      "level": true,
      "class": {
        "link": [
          "after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "class": {
        "link": [
          "hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50",
          "transition-colors before:transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-(--ui-text)",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-(--ui-text-highlighted)",
        "linkLeadingIcon": "group-data-[state=open]:text-(--ui-text)"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": true,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-(--ui-bg-elevated)/50"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": false,
      "active": false,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-(--ui-bg-elevated)/50"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-(--ui-primary)",
        "linkLeadingIcon": "text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-(--ui-secondary)",
        "linkLeadingIcon": "text-(--ui-secondary) group-data-[state=open]:text-(--ui-secondary)"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-(--ui-success)",
        "linkLeadingIcon": "text-(--ui-success) group-data-[state=open]:text-(--ui-success)"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-(--ui-info)",
        "linkLeadingIcon": "text-(--ui-info) group-data-[state=open]:text-(--ui-info)"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-(--ui-warning)",
        "linkLeadingIcon": "text-(--ui-warning) group-data-[state=open]:text-(--ui-warning)"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-(--ui-error)",
        "linkLeadingIcon": "text-(--ui-error) group-data-[state=open]:text-(--ui-error)"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-(--ui-text-highlighted)",
        "linkLeadingIcon": "text-(--ui-text-highlighted) group-data-[state=open]:text-(--ui-text-highlighted)"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": false,
      "class": {
        "link": "before:bg-(--ui-bg-elevated)"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": true,
      "class": {
        "link": [
          "hover:before:bg-(--ui-bg-elevated)/50",
          "before:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "class": {
        "link": [
          "hover:text-(--ui-text-highlighted)",
          "transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-(--ui-text)",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-(--ui-text-highlighted)",
        "linkLeadingIcon": "group-data-[state=open]:text-(--ui-text)"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-(--ui-primary)",
        "linkLeadingIcon": "text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-(--ui-secondary)",
        "linkLeadingIcon": "text-(--ui-secondary) group-data-[state=open]:text-(--ui-secondary)"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-(--ui-success)",
        "linkLeadingIcon": "text-(--ui-success) group-data-[state=open]:text-(--ui-success)"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-(--ui-info)",
        "linkLeadingIcon": "text-(--ui-info) group-data-[state=open]:text-(--ui-info)"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-(--ui-warning)",
        "linkLeadingIcon": "text-(--ui-warning) group-data-[state=open]:text-(--ui-warning)"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-(--ui-error)",
        "linkLeadingIcon": "text-(--ui-error) group-data-[state=open]:text-(--ui-error)"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-(--ui-text-highlighted)",
        "linkLeadingIcon": "text-(--ui-text-highlighted) group-data-[state=open]:text-(--ui-text-highlighted)"
      }
    },
    {
      "highlightColor": "primary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-primary)"
      }
    },
    {
      "highlightColor": "secondary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-secondary)"
      }
    },
    {
      "highlightColor": "success",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-success)"
      }
    },
    {
      "highlightColor": "info",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-info)"
      }
    },
    {
      "highlightColor": "warning",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-warning)"
      }
    },
    {
      "highlightColor": "error",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-error)"
      }
    },
    {
      "highlightColor": "neutral",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-bg-inverted)"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": false,
      "class": {
        "childList": "ms-5 border-s border-(--ui-border)",
        "childItem": "ps-1.5 -ms-px"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": true,
      "class": {
        "link": "px-1.5"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "highlightColor": "primary",
    "variant": "pill"
  }
};

var _a;
const appConfigNavigationMenu = _appConfig;
const navigationMenu = tv({ extend: tv(theme), ...((_a = appConfigNavigationMenu.ui) == null ? void 0 : _a.navigationMenu) || {} });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NavigationMenu",
  __ssrInlineRender: true,
  props: {
    as: {},
    trailingIcon: {},
    externalIcon: { type: [Boolean, String], default: true },
    items: {},
    color: {},
    variant: {},
    orientation: { default: "horizontal" },
    collapsed: { type: Boolean },
    highlight: { type: Boolean },
    highlightColor: {},
    content: {},
    contentOrientation: { default: "horizontal" },
    arrow: { type: Boolean },
    labelKey: { default: "label" },
    class: {},
    ui: {},
    modelValue: {},
    defaultValue: {},
    delayDuration: { default: 0 },
    disableClickTrigger: { type: Boolean },
    disableHoverTrigger: { type: Boolean },
    skipDelayDuration: {},
    disablePointerLeaveClose: { type: Boolean },
    unmountOnHide: { type: Boolean, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const rootProps = useForwardPropsEmits(computed(() => ({
      as: props.as,
      modelValue: props.modelValue,
      defaultValue: props.defaultValue,
      delayDuration: props.delayDuration,
      skipDelayDuration: props.skipDelayDuration,
      orientation: props.orientation,
      disableClickTrigger: props.disableClickTrigger,
      disableHoverTrigger: props.disableHoverTrigger,
      disablePointerLeaveClose: props.disablePointerLeaveClose,
      unmountOnHide: props.unmountOnHide
    })), emits);
    const contentProps = toRef(() => props.content);
    const appConfig = useAppConfig();
    const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: Object,
        index: Number,
        level: Number
      }
    });
    const ui = computed(() => navigationMenu({
      orientation: props.orientation,
      contentOrientation: props.contentOrientation,
      collapsed: props.collapsed,
      color: props.color,
      variant: props.variant,
      highlight: props.highlight,
      highlightColor: props.highlightColor || props.color
    }));
    const lists = computed(
      () => {
        var _a2;
        return ((_a2 = props.items) == null ? void 0 : _a2.length) ? isArrayOfArray(props.items) ? props.items : [props.items] : [];
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineLinkTemplate), null, {
        default: withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index
            }, () => {
              var _a3, _b, _c, _d, _e;
              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index
              }, () => {
                var _a4, _b2, _c2;
                if (item.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$4, mergeProps({
                    size: ((_a4 = props.ui) == null ? void 0 : _a4.linkLeadingAvatarSize) || ui.value.linkLeadingAvatarSize()
                  }, item.avatar, {
                    class: ui.value.linkLeadingAvatar({ class: (_b2 = props.ui) == null ? void 0 : _b2.linkLeadingAvatar, active, disabled: !!item.disabled })
                  }), null, _parent2, _scopeId));
                } else if (item.icon) {
                  _push2(ssrRenderComponent(_sfc_main$7, {
                    name: item.icon,
                    class: ui.value.linkLeadingIcon({ class: (_c2 = props.ui) == null ? void 0 : _c2.linkLeadingIcon, active, disabled: !!item.disabled })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              if ((!_ctx.collapsed || _ctx.orientation !== "vertical") && (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"])) {
                _push2(`<span class="${ssrRenderClass(ui.value.linkLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.linkLabel }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => {
                  _push2(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                }, _push2, _parent2, _scopeId);
                if (item.target === "_blank" && _ctx.externalIcon !== false) {
                  _push2(ssrRenderComponent(_sfc_main$7, {
                    name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                    class: ui.value.linkLabelExternalIcon({ class: (_b = props.ui) == null ? void 0 : _b.linkLabelExternalIcon, active })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if ((!_ctx.collapsed || _ctx.orientation !== "vertical") && (item.badge || _ctx.orientation === "horizontal" && (((_c = item.children) == null ? void 0 : _c.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || _ctx.orientation === "vertical" && ((_d = item.children) == null ? void 0 : _d.length) || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"])) {
                _push2(`<span class="${ssrRenderClass(ui.value.linkTrailing({ class: (_e = props.ui) == null ? void 0 : _e.linkTrailing }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                  item,
                  active,
                  index
                }, () => {
                  var _a4, _b2, _c2, _d2, _e2, _f;
                  if (item.badge) {
                    _push2(ssrRenderComponent(_sfc_main$3, mergeProps({
                      color: "neutral",
                      variant: "outline",
                      size: ((_a4 = props.ui) == null ? void 0 : _a4.linkTrailingBadgeSize) || ui.value.linkTrailingBadgeSize()
                    }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                      class: ui.value.linkTrailingBadge({ class: (_b2 = props.ui) == null ? void 0 : _b2.linkTrailingBadge })
                    }), null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  if (_ctx.orientation === "horizontal" && (((_c2 = item.children) == null ? void 0 : _c2.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || _ctx.orientation === "vertical" && ((_d2 = item.children) == null ? void 0 : _d2.length)) {
                    _push2(ssrRenderComponent(_sfc_main$7, {
                      name: item.trailingIcon || _ctx.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                      class: ui.value.linkTrailingIcon({ class: (_e2 = props.ui) == null ? void 0 : _e2.linkTrailingIcon, active })
                    }, null, _parent2, _scopeId));
                  } else if (item.trailingIcon) {
                    _push2(ssrRenderComponent(_sfc_main$7, {
                      name: item.trailingIcon,
                      class: ui.value.linkTrailingIcon({ class: (_f = props.ui) == null ? void 0 : _f.linkTrailingIcon, active })
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                }, _push2, _parent2, _scopeId);
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index
              }, () => {
                var _a3, _b, _c, _d, _e;
                return [
                  renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                    item,
                    active,
                    index
                  }, () => {
                    var _a4, _b2, _c2;
                    return [
                      item.avatar ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
                        key: 0,
                        size: ((_a4 = props.ui) == null ? void 0 : _a4.linkLeadingAvatarSize) || ui.value.linkLeadingAvatarSize()
                      }, item.avatar, {
                        class: ui.value.linkLeadingAvatar({ class: (_b2 = props.ui) == null ? void 0 : _b2.linkLeadingAvatar, active, disabled: !!item.disabled })
                      }), null, 16, ["size", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$7, {
                        key: 1,
                        name: item.icon,
                        class: ui.value.linkLeadingIcon({ class: (_c2 = props.ui) == null ? void 0 : _c2.linkLeadingIcon, active, disabled: !!item.disabled })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ];
                  }),
                  (!_ctx.collapsed || _ctx.orientation !== "vertical") && (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"]) ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: ui.value.linkLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.linkLabel })
                  }, [
                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                      item,
                      active,
                      index
                    }, () => [
                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                    ]),
                    item.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                      key: 0,
                      name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                      class: ui.value.linkLabelExternalIcon({ class: (_b = props.ui) == null ? void 0 : _b.linkLabelExternalIcon, active })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ], 2)) : createCommentVNode("", true),
                  (!_ctx.collapsed || _ctx.orientation !== "vertical") && (item.badge || _ctx.orientation === "horizontal" && (((_c = item.children) == null ? void 0 : _c.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || _ctx.orientation === "vertical" && ((_d = item.children) == null ? void 0 : _d.length) || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"]) ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: ui.value.linkTrailing({ class: (_e = props.ui) == null ? void 0 : _e.linkTrailing })
                  }, [
                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                      item,
                      active,
                      index
                    }, () => {
                      var _a4, _b2, _c2, _d2, _e2, _f;
                      return [
                        item.badge ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
                          key: 0,
                          color: "neutral",
                          variant: "outline",
                          size: ((_a4 = props.ui) == null ? void 0 : _a4.linkTrailingBadgeSize) || ui.value.linkTrailingBadgeSize()
                        }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                          class: ui.value.linkTrailingBadge({ class: (_b2 = props.ui) == null ? void 0 : _b2.linkTrailingBadge })
                        }), null, 16, ["size", "class"])) : createCommentVNode("", true),
                        _ctx.orientation === "horizontal" && (((_c2 = item.children) == null ? void 0 : _c2.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || _ctx.orientation === "vertical" && ((_d2 = item.children) == null ? void 0 : _d2.length) ? (openBlock(), createBlock(_sfc_main$7, {
                          key: 1,
                          name: item.trailingIcon || _ctx.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                          class: ui.value.linkTrailingIcon({ class: (_e2 = props.ui) == null ? void 0 : _e2.linkTrailingIcon, active })
                        }, null, 8, ["name", "class"])) : item.trailingIcon ? (openBlock(), createBlock(_sfc_main$7, {
                          key: 2,
                          name: item.trailingIcon,
                          class: ui.value.linkTrailingIcon({ class: (_f = props.ui) == null ? void 0 : _f.linkTrailingIcon, active })
                        }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                      ];
                    })
                  ], 2)) : createCommentVNode("", true)
                ];
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(DefineItemTemplate), null, {
        default: withCtx(({ item, index, level = 0 }, _push2, _parent2, _scopeId) => {
          var _a3, _b, _c, _d, _e, _f;
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(_ctx.orientation === "vertical" && ((_a3 = item.children) == null ? void 0 : _a3.length) && !_ctx.collapsed ? _sfc_main$2 : unref(NavigationMenuItem)), {
              as: "li",
              value: item.value || String(index),
              "default-open": item.defaultOpen,
              "unmount-on-hide": _ctx.orientation === "vertical" && ((_b = item.children) == null ? void 0 : _b.length) && !_ctx.collapsed ? _ctx.unmountOnHide : void 0,
              open: item.open
            }, createSlots({
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a4, _b2, _c2, _d2;
                if (_push3) {
                  if (_ctx.orientation === "vertical" && item.type === "label") {
                    _push3(`<div class="${ssrRenderClass(ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ReuseLinkTemplate), {
                      item,
                      index
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (item.type !== "label") {
                    _push3(ssrRenderComponent(_sfc_main$5, mergeProps(_ctx.orientation === "vertical" && ((_b2 = item.children) == null ? void 0 : _b2.length) && !_ctx.collapsed ? {} : unref(pickLinkProps)(item), { custom: "" }), {
                      default: withCtx(({ active, ...slotProps }, _push4, _parent4, _scopeId3) => {
                        var _a5, _b3, _c3, _d3, _e2, _f2;
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(_ctx.orientation === "horizontal" && (((_a5 = item.children) == null ? void 0 : _a5.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : unref(NavigationMenuLink)), {
                            "as-child": "",
                            active: active || item.active,
                            disabled: item.disabled,
                            onSelect: item.onSelect
                          }, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              var _a6, _b4;
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$6, mergeProps(slotProps, {
                                  class: ui.value.link({ class: [(_a6 = props.ui) == null ? void 0 : _a6.link, item.class], active: active || item.active, disabled: !!item.disabled, level: _ctx.orientation === "horizontal" || level > 0 })
                                }), {
                                  default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(ReuseLinkTemplate), {
                                        item,
                                        active: active || item.active,
                                        index
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_sfc_main$6, mergeProps(slotProps, {
                                    class: ui.value.link({ class: [(_b4 = props.ui) == null ? void 0 : _b4.link, item.class], active: active || item.active, disabled: !!item.disabled, level: _ctx.orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseLinkTemplate), {
                                        item,
                                        active: active || item.active,
                                        index
                                      }, null, 8, ["item", "active", "index"])
                                    ]),
                                    _: 2
                                  }, 1040, ["class"])
                                ];
                              }
                            }),
                            _: 2
                          }), _parent4, _scopeId3);
                          if (_ctx.orientation === "horizontal" && (((_b3 = item.children) == null ? void 0 : _b3.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"])) {
                            _push4(ssrRenderComponent(unref(NavigationMenuContent), mergeProps(contentProps.value, {
                              class: ui.value.content({ class: (_c3 = props.ui) == null ? void 0 : _c3.content })
                            }), {
                              default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                    item,
                                    active,
                                    index
                                  }, () => {
                                    var _a6;
                                    _push5(`<ul class="${ssrRenderClass(ui.value.childList({ class: (_a6 = props.ui) == null ? void 0 : _a6.childList }))}"${_scopeId4}><!--[-->`);
                                    ssrRenderList(item.children, (childItem, childIndex) => {
                                      var _a7;
                                      _push5(`<li class="${ssrRenderClass(ui.value.childItem({ class: (_a7 = props.ui) == null ? void 0 : _a7.childItem }))}"${_scopeId4}>`);
                                      _push5(ssrRenderComponent(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                        default: withCtx(({ active: childActive, ...childSlotProps }, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(NavigationMenuLink), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: withCtx((_3, _push7, _parent7, _scopeId6) => {
                                                var _a8, _b4;
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(_sfc_main$6, mergeProps({ ref_for: true }, childSlotProps, {
                                                    class: ui.value.childLink({ class: [(_a8 = props.ui) == null ? void 0 : _a8.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                      var _a9, _b5, _c4, _d4, _e3, _f3, _g, _h, _i, _j;
                                                      if (_push8) {
                                                        if (childItem.icon) {
                                                          _push8(ssrRenderComponent(_sfc_main$7, {
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: (_a9 = props.ui) == null ? void 0 : _a9.childLinkIcon, active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`<div class="${ssrRenderClass(ui.value.childLinkWrapper({ class: (_b5 = props.ui) == null ? void 0 : _b5.childLinkWrapper }))}"${_scopeId7}><p class="${ssrRenderClass(ui.value.childLinkLabel({ class: (_c4 = props.ui) == null ? void 0 : _c4.childLinkLabel, active: childActive }))}"${_scopeId7}>${ssrInterpolate(unref(get)(childItem, props.labelKey))} `);
                                                        if (childItem.target === "_blank" && _ctx.externalIcon !== false) {
                                                          _push8(ssrRenderComponent(_sfc_main$7, {
                                                            name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                            class: ui.value.childLinkLabelExternalIcon({ class: (_d4 = props.ui) == null ? void 0 : _d4.childLinkLabelExternalIcon, active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</p>`);
                                                        if (childItem.description) {
                                                          _push8(`<p class="${ssrRenderClass(ui.value.childLinkDescription({ class: (_e3 = props.ui) == null ? void 0 : _e3.childLinkDescription, active: childActive }))}"${_scopeId7}>${ssrInterpolate(childItem.description)}</p>`);
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</div>`);
                                                      } else {
                                                        return [
                                                          childItem.icon ? (openBlock(), createBlock(_sfc_main$7, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: (_f3 = props.ui) == null ? void 0 : _f3.childLinkIcon, active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                          createVNode("div", {
                                                            class: ui.value.childLinkWrapper({ class: (_g = props.ui) == null ? void 0 : _g.childLinkWrapper })
                                                          }, [
                                                            createVNode("p", {
                                                              class: ui.value.childLinkLabel({ class: (_h = props.ui) == null ? void 0 : _h.childLinkLabel, active: childActive })
                                                            }, [
                                                              createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                                                                key: 0,
                                                                name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                                class: ui.value.childLinkLabelExternalIcon({ class: (_i = props.ui) == null ? void 0 : _i.childLinkLabelExternalIcon, active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                            ], 2),
                                                            childItem.description ? (openBlock(), createBlock("p", {
                                                              key: 0,
                                                              class: ui.value.childLinkDescription({ class: (_j = props.ui) == null ? void 0 : _j.childLinkDescription, active: childActive })
                                                            }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                          ], 2)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(_sfc_main$6, mergeProps({ ref_for: true }, childSlotProps, {
                                                      class: ui.value.childLink({ class: [(_b4 = props.ui) == null ? void 0 : _b4.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: withCtx(() => {
                                                        var _a9, _b5, _c4, _d4, _e3;
                                                        return [
                                                          childItem.icon ? (openBlock(), createBlock(_sfc_main$7, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: (_a9 = props.ui) == null ? void 0 : _a9.childLinkIcon, active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                          createVNode("div", {
                                                            class: ui.value.childLinkWrapper({ class: (_b5 = props.ui) == null ? void 0 : _b5.childLinkWrapper })
                                                          }, [
                                                            createVNode("p", {
                                                              class: ui.value.childLinkLabel({ class: (_c4 = props.ui) == null ? void 0 : _c4.childLinkLabel, active: childActive })
                                                            }, [
                                                              createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                                                                key: 0,
                                                                name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                                class: ui.value.childLinkLabelExternalIcon({ class: (_d4 = props.ui) == null ? void 0 : _d4.childLinkLabelExternalIcon, active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                            ], 2),
                                                            childItem.description ? (openBlock(), createBlock("p", {
                                                              key: 0,
                                                              class: ui.value.childLinkDescription({ class: (_e3 = props.ui) == null ? void 0 : _e3.childLinkDescription, active: childActive })
                                                            }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                          ], 2)
                                                        ];
                                                      }),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            return [
                                              createVNode(unref(NavigationMenuLink), {
                                                "as-child": "",
                                                active: childActive,
                                                onSelect: childItem.onSelect
                                              }, {
                                                default: withCtx(() => {
                                                  var _a8;
                                                  return [
                                                    createVNode(_sfc_main$6, mergeProps({ ref_for: true }, childSlotProps, {
                                                      class: ui.value.childLink({ class: [(_a8 = props.ui) == null ? void 0 : _a8.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: withCtx(() => {
                                                        var _a9, _b4, _c4, _d4, _e3;
                                                        return [
                                                          childItem.icon ? (openBlock(), createBlock(_sfc_main$7, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: (_a9 = props.ui) == null ? void 0 : _a9.childLinkIcon, active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                          createVNode("div", {
                                                            class: ui.value.childLinkWrapper({ class: (_b4 = props.ui) == null ? void 0 : _b4.childLinkWrapper })
                                                          }, [
                                                            createVNode("p", {
                                                              class: ui.value.childLinkLabel({ class: (_c4 = props.ui) == null ? void 0 : _c4.childLinkLabel, active: childActive })
                                                            }, [
                                                              createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                                                                key: 0,
                                                                name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                                class: ui.value.childLinkLabelExternalIcon({ class: (_d4 = props.ui) == null ? void 0 : _d4.childLinkLabelExternalIcon, active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                            ], 2),
                                                            childItem.description ? (openBlock(), createBlock("p", {
                                                              key: 0,
                                                              class: ui.value.childLinkDescription({ class: (_e3 = props.ui) == null ? void 0 : _e3.childLinkDescription, active: childActive })
                                                            }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                          ], 2)
                                                        ];
                                                      }),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ];
                                                }),
                                                _: 2
                                              }, 1032, ["active", "onSelect"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</li>`);
                                    });
                                    _push5(`<!--]--></ul>`);
                                  }, _push5, _parent5, _scopeId4);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                      item,
                                      active,
                                      index
                                    }, () => {
                                      var _a6;
                                      return [
                                        createVNode("ul", {
                                          class: ui.value.childList({ class: (_a6 = props.ui) == null ? void 0 : _a6.childList })
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                            var _a7;
                                            return openBlock(), createBlock("li", {
                                              key: childIndex,
                                              class: ui.value.childItem({ class: (_a7 = props.ui) == null ? void 0 : _a7.childItem })
                                            }, [
                                              createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                                default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                                  createVNode(unref(NavigationMenuLink), {
                                                    "as-child": "",
                                                    active: childActive,
                                                    onSelect: childItem.onSelect
                                                  }, {
                                                    default: withCtx(() => {
                                                      var _a8;
                                                      return [
                                                        createVNode(_sfc_main$6, mergeProps({ ref_for: true }, childSlotProps, {
                                                          class: ui.value.childLink({ class: [(_a8 = props.ui) == null ? void 0 : _a8.childLink, childItem.class], active: childActive })
                                                        }), {
                                                          default: withCtx(() => {
                                                            var _a9, _b4, _c4, _d4, _e3;
                                                            return [
                                                              childItem.icon ? (openBlock(), createBlock(_sfc_main$7, {
                                                                key: 0,
                                                                name: childItem.icon,
                                                                class: ui.value.childLinkIcon({ class: (_a9 = props.ui) == null ? void 0 : _a9.childLinkIcon, active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                              createVNode("div", {
                                                                class: ui.value.childLinkWrapper({ class: (_b4 = props.ui) == null ? void 0 : _b4.childLinkWrapper })
                                                              }, [
                                                                createVNode("p", {
                                                                  class: ui.value.childLinkLabel({ class: (_c4 = props.ui) == null ? void 0 : _c4.childLinkLabel, active: childActive })
                                                                }, [
                                                                  createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                                  childItem.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                                                                    key: 0,
                                                                    name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                                    class: ui.value.childLinkLabelExternalIcon({ class: (_d4 = props.ui) == null ? void 0 : _d4.childLinkLabelExternalIcon, active: childActive })
                                                                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                                ], 2),
                                                                childItem.description ? (openBlock(), createBlock("p", {
                                                                  key: 0,
                                                                  class: ui.value.childLinkDescription({ class: (_e3 = props.ui) == null ? void 0 : _e3.childLinkDescription, active: childActive })
                                                                }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                              ], 2)
                                                            ];
                                                          }),
                                                          _: 2
                                                        }, 1040, ["class"])
                                                      ];
                                                    }),
                                                    _: 2
                                                  }, 1032, ["active", "onSelect"])
                                                ]),
                                                _: 2
                                              }, 1040)
                                            ], 2);
                                          }), 128))
                                        ], 2)
                                      ];
                                    })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(_ctx.orientation === "horizontal" && (((_d3 = item.children) == null ? void 0 : _d3.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : unref(NavigationMenuLink)), {
                              "as-child": "",
                              active: active || item.active,
                              disabled: item.disabled,
                              onSelect: item.onSelect
                            }, {
                              default: withCtx(() => {
                                var _a6;
                                return [
                                  createVNode(_sfc_main$6, mergeProps(slotProps, {
                                    class: ui.value.link({ class: [(_a6 = props.ui) == null ? void 0 : _a6.link, item.class], active: active || item.active, disabled: !!item.disabled, level: _ctx.orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseLinkTemplate), {
                                        item,
                                        active: active || item.active,
                                        index
                                      }, null, 8, ["item", "active", "index"])
                                    ]),
                                    _: 2
                                  }, 1040, ["class"])
                                ];
                              }),
                              _: 2
                            }, 1064, ["active", "disabled", "onSelect"])),
                            _ctx.orientation === "horizontal" && (((_e2 = item.children) == null ? void 0 : _e2.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
                              class: ui.value.content({ class: (_f2 = props.ui) == null ? void 0 : _f2.content })
                            }), {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                  item,
                                  active,
                                  index
                                }, () => {
                                  var _a6;
                                  return [
                                    createVNode("ul", {
                                      class: ui.value.childList({ class: (_a6 = props.ui) == null ? void 0 : _a6.childList })
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                        var _a7;
                                        return openBlock(), createBlock("li", {
                                          key: childIndex,
                                          class: ui.value.childItem({ class: (_a7 = props.ui) == null ? void 0 : _a7.childItem })
                                        }, [
                                          createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                            default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                              createVNode(unref(NavigationMenuLink), {
                                                "as-child": "",
                                                active: childActive,
                                                onSelect: childItem.onSelect
                                              }, {
                                                default: withCtx(() => {
                                                  var _a8;
                                                  return [
                                                    createVNode(_sfc_main$6, mergeProps({ ref_for: true }, childSlotProps, {
                                                      class: ui.value.childLink({ class: [(_a8 = props.ui) == null ? void 0 : _a8.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: withCtx(() => {
                                                        var _a9, _b4, _c4, _d4, _e3;
                                                        return [
                                                          childItem.icon ? (openBlock(), createBlock(_sfc_main$7, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: (_a9 = props.ui) == null ? void 0 : _a9.childLinkIcon, active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                          createVNode("div", {
                                                            class: ui.value.childLinkWrapper({ class: (_b4 = props.ui) == null ? void 0 : _b4.childLinkWrapper })
                                                          }, [
                                                            createVNode("p", {
                                                              class: ui.value.childLinkLabel({ class: (_c4 = props.ui) == null ? void 0 : _c4.childLinkLabel, active: childActive })
                                                            }, [
                                                              createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                                                                key: 0,
                                                                name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                                class: ui.value.childLinkLabelExternalIcon({ class: (_d4 = props.ui) == null ? void 0 : _d4.childLinkLabelExternalIcon, active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                            ], 2),
                                                            childItem.description ? (openBlock(), createBlock("p", {
                                                              key: 0,
                                                              class: ui.value.childLinkDescription({ class: (_e3 = props.ui) == null ? void 0 : _e3.childLinkDescription, active: childActive })
                                                            }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                          ], 2)
                                                        ];
                                                      }),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ];
                                                }),
                                                _: 2
                                              }, 1032, ["active", "onSelect"])
                                            ]),
                                            _: 2
                                          }, 1040)
                                        ], 2);
                                      }), 128))
                                    ], 2)
                                  ];
                                })
                              ]),
                              _: 2
                            }, 1040, ["class"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    _ctx.orientation === "vertical" && item.type === "label" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: ui.value.label({ class: (_c2 = props.ui) == null ? void 0 : _c2.label })
                    }, [
                      createVNode(unref(ReuseLinkTemplate), {
                        item,
                        index
                      }, null, 8, ["item", "index"])
                    ], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$5, mergeProps({ key: 1 }, _ctx.orientation === "vertical" && ((_d2 = item.children) == null ? void 0 : _d2.length) && !_ctx.collapsed ? {} : unref(pickLinkProps)(item), { custom: "" }), {
                      default: withCtx(({ active, ...slotProps }) => {
                        var _a5, _b3, _c3;
                        return [
                          (openBlock(), createBlock(resolveDynamicComponent(_ctx.orientation === "horizontal" && (((_a5 = item.children) == null ? void 0 : _a5.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : unref(NavigationMenuLink)), {
                            "as-child": "",
                            active: active || item.active,
                            disabled: item.disabled,
                            onSelect: item.onSelect
                          }, {
                            default: withCtx(() => {
                              var _a6;
                              return [
                                createVNode(_sfc_main$6, mergeProps(slotProps, {
                                  class: ui.value.link({ class: [(_a6 = props.ui) == null ? void 0 : _a6.link, item.class], active: active || item.active, disabled: !!item.disabled, level: _ctx.orientation === "horizontal" || level > 0 })
                                }), {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ];
                            }),
                            _: 2
                          }, 1064, ["active", "disabled", "onSelect"])),
                          _ctx.orientation === "horizontal" && (((_b3 = item.children) == null ? void 0 : _b3.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
                            class: ui.value.content({ class: (_c3 = props.ui) == null ? void 0 : _c3.content })
                          }), {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                item,
                                active,
                                index
                              }, () => {
                                var _a6;
                                return [
                                  createVNode("ul", {
                                    class: ui.value.childList({ class: (_a6 = props.ui) == null ? void 0 : _a6.childList })
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                      var _a7;
                                      return openBlock(), createBlock("li", {
                                        key: childIndex,
                                        class: ui.value.childItem({ class: (_a7 = props.ui) == null ? void 0 : _a7.childItem })
                                      }, [
                                        createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                            createVNode(unref(NavigationMenuLink), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: withCtx(() => {
                                                var _a8;
                                                return [
                                                  createVNode(_sfc_main$6, mergeProps({ ref_for: true }, childSlotProps, {
                                                    class: ui.value.childLink({ class: [(_a8 = props.ui) == null ? void 0 : _a8.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: withCtx(() => {
                                                      var _a9, _b4, _c4, _d3, _e2;
                                                      return [
                                                        childItem.icon ? (openBlock(), createBlock(_sfc_main$7, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          class: ui.value.childLinkIcon({ class: (_a9 = props.ui) == null ? void 0 : _a9.childLinkIcon, active: childActive })
                                                        }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                        createVNode("div", {
                                                          class: ui.value.childLinkWrapper({ class: (_b4 = props.ui) == null ? void 0 : _b4.childLinkWrapper })
                                                        }, [
                                                          createVNode("p", {
                                                            class: ui.value.childLinkLabel({ class: (_c4 = props.ui) == null ? void 0 : _c4.childLinkLabel, active: childActive })
                                                          }, [
                                                            createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                                                              key: 0,
                                                              name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                              class: ui.value.childLinkLabelExternalIcon({ class: (_d3 = props.ui) == null ? void 0 : _d3.childLinkLabelExternalIcon, active: childActive })
                                                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (openBlock(), createBlock("p", {
                                                            key: 0,
                                                            class: ui.value.childLinkDescription({ class: (_e2 = props.ui) == null ? void 0 : _e2.childLinkDescription, active: childActive })
                                                          }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                        ], 2)
                                                      ];
                                                    }),
                                                    _: 2
                                                  }, 1040, ["class"])
                                                ];
                                              }),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ];
                              })
                            ]),
                            _: 2
                          }, 1040, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 2
                    }, 1040)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, [
              _ctx.orientation === "vertical" && ((_c = item.children) == null ? void 0 : _c.length) && !_ctx.collapsed ? {
                name: "content",
                fn: withCtx((_, _push3, _parent3, _scopeId2) => {
                  var _a4, _b2;
                  if (_push3) {
                    _push3(`<ul class="${ssrRenderClass(ui.value.childList({ class: (_a4 = props.ui) == null ? void 0 : _a4.childList }))}"${_scopeId2}><!--[-->`);
                    ssrRenderList(item.children, (childItem, childIndex) => {
                      var _a5;
                      _push3(ssrRenderComponent(unref(ReuseItemTemplate), {
                        key: childIndex,
                        item: childItem,
                        index: childIndex,
                        level: level + 1,
                        class: ui.value.childItem({ class: (_a5 = props.ui) == null ? void 0 : _a5.childItem })
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></ul>`);
                  } else {
                    return [
                      createVNode("ul", {
                        class: ui.value.childList({ class: (_b2 = props.ui) == null ? void 0 : _b2.childList })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                          var _a5;
                          return openBlock(), createBlock(unref(ReuseItemTemplate), {
                            key: childIndex,
                            item: childItem,
                            index: childIndex,
                            level: level + 1,
                            class: ui.value.childItem({ class: (_a5 = props.ui) == null ? void 0 : _a5.childItem })
                          }, null, 8, ["item", "index", "level", "class"]);
                        }), 128))
                      ], 2)
                    ];
                  }
                }),
                key: "0"
              } : void 0
            ])), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.orientation === "vertical" && ((_d = item.children) == null ? void 0 : _d.length) && !_ctx.collapsed ? _sfc_main$2 : unref(NavigationMenuItem)), {
                as: "li",
                value: item.value || String(index),
                "default-open": item.defaultOpen,
                "unmount-on-hide": _ctx.orientation === "vertical" && ((_e = item.children) == null ? void 0 : _e.length) && !_ctx.collapsed ? _ctx.unmountOnHide : void 0,
                open: item.open
              }, createSlots({
                default: withCtx(() => {
                  var _a4, _b2;
                  return [
                    _ctx.orientation === "vertical" && item.type === "label" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label })
                    }, [
                      createVNode(unref(ReuseLinkTemplate), {
                        item,
                        index
                      }, null, 8, ["item", "index"])
                    ], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$5, mergeProps({ key: 1 }, _ctx.orientation === "vertical" && ((_b2 = item.children) == null ? void 0 : _b2.length) && !_ctx.collapsed ? {} : unref(pickLinkProps)(item), { custom: "" }), {
                      default: withCtx(({ active, ...slotProps }) => {
                        var _a5, _b3, _c2;
                        return [
                          (openBlock(), createBlock(resolveDynamicComponent(_ctx.orientation === "horizontal" && (((_a5 = item.children) == null ? void 0 : _a5.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : unref(NavigationMenuLink)), {
                            "as-child": "",
                            active: active || item.active,
                            disabled: item.disabled,
                            onSelect: item.onSelect
                          }, {
                            default: withCtx(() => {
                              var _a6;
                              return [
                                createVNode(_sfc_main$6, mergeProps(slotProps, {
                                  class: ui.value.link({ class: [(_a6 = props.ui) == null ? void 0 : _a6.link, item.class], active: active || item.active, disabled: !!item.disabled, level: _ctx.orientation === "horizontal" || level > 0 })
                                }), {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ];
                            }),
                            _: 2
                          }, 1064, ["active", "disabled", "onSelect"])),
                          _ctx.orientation === "horizontal" && (((_b3 = item.children) == null ? void 0 : _b3.length) || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
                            class: ui.value.content({ class: (_c2 = props.ui) == null ? void 0 : _c2.content })
                          }), {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                item,
                                active,
                                index
                              }, () => {
                                var _a6;
                                return [
                                  createVNode("ul", {
                                    class: ui.value.childList({ class: (_a6 = props.ui) == null ? void 0 : _a6.childList })
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                      var _a7;
                                      return openBlock(), createBlock("li", {
                                        key: childIndex,
                                        class: ui.value.childItem({ class: (_a7 = props.ui) == null ? void 0 : _a7.childItem })
                                      }, [
                                        createVNode(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                            createVNode(unref(NavigationMenuLink), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: withCtx(() => {
                                                var _a8;
                                                return [
                                                  createVNode(_sfc_main$6, mergeProps({ ref_for: true }, childSlotProps, {
                                                    class: ui.value.childLink({ class: [(_a8 = props.ui) == null ? void 0 : _a8.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: withCtx(() => {
                                                      var _a9, _b4, _c3, _d2, _e2;
                                                      return [
                                                        childItem.icon ? (openBlock(), createBlock(_sfc_main$7, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          class: ui.value.childLinkIcon({ class: (_a9 = props.ui) == null ? void 0 : _a9.childLinkIcon, active: childActive })
                                                        }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                        createVNode("div", {
                                                          class: ui.value.childLinkWrapper({ class: (_b4 = props.ui) == null ? void 0 : _b4.childLinkWrapper })
                                                        }, [
                                                          createVNode("p", {
                                                            class: ui.value.childLinkLabel({ class: (_c3 = props.ui) == null ? void 0 : _c3.childLinkLabel, active: childActive })
                                                          }, [
                                                            createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && _ctx.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$7, {
                                                              key: 0,
                                                              name: typeof _ctx.externalIcon === "string" ? _ctx.externalIcon : unref(appConfig).ui.icons.external,
                                                              class: ui.value.childLinkLabelExternalIcon({ class: (_d2 = props.ui) == null ? void 0 : _d2.childLinkLabelExternalIcon, active: childActive })
                                                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (openBlock(), createBlock("p", {
                                                            key: 0,
                                                            class: ui.value.childLinkDescription({ class: (_e2 = props.ui) == null ? void 0 : _e2.childLinkDescription, active: childActive })
                                                          }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                        ], 2)
                                                      ];
                                                    }),
                                                    _: 2
                                                  }, 1040, ["class"])
                                                ];
                                              }),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ];
                              })
                            ]),
                            _: 2
                          }, 1040, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 2
                    }, 1040)) : createCommentVNode("", true)
                  ];
                }),
                _: 2
              }, [
                _ctx.orientation === "vertical" && ((_f = item.children) == null ? void 0 : _f.length) && !_ctx.collapsed ? {
                  name: "content",
                  fn: withCtx(() => {
                    var _a4;
                    return [
                      createVNode("ul", {
                        class: ui.value.childList({ class: (_a4 = props.ui) == null ? void 0 : _a4.childList })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                          var _a5;
                          return openBlock(), createBlock(unref(ReuseItemTemplate), {
                            key: childIndex,
                            item: childItem,
                            index: childIndex,
                            level: level + 1,
                            class: ui.value.childItem({ class: (_a5 = props.ui) == null ? void 0 : _a5.childItem })
                          }, null, 8, ["item", "index", "level", "class"]);
                        }), 128))
                      ], 2)
                    ];
                  }),
                  key: "0"
                } : void 0
              ]), 1032, ["value", "default-open", "unmount-on-hide", "open"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(NavigationMenuRoot), mergeProps(unref(rootProps), {
        "data-collapsed": _ctx.collapsed,
        class: ui.value.root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] })
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(lists.value, (list, listIndex) => {
              var _a4, _b2;
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(NavigationMenuList), {
                class: ui.value.list({ class: (_a4 = props.ui) == null ? void 0 : _a4.list })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(list, (item, index) => {
                      var _a5;
                      _push3(ssrRenderComponent(unref(ReuseItemTemplate), {
                        key: `list-${listIndex}-${index}`,
                        item,
                        index,
                        class: ui.value.item({ class: (_a5 = props.ui) == null ? void 0 : _a5.item })
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
                        var _a5;
                        return openBlock(), createBlock(unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          class: ui.value.item({ class: (_a5 = props.ui) == null ? void 0 : _a5.item })
                        }, null, 8, ["item", "index", "class"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (_ctx.orientation === "vertical" && listIndex < lists.value.length - 1) {
                _push2(`<div class="${ssrRenderClass(ui.value.separator({ class: (_b2 = props.ui) == null ? void 0 : _b2.separator }))}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
            if (_ctx.orientation === "horizontal") {
              _push2(`<div class="${ssrRenderClass(ui.value.viewportWrapper({ class: (_a3 = props.ui) == null ? void 0 : _a3.viewportWrapper }))}"${_scopeId}>`);
              if (_ctx.arrow) {
                _push2(ssrRenderComponent(unref(NavigationMenuIndicator), {
                  class: ui.value.indicator({ class: (_b = props.ui) == null ? void 0 : _b.indicator })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a4, _b2;
                    if (_push3) {
                      _push3(`<div class="${ssrRenderClass(ui.value.arrow({ class: (_a4 = props.ui) == null ? void 0 : _a4.arrow }))}"${_scopeId2}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: ui.value.arrow({ class: (_b2 = props.ui) == null ? void 0 : _b2.arrow })
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(NavigationMenuViewport), {
                class: ui.value.viewport({ class: (_c = props.ui) == null ? void 0 : _c.viewport })
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(lists.value, (list, listIndex) => {
                var _a4, _b2;
                return openBlock(), createBlock(Fragment, {
                  key: `list-${listIndex}`
                }, [
                  createVNode(unref(NavigationMenuList), {
                    class: ui.value.list({ class: (_a4 = props.ui) == null ? void 0 : _a4.list })
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
                        var _a5;
                        return openBlock(), createBlock(unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          class: ui.value.item({ class: (_a5 = props.ui) == null ? void 0 : _a5.item })
                        }, null, 8, ["item", "index", "class"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1032, ["class"]),
                  _ctx.orientation === "vertical" && listIndex < lists.value.length - 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ui.value.separator({ class: (_b2 = props.ui) == null ? void 0 : _b2.separator })
                  }, null, 2)) : createCommentVNode("", true)
                ], 64);
              }), 128)),
              _ctx.orientation === "horizontal" ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.viewportWrapper({ class: (_d = props.ui) == null ? void 0 : _d.viewportWrapper })
              }, [
                _ctx.arrow ? (openBlock(), createBlock(unref(NavigationMenuIndicator), {
                  key: 0,
                  class: ui.value.indicator({ class: (_e = props.ui) == null ? void 0 : _e.indicator })
                }, {
                  default: withCtx(() => {
                    var _a4;
                    return [
                      createVNode("div", {
                        class: ui.value.arrow({ class: (_a4 = props.ui) == null ? void 0 : _a4.arrow })
                      }, null, 2)
                    ];
                  }),
                  _: 1
                }, 8, ["class"])) : createCommentVNode("", true),
                createVNode(unref(NavigationMenuViewport), {
                  class: ui.value.viewport({ class: (_f = props.ui) == null ? void 0 : _f.viewport })
                }, null, 8, ["class"])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const navs = ref([
      {
        label: "Портфолио",
        to: "/"
      },
      {
        label: "Навыки",
        to: "/skills"
      },
      {
        label: "Опыт работы",
        to: "/jobs"
      },
      {
        label: "Образование",
        to: "/education"
      },
      {
        label: "Обо мне",
        to: "/about"
      },
      {
        label: "Контакты",
        to: "/contacts"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UNavigationMenu = _sfc_main$1;
      _push(`<!--[--><div class="w-full flex justify-around items-center"><h1 class="text-primary-500"> Татьяна Архипова </h1>`);
      _push(ssrRenderComponent(_component_UNavigationMenu, {
        items: unref(navs),
        class: "w-[50%] justify-end px-4 p-8"
      }, null, _parent));
      _push(`</div><div class="flex flex-col items-center justify-start w-full min-h-[100vh]">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><footer class="flex justify-center items-center w-full h-[100px] gradient-bg"><div><p class="text-sm text-white">Copyright ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} © Arkhipova Tatyana</p></div></footer><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.vue.mjs.map

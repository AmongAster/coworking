import { a as useSeoMeta, b as useAuth, c as useToast, _ as __nuxt_component_0$1, j as _sfc_main$d, d as _sfc_main$8, k as _sfc_main$b, e as useRuntimeConfig, f as useComponentProps, g as useAppConfig, t as tv, P as Primitive, m as useFieldGroup, i as useComponentIcons } from './server.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './Empty-CX5_icCA.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createVNode, unref, toDisplayString, createTextVNode, renderSlot, useSlots, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './Card-UmGcoIka.mjs';
import { u as useFetch } from './fetch-ReGKOdfy.mjs';
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
import 'tailwindcss/colors';
import '@vueuse/core';
import '@vueuse/shared';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import '@floating-ui/vue';
import './utils-Cp53HkP5.mjs';
import 'aria-hidden';
import '@internationalized/date';
import './Input-CNMGTHb5.mjs';
import '@vue/shared';

const theme$1 = {
  "base": "animate-pulse rounded-md bg-elevated"
};
const _sfc_main$2 = {
  __name: "USkeleton",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("skeleton", _props);
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.skeleton || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "aria-busy": "true",
        "aria-label": "loading",
        "aria-live": "polite",
        role: "alert",
        class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
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
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Skeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "base": "font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
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
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-md",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    },
    "square": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-primary text-inverted"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-secondary text-inverted"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "bg-success text-inverted"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "bg-info text-inverted"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "bg-warning text-inverted"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "bg-error text-inverted"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-primary ring ring-inset ring-primary/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-secondary ring ring-inset ring-secondary/50"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "text-success ring ring-inset ring-success/50"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "text-info ring ring-inset ring-info/50"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "text-warning ring ring-inset ring-warning/50"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "text-error ring ring-inset ring-error/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-primary/10 text-primary"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-secondary/10 text-secondary"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "bg-success/10 text-success"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "bg-info/10 text-info"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "bg-warning/10 text-warning"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "bg-error/10 text-error"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "bg-success/10 text-success ring ring-inset ring-success/25"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "bg-info/10 text-info ring ring-inset ring-info/25"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "bg-error/10 text-error ring ring-inset ring-error/25"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-0.5"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-1"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "UBadge",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "span" },
    label: { type: [String, Number], required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = useSlots();
    const props = useComponentProps("badge", _props);
    const appConfig = useAppConfig();
    const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.badge || {} })({
      color: props.color,
      variant: props.variant,
      size: fieldGroupSize.value ?? props.size,
      square: props.square || !slots.default && !props.label,
      fieldGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "data-slot": "base",
        class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
              if (unref(isLeading) && unref(leadingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$d, {
                  name: unref(leadingIconName),
                  "data-slot": "leadingIcon",
                  class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
                }, null, _parent2, _scopeId));
              } else if (!!unref(props).avatar) {
                _push2(ssrRenderComponent(_sfc_main$b, mergeProps({
                  size: unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                }, unref(props).avatar, {
                  "data-slot": "leadingAvatar",
                  class: ui.value.leadingAvatar({ class: unref(props).ui?.leadingAvatar })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
              if (unref(props).label !== void 0 && unref(props).label !== null) {
                _push2(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: unref(props).ui?.label }))}"${_scopeId}>${ssrInterpolate(unref(props).label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
              if (unref(isTrailing) && unref(trailingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$d, {
                  name: unref(trailingIconName),
                  "data-slot": "trailingIcon",
                  class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                  key: 0,
                  name: unref(leadingIconName),
                  "data-slot": "leadingIcon",
                  class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
                }, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                  key: 1,
                  size: unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                }, unref(props).avatar, {
                  "data-slot": "leadingAvatar",
                  class: ui.value.leadingAvatar({ class: unref(props).ui?.leadingAvatar })
                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                unref(props).label !== void 0 && unref(props).label !== null ? (openBlock(), createBlock("span", {
                  key: 0,
                  "data-slot": "label",
                  class: ui.value.label({ class: unref(props).ui?.label })
                }, toDisplayString(unref(props).label), 3)) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                  key: 0,
                  name: unref(trailingIconName),
                  "data-slot": "trailingIcon",
                  class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Badge.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bookings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "Мои бронирования - CoWork Space"
    });
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const { user, logout, getAuthHeaders } = useAuth();
    const toast = useToast();
    const { data: bookings, status: bookingsStatus, refresh: refreshBookings } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${apiBase}/bookings/my`,
      {
        key: "my-bookings",
        headers: getAuthHeaders(),
        default: () => []
      },
      "$1rlc2jwtaK"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const cancellingId = ref(null);
    const cancelBooking = async (booking) => {
      cancellingId.value = booking.id;
      try {
        await $fetch(`${apiBase}/bookings/${booking.id}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });
        toast.add({
          title: "Бронирование отменено",
          description: "Ваше бронирование было успешно отменено.",
          color: "success",
          icon: "i-lucide-check-circle"
        });
        refreshBookings();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Не удалось отменить бронирование";
        toast.add({
          title: "Ошибка",
          description: errorMessage,
          color: "error",
          icon: "i-lucide-alert-circle"
        });
      } finally {
        cancellingId.value = null;
      }
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const formatTime = (time) => {
      const [hours, minutes] = time.split(":");
      return `${hours}:${minutes || "00"}`;
    };
    const isUpcoming = (booking) => {
      const bookingDate = new Date(booking.booking_date);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return bookingDate >= today;
    };
    const upcomingBookings = computed(
      () => bookings.value?.filter((b) => isUpcoming(b)).sort(
        (a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime()
      ) || []
    );
    const pastBookings = computed(
      () => bookings.value?.filter((b) => !isUpcoming(b)).sort(
        (a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
      ) || []
    );
    const userMenuItems = computed(() => [
      [
        {
          label: user.value?.email || "Пользователь",
          slot: "account",
          disabled: true
        }
      ],
      [
        {
          label: "Каталог комнат",
          icon: "i-lucide-layout-grid",
          to: "/"
        }
      ],
      [
        {
          label: "Выйти",
          icon: "i-lucide-log-out",
          color: "error",
          onSelect: () => logout()
        }
      ]
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8;
      const _component_UDropdownMenu = _sfc_main$1$1;
      const _component_UAvatar = _sfc_main$b;
      const _component_USkeleton = _sfc_main$2;
      const _component_UEmpty = _sfc_main$3;
      const _component_UBadge = _sfc_main$1;
      const _component_UCard = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-950" }, _attrs))}><header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-building-2",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold text-white text-lg hidden sm:block"${_scopeId}>CoWork Space</span>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-building-2",
                  class: "w-5 h-5 text-white"
                })
              ]),
              createVNode("span", { class: "font-bold text-white text-lg hidden sm:block" }, "CoWork Space")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: "Каталог комнат",
              variant: "ghost",
              icon: "i-lucide-layout-grid",
              class: "hidden sm:flex"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: "Каталог комнат",
                variant: "ghost",
                icon: "i-lucide-layout-grid",
                class: "hidden sm:flex"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UDropdownMenu, { items: unref(userMenuItems) }, {
        account: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-2 py-1.5"${_scopeId}><p class="text-sm font-medium text-white truncate"${_scopeId}>${ssrInterpolate(unref(user)?.email)}</p><p class="text-xs text-slate-400"${_scopeId}>${ssrInterpolate(unref(user)?.role === "admin" ? "Администратор" : "Пользователь")}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "px-2 py-1.5" }, [
                createVNode("p", { class: "text-sm font-medium text-white truncate" }, toDisplayString(unref(user)?.email), 1),
                createVNode("p", { class: "text-xs text-slate-400" }, toDisplayString(unref(user)?.role === "admin" ? "Администратор" : "Пользователь"), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              class: "p-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UAvatar, {
                    alt: unref(user)?.email || "User",
                    icon: "i-lucide-user",
                    size: "sm",
                    class: "bg-slate-700"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UAvatar, {
                      alt: unref(user)?.email || "User",
                      icon: "i-lucide-user",
                      size: "sm",
                      class: "bg-slate-700"
                    }, null, 8, ["alt"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                variant: "ghost",
                class: "p-0"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UAvatar, {
                    alt: unref(user)?.email || "User",
                    icon: "i-lucide-user",
                    size: "sm",
                    class: "bg-slate-700"
                  }, null, 8, ["alt"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header><main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-white">Мои бронирования</h1><p class="text-slate-400 mt-1">Управляйте вашими бронированиями рабочих мест</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-refresh-cw",
        variant: "outline",
        onClick: ($event) => unref(refreshBookings)()
      }, null, _parent));
      _push(`</div>`);
      if (unref(bookingsStatus) === "pending") {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_USkeleton, {
            key: i,
            class: "h-32 rounded-xl"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (!unref(bookings)?.length) {
        _push(ssrRenderComponent(_component_UEmpty, {
          icon: "i-lucide-calendar-x",
          title: "Нет бронирований",
          description: "Вы ещё не забронировали ни одного помещения. Перейдите в каталог, чтобы начать.",
          class: "py-16"
        }, {
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      label: "Каталог комнат",
                      icon: "i-lucide-layout-grid"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        label: "Каталог комнат",
                        icon: "i-lucide-layout-grid"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, { to: "/" }, {
                  default: withCtx(() => [
                    createVNode(_component_UButton, {
                      label: "Каталог комнат",
                      icon: "i-lucide-layout-grid"
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(upcomingBookings).length > 0) {
          _push(`<section class="mb-12"><div class="flex items-center gap-2 mb-4">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-calendar-check",
            class: "w-5 h-5 text-indigo-400"
          }, null, _parent));
          _push(`<h2 class="text-xl font-semibold text-white">Предстоящие</h2>`);
          _push(ssrRenderComponent(_component_UBadge, {
            label: String(unref(upcomingBookings).length),
            color: "primary",
            variant: "subtle"
          }, null, _parent));
          _push(`</div><div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(upcomingBookings), (booking) => {
            _push(ssrRenderComponent(_component_UCard, {
              key: booking.id,
              class: "bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center justify-between gap-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-14 h-14 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-building",
                    class: "w-7 h-7 text-indigo-400"
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div${_scopeId}><h3 class="font-semibold text-white text-lg"${_scopeId}>${ssrInterpolate(booking.room_name || `Комната #${booking.room_id}`)}</h3><div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-400"${_scopeId}><span class="flex items-center gap-1.5"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-calendar",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(formatDate(booking.booking_date))}</span><span class="flex items-center gap-1.5"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-clock",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(formatTime(booking.start_time))} - ${ssrInterpolate(formatTime(booking.end_time))}</span></div></div></div>`);
                  _push2(ssrRenderComponent(_component_UButton, {
                    label: "Отменить",
                    color: "error",
                    variant: "soft",
                    icon: "i-lucide-x",
                    loading: unref(cancellingId) === booking.id,
                    onClick: ($event) => cancelBooking(booking)
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "w-14 h-14 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0" }, [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-building",
                            class: "w-7 h-7 text-indigo-400"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "font-semibold text-white text-lg" }, toDisplayString(booking.room_name || `Комната #${booking.room_id}`), 1),
                          createVNode("div", { class: "flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-400" }, [
                            createVNode("span", { class: "flex items-center gap-1.5" }, [
                              createVNode(_component_UIcon, {
                                name: "i-lucide-calendar",
                                class: "w-4 h-4"
                              }),
                              createTextVNode(" " + toDisplayString(formatDate(booking.booking_date)), 1)
                            ]),
                            createVNode("span", { class: "flex items-center gap-1.5" }, [
                              createVNode(_component_UIcon, {
                                name: "i-lucide-clock",
                                class: "w-4 h-4"
                              }),
                              createTextVNode(" " + toDisplayString(formatTime(booking.start_time)) + " - " + toDisplayString(formatTime(booking.end_time)), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode(_component_UButton, {
                        label: "Отменить",
                        color: "error",
                        variant: "soft",
                        icon: "i-lucide-x",
                        loading: unref(cancellingId) === booking.id,
                        onClick: ($event) => cancelBooking(booking)
                      }, null, 8, ["loading", "onClick"])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(pastBookings).length > 0) {
          _push(`<section><div class="flex items-center gap-2 mb-4">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-history",
            class: "w-5 h-5 text-slate-500"
          }, null, _parent));
          _push(`<h2 class="text-xl font-semibold text-slate-400">Прошедшие</h2>`);
          _push(ssrRenderComponent(_component_UBadge, {
            label: String(unref(pastBookings).length),
            color: "neutral",
            variant: "subtle"
          }, null, _parent));
          _push(`</div><div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(pastBookings), (booking) => {
            _push(ssrRenderComponent(_component_UCard, {
              key: booking.id,
              class: "bg-slate-900/30 border-slate-800/50 opacity-60"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-building",
                    class: "w-6 h-6 text-slate-500"
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div${_scopeId}><h3 class="font-medium text-slate-300"${_scopeId}>${ssrInterpolate(booking.room_name || `Комната #${booking.room_id}`)}</h3><div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500"${_scopeId}><span class="flex items-center gap-1.5"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-calendar",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(formatDate(booking.booking_date))}</span><span class="flex items-center gap-1.5"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-clock",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(formatTime(booking.start_time))} - ${ssrInterpolate(formatTime(booking.end_time))}</span></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-building",
                          class: "w-6 h-6 text-slate-500"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "font-medium text-slate-300" }, toDisplayString(booking.room_name || `Комната #${booking.room_id}`), 1),
                        createVNode("div", { class: "flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500" }, [
                          createVNode("span", { class: "flex items-center gap-1.5" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-calendar",
                              class: "w-4 h-4"
                            }),
                            createTextVNode(" " + toDisplayString(formatDate(booking.booking_date)), 1)
                          ]),
                          createVNode("span", { class: "flex items-center gap-1.5" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-clock",
                              class: "w-4 h-4"
                            }),
                            createTextVNode(" " + toDisplayString(formatTime(booking.start_time)) + " - " + toDisplayString(formatTime(booking.end_time)), 1)
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bookings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=bookings-l6ZJKK9B.mjs.map

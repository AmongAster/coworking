import { b as useAuth, a9 as useRoute, j as _sfc_main$d, _ as __nuxt_component_0$1, k as _sfc_main$b, d as _sfc_main$8 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, logout } = useAuth();
    const route = useRoute();
    const navItems = [
      { label: "Обзор", icon: "i-lucide-layout-dashboard", to: "/admin" },
      { label: "Комнаты", icon: "i-lucide-door-open", to: "/admin/rooms" },
      { label: "Бронирования", icon: "i-lucide-calendar-check", to: "/admin/bookings" }
    ];
    const isSidebarOpen = ref(true);
    const isActive = (path) => {
      if (path === "/admin") {
        return route.path === "/admin";
      }
      return route.path.startsWith(path);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UAvatar = _sfc_main$b;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden" }, _attrs))}><div class="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div><aside class="${ssrRenderClass([unref(isSidebarOpen) ? "translate-x-0" : "-translate-x-full", "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900/40 backdrop-blur-xl border-r border-slate-900/80 transition-transform duration-300 lg:translate-x-0"])}"><div class="flex items-center gap-3 h-16 px-6 border-b border-slate-900"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-shield",
        class: "w-5 h-5 text-white animate-pulse"
      }, null, _parent));
      _push(`</div><div><span class="font-bold text-white text-base tracking-wide">Админка</span><p class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Управление коворкингом</p></div></div><nav class="flex-1 p-4 space-y-1.5 mt-2"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200", isActive(item.to) ? "bg-gradient-to-r from-indigo-600/15 to-violet-600/15 text-indigo-400 border-indigo-500/30 shadow-md shadow-indigo-500/5" : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/50"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: item.icon,
                class: "w-5 h-5 transition-transform group-hover:scale-105"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.label)}`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: item.icon,
                  class: "w-5 h-5 transition-transform group-hover:scale-105"
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-4 border-t border-slate-900"><div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-900"><div class="relative">`);
      _push(ssrRenderComponent(_component_UAvatar, {
        alt: unref(user)?.email || "Admin",
        icon: "i-lucide-user",
        size: "sm",
        class: "bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold"
      }, null, _parent));
      _push(`<span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span></div><div class="flex-1 min-w-0"><p class="text-xs font-semibold text-slate-200 truncate">${ssrInterpolate(unref(user)?.email)}</p><p class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Администратор</p></div></div><div class="mt-3 flex gap-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: "Главная",
              variant: "outline",
              icon: "i-lucide-external-link",
              size: "sm",
              block: "",
              class: "border-slate-800 text-slate-300 hover:bg-slate-900 rounded-lg text-xs"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: "Главная",
                variant: "outline",
                icon: "i-lucide-external-link",
                size: "sm",
                block: "",
                class: "border-slate-800 text-slate-300 hover:bg-slate-900 rounded-lg text-xs"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-log-out",
        variant: "ghost",
        color: "error",
        size: "sm",
        class: "rounded-lg hover:bg-red-500/10",
        onClick: ($event) => unref(logout)()
      }, null, _parent));
      _push(`</div></div></aside>`);
      if (unref(isSidebarOpen)) {
        _push(`<div class="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 lg:ml-64 flex flex-col min-h-screen"><header class="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 flex items-center px-4 lg:px-8 justify-between"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-menu",
        variant: "ghost",
        class: "lg:hidden mr-4 text-slate-400 hover:text-white",
        onClick: ($event) => isSidebarOpen.value = !unref(isSidebarOpen)
      }, null, _parent));
      _push(`<h1 class="text-base font-bold text-white tracking-wide">${ssrInterpolate(unref(route).meta.title || "Панель управления")}</h1></div><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-lucide-bell",
        variant: "ghost",
        class: "relative text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-ping"${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", { class: "absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-ping" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><main class="p-4 lg:p-8 flex-1 relative z-10">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-DddUU59q.mjs.map

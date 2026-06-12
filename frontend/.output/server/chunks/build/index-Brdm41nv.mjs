import { a as useSeoMeta, b as useAuth, j as _sfc_main$d, _ as __nuxt_component_0$1, e as useRuntimeConfig } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "Админ-панель - CoWork Space"
    });
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const { getAuthHeaders } = useAuth();
    const { data: rooms, status: roomsStatus } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${apiBase}/rooms`,
      {
        key: "admin-rooms",
        default: () => []
      },
      "$ptQSp5s6Bs"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: bookings, status: bookingsStatus } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${apiBase}/bookings`,
      {
        key: "admin-bookings",
        headers: getAuthHeaders(),
        default: () => []
      },
      "$ftmLGclkVv"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: users } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${apiBase}/users`,
      {
        key: "admin-users",
        headers: getAuthHeaders(),
        default: () => []
      },
      "$7wTHzia3i0"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const totalRooms = computed(() => rooms.value?.length || 0);
    const totalBookings = computed(() => bookings.value?.length || 0);
    const totalUsers = computed(() => users.value?.length || 0);
    const todayBookings = computed(() => {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      return bookings.value?.filter((b) => b.booking_date === today) || [];
    });
    const occupancyRate = computed(() => {
      if (!totalRooms.value) return 0;
      return Math.min(Math.round(todayBookings.value.length / totalRooms.value * 100), 100);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 p-6" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-door-closed",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-400">Всего комнат</p><h3 class="text-2xl font-bold text-white">${ssrInterpolate(unref(totalRooms))}</h3></div></div><div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-calendar-days",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-400">Бронирований всего</p><h3 class="text-2xl font-bold text-white">${ssrInterpolate(unref(totalBookings))}</h3></div></div><div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-users",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-400">Пользователей</p><h3 class="text-2xl font-bold text-white">${ssrInterpolate(unref(totalUsers))}</h3></div></div><div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-pie-chart",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-400">Загруженность (сегодня)</p><h3 class="text-2xl font-bold text-white">${ssrInterpolate(unref(occupancyRate))}%</h3></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/rooms",
        class: "group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 hover:border-indigo-500/50 transition-all duration-300"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-plus",
              class: "w-7 h-7 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors"${_scopeId}>Управление комнатами</h3><p class="text-sm text-slate-400"${_scopeId}>Добавление, изменение и удаление рабочих пространств</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 hover:border-indigo-500/50 transition-all duration-300" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-plus",
                      class: "w-7 h-7 text-white"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors" }, "Управление комнатами"),
                    createVNode("p", { class: "text-sm text-slate-400" }, "Добавление, изменение и удаление рабочих пространств")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/bookings",
        class: "group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-list-checks",
              class: "w-7 h-7 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors"${_scopeId}>Журнал бронирований</h3><p class="text-sm text-slate-400"${_scopeId}>Просмотр текущих сессий и отмена активных броней</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300" }, [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode("div", { class: "w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-list-checks",
                      class: "w-7 h-7 text-white"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors" }, "Журнал бронирований"),
                    createVNode("p", { class: "text-sm text-slate-400" }, "Просмотр текущих сессий и отмена активных броней")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Brdm41nv.mjs.map

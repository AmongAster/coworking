import { a as useSeoMeta, b as useAuth, c as useToast, d as _sfc_main$8, e as useRuntimeConfig } from './server.mjs';
import { _ as _sfc_main$1 } from './Modal-B8NW43lk.mjs';
import { _ as _sfc_main$2 } from './Card-UmGcoIka.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, isRef, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
import './utils-Cp53HkP5.mjs';
import 'aria-hidden';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bookings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "Журнал бронирований - Админ"
    });
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const { getAuthHeaders } = useAuth();
    const toast = useToast();
    const { data: bookings, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${apiBase}/bookings`,
      {
        key: "admin-all-bookings",
        headers: getAuthHeaders(),
        default: () => []
      },
      "$qtDwUfflvm"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: rooms } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${apiBase}/rooms`,
      {
        key: "admin-rooms-filter",
        default: () => []
      },
      "$tn6z6WuOYZ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const selectedRoom = ref(null);
    const selectedDate = ref("");
    const filteredBookings = computed(() => {
      if (!bookings.value) return [];
      return bookings.value.filter((booking) => {
        const matchesRoom = !selectedRoom.value || booking.room_id === selectedRoom.value;
        const matchesDate = !selectedDate.value || booking.booking_date.includes(selectedDate.value);
        return matchesRoom && matchesDate;
      }).sort((a, b) => {
        return new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime();
      });
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
    };
    const formatTime = (timeStr) => {
      if (!timeStr) return "";
      return timeStr.substring(0, 5);
    };
    const isCancelDialogOpen = ref(false);
    const isCancelling = ref(false);
    const bookingToCancel = ref(null);
    const openCancelDialog = (booking) => {
      bookingToCancel.value = booking;
      isCancelDialogOpen.value = true;
    };
    const confirmCancelBooking = async () => {
      if (!bookingToCancel.value) return;
      isCancelling.value = true;
      try {
        await $fetch(`${apiBase}/bookings/${bookingToCancel.value.id}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });
        toast.add({ title: "Успешно", description: "Бронирование аннулировано.", color: "success" });
        isCancelDialogOpen.value = false;
        refresh();
      } catch (err) {
        toast.add({ title: "Ошибка отмены", description: err.data?.message || "Не удалось удалить запись", color: "error" });
      } finally {
        isCancelling.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UModal = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><div><h1 class="text-2xl font-bold text-white">Журнал бронирований</h1><p class="text-sm text-slate-400">Полный список активных и прошедших сессий коворкинга</p></div><div class="flex flex-wrap gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl"><div class="w-64"><label class="block text-xs font-medium text-slate-400 mb-1">Фильтр по комнате</label><select class="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedRoom)) ? ssrLooseContain(unref(selectedRoom), null) : ssrLooseEqual(unref(selectedRoom), null)) ? " selected" : ""}>Все пространства</option><!--[-->`);
      ssrRenderList(unref(rooms), (room) => {
        _push(`<option${ssrRenderAttr("value", room.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedRoom)) ? ssrLooseContain(unref(selectedRoom), room.id) : ssrLooseEqual(unref(selectedRoom), room.id)) ? " selected" : ""}>${ssrInterpolate(room.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="w-64"><label class="block text-xs font-medium text-slate-400 mb-1">Фильтр по дате</label><input type="date"${ssrRenderAttr("value", unref(selectedDate))} class="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500"></div></div>`);
      if (unref(status) === "pending") {
        _push(`<div class="text-center py-8 text-slate-400">Получение логов...</div>`);
      } else {
        _push(`<div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/20"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-sm"><th class="p-4">ID</th><th class="p-4">Пользователь (ID)</th><th class="p-4">Комната</th><th class="p-4">Дата</th><th class="p-4">Время</th><th class="p-4 text-right">Действия</th></tr></thead><tbody class="text-slate-300 text-sm divide-y divide-slate-800"><!--[-->`);
        ssrRenderList(unref(filteredBookings), (booking) => {
          _push(`<tr class="hover:bg-slate-900/30 transition-colors"><td class="p-4 font-mono text-slate-500">#${ssrInterpolate(booking.id)}</td><td class="p-4 font-medium text-white">User ID: ${ssrInterpolate(booking.user_id)}</td><td class="p-4">Комната #${ssrInterpolate(booking.room_id)}</td><td class="p-4">${ssrInterpolate(formatDate(booking.booking_date))}</td><td class="p-4 text-indigo-400 font-medium">${ssrInterpolate(formatTime(booking.start_time))} - ${ssrInterpolate(formatTime(booking.end_time))}</td><td class="p-4 text-right">`);
          _push(ssrRenderComponent(_component_UButton, {
            label: "Отменить бронь",
            size: "sm",
            color: "error",
            variant: "ghost",
            icon: "i-lucide-calendar-x",
            onClick: ($event) => openCancelDialog(booking)
          }, null, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]-->`);
        if (!unref(filteredBookings).length) {
          _push(`<tr><td colspan="6" class="p-8 text-center text-slate-500">Записей бронирования по заданным фильтрам не найдено.</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div>`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        open: unref(isCancelDialogOpen),
        "onUpdate:open": ($event) => isRef(isCancelDialogOpen) ? isCancelDialogOpen.value = $event : null
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "w-full max-w-md bg-slate-900 text-white" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-lg font-bold"${_scopeId2}>Отрезвить/Отменить бронь?</h3>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-lg font-bold" }, "Отрезвить/Отменить бронь?")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-3 justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: "Оставить",
                    variant: "ghost",
                    onClick: ($event) => isCancelDialogOpen.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: "Откатить бронирование",
                    color: "error",
                    loading: unref(isCancelling),
                    onClick: confirmCancelBooking
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-3 justify-end" }, [
                      createVNode(_component_UButton, {
                        label: "Оставить",
                        variant: "ghost",
                        onClick: ($event) => isCancelDialogOpen.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_UButton, {
                        label: "Откатить бронирование",
                        color: "error",
                        loading: unref(isCancelling),
                        onClick: confirmCancelBooking
                      }, null, 8, ["loading"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(bookingToCancel)) {
                    _push3(`<div class="space-y-4"${_scopeId2}><p class="text-slate-300 text-sm"${_scopeId2}>Вы уверены, что хотите принудительно удалить данное бронирование? Место снова станет свободным.</p><div class="rounded-xl bg-slate-800/50 border border-slate-700 p-4 space-y-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-slate-400"${_scopeId2}>Комната ID:</span><span class="text-white font-medium"${_scopeId2}>#${ssrInterpolate(unref(bookingToCancel).room_id)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-slate-400"${_scopeId2}>Дата сессии:</span><span class="text-white"${_scopeId2}>${ssrInterpolate(formatDate(unref(bookingToCancel).booking_date))}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-slate-400"${_scopeId2}>Временное окно:</span><span class="text-white font-mono"${_scopeId2}>${ssrInterpolate(formatTime(unref(bookingToCancel).start_time))} - ${ssrInterpolate(formatTime(unref(bookingToCancel).end_time))}</span></div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(bookingToCancel) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("p", { class: "text-slate-300 text-sm" }, "Вы уверены, что хотите принудительно удалить данное бронирование? Место снова станет свободным."),
                      createVNode("div", { class: "rounded-xl bg-slate-800/50 border border-slate-700 p-4 space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-400" }, "Комната ID:"),
                          createVNode("span", { class: "text-white font-medium" }, "#" + toDisplayString(unref(bookingToCancel).room_id), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-400" }, "Дата сессии:"),
                          createVNode("span", { class: "text-white" }, toDisplayString(formatDate(unref(bookingToCancel).booking_date)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-slate-400" }, "Временное окно:"),
                          createVNode("span", { class: "text-white font-mono" }, toDisplayString(formatTime(unref(bookingToCancel).start_time)) + " - " + toDisplayString(formatTime(unref(bookingToCancel).end_time)), 1)
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "w-full max-w-md bg-slate-900 text-white" }, {
                header: withCtx(() => [
                  createVNode("h3", { class: "text-lg font-bold" }, "Отрезвить/Отменить бронь?")
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex gap-3 justify-end" }, [
                    createVNode(_component_UButton, {
                      label: "Оставить",
                      variant: "ghost",
                      onClick: ($event) => isCancelDialogOpen.value = false
                    }, null, 8, ["onClick"]),
                    createVNode(_component_UButton, {
                      label: "Откатить бронирование",
                      color: "error",
                      loading: unref(isCancelling),
                      onClick: confirmCancelBooking
                    }, null, 8, ["loading"])
                  ])
                ]),
                default: withCtx(() => [
                  unref(bookingToCancel) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("p", { class: "text-slate-300 text-sm" }, "Вы уверены, что хотите принудительно удалить данное бронирование? Место снова станет свободным."),
                    createVNode("div", { class: "rounded-xl bg-slate-800/50 border border-slate-700 p-4 space-y-2 text-sm" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-slate-400" }, "Комната ID:"),
                        createVNode("span", { class: "text-white font-medium" }, "#" + toDisplayString(unref(bookingToCancel).room_id), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-slate-400" }, "Дата сессии:"),
                        createVNode("span", { class: "text-white" }, toDisplayString(formatDate(unref(bookingToCancel).booking_date)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-slate-400" }, "Временное окно:"),
                        createVNode("span", { class: "text-white font-mono" }, toDisplayString(formatTime(unref(bookingToCancel).start_time)) + " - " + toDisplayString(formatTime(unref(bookingToCancel).end_time)), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/bookings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=bookings-C42g_AuN.mjs.map

import { a as useSeoMeta, b as useAuth, c as useToast, d as _sfc_main$8, j as _sfc_main$d, e as useRuntimeConfig, f as useComponentProps, g as useAppConfig, h as useFormField, i as useComponentIcons, t as tv, P as Primitive, k as _sfc_main$b, l as looseToNumber } from './server.mjs';
import { _ as _sfc_main$2 } from './Modal-B8NW43lk.mjs';
import { _ as _sfc_main$3 } from './Card-UmGcoIka.mjs';
import { _ as _sfc_main$4 } from './Form-B6u62Erx.mjs';
import { _ as _sfc_main$5 } from './Input-CNMGTHb5.mjs';
import { defineComponent, withAsyncContext, ref, reactive, resolveComponent, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, useSlots, computed, useTemplateRef, watch, nextTick, renderSlot, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { useVModel } from '@vueuse/core';
import { z } from 'zod';
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

const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute start-0 flex items-start",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute end-0 flex items-start",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-sm/4 gap-1",
        "leading": "ps-2 inset-y-1",
        "trailing": "pe-2 inset-y-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-base/5 gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-base/5 gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
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
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "autoresize": {
      "true": {
        "base": "resize-none"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
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
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UTextarea",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    autoresize: { type: Boolean, required: false },
    autoresizeDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    rows: { type: Number, required: false, default: 3 },
    maxrows: { type: Number, required: false, default: 0 },
    highlight: { type: Boolean, required: false },
    fixed: { type: Boolean, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = useSlots();
    const props = useComponentProps("textarea", _props);
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField(_props, { deferInputValidation: true });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.textarea || {} })({
      color: color.value ?? props.color,
      variant: props.variant,
      size: size?.value ?? props.size,
      loading: props.loading,
      highlight: highlight.value ?? props.highlight,
      fixed: props.fixed,
      autoresize: props.autoresize,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing
    }));
    const textareaRef = useTemplateRef("textareaRef");
    function updateInput(value) {
      if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number) {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ||= null;
      }
      if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
        value ||= void 0;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      autoResize();
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    function autoResize() {
      if (props.autoresize && textareaRef.value) {
        textareaRef.value.rows = props.rows;
        const overflow = textareaRef.value.style.overflow;
        textareaRef.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textareaRef.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textareaRef.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textareaRef.value.style.overflow = overflow;
      }
    }
    watch(modelValue, () => {
      nextTick(autoResize);
    });
    __expose({
      textareaRef,
      autoResize
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
              id: unref(id),
              ref_key: "textareaRef",
              ref: textareaRef,
              value: unref(modelValue),
              name: unref(name),
              rows: unref(props).rows,
              placeholder: unref(props).placeholder,
              "data-slot": "base",
              class: ui.value.base({ class: unref(props).ui?.base }),
              disabled: unref(disabled),
              required: unref(props).required
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), "textarea")}${_scopeId}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
            ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!unref(props).avatar || !!slots.leading) {
              _push2(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(props).ui?.leading }))}"${_scopeId}>`);
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
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(props).ui?.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$d, {
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("textarea", mergeProps({
                id: unref(id),
                ref_key: "textareaRef",
                ref: textareaRef,
                value: unref(modelValue),
                name: unref(name),
                rows: unref(props).rows,
                placeholder: unref(props).placeholder,
                "data-slot": "base",
                class: ui.value.base({ class: unref(props).ui?.base }),
                disabled: unref(disabled),
                required: unref(props).required
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "value", "name", "rows", "placeholder", "disabled", "required", "onFocus"]),
              renderSlot(_ctx.$slots, "default", { ui: ui.value }),
              unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: unref(props).ui?.leading })
              }, [
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
                ])
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: unref(props).ui?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                  unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                    key: 0,
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "rooms",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "Комнаты - Администратор"
    });
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const { getAuthHeaders } = useAuth();
    const toast = useToast();
    const { data: rooms, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${apiBase}/rooms`,
      {
        key: "admin-rooms-list",
        default: () => []
      },
      "$budXRxb6hO"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const isCreateModalOpen = ref(false);
    const isCreating = ref(false);
    const createRoomSchema = z.object({
      name: z.string().min(2, "Название должно быть не менее 2 символов"),
      capacity: z.number().min(1, "Вместимость должна быть больше 0"),
      description: z.string().min(5, "Описание должно быть подробнее"),
      image_url: z.string().url("Введите корректный URL картинки").optional().or(z.literal(""))
    });
    const createRoomState = reactive({
      name: "",
      capacity: 4,
      description: "",
      image_url: ""
    });
    const resetCreateForm = () => {
      createRoomState.name = "";
      createRoomState.capacity = 4;
      createRoomState.description = "";
      createRoomState.image_url = "";
    };
    const handleCreateRoom = async (event) => {
      isCreating.value = true;
      try {
        await $fetch(`${apiBase}/rooms`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: event.data
        });
        toast.add({ title: "Успех!", description: "Комната успешно добавлена в систему.", color: "success" });
        isCreateModalOpen.value = false;
        resetCreateForm();
        refresh();
      } catch (err) {
        toast.add({ title: "Ошибка создания", description: err.data?.message || "Не удалось сохранить комнату", color: "error" });
      } finally {
        isCreating.value = false;
      }
    };
    const isDeleteDialogOpen = ref(false);
    const isDeleting = ref(false);
    const roomToDelete = ref(null);
    const openDeleteDialog = (room) => {
      roomToDelete.value = room;
      isDeleteDialogOpen.value = true;
    };
    const confirmDeleteRoom = async () => {
      if (!roomToDelete.value) return;
      isDeleting.value = true;
      try {
        await $fetch(`${apiBase}/rooms/${roomToDelete.value.id}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });
        toast.add({ title: "Удалено", description: "Комната успешно удалена.", color: "success" });
        isDeleteDialogOpen.value = false;
        refresh();
      } catch (err) {
        toast.add({ title: "Ошибка удаления", description: err.data?.message || "Ошибка удаления связи", color: "error" });
      } finally {
        isDeleting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UModal = _sfc_main$2;
      const _component_UCard = _sfc_main$3;
      const _component_UForm = _sfc_main$4;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$5;
      const _component_UTextarea = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><div class="flex justify-between items-center"><div><h1 class="text-2xl font-bold text-white">Список рабочих зон</h1><p class="text-sm text-slate-400">Модерация доступных для бронирования комнат</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        label: "Добавить комнату",
        icon: "i-lucide-plus",
        color: "primary",
        onClick: ($event) => isCreateModalOpen.value = true
      }, null, _parent));
      _push(`</div>`);
      if (unref(status) === "pending") {
        _push(`<div class="text-center py-12 text-slate-400">Загрузка данных...</div>`);
      } else if (!unref(rooms).length) {
        _push(`<div class="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl"> Комнаты не найдены. Создайте первую рабочую зону. </div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(rooms), (room) => {
          _push(`<div class="rounded-2xl bg-slate-900/40 border border-slate-800 overflow-hidden flex flex-col"><div class="h-44 bg-slate-800 flex items-center justify-center overflow-hidden border-b border-slate-800">`);
          if (room.image_url) {
            _push(`<img${ssrRenderAttr("src", room.image_url)} class="w-full h-full object-cover">`);
          } else {
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-image",
              class: "w-12 h-12 text-slate-600"
            }, null, _parent));
          }
          _push(`</div><div class="p-5 flex-1 flex flex-col justify-between space-y-4"><div><div class="flex justify-between items-start"><h3 class="text-lg font-bold text-white">${ssrInterpolate(room.name)}</h3><span class="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-md">ID: ${ssrInterpolate(room.id)}</span></div><p class="text-sm text-slate-400 mt-1 line-clamp-2">${ssrInterpolate(room.description)}</p><div class="flex items-center gap-2 mt-3 text-sm text-slate-300">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-users",
            class: "w-4 h-4 text-indigo-400"
          }, null, _parent));
          _push(`<span>Вместимость: до ${ssrInterpolate(room.capacity)} человек</span></div></div><div class="pt-2 border-t border-slate-800 flex justify-end">`);
          _push(ssrRenderComponent(_component_UButton, {
            label: "Удалить",
            icon: "i-lucide-trash-2",
            color: "error",
            variant: "ghost",
            onClick: ($event) => openDeleteDialog(room)
          }, null, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        open: unref(isCreateModalOpen),
        "onUpdate:open": ($event) => isRef(isCreateModalOpen) ? isCreateModalOpen.value = $event : null
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "w-full max-w-md bg-slate-900 border border-slate-800" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-lg font-bold text-white"${_scopeId2}>Новое пространство</h3>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-lg font-bold text-white" }, "Новое пространство")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UForm, {
                    schema: unref(createRoomSchema),
                    state: unref(createRoomState),
                    class: "space-y-4",
                    onSubmit: handleCreateRoom
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Название комнаты",
                          name: "name"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(createRoomState).name,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).name = $event,
                                placeholder: "Например: Переговорка Альфа"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(createRoomState).name,
                                  "onUpdate:modelValue": ($event) => unref(createRoomState).name = $event,
                                  placeholder: "Например: Переговорка Альфа"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Вместимость (чел.)",
                          name: "capacity"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(createRoomState).capacity,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).capacity = $event,
                                modelModifiers: { number: true },
                                type: "number"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(createRoomState).capacity,
                                  "onUpdate:modelValue": ($event) => unref(createRoomState).capacity = $event,
                                  modelModifiers: { number: true },
                                  type: "number"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Описание",
                          name: "description"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UTextarea, {
                                modelValue: unref(createRoomState).description,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).description = $event,
                                placeholder: "Опишите особенности комнаты..."
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UTextarea, {
                                  modelValue: unref(createRoomState).description,
                                  "onUpdate:modelValue": ($event) => unref(createRoomState).description = $event,
                                  placeholder: "Опишите особенности комнаты..."
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          label: "Ссылка на картинку (URL)",
                          name: "image_url"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(createRoomState).image_url,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).image_url = $event,
                                placeholder: "https://example.com/image.jpg"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(createRoomState).image_url,
                                  "onUpdate:modelValue": ($event) => unref(createRoomState).image_url = $event,
                                  placeholder: "https://example.com/image.jpg"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex gap-3 justify-end pt-4 border-t border-slate-800"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          label: "Отмена",
                          variant: "ghost",
                          onClick: ($event) => isCreateModalOpen.value = false
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          label: "Создать",
                          type: "submit",
                          color: "primary",
                          loading: unref(isCreating)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(_component_UFormGroup, {
                            label: "Название комнаты",
                            name: "name"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(createRoomState).name,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).name = $event,
                                placeholder: "Например: Переговорка Альфа"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Вместимость (чел.)",
                            name: "capacity"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(createRoomState).capacity,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).capacity = $event,
                                modelModifiers: { number: true },
                                type: "number"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Описание",
                            name: "description"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UTextarea, {
                                modelValue: unref(createRoomState).description,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).description = $event,
                                placeholder: "Опишите особенности комнаты..."
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormGroup, {
                            label: "Ссылка на картинку (URL)",
                            name: "image_url"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(createRoomState).image_url,
                                "onUpdate:modelValue": ($event) => unref(createRoomState).image_url = $event,
                                placeholder: "https://example.com/image.jpg"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex gap-3 justify-end pt-4 border-t border-slate-800" }, [
                            createVNode(_component_UButton, {
                              label: "Отмена",
                              variant: "ghost",
                              onClick: ($event) => isCreateModalOpen.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(_component_UButton, {
                              label: "Создать",
                              type: "submit",
                              color: "primary",
                              loading: unref(isCreating)
                            }, null, 8, ["loading"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UForm, {
                      schema: unref(createRoomSchema),
                      state: unref(createRoomState),
                      class: "space-y-4",
                      onSubmit: handleCreateRoom
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UFormGroup, {
                          label: "Название комнаты",
                          name: "name"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(createRoomState).name,
                              "onUpdate:modelValue": ($event) => unref(createRoomState).name = $event,
                              placeholder: "Например: Переговорка Альфа"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Вместимость (чел.)",
                          name: "capacity"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(createRoomState).capacity,
                              "onUpdate:modelValue": ($event) => unref(createRoomState).capacity = $event,
                              modelModifiers: { number: true },
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Описание",
                          name: "description"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UTextarea, {
                              modelValue: unref(createRoomState).description,
                              "onUpdate:modelValue": ($event) => unref(createRoomState).description = $event,
                              placeholder: "Опишите особенности комнаты..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormGroup, {
                          label: "Ссылка на картинку (URL)",
                          name: "image_url"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(createRoomState).image_url,
                              "onUpdate:modelValue": ($event) => unref(createRoomState).image_url = $event,
                              placeholder: "https://example.com/image.jpg"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex gap-3 justify-end pt-4 border-t border-slate-800" }, [
                          createVNode(_component_UButton, {
                            label: "Отмена",
                            variant: "ghost",
                            onClick: ($event) => isCreateModalOpen.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(_component_UButton, {
                            label: "Создать",
                            type: "submit",
                            color: "primary",
                            loading: unref(isCreating)
                          }, null, 8, ["loading"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["schema", "state"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "w-full max-w-md bg-slate-900 border border-slate-800" }, {
                header: withCtx(() => [
                  createVNode("h3", { class: "text-lg font-bold text-white" }, "Новое пространство")
                ]),
                default: withCtx(() => [
                  createVNode(_component_UForm, {
                    schema: unref(createRoomSchema),
                    state: unref(createRoomState),
                    class: "space-y-4",
                    onSubmit: handleCreateRoom
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UFormGroup, {
                        label: "Название комнаты",
                        name: "name"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(createRoomState).name,
                            "onUpdate:modelValue": ($event) => unref(createRoomState).name = $event,
                            placeholder: "Например: Переговорка Альфа"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, {
                        label: "Вместимость (чел.)",
                        name: "capacity"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(createRoomState).capacity,
                            "onUpdate:modelValue": ($event) => unref(createRoomState).capacity = $event,
                            modelModifiers: { number: true },
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, {
                        label: "Описание",
                        name: "description"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UTextarea, {
                            modelValue: unref(createRoomState).description,
                            "onUpdate:modelValue": ($event) => unref(createRoomState).description = $event,
                            placeholder: "Опишите особенности комнаты..."
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, {
                        label: "Ссылка на картинку (URL)",
                        name: "image_url"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(createRoomState).image_url,
                            "onUpdate:modelValue": ($event) => unref(createRoomState).image_url = $event,
                            placeholder: "https://example.com/image.jpg"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-3 justify-end pt-4 border-t border-slate-800" }, [
                        createVNode(_component_UButton, {
                          label: "Отмена",
                          variant: "ghost",
                          onClick: ($event) => isCreateModalOpen.value = false
                        }, null, 8, ["onClick"]),
                        createVNode(_component_UButton, {
                          label: "Создать",
                          type: "submit",
                          color: "primary",
                          loading: unref(isCreating)
                        }, null, 8, ["loading"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["schema", "state"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        open: unref(isDeleteDialogOpen),
        "onUpdate:open": ($event) => isRef(isDeleteDialogOpen) ? isDeleteDialogOpen.value = $event : null
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "w-full max-w-md" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-lg font-bold text-white"${_scopeId2}>Удалить комнату?</h3>`);
                } else {
                  return [
                    createVNode("h3", { class: "text-lg font-bold text-white" }, "Удалить комнату?")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-3 justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: "Отмена",
                    variant: "ghost",
                    onClick: ($event) => isDeleteDialogOpen.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: "Удалить железно",
                    color: "error",
                    loading: unref(isDeleting),
                    onClick: confirmDeleteRoom
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-3 justify-end" }, [
                      createVNode(_component_UButton, {
                        label: "Отмена",
                        variant: "ghost",
                        onClick: ($event) => isDeleteDialogOpen.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_UButton, {
                        label: "Удалить железно",
                        color: "error",
                        loading: unref(isDeleting),
                        onClick: confirmDeleteRoom
                      }, null, 8, ["loading"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-slate-300"${_scopeId2}>Вы действительно хотите удалить <b${_scopeId2}>${ssrInterpolate(unref(roomToDelete)?.name)}</b>? Все существующие бронирования для этой комнаты также сотрутся.</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-slate-300" }, [
                      createTextVNode("Вы действительно хотите удалить "),
                      createVNode("b", null, toDisplayString(unref(roomToDelete)?.name), 1),
                      createTextVNode("? Все существующие бронирования для этой комнаты также сотрутся.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "w-full max-w-md" }, {
                header: withCtx(() => [
                  createVNode("h3", { class: "text-lg font-bold text-white" }, "Удалить комнату?")
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex gap-3 justify-end" }, [
                    createVNode(_component_UButton, {
                      label: "Отмена",
                      variant: "ghost",
                      onClick: ($event) => isDeleteDialogOpen.value = false
                    }, null, 8, ["onClick"]),
                    createVNode(_component_UButton, {
                      label: "Удалить железно",
                      color: "error",
                      loading: unref(isDeleting),
                      onClick: confirmDeleteRoom
                    }, null, 8, ["loading"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("p", { class: "text-slate-300" }, [
                    createTextVNode("Вы действительно хотите удалить "),
                    createVNode("b", null, toDisplayString(unref(roomToDelete)?.name), 1),
                    createTextVNode("? Все существующие бронирования для этой комнаты также сотрутся.")
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/rooms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=rooms-stPXrDHj.mjs.map

import { a as useSeoMeta, b as useAuth, c as useToast, n as navigateTo, o as __nuxt_component_0, j as _sfc_main$d, d as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-UmGcoIka.mjs';
import { _ as _sfc_main$2 } from './Form-B6u62Erx.mjs';
import { _ as _sfc_main$3 } from './FormField-Djsyhjw7.mjs';
import { _ as _sfc_main$4 } from './Input-CNMGTHb5.mjs';
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { z } from 'zod';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Вход - CoWork Space"
    });
    const { login, register, isAuthenticated } = useAuth();
    const toast = useToast();
    if (isAuthenticated.value) {
      navigateTo("/");
    }
    const isSignUp = ref(false);
    const isLoading = ref(false);
    const schema = z.object({
      email: z.string().email("Пожалуйста, введите корректный адрес электронной почты"),
      password: z.string().min(6, "Пароль должен состоять минимум из 6 символов")
    });
    const state = reactive({
      email: "",
      password: ""
    });
    const toggleMode = () => {
      isSignUp.value = !isSignUp.value;
    };
    async function onSubmit(event) {
      isLoading.value = true;
      try {
        if (isSignUp.value) {
          await register(event.data.email, event.data.password);
          toast.add({
            title: "Аккаунт создан!",
            description: "Добро пожаловать в CoWork Space.",
            color: "success",
            icon: "i-lucide-check-circle"
          });
        } else {
          await login(event.data.email, event.data.password);
          toast.add({
            title: "С возвращением!",
            description: "Вы успешно вошли в систему.",
            color: "success",
            icon: "i-lucide-check-circle"
          });
        }
        navigateTo("/");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ошибка авторизации. Попробуйте ещё раз.";
        toast.add({
          title: "Ошибка",
          description: errorMessage,
          color: "error",
          icon: "i-lucide-alert-circle"
        });
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UApp = __nuxt_component_0;
      const _component_UIcon = _sfc_main$d;
      const _component_UCard = _sfc_main$1;
      const _component_UForm = _sfc_main$2;
      const _component_UFormField = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UApp, mergeProps({ ui: { colors: { primary: "indigo", neutral: "slate" } } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-slate-950 flex items-center justify-center p-4"${_scopeId}><div class="w-full max-w-md"${_scopeId}><div class="text-center mb-8"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-building-2",
              class: "w-8 h-8 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-2xl font-bold text-white"${_scopeId}>CoWork Space</h1><p class="text-slate-400 mt-1"${_scopeId}>Забронируйте идеальное рабочее пространство</p></div>`);
            _push2(ssrRenderComponent(_component_UCard, { class: "bg-slate-900/50 border-slate-800" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-2 p-1 bg-slate-800/50 rounded-lg"${_scopeId2}><button type="button" class="${ssrRenderClass([!unref(isSignUp) ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white", "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"])}"${_scopeId2}> Вход </button><button type="button" class="${ssrRenderClass([unref(isSignUp) ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white", "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"])}"${_scopeId2}> Регистрация </button></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-2 p-1 bg-slate-800/50 rounded-lg" }, [
                      createVNode("button", {
                        type: "button",
                        class: ["flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all", !unref(isSignUp) ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"],
                        onClick: ($event) => isSignUp.value = false
                      }, " Вход ", 10, ["onClick"]),
                      createVNode("button", {
                        type: "button",
                        class: ["flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all", unref(isSignUp) ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"],
                        onClick: ($event) => isSignUp.value = true
                      }, " Регистрация ", 10, ["onClick"])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-center text-sm text-slate-400"${_scopeId2}>${ssrInterpolate(unref(isSignUp) ? "Уже есть аккаунт?" : "Нет аккаунта?")} <button type="button" class="text-indigo-400 hover:text-indigo-300 font-medium ml-1"${_scopeId2}>${ssrInterpolate(unref(isSignUp) ? "Войти" : "Зарегистрироваться")}</button></p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-center text-sm text-slate-400" }, [
                      createTextVNode(toDisplayString(unref(isSignUp) ? "Уже есть аккаунт?" : "Нет аккаунта?") + " ", 1),
                      createVNode("button", {
                        type: "button",
                        class: "text-indigo-400 hover:text-indigo-300 font-medium ml-1",
                        onClick: toggleMode
                      }, toDisplayString(unref(isSignUp) ? "Войти" : "Зарегистрироваться"), 1)
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UForm, {
                    schema: unref(schema),
                    state: unref(state),
                    class: "space-y-6",
                    onSubmit
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UFormField, {
                          name: "email",
                          label: "Адрес эл. почты"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(state).email,
                                "onUpdate:modelValue": ($event) => unref(state).email = $event,
                                type: "email",
                                placeholder: "you@example.com",
                                icon: "i-lucide-mail",
                                size: "lg",
                                class: "bg-slate-800/50"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(state).email,
                                  "onUpdate:modelValue": ($event) => unref(state).email = $event,
                                  type: "email",
                                  placeholder: "you@example.com",
                                  icon: "i-lucide-mail",
                                  size: "lg",
                                  class: "bg-slate-800/50"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          name: "password",
                          label: "Пароль"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: "password",
                                placeholder: "Введите пароль",
                                icon: "i-lucide-lock",
                                size: "lg",
                                class: "bg-slate-800/50"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(state).password,
                                  "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                  type: "password",
                                  placeholder: "Введите пароль",
                                  icon: "i-lucide-lock",
                                  size: "lg",
                                  class: "bg-slate-800/50"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          type: "submit",
                          label: unref(isSignUp) ? "Создать аккаунт" : "Войти",
                          loading: unref(isLoading),
                          block: "",
                          size: "lg",
                          class: "mt-6"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UFormField, {
                            name: "email",
                            label: "Адрес эл. почты"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(state).email,
                                "onUpdate:modelValue": ($event) => unref(state).email = $event,
                                type: "email",
                                placeholder: "you@example.com",
                                icon: "i-lucide-mail",
                                size: "lg",
                                class: "bg-slate-800/50"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            name: "password",
                            label: "Пароль"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: "password",
                                placeholder: "Введите пароль",
                                icon: "i-lucide-lock",
                                size: "lg",
                                class: "bg-slate-800/50"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UButton, {
                            type: "submit",
                            label: unref(isSignUp) ? "Создать аккаунт" : "Войти",
                            loading: unref(isLoading),
                            block: "",
                            size: "lg",
                            class: "mt-6"
                          }, null, 8, ["label", "loading"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UForm, {
                      schema: unref(schema),
                      state: unref(state),
                      class: "space-y-6",
                      onSubmit
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UFormField, {
                          name: "email",
                          label: "Адрес эл. почты"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).email,
                              "onUpdate:modelValue": ($event) => unref(state).email = $event,
                              type: "email",
                              placeholder: "you@example.com",
                              icon: "i-lucide-mail",
                              size: "lg",
                              class: "bg-slate-800/50"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormField, {
                          name: "password",
                          label: "Пароль"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).password,
                              "onUpdate:modelValue": ($event) => unref(state).password = $event,
                              type: "password",
                              placeholder: "Введите пароль",
                              icon: "i-lucide-lock",
                              size: "lg",
                              class: "bg-slate-800/50"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          type: "submit",
                          label: unref(isSignUp) ? "Создать аккаунт" : "Войти",
                          loading: unref(isLoading),
                          block: "",
                          size: "lg",
                          class: "mt-6"
                        }, null, 8, ["label", "loading"])
                      ]),
                      _: 1
                    }, 8, ["schema", "state"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mt-6 p-4 rounded-lg bg-slate-800/30 border border-slate-700"${_scopeId}><div class="flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-info",
              class: "w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5"
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-sm"${_scopeId}><p class="text-slate-300 font-medium"${_scopeId}>Демо-режим</p><p class="text-slate-400 mt-1"${_scopeId}> Этот интерфейс подключается к API по адресу <code class="text-indigo-400"${_scopeId}>localhost:5000</code>. Убедитесь, что сервер бэкенда запущен. </p></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-slate-950 flex items-center justify-center p-4" }, [
                createVNode("div", { class: "w-full max-w-md" }, [
                  createVNode("div", { class: "text-center mb-8" }, [
                    createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-4" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-building-2",
                        class: "w-8 h-8 text-white"
                      })
                    ]),
                    createVNode("h1", { class: "text-2xl font-bold text-white" }, "CoWork Space"),
                    createVNode("p", { class: "text-slate-400 mt-1" }, "Забронируйте идеальное рабочее пространство")
                  ]),
                  createVNode(_component_UCard, { class: "bg-slate-900/50 border-slate-800" }, {
                    header: withCtx(() => [
                      createVNode("div", { class: "flex gap-2 p-1 bg-slate-800/50 rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          class: ["flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all", !unref(isSignUp) ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"],
                          onClick: ($event) => isSignUp.value = false
                        }, " Вход ", 10, ["onClick"]),
                        createVNode("button", {
                          type: "button",
                          class: ["flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all", unref(isSignUp) ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"],
                          onClick: ($event) => isSignUp.value = true
                        }, " Регистрация ", 10, ["onClick"])
                      ])
                    ]),
                    footer: withCtx(() => [
                      createVNode("p", { class: "text-center text-sm text-slate-400" }, [
                        createTextVNode(toDisplayString(unref(isSignUp) ? "Уже есть аккаунт?" : "Нет аккаунта?") + " ", 1),
                        createVNode("button", {
                          type: "button",
                          class: "text-indigo-400 hover:text-indigo-300 font-medium ml-1",
                          onClick: toggleMode
                        }, toDisplayString(unref(isSignUp) ? "Войти" : "Зарегистрироваться"), 1)
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_UForm, {
                        schema: unref(schema),
                        state: unref(state),
                        class: "space-y-6",
                        onSubmit
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UFormField, {
                            name: "email",
                            label: "Адрес эл. почты"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(state).email,
                                "onUpdate:modelValue": ($event) => unref(state).email = $event,
                                type: "email",
                                placeholder: "you@example.com",
                                icon: "i-lucide-mail",
                                size: "lg",
                                class: "bg-slate-800/50"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            name: "password",
                            label: "Пароль"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: "password",
                                placeholder: "Введите пароль",
                                icon: "i-lucide-lock",
                                size: "lg",
                                class: "bg-slate-800/50"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UButton, {
                            type: "submit",
                            label: unref(isSignUp) ? "Создать аккаунт" : "Войти",
                            loading: unref(isLoading),
                            block: "",
                            size: "lg",
                            class: "mt-6"
                          }, null, 8, ["label", "loading"])
                        ]),
                        _: 1
                      }, 8, ["schema", "state"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "mt-6 p-4 rounded-lg bg-slate-800/30 border border-slate-700" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-info",
                        class: "w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5"
                      }),
                      createVNode("div", { class: "text-sm" }, [
                        createVNode("p", { class: "text-slate-300 font-medium" }, "Демо-режим"),
                        createVNode("p", { class: "text-slate-400 mt-1" }, [
                          createTextVNode(" Этот интерфейс подключается к API по адресу "),
                          createVNode("code", { class: "text-indigo-400" }, "localhost:5000"),
                          createTextVNode(". Убедитесь, что сервер бэкенда запущен. ")
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-Dji5wY_z.mjs.map

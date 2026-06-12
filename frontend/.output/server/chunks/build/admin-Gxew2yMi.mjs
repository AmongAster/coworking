import { H as executeAsync } from '../nitro/nitro.mjs';
import { a8 as defineNuxtRouteMiddleware, b as useAuth, n as navigateTo } from './server.mjs';
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
import 'vue';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'vue/server-renderer';
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

const admin = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const auth = useAuth();
  if (auth.token.value && !auth.user.value && typeof auth.fetchCurrentUser === "function") {
    [__temp, __restore] = executeAsync(() => auth.fetchCurrentUser()), await __temp, __restore();
  }
  if (!auth.isAdmin.value) {
    console.warn(`Доступ к ${to.path} заблокирован: нет прав администратора.`);
    return navigateTo("/");
  }
});

export { admin as default };
//# sourceMappingURL=admin-Gxew2yMi.mjs.map

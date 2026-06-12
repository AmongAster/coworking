<template>
  <UApp :ui="{ colors: { primary: 'indigo', neutral: 'slate' } }">
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UToaster />
    
  </UApp>
</template>

<script setup lang="ts">
const { initAuth } = useAuth()

// Этот блок сработает строго в браузере при первой загрузке или обновлении (F5)
// Он мгновенно прочитает токен из кук и восстановит роль админа ДО того, как middleware сделает редирект
if (import.meta.client) {
  initAuth()
}
</script>
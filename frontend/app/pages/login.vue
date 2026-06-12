<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Вход - CoWork Space'
})

const { login, register, isAuthenticated } = useAuth()
const toast = useToast()

// Редирект, если уже авторизован
if (isAuthenticated.value) {
  navigateTo('/')
}

const isSignUp = ref(false)
const isLoading = ref(false)

const schema = z.object({
  email: z.string().email('Пожалуйста, введите корректный адрес электронной почты'),
  password: z.string().min(6, 'Пароль должен состоять минимум из 6 символов')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  email: '',
  password: ''
})

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  
  try {
    if (isSignUp.value) {
      await register(event.data.email, event.data.password)
      toast.add({
        title: 'Аккаунт создан!',
        description: 'Добро пожаловать в CoWork Space.',
        color: 'success',
        icon: 'i-lucide-check-circle'
      })
    } else {
      await login(event.data.email, event.data.password)
      toast.add({
        title: 'С возвращением!',
        description: 'Вы успешно вошли в систему.',
        color: 'success',
        icon: 'i-lucide-check-circle'
      })
    }
    navigateTo('/')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка авторизации. Попробуйте ещё раз.'
    toast.add({
      title: 'Ошибка',
      description: errorMessage,
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UApp :ui="{ colors: { primary: 'indigo', neutral: 'slate' } }">
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Логотип / Брендинг -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/20 mb-4 bg-slate-900 border border-slate-800">
            <img src="/cowork_logo.png" class="w-full h-full object-cover" />
          </div>
          <h1 class="text-2xl font-bold text-white">CoWork Space</h1>
          <p class="text-slate-400 mt-1">Забронируйте идеальное рабочее пространство</p>
        </div>
        
        <!-- Карточка авторизации -->
        <UCard class="bg-slate-900/50 border-slate-800">
          <template #header>
            <div class="flex gap-2 p-1 bg-slate-800/50 rounded-lg">
              <button
                type="button"
                class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"
                :class="!isSignUp ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'"
                @click="isSignUp = false"
              >
                Вход
              </button>
              <button
                type="button"
                class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"
                :class="isSignUp ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'"
                @click="isSignUp = true"
              >
                Регистрация
              </button>
            </div>
          </template>
          
          <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
            <UFormField name="email" label="Адрес эл. почты">
              <UInput
                v-model="state.email"
                type="email"
                placeholder="you@example.com"
                icon="i-lucide-mail"
                size="lg"
                class="bg-slate-800/50"
              />
            </UFormField>
            
            <UFormField name="password" label="Пароль">
              <UInput
                v-model="state.password"
                type="password"
                placeholder="Введите пароль"
                icon="i-lucide-lock"
                size="lg"
                class="bg-slate-800/50"
              />
            </UFormField>
            
            <UButton
              type="submit"
              :label="isSignUp ? 'Создать аккаунт' : 'Войти'"
              :loading="isLoading"
              block
              size="lg"
              class="mt-6"
            />
          </UForm>
          
          <template #footer>
            <p class="text-center text-sm text-slate-400">
              {{ isSignUp ? 'Уже есть аккаунт?' : "Нет аккаунта?" }}
              <button
                type="button"
                class="text-indigo-400 hover:text-indigo-300 font-medium ml-1"
                @click="toggleMode"
              >
                {{ isSignUp ? 'Войти' : 'Зарегистрироваться' }}
              </button>
            </p>
          </template>
        </UCard>
        
        <!-- Уведомление о демо-режиме -->
        <div class="mt-6 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-info" class="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div class="text-sm">
              <p class="text-slate-300 font-medium">Демо-режим</p>
              <p class="text-slate-400 mt-1">
                Этот интерфейс подключается к API по адресу <code class="text-indigo-400">localhost:5000</code>. 
                Убедитесь, что сервер бэкенда запущен.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UApp>
</template>

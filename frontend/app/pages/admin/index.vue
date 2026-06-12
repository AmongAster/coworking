<script setup lang="ts">
import type { Room, Booking, User } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'Обзор Панели Управления'
})

useSeoMeta({
  title: 'Админ-панель - CoWork Space'
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { getAuthHeaders } = useAuth()

// Получаем актуальные данные из новой БД tessst
const { data: rooms, status: roomsStatus } = await useFetch<Room[]>(`${apiBase}/rooms`, {
  key: 'admin-rooms',
  default: () => []
})

const { data: bookings, status: bookingsStatus } = await useFetch<Booking[]>(`${apiBase}/bookings`, {
  key: 'admin-bookings',
  headers: getAuthHeaders(),
  default: () => []
})

const { data: users } = await useFetch<User[]>(`${apiBase}/users`, {
  key: 'admin-users',
  headers: getAuthHeaders(),
  default: () => []
})

// Вычисление метрик статистики
const totalRooms = computed(() => rooms.value?.length || 0)
const totalBookings = computed(() => bookings.value?.length || 0)
const totalUsers = computed(() => users.value?.length || 0)

const todayBookings = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return bookings.value?.filter(b => b.booking_date === today) || []
})

const occupancyRate = computed(() => {
  if (!totalRooms.value) return 0
  return Math.min(Math.round((todayBookings.value.length / totalRooms.value) * 100), 100)
})
</script>

<template>
  <div class="space-y-8 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <UIcon name="i-lucide-door-closed" class="size-6 text-indigo-400" />
        </div>
        <div>
          <p class="text-sm text-slate-400">Всего комнат</p>
          <h3 class="text-2xl font-bold text-white">{{ totalRooms }}</h3>
        </div>
      </div>

      <div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <UIcon name="i-lucide-calendar-days" class="size-6 text-emerald-400" />
        </div>
        <div>
          <p class="text-sm text-slate-400">Бронирований всего</p>
          <h3 class="text-2xl font-bold text-white">{{ totalBookings }}</h3>
        </div>
      </div>

      <div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <UIcon name="i-lucide-users" class="size-6 text-amber-400" />
        </div>
        <div>
          <p class="text-sm text-slate-400">Пользователей</p>
          <h3 class="text-2xl font-bold text-white">{{ totalUsers }}</h3>
        </div>
      </div>

      <div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <UIcon name="i-lucide-pie-chart" class="size-6 text-violet-400" />
        </div>
        <div>
          <p class="text-sm text-slate-400">Загруженность (сегодня)</p>
          <h3 class="text-2xl font-bold text-white">{{ occupancyRate }}%</h3>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink to="/admin/rooms" class="group">
        <div class="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 hover:border-indigo-500/50 transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UIcon name="i-lucide-plus" class="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">Управление комнатами</h3>
              <p class="text-sm text-slate-400">Добавление, изменение и удаление рабочих пространств</p>
            </div>
          </div>
        </div>
      </NuxtLink>
      
      <NuxtLink to="/admin/bookings" class="group">
        <div class="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UIcon name="i-lucide-list-checks" class="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">Журнал бронирований</h3>
              <p class="text-sm text-slate-400">Просмотр текущих сессий и отмена активных броней</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
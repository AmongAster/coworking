<script setup lang="ts">
import type { Room, Booking } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'Управление бронированиями'
})

useSeoMeta({
  title: 'Журнал бронирований - Админ'
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { getAuthHeaders } = useAuth()
const toast = useToast()

// Получаем список всех бронирований из новой схемы tessst
const { data: bookings, status, refresh } = await useFetch<Booking[]>(`${apiBase}/bookings`, {
  key: 'admin-all-bookings',
  headers: getAuthHeaders(),
  default: () => []
})

// Подтягиваем комнаты для фильтра
const { data: rooms } = await useFetch<Room[]>(`${apiBase}/rooms`, {
  key: 'admin-rooms-filter',
  default: () => []
})

// Фильтры на панели управления
const selectedRoom = ref<number | null>(null)
const selectedDate = ref<string>('')

const filteredBookings = computed(() => {
  if (!bookings.value) return []
  
  return bookings.value.filter(booking => {
    const matchesRoom = !selectedRoom.value || booking.room_id === selectedRoom.value
    const matchesDate = !selectedDate.value || booking.booking_date.includes(selectedDate.value)
    return matchesRoom && matchesDate
  }).sort((a, b) => {
    return new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
  })
})

// Красивое форматирование даты
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
}

// Форматирование времени (отсекаем лишние секунды из MySQL формата hh:mm:ss)
const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  return timeStr.substring(0, 5)
}

// Отмена/Снятие бронирования
const isCancelDialogOpen = ref(false)
const isCancelling = ref(false)
const bookingToCancel = ref<Booking | null>(null)

const openCancelDialog = (booking: Booking) => {
  bookingToCancel.value = booking
  isCancelDialogOpen.value = true
}

const confirmCancelBooking = async () => {
  if (!bookingToCancel.value) return
  isCancelling.value = true
  try {
    await $fetch(`${apiBase}/bookings/${bookingToCancel.value.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    toast.add({ title: 'Успешно', description: 'Бронирование аннулировано.', color: 'success' })
    isCancelDialogOpen.value = false
    refresh()
  } catch (err: any) {
    toast.add({ title: 'Ошибка отмены', description: err.data?.message || 'Не удалось удалить запись', color: 'error' })
  } finally {
    isCancelling.value = false
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white">Журнал бронирований</h1>
      <p class="text-sm text-slate-400">Полный список активных и прошедших сессий коворкинга</p>
    </div>

    <div class="flex flex-wrap gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
      <div class="w-64">
        <label class="block text-xs font-medium text-slate-400 mb-1">Фильтр по комнате</label>
        <select v-model="selectedRoom" class="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500">
          <option :value="null">Все пространства</option>
          <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.name }}</option>
        </select>
      </div>

      <div class="w-64">
        <label class="block text-xs font-medium text-slate-400 mb-1">Фильтр по дате</label>
        <input type="date" v-model="selectedDate" class="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-indigo-500" />
      </div>
    </div>

    <div v-if="status === 'pending'" class="text-center py-8 text-slate-400">Получение логов...</div>
    <div v-else class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/20">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-sm">
            <th class="p-4">ID</th>
            <th class="p-4">Пользователь (ID)</th>
            <th class="p-4">Комната</th>
            <th class="p-4">Дата</th>
            <th class="p-4">Время</th>
            <th class="p-4 text-right">Действия</th>
          </tr>
        </thead>
        <tbody class="text-slate-300 text-sm divide-y divide-slate-800">
          <tr v-for="booking in filteredBookings" :key="booking.id" class="hover:bg-slate-900/30 transition-colors">
            <td class="p-4 font-mono text-slate-500">#{{ booking.id }}</td>
            <td class="p-4 font-medium text-white">User ID: {{ booking.user_id }}</td>
            <td class="p-4">Комната #{{ booking.room_id }}</td>
            <td class="p-4">{{ formatDate(booking.booking_date) }}</td>
            <td class="p-4 text-indigo-400 font-medium">
              {{ formatTime(booking.start_time) }} - {{ formatTime(booking.end_time) }}
            </td>
            <td class="p-4 text-right">
              <UButton label="Отменить бронь" size="sm" color="error" variant="ghost" icon="i-lucide-calendar-x" @click="openCancelDialog(booking)" />
            </td>
          </tr>
          <tr v-if="!filteredBookings.length">
            <td colspan="6" class="p-8 text-center text-slate-500">Записей бронирования по заданным фильтрам не найдено.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <UModal v-model:open="isCancelDialogOpen">
      <template #content>
        <UCard class="w-full max-w-md bg-slate-900 text-white">
          <template #header>
            <h3 class="text-lg font-bold">Отрезвить/Отменить бронь?</h3>
          </template>
          <div v-if="bookingToCancel" class="space-y-4">
            <p class="text-slate-300 text-sm">Вы уверены, что хотите принудительно удалить данное бронирование? Место снова станет свободным.</p>
            <div class="rounded-xl bg-slate-800/50 border border-slate-700 p-4 space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-slate-400">Комната ID:</span><span class="text-white font-medium">#{{ bookingToCancel.room_id }}</span></div>
              <div class="flex justify-between"><span class="text-slate-400">Дата сессии:</span><span class="text-white">{{ formatDate(bookingToCancel.booking_date) }}</span></div>
              <div class="flex justify-between"><span class="text-slate-400">Временное окно:</span><span class="text-white font-mono">{{ formatTime(bookingToCancel.start_time) }} - {{ formatTime(bookingToCancel.end_time) }}</span></div>
            </div>
          </div>
          <template #footer>
            <div class="flex gap-3 justify-end">
              <UButton label="Оставить" variant="ghost" @click="isCancelDialogOpen = false" />
              <UButton label="Откатить бронирование" color="error" :loading="isCancelling" @click="confirmCancelBooking" />
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
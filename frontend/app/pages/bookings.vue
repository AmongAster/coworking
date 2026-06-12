<script setup lang="ts">
import type { Booking } from '~/types'

definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Мои бронирования - CoWork Space'
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { user, logout, getAuthHeaders } = useAuth()
const toast = useToast()

// Получение бронирований текущего пользователя
const { data: bookings, status: bookingsStatus, refresh: refreshBookings } = await useFetch<Booking[]>(`${apiBase}/bookings/my`, {
  key: 'my-bookings',
  headers: getAuthHeaders(),
  default: () => []
})

const cancellingId = ref<number | null>(null)

const cancelBooking = async (booking: Booking) => {
  cancellingId.value = booking.id
  
  try {
    await $fetch(`${apiBase}/bookings/${booking.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    
    toast.add({
      title: 'Бронирование отменено',
      description: 'Ваше бронирование было успешно отменено.',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    
    refreshBookings()
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Не удалось отменить бронирование'
    toast.add({
      title: 'Ошибка',
      description: errorMessage,
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    cancellingId.value = null
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  return `${hours}:${minutes || '00'}`
}

const isUpcoming = (booking: Booking) => {
  const bookingDate = new Date(booking.booking_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return bookingDate >= today
}

const upcomingBookings = computed(() => 
  bookings.value?.filter(b => isUpcoming(b)).sort((a, b) => 
    new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime()
  ) || []
)

const pastBookings = computed(() => 
  bookings.value?.filter(b => !isUpcoming(b)).sort((a, b) => 
    new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
  ) || []
)

const userMenuItems = computed(() => [
  [
    {
      label: user.value?.email || 'Пользователь',
      slot: 'account',
      disabled: true
    }
  ],
  [
    {
      label: 'Каталог комнат',
      icon: 'i-lucide-layout-grid',
      to: '/'
    }
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      color: 'error' as const,
      onSelect: () => logout()
    }
  ]
])
</script>

<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Шапка (Header) -->
    <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Логотип -->
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <UIcon name="i-lucide-building-2" class="w-5 h-5 text-white" />
            </div>
            <span class="font-bold text-white text-lg hidden sm:block">CoWork Space</span>
          </NuxtLink>
          
          <!-- Правая сторона -->
          <div class="flex items-center gap-4">
            <NuxtLink to="/">
              <UButton
                label="Каталог комнат"
                variant="ghost"
                icon="i-lucide-layout-grid"
                class="hidden sm:flex"
              />
            </NuxtLink>
            
            <UDropdownMenu :items="userMenuItems">
              <UButton variant="ghost" class="p-0">
                <UAvatar 
                  :src="`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email || 'user'}`"
                  :alt="user?.email || 'User'" 
                  size="sm"
                  class="bg-slate-900 border border-slate-800"
                />
              </UButton>
              
              <template #account>
                <div class="px-2 py-1.5">
                  <p class="text-sm font-medium text-white truncate">{{ user?.email }}</p>
                  <p class="text-xs text-slate-400">{{ user?.role === 'admin' ? 'Администратор' : 'Пользователь' }}</p>
                </div>
              </template>
            </UDropdownMenu>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Основное содержимое -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Заголовок страницы -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white">Мои бронирования</h1>
          <p class="text-slate-400 mt-1">Управляйте вашими бронированиями рабочих мест</p>
        </div>
        <UButton
          icon="i-lucide-refresh-cw"
          variant="outline"
          @click="refreshBookings()"
        />
      </div>
      
      <!-- Загрузка -->
      <div v-if="bookingsStatus === 'pending'" class="space-y-4">
        <USkeleton v-for="i in 3" :key="i" class="h-32 rounded-xl" />
      </div>
      
      <!-- Пустое состояние -->
      <UEmpty
        v-else-if="!bookings?.length"
        icon="i-lucide-calendar-x"
        title="Нет бронирований"
        description="Вы ещё не забронировали ни одного помещения. Перейдите в каталог, чтобы начать."
        class="py-16"
      >
        <template #actions>
          <NuxtLink to="/">
            <UButton label="Каталог комнат" icon="i-lucide-layout-grid" />
          </NuxtLink>
        </template>
      </UEmpty>
      
      <template v-else>
        <!-- Предстоящие бронирования -->
        <section v-if="upcomingBookings.length > 0" class="mb-12">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-lucide-calendar-check" class="w-5 h-5 text-indigo-400" />
            <h2 class="text-xl font-semibold text-white">Предстоящие</h2>
            <UBadge :label="String(upcomingBookings.length)" color="primary" variant="subtle" />
          </div>
          
          <div class="space-y-4">
            <UCard
              v-for="booking in upcomingBookings"
              :key="booking.id"
              class="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-building" class="w-7 h-7 text-indigo-400" />
                  </div>
                  
                  <div>
                    <h3 class="font-semibold text-white text-lg">
                      {{ booking.room_name || `Комната #${booking.room_id}` }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-400">
                      <span class="flex items-center gap-1.5">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        {{ formatDate(booking.booking_date) }}
                      </span>
                      <span class="flex items-center gap-1.5">
                        <UIcon name="i-lucide-clock" class="w-4 h-4" />
                        {{ formatTime(booking.start_time) }} - {{ formatTime(booking.end_time) }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <UButton
                  label="Отменить"
                  color="error"
                  variant="soft"
                  icon="i-lucide-x"
                  :loading="cancellingId === booking.id"
                  @click="cancelBooking(booking)"
                />
              </div>
            </UCard>
          </div>
        </section>
        
        <!-- Прошедшие бронирования -->
        <section v-if="pastBookings.length > 0">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-lucide-history" class="w-5 h-5 text-slate-500" />
            <h2 class="text-xl font-semibold text-slate-400">Прошедшие</h2>
            <UBadge :label="String(pastBookings.length)" color="neutral" variant="subtle" />
          </div>
          
          <div class="space-y-4">
            <UCard
              v-for="booking in pastBookings"
              :key="booking.id"
              class="bg-slate-900/30 border-slate-800/50 opacity-60"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-building" class="w-6 h-6 text-slate-500" />
                </div>
                
                <div>
                  <h3 class="font-medium text-slate-300">
                    {{ booking.room_name || `Комната #${booking.room_id}` }}
                  </h3>
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                    <span class="flex items-center gap-1.5">
                      <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                      {{ formatDate(booking.booking_date) }}
                    </span>
                    <span class="flex items-center gap-1.5">
                      <UIcon name="i-lucide-clock" class="w-4 h-4" />
                      {{ formatTime(booking.start_time) }} - {{ formatTime(booking.end_time) }}
                    </span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '~/types'

useSeoMeta({
  title: 'Каталог комнат - CoWork Space'
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { user, isAuthenticated, isAdmin, logout, getAuthHeaders } = useAuth()

// Получение списка комнат
const { data: rooms, status: roomsStatus, refresh: refreshRooms } = await useFetch<Room[]>(`${apiBase}/rooms`, {
  key: 'rooms',
  default: () => []
})

// Поиск и фильтрация
const searchQuery = ref('')
const capacityFilter = ref<number | null>(null)
const sortBy = ref<'name_asc' | 'name_desc' | 'capacity_asc' | 'capacity_desc' | null>(null)

const filteredRooms = computed(() => {
  if (!rooms.value) return []
  
  const result = rooms.value.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          room.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCapacity = !capacityFilter.value || room.capacity >= capacityFilter.value
    return matchesSearch && matchesCapacity
  })

  if (sortBy.value === 'name_asc') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'name_desc') {
    result.sort((a, b) => b.name.localeCompare(a.name))
  } else if (sortBy.value === 'capacity_asc') {
    result.sort((a, b) => a.capacity - b.capacity)
  } else if (sortBy.value === 'capacity_desc') {
    result.sort((a, b) => b.capacity - a.capacity)
  }
  
  return result
})

// Состояние модального окна бронирования
const isBookingModalOpen = ref(false)
const selectedRoom = ref<Room | null>(null)

const openBookingModal = (room: Room) => {
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }
  selectedRoom.value = room
  isBookingModalOpen.value = true
}

const capacityOptions = [
  { label: 'Любая вместимость', value: null },
  { label: '2+ человек', value: 2 },
  { label: '4+ человек', value: 4 },
  { label: '6+ человек', value: 6 },
  { label: '10+ человек', value: 10 }
]

const sortOptions = [
  { label: 'По умолчанию', value: null },
  { label: 'Название (А-Я)', value: 'name_asc' },
  { label: 'Название (Я-А)', value: 'name_desc' },
  { label: 'Вместимость (меньше - больше)', value: 'capacity_asc' },
  { label: 'Вместимость (больше - меньше)', value: 'capacity_desc' }
]

const userMenuItems = computed(() => [
  [
    {
      label: user.value?.email || 'Пользователь',
      slot: 'account',
      disabled: true
    }
  ],
  ...(isAdmin.value ? [[
    {
      label: 'Админ-панель',
      icon: 'i-lucide-shield',
      to: '/admin'
    }
  ]] : []),
  [
    {
      label: 'Мои бронирования',
      icon: 'i-lucide-calendar',
      to: '/bookings'
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
  <div class="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
    <div class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

    <header class="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-900 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
              <img src="/cowork_logo.png" class="w-full h-full object-cover" />
            </div>
            <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 text-lg hidden sm:block tracking-wide">
              CoWork <span class="text-indigo-400">Space</span>
            </span>
          </NuxtLink>
          
          <div class="flex items-center gap-4">
            <template v-if="isAuthenticated">
              <NuxtLink to="/bookings">
                <UButton
                  label="Мои бронирования"
                  variant="ghost"
                  icon="i-lucide-calendar"
                  class="hidden sm:flex text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-xl transition-all"
                />
              </NuxtLink>
              
              <UDropdownMenu :items="userMenuItems" :ui="{ content: 'bg-slate-900 border border-slate-800/80 rounded-xl shadow-2xl p-1' }">
                <UButton variant="ghost" class="p-0 hover:bg-transparent rounded-full focus-visible:ring-2 focus-visible:ring-indigo-500">
                  <div class="p-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 transition-all">
                    <UAvatar 
                      :src="`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email || 'user'}`"
                      :alt="user?.email || 'User'" 
                      size="sm"
                      class="bg-slate-950 text-slate-200"
                    />
                  </div>
                </UButton>
                
                <template #account>
                  <div class="px-3 py-2 border-b border-slate-800/60 mb-1">
                    <p class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Аккаунт</p>
                    <p class="text-sm font-medium text-white truncate mt-0.5">{{ user?.email }}</p>
                    <p class="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {{ user?.role === 'admin' ? 'Администратор' : 'Пользователь' }}
                    </p>
                  </div>
                </template>
              </UDropdownMenu>
            </template>
            
            <template v-else>
              <NuxtLink to="/login">
                <UButton label="Войти" variant="ghost" class="text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-all" />
              </NuxtLink>
              <NuxtLink to="/login">
                <UButton 
                  label="Начать работу" 
                  class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-5 shadow-lg shadow-indigo-600/20 rounded-xl border-0 transition-all duration-300" 
                />
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div class="text-center mb-16 relative">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4 backdrop-blur-sm animate-fade-in">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Умная экосистема коворкинга
        </div>
        <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-4 lg:max-w-3xl mx-auto leading-tight">
          Найдите ваше идеальное рабочее место
        </h1>
        <p class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Просмотрите доступные помещения премиум-класса и забронируйте идеальное место для следующей важной встречи, интенсивного спринта или совместной работы.
        </p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 mb-12 p-2 rounded-2xl bg-slate-900/40 border border-slate-900/80 backdrop-blur-md shadow-xl">
        <UInput
          v-model="searchQuery"
          placeholder="Поиск помещений по названию или описанию..."
          icon="i-lucide-search"
          size="xl"
          class="flex-1"
          :ui="{ 
            base: 'bg-slate-950/60 border-slate-800/80 focus:border-indigo-500 text-white rounded-xl placeholder-slate-500',
            icon: { leading: { pointer: 'text-slate-500' } }
          }"
        />
        <USelect
          v-model="capacityFilter"
          :items="capacityOptions"
          placeholder="Фильтр по вместимости"
          size="xl"
          class="w-full sm:w-56"
          :ui="{ base: 'bg-slate-950/60 border-slate-800/80 focus:border-indigo-500 text-white rounded-xl' }"
        />
        <USelect
          v-model="sortBy"
          :items="sortOptions"
          placeholder="Сортировка"
          size="xl"
          class="w-full sm:w-56"
          :ui="{ base: 'bg-slate-950/60 border-slate-800/80 focus:border-indigo-500 text-white rounded-xl' }"
        />
        <UButton 
          icon="i-lucide-refresh-cw" 
          variant="outline" 
          size="xl"
          class="border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl active:scale-95 transition-all"
          @click="refreshRooms()"
        />
      </div>
      
      <div v-if="roomsStatus === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="h-[380px] rounded-2xl bg-slate-900/40 border border-slate-800/50 p-4 space-y-4 animate-pulse">
          <div class="h-48 rounded-xl bg-slate-800/60 w-full" />
          <div class="h-6 bg-slate-800/60 rounded-md w-2/3" />
          <div class="h-4 bg-slate-800/40 rounded-md w-full" />
          <div class="h-10 bg-slate-800/60 rounded-xl w-full mt-auto" />
        </div>
      </div>
      
      <UEmpty
        v-else-if="filteredRooms.length === 0"
        icon="i-lucide-search-x"
        title="Нет помещений, соответствующих вашим критериям"
        description="Попробуйте изменить ключевые слова или фильтр вместимости, чтобы изучить другие варианты."
        class="py-20 border border-dashed border-slate-800/60 rounded-2xl bg-slate-900/10 backdrop-blur-sm"
      />
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="room in filteredRooms"
          :key="room.id"
          class="bg-slate-900/30 backdrop-blur-sm border-slate-900 hover:border-indigo-500/40 transition-all duration-300 group overflow-hidden rounded-2xl flex flex-col shadow-lg shadow-black/20"
          :ui="{ 
            header: 'p-0 border-b border-slate-900/50', 
            body: 'p-5 flex-1',
            footer: 'p-5 pt-0 border-t-0' 
          }"
        >
          <template #header>
            <div class="relative h-48 bg-slate-950 -mx-4 -mt-4 sm:-mx-6 overflow-hidden">
              <img
                v-if="room.image_url"
                :src="room.image_url"
                :alt="room.name"
                class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div v-else class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                <UIcon name="i-lucide-image" class="w-12 h-12 text-slate-700 group-hover:text-slate-600 transition-colors" />
              </div>
              
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              
              <div class="absolute top-4 right-4">
                <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-semibold text-slate-200 shadow-xl shadow-black/40">
                  <UIcon name="i-lucide-users" class="w-3.5 h-3.5 text-indigo-400" />
                  {{ room.capacity }} чел.
                </div>
              </div>
            </div>
          </template>
          
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 truncate">
              {{ room.name }}
            </h3>
            <p class="text-sm text-slate-400 line-clamp-2 min-h-[40px] leading-relaxed">
              {{ room.description }}
            </p>
          </div>
          
          <template #footer>
            <UButton
              label="Забронировать"
              icon="i-lucide-calendar-plus"
              block
              size="lg"
              class="bg-slate-950 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 border border-slate-800 hover:border-transparent text-slate-200 hover:text-white font-medium rounded-xl transition-all duration-300 shadow-md group-hover:shadow-indigo-600/10"
              @click="openBookingModal(room)"
            />
          </template>
        </UCard>
      </div>
    </main>
    
    <BookingModal
      v-model:open="isBookingModalOpen"
      :room="selectedRoom"
      @booked="refreshRooms()"
    />
  </div>
</template>

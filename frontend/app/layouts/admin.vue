<script setup lang="ts">
const { user, logout } = useAuth()

const route = useRoute()

const navItems = [
  { label: 'Обзор', icon: 'i-lucide-layout-dashboard', to: '/admin' },
  { label: 'Комнаты', icon: 'i-lucide-door-open', to: '/admin/rooms' },
  { label: 'Бронирования', icon: 'i-lucide-calendar-check', to: '/admin/bookings' },
]

const isSidebarOpen = ref(true)

const isActive = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden">
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

    <aside
      class="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900/40 backdrop-blur-xl border-r border-slate-900/80 transition-transform duration-300 lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center gap-3 h-16 px-6 border-b border-slate-900">
        <div class="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20">
          <img src="/cowork_logo.png" class="w-full h-full object-cover" />
        </div>
        <div>
          <span class="font-bold text-white text-base tracking-wide">Админка</span>
          <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Управление коворкингом</p>
        </div>
      </div>
      
      <nav class="flex-1 p-4 space-y-1.5 mt-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200"
          :class="isActive(item.to) 
            ? 'bg-gradient-to-r from-indigo-600/15 to-violet-600/15 text-indigo-400 border-indigo-500/30 shadow-md shadow-indigo-500/5' 
            : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/50'"
        >
          <UIcon :name="item.icon" class="w-5 h-5 transition-transform group-hover:scale-105" />
          {{ item.label }}
        </NuxtLink>
      </nav>
      
      <div class="p-4 border-t border-slate-900">
        <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-950/60 border border-slate-900">
          <div class="relative">
            <UAvatar 
              :src="`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email || 'admin'}`"
              :alt="user?.email || 'Admin'" 
              size="sm"
              class="bg-slate-900 border border-slate-800"
            />
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-slate-200 truncate">{{ user?.email }}</p>
            <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Администратор</p>
          </div>
        </div>
        
        <div class="mt-3 flex gap-2">
          <NuxtLink to="/" class="flex-1">
            <UButton
              label="Главная"
              variant="outline"
              icon="i-lucide-external-link"
              size="sm"
              block
              class="border-slate-800 text-slate-300 hover:bg-slate-900 rounded-lg text-xs"
            />
          </NuxtLink>
          <UButton
            icon="i-lucide-log-out"
            variant="ghost"
            color="error"
            size="sm"
            class="rounded-lg hover:bg-red-500/10"
            @click="logout()"
          />
        </div>
      </div>
    </aside>
    
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"
      @click="isSidebarOpen = false"
    />
    
    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">
      <header class="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 flex items-center px-4 lg:px-8 justify-between">
        <div class="flex items-center">
          <UButton
            icon="i-lucide-menu"
            variant="ghost"
            class="lg:hidden mr-4 text-slate-400 hover:text-white"
            @click="isSidebarOpen = !isSidebarOpen"
          />
          <h1 class="text-base font-bold text-white tracking-wide">
            {{ route.meta.title || 'Панель управления' }}
          </h1>
        </div>
        
        <div class="flex items-center gap-4">
          <UButton
            icon="i-lucide-bell"
            variant="ghost"
            class="relative text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl"
          >
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-ping" />
          </UButton>
        </div>
      </header>
      
      <main class="p-4 lg:p-8 flex-1 relative z-10">
        <slot />
      </main>
    </div>
  </div>
</template>

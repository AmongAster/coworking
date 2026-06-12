<script setup lang="ts">
import { z } from 'zod'
import type { Room } from '~/types'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: 'Управление Комнатами'
})

useSeoMeta({
  title: 'Комнаты - Администратор'
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { getAuthHeaders } = useAuth()
const toast = useToast()

// Получение списка комнат
const { data: rooms, status, refresh } = await useFetch<Room[]>(`${apiBase}/rooms`, {
  key: 'admin-rooms-list',
  default: () => []
})

const isCreateModalOpen = ref(false)
const isCreating = ref(false)

// Валидация формы без поля ID (так как у нас теперь AUTO_INCREMENT)
const createRoomSchema = z.object({
  name: z.string().min(2, 'Название должно быть не менее 2 символов'),
  capacity: z.number().min(1, 'Вместимость должна быть больше 0'),
  description: z.string().min(5, 'Описание должно быть подробнее'),
  image_url: z.string().refine(val => !val || val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:image/'), {
    message: 'Введите корректный URL или выберите файл изображения'
  }).optional().or(z.literal(''))
})

type CreateRoomSchema = z.output<typeof createRoomSchema>

const createRoomState = reactive<CreateRoomSchema>({
  name: '',
  capacity: 4,
  description: '',
  image_url: ''
})

const resetCreateForm = () => {
  createRoomState.name = ''
  createRoomState.capacity = 4
  createRoomState.description = ''
  createRoomState.image_url = ''
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        createRoomState.image_url = event.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

// Отправка запроса на создание комнаты
const handleCreateRoom = async (event: FormSubmitEvent<CreateRoomSchema>) => {
  isCreating.value = true
  try {
    await $fetch(`${apiBase}/rooms`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: event.data
    })
    
    toast.add({ title: 'Успех!', description: 'Комната успешно добавлена в систему.', color: 'success' })
    isCreateModalOpen.value = false
    resetCreateForm()
    refresh()
  } catch (err: any) {
    toast.add({ title: 'Ошибка создания', description: err.data?.message || 'Не удалось сохранить комнату', color: 'error' })
  } finally {
    isCreating.value = false
  }
}

// Удаление комнаты
const isDeleteDialogOpen = ref(false)
const isDeleting = ref(false)
const roomToDelete = ref<Room | null>(null)

const openDeleteDialog = (room: Room) => {
  roomToDelete.value = room
  isDeleteDialogOpen.value = true
}

const confirmDeleteRoom = async () => {
  if (!roomToDelete.value) return
  isDeleting.value = true
  try {
    await $fetch(`${apiBase}/rooms/${roomToDelete.value.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    toast.add({ title: 'Удалено', description: 'Комната успешно удалена.', color: 'success' })
    isDeleteDialogOpen.value = false
    refresh()
  } catch (err: any) {
    toast.add({ title: 'Ошибка удаления', description: err.data?.message || 'Ошибка удаления связи', color: 'error' })
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">Список рабочих зон</h1>
        <p class="text-sm text-slate-400">Модерация доступных для бронирования комнат</p>
      </div>
      <UButton label="Добавить комнату" icon="i-lucide-plus" color="primary" @click="isCreateModalOpen = true" />
    </div>

    <div v-if="status === 'pending'" class="text-center py-12 text-slate-400">Загрузка данных...</div>
    <div v-else-if="!rooms.length" class="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
      Комнаты не найдены. Создайте первую рабочую зону.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="room in rooms" :key="room.id" class="rounded-2xl bg-slate-900/40 border border-slate-800 overflow-hidden flex flex-col">
        <div class="h-44 bg-slate-800 flex items-center justify-center overflow-hidden border-b border-slate-800">
          <img v-if="room.image_url" :src="room.image_url" class="w-full h-full object-cover" />
          <UIcon v-else name="i-lucide-image" class="w-12 h-12 text-slate-600" />
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-bold text-white">{{ room.name }}</h3>
              <span class="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-md">ID: {{ room.id }}</span>
            </div>
            <p class="text-sm text-slate-400 mt-1 line-clamp-2">{{ room.description }}</p>
            <div class="flex items-center gap-2 mt-3 text-sm text-slate-300">
              <UIcon name="i-lucide-users" class="w-4 h-4 text-indigo-400" />
              <span>Вместимость: до {{ room.capacity }} человек</span>
            </div>
          </div>
          <div class="pt-2 border-t border-slate-800 flex justify-end">
            <UButton label="Удалить" icon="i-lucide-trash-2" color="error" variant="ghost" @click="openDeleteDialog(room)" />
          </div>
        </div>
      </div>
    </div>

    <UModal v-model:open="isCreateModalOpen">
      <template #content>
        <UCard class="w-full max-w-md bg-slate-900 border border-slate-800">
          <template #header>
            <h3 class="text-lg font-bold text-white">Новое пространство</h3>
          </template>
          
          <UForm :schema="createRoomSchema" :state="createRoomState" class="space-y-4" @submit="handleCreateRoom">
            <UFormGroup label="Название комнаты" name="name">
              <UInput v-model="createRoomState.name" placeholder="Например: Переговорка Альфа" />
            </UFormGroup>
            
            <UFormGroup label="Вместимость (чел.)" name="capacity">
              <UInput v-model.number="createRoomState.capacity" type="number" />
            </UFormGroup>
            
            <UFormGroup label="Описание" name="description">
              <UTextarea v-model="createRoomState.description" placeholder="Опишите особенности комнаты..." />
            </UFormGroup>
            
            <UFormGroup label="Изображение помещения" name="image_url">
              <div class="space-y-3">
                <UInput type="file" accept="image/*" @change="onFileChange" />
                <div class="text-[10px] font-bold text-slate-500 text-center tracking-wider">— ИЛИ ВСТАВЬТЕ ССЫЛКУ —</div>
                <UInput v-model="createRoomState.image_url" placeholder="https://example.com/image.jpg" />
                
                <div v-if="createRoomState.image_url" class="relative mt-2 h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 flex items-center justify-center">
                  <img :src="createRoomState.image_url" class="max-h-full max-w-full object-contain" />
                  <UButton 
                    icon="i-lucide-x" 
                    size="xs" 
                    color="error" 
                    variant="solid" 
                    class="absolute top-2 right-2 rounded-full" 
                    @click="createRoomState.image_url = ''"
                  />
                </div>
              </div>
            </UFormGroup>

            <div class="flex gap-3 justify-end pt-4 border-t border-slate-800">
              <UButton label="Отмена" variant="ghost" @click="isCreateModalOpen = false" />
              <UButton label="Создать" type="submit" color="primary" :loading="isCreating" />
            </div>
          </UForm>
        </UCard>
      </template>
    </UModal>

    <UModal v-model:open="isDeleteDialogOpen">
      <template #content>
        <UCard class="w-full max-w-md">
          <template #header>
            <h3 class="text-lg font-bold text-white">Удалить комнату?</h3>
          </template>
          <p class="text-slate-300">Вы действительно хотите удалить <b>{{ roomToDelete?.name }}</b>? Все существующие бронирования для этой комнаты также сотрутся.</p>
          <template #footer>
            <div class="flex gap-3 justify-end">
              <UButton label="Отмена" variant="ghost" @click="isDeleteDialogOpen = false" />
              <UButton label="Удалить железно" color="error" :loading="isDeleting" @click="confirmDeleteRoom" />
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
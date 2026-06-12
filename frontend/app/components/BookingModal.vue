<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Room } from '~/types'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const props = defineProps<{
  room: Room | null
}>()

const emit = defineEmits<{
  booked: []
}>()

const open = defineModel<boolean>('open', { default: false })

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { getAuthHeaders } = useAuth()
const toast = useToast()

const isLoading = ref(false)

const df = new DateFormatter('ru-RU', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// Обновляем схему: теперь мы ожидаем, что booking_date — это объект календаря
const schema = z.object({
  booking_date: z.any().refine(val => val !== undefined, 'Пожалуйста, выберите дату'),
  start_time: z.string().min(1, 'Пожалуйста, выберите время начала'),
  end_time: z.string().min(1, 'Пожалуйста, выберите время окончания')
}).refine(data => {
  if (data.start_time && data.end_time) {
    return data.start_time < data.end_time
  }
  return true
}, {
  message: 'Время окончания должно быть позже времени начала',
  path: ['end_time']
})

type Schema = z.output<typeof schema>

// Стейт формы оставляем плоским для реактивности UI
const state = reactive<{ booking_date: CalendarDate | undefined; start_time: string; end_time: string }>({
  booking_date: undefined,
  start_time: '',
  end_time: ''
})

const timeOptions = computed(() => {
  const options = []
  for (let hour = 7; hour <= 22; hour++) {
    const time24 = `${hour.toString().padStart(2, '0')}:00`
    options.push({
      label: time24,
      value: time24
    })
  }
  return options
})

const resetForm = () => {
  state.booking_date = undefined
  state.start_time = ''
  state.end_time = ''
}

watch(open, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.room || !state.booking_date) return
  
  isLoading.value = true
  
  try {
    // 1. Сначала превращаем сложный объект календаря в чистую строку YYYY-MM-DD
    const formattedDate = state.booking_date.toString()
    
    // 2. Отправляем бэкенду идеально чистый JSON-объект без примесей реактивности Vue
    await $fetch(`${apiBase}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: {
        room_id: Number(props.room.id), // кастуем к числу на случай строк
        booking_date: formattedDate,
        start_time: event.data.start_time,
        end_time: event.data.end_time
      }
    })
    
    toast.add({
      title: 'Бронирование подтверждено!',
      description: `Вы успешно забронировали ${props.room.name} на ${formattedDate}.`,
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    
    open.value = false
    emit('booked')
  } catch (error: any) {
    // Безопасно вытаскиваем текст ошибки из ответа бэкенда
    const errorMessage = error?.data?.message || error?.message || 'Не удалось создать бронирование'
    const isConflict = errorMessage.toLowerCase().includes('conflict') || 
                       errorMessage.toLowerCase().includes('already booked') ||
                       errorMessage.toLowerCase().includes('занято')
    
    toast.add({
      title: isConflict ? 'Время недоступно' : 'Ошибка бронирования',
      description: isConflict 
        ? 'Это время уже занято. Пожалуйста, выберите другое время.'
        : errorMessage,
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    isLoading.value = false
  }
}

const today = new Date()
const minDate = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
</script>

<template>
  <UModal
    v-model:open="open"
    :title="`Забронировать ${room?.name || 'помещение'}`"
    :description="`Вместимость: до ${room?.capacity || 0} человек`"
  >
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
        <div class="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
              <UIcon name="i-lucide-building" class="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h4 class="font-semibold text-white">{{ room?.name }}</h4>
              <p class="text-sm text-slate-400 mt-1">{{ room?.description }}</p>
            </div>
          </div>
        </div>
        
        <UFormField name="booking_date" label="Выберите дату" required>
          <UPopover>
            <UButton
              variant="outline"
              block
              class="justify-start text-left font-normal"
              :class="{ 'text-slate-400': !state.booking_date }"
            >
              <UIcon name="i-lucide-calendar" class="w-4 h-4 mr-2" />
              {{ state.booking_date ? df.format(state.booking_date.toDate(getLocalTimeZone())) : 'Выберите дату' }}
            </UButton>
            
            <template #content>
              <UCalendar v-model="state.booking_date" :min-value="minDate" />
            </template>
          </UPopover>
        </UFormField>
        
        <div class="grid grid-cols-2 gap-4">
          <UFormField name="start_time" label="Время начала" required>
            <USelect
              v-model="state.start_time"
              :items="timeOptions"
              placeholder="Время начала"
              icon="i-lucide-clock"
            />
          </UFormField>
          
          <UFormField name="end_time" label="Время окончания" required>
            <USelect
              v-model="state.end_time"
              :items="timeOptions"
              placeholder="Время окончания"
              icon="i-lucide-clock"
            />
          </UFormField>
        </div>
        
        <div v-if="state.booking_date && state.start_time && state.end_time" class="p-4 rounded-lg bg-indigo-600/10 border border-indigo-500/30">
          <div class="flex items-center gap-2 text-indigo-400">
            <UIcon name="i-lucide-info" class="w-4 h-4" />
            <span class="text-sm font-medium">Сводка бронирования</span>
          </div>
          <p class="text-slate-300 mt-2 text-sm">
            {{ room?.name }} на {{ state.booking_date.toString() }} 
            с {{ state.start_time }} по {{ state.end_time }}
          </p>
        </div>
        
        <div class="flex gap-3 pt-4">
          <UButton
            type="button"
            label="Отмена"
            variant="ghost"
            class="flex-1"
            @click="open = false"
          />
          <UButton
            type="submit"
            label="Подтвердить бронирование"
            :loading="isLoading"
            class="flex-1"
            icon="i-lucide-check"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
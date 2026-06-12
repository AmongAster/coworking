import type { User } from '~/types'

export const useAuth = () => {
  const token = useCookie<string | null>('token', { default: () => null })
  const user = useState<User | null>('user', () => null)
  
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // Добавляем метод инициализации для app.vue и middleware
  const initAuth = async () => {
    // Если токен есть в куках, а стейт пользователя пустой — пробуем восстановить сессию
    if (token.value && !user.value) {
      try {
        const data = await $fetch<User>(`${apiBase}/auth/me`, {
          method: 'GET',
          headers: getAuthHeaders()
        })
        user.value = data
      } catch (error) {
        console.error('Failed to restore session:', error)
        token.value = null
        user.value = null
      }
    }
  }
  
  const login = async (email: string, password: string) => {
    const response = await $fetch<{ token: string; user: User }>(`${apiBase}/auth/login`, {
      method: 'POST',
      body: { email, password }
    })
    
    token.value = response.token
    user.value = response.user
    return response
  }
  
  const register = async (email: string, password: string) => {
    const response = await $fetch<{ token: string; user: User }>(`${apiBase}/auth/register`, {
      method: 'POST',
      body: { email, password }
    })
    
    token.value = response.token
    user.value = response.user
    return response
  }
  
  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/login')
  }
  
  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }
  
  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    initAuth, // Обязательно возвращаем функцию наружу!
    fetchCurrentUser: initAuth, // Для middleware/admin.ts
    login,
    register,
    logout,
    getAuthHeaders
  }
}
export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()

  // Проверяем, существует ли функция, чтобы избежать ошибки 500 "is not a function"
  if (auth.token.value && !auth.user.value && typeof auth.fetchCurrentUser === 'function') {
    await auth.fetchCurrentUser()
  }

  // Проверяем роль админа
  if (!auth.isAdmin.value) {
    console.warn(`Доступ к ${to.path} заблокирован: нет прав администратора.`)
    return navigateTo('/')
  }
})
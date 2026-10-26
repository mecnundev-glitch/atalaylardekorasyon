export default defineNuxtRouteMiddleware(async (to) => {
  // Sadece /admin rotalarını denetle
  if (!to.path.startsWith('/admin')) {
    return
  }

  const { isAdmin, isInitialized, checkSession } = useAdminAuth()

  // Henüz oturum denetlenmediyse kontrol et
  if (!isInitialized.value) {
    await checkSession()
  }

  // Kullanıcı /admin/login sayfasındaysa
  if (to.path === '/admin/login') {
    // Zaten giriş yapmış ve aktif adminse ana admin paneline yönlendir
    if (isAdmin.value) {
      return navigateTo('/admin')
    }
    return
  }

  // /admin altındaki diğer tüm korumalı sayfalar için yetki kontrolü
  if (!isAdmin.value) {
    const redirectUrl = to.fullPath !== '/admin' ? to.fullPath : undefined
    return navigateTo({
      path: '/admin/login',
      query: redirectUrl ? { redirect: redirectUrl } : undefined
    })
  }
})

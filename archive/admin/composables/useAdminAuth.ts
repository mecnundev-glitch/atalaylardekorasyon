import { ref, computed } from 'vue'
import type { User } from '@supabase/supabase-js'
import { useSupabase } from './useSupabase'
import type { Database } from '~/types/database'

export type AdminProfile = Database['public']['Tables']['admin_profiles']['Row']

export const useAdminAuth = () => {
  const { client, isConfigured } = useSupabase()

  const user = useState<User | null>('admin_auth_user', () => null)
  const profile = useState<AdminProfile | null>('admin_auth_profile', () => null)
  const isLoading = useState<boolean>('admin_auth_loading', () => false)
  const isInitialized = useState<boolean>('admin_auth_initialized', () => false)
  const authError = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(user.value))
  const isAdmin = computed(() => Boolean(profile.value && profile.value.is_active))

  // Profil verisini veritabanından çek
  const fetchProfile = async (userId: string): Promise<AdminProfile | null> => {
    if (!client) return null
    try {
      const { data, error } = await client
        .from('admin_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error || !data) {
        console.warn('Yönetici profili okunamadı:', error?.message)
        return null
      }
      return data
    } catch (err) {
      console.error('Profil sorgulama hatası:', err)
      return null
    }
  }

  // İlk oturum kontrolü
  const checkSession = async (): Promise<boolean> => {
    if (!client || !isConfigured) {
      user.value = null
      profile.value = null
      isInitialized.value = true
      return false
    }

    isLoading.value = true
    authError.value = null

    try {
      const { data: { session }, error: sessionError } = await client.auth.getSession()

      if (sessionError || !session?.user) {
        user.value = null
        profile.value = null
        isInitialized.value = true
        isLoading.value = false
        return false
      }

      user.value = session.user
      const p = await fetchProfile(session.user.id)
      if (p && p.is_active) {
        profile.value = p
        isInitialized.value = true
        isLoading.value = false
        return true
      } else {
        // Oturum var ama admin profilinde değil veya pasif
        console.warn('Aktif yönetici profili bulunamadı.')
        await client.auth.signOut()
        user.value = null
        profile.value = null
        isInitialized.value = true
        isLoading.value = false
        return false
      }
    } catch (err: unknown) {
      console.error('Oturum kontrolü istisnası:', err)
      user.value = null
      profile.value = null
      isInitialized.value = true
      isLoading.value = false
      return false
    }
  }

  // Yönetici Girişi
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    if (!client || !isConfigured) {
      return { success: false, message: 'Supabase bağlantısı henüz yapılandırılmadı.' }
    }

    isLoading.value = true
    authError.value = null

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password
      })

      if (error || !data.user) {
        const errorMsg = error?.message?.includes('Invalid login credentials')
          ? 'E-posta adresi veya şifre hatalı.'
          : error?.message || 'Giriş yapılamadı.'
        authError.value = errorMsg
        isLoading.value = false
        return { success: false, message: errorMsg }
      }

      // Yönetici profili aktif mi kontrol et
      const p = await fetchProfile(data.user.id)
      if (!p || !p.is_active) {
        await client.auth.signOut()
        user.value = null
        profile.value = null
        const msg = 'Bu hesap için aktif bir yönetici yetkisi tanımlanmamış.'
        authError.value = msg
        isLoading.value = false
        return { success: false, message: msg }
      }

      user.value = data.user
      profile.value = p
      isLoading.value = false
      return { success: true }
    } catch (err: unknown) {
      const e = err as Error
      const msg = e.message || 'Giriş sırasında bir hata oluştu.'
      authError.value = msg
      isLoading.value = false
      return { success: false, message: msg }
    }
  }

  // Güvenli Çıkış
  const logout = async (): Promise<void> => {
    if (client) {
      try {
        await client.auth.signOut()
      } catch (err) {
        console.warn('Çıkış hatası:', err)
      }
    }
    user.value = null
    profile.value = null
    await navigateTo('/admin/login')
  }

  // API çağrıları için güncel Bearer token alıcı
  const getAccessToken = async (): Promise<string | null> => {
    if (!client) return null
    const { data: { session } } = await client.auth.getSession()
    return session?.access_token || null
  }

  return {
    user,
    profile,
    isLoading,
    isInitialized,
    authError,
    isAuthenticated,
    isAdmin,
    checkSession,
    login,
    logout,
    getAccessToken
  }
}

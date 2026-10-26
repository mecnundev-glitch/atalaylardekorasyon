import type { H3Event } from 'h3'
import { useServerSupabase } from './supabase'

export interface AuthenticatedAdmin {
  id: string
  email: string
  fullName: string
  role: 'superadmin' | 'admin' | 'editor'
  isActive: boolean
}

/**
 * Nitro rotaları için Sunucu Tarafı Yönetici Yetki Doğrulayıcısı (Server-Side Auth Guard).
 * Gelen isteğin Authorization: Bearer <token> başlığını inceler,
 * Supabase Auth üzerinden token'ı doğrular ve admin_profiles tablosunda aktif yönetici olduğunu teyit eder.
 */
export async function requireAdminUser(event: H3Event): Promise<AuthenticatedAdmin> {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Yetkilendirme oturum anahtarı (Bearer token) bulunamadı. Lütfen giriş yapınız.'
    })
  }

  const token = authHeader.substring(7).trim()
  const { serverClient, isConfigured } = useServerSupabase()

  if (!isConfigured || !serverClient) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Sunucu Supabase yapılandırması eksik.'
    })
  }

  // 1. Supabase Auth token doğrula
  const { data: { user }, error: authError } = await serverClient.auth.getUser(token)

  if (authError || !user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Oturum süresi dolmuş veya geçersiz. Lütfen tekrar giriş yapınız.'
    })
  }

  // 2. admin_profiles tablosundan rol ve aktiflik durumunu doğrula
  const { data: rawProfile, error: profileError } = await serverClient
    .from('admin_profiles')
    .select('id, email, full_name, role, is_active')
    .eq('id', user.id)
    .maybeSingle()

  const profile = rawProfile as any

  if (profileError || !profile) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Yönetici profili bulunamadı veya bu işlem için yetkiniz yok.'
    })
  }

  if (!profile.is_active) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Yönetici hesabınız askıya alınmıştır. Sistem yöneticisi ile iletişime geçiniz.'
    })
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role as 'superadmin' | 'admin' | 'editor',
    isActive: profile.is_active
  }
}

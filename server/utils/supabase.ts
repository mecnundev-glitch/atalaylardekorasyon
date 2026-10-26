import { createClient } from '@supabase/supabase-js'

/**
 * Sunucu tarafı izole Supabase Service-Role istemcisi.
 * Bu anahtar KESİNLİKLE istemciye gönderilmez; yalnızca Nitro API rotalarında çalışır.
 */
export const useServerSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL || ''
  const serviceRoleKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
    return {
      serverClient: null,
      isConfigured: false
    }
  }

  const serverClient = createClient<any>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })

  return {
    serverClient,
    isConfigured: true
  }
}

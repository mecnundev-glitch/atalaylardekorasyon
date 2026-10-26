import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient<any> | null = null

export const useSupabase = () => {
  const config = useRuntimeConfig()

  const supabaseUrl = (config.public?.supabaseUrl as string) || (process.env.SUPABASE_URL as string) || ''
  const supabaseKey = (config.public?.supabaseKey as string) || (process.env.SUPABASE_PUBLISHABLE_KEY as string) || (process.env.SUPABASE_KEY as string) || ''

  const isConfigured = Boolean(supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project'))

  if (!supabaseInstance && isConfigured) {
    supabaseInstance = createClient<any>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }

  return {
    client: supabaseInstance,
    isConfigured
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'tr'
      },
      title: 'Atalaylar Dekorasyon | Mehmet Usta (Mehmet Atalay) - İzmir Tadilat ve Boya',
      titleTemplate: '%s · Mehmet Usta (Mehmet Atalay)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'İzmir genelinde Mehmet Usta (Mehmet Atalay) güvencesiyle alçı, boya, sıva, çatı izolasyonu, su ve ısı yalıtımı, komple anahtar teslim dekorasyon ve tadilat hizmetleri. Ücretsiz keşif ve profesyonel ustalık.'
        },
        { name: 'author', content: 'Mehmet Atalay (Mehmet Usta)' },
        { name: 'keywords', content: 'mehmet usta, mehmet atalay, atalaylar dekorasyon, izmir boya ustası, mehmet usta izmir, izmir tadilat ustası, alçıpan ustası mehmet atalay' },
        { name: 'theme-color', content: '#0A0B0D' },
        { property: 'og:site_name', content: 'Atalaylar Dekorasyon - Mehmet Usta (Mehmet Atalay)' },
        { property: 'og:locale', content: 'tr_TR' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'google-site-verification', content: 'W8B8tqn61qKBtmkIaY74U7dun9h1SzJk175o9iDLtvU' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    // Sadece sunucu tarafında (Nitro) erişilebilir gizli anahtar
    supabaseServiceRoleKey: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    public: {
      // İstemci tarafında erişilebilir genel anahtarlar
      siteUrl: process.env.SITE_URL || 'https://www.atalaylardekorasyon.com',
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY || '',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Atalaylar Dekorasyon',
      contactPhone: process.env.NUXT_PUBLIC_CONTACT_PHONE || '',
      whatsappPhone: process.env.NUXT_PUBLIC_WHATSAPP_PHONE || '',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || '',
      locationCity: process.env.NUXT_PUBLIC_LOCATION_CITY || 'İzmir'
    }
  },

  typescript: {
    strict: true,
    typeCheck: false // Fast dev and build; explicit typecheck script provided
  }
})

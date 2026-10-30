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
      title: 'İzmir Tadilat & Dekorasyon | Ücretsiz Keşif | Atalay Dekorasyon',
      titleTemplate: '%s · Atalay Dekorasyon (Mehmet Usta)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'İzmir\'de anahtar teslim ev tadilatı, alçıpan asma tavan, boya badana, çatı izolasyonu ve mantolama. Mehmet Usta güvencesiyle yerinde ücretsiz keşif ve sözleşmeli teslimat: 0544 997 87 60.'
        },
        { name: 'author', content: 'Mehmet Atalay (Mehmet Usta)' },
        { name: 'keywords', content: 'izmir tadilat, izmir dekorasyon, atalay dekorasyon, mehmet usta, izmir boya badana, asma tavan, çatı izolasyonu, mantolama' },
        { name: 'theme-color', content: '#0A0B0D' },
        { property: 'og:site_name', content: 'Atalay Dekorasyon' },
        { property: 'og:title', content: 'İzmir Tadilat & Dekorasyon | Ücretsiz Keşif | Atalay Dekorasyon' },
        { property: 'og:description', content: 'İzmir\'de anahtar teslim ev tadilatı, alçıpan asma tavan, boya badana, çatı izolasyonu ve mantolama. Mehmet Usta güvencesiyle yerinde ücretsiz keşif ve sözleşmeli teslimat: 0544 997 87 60.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.atalaylardekorasyon.com/' },
        { property: 'og:locale', content: 'tr_TR' },
        { property: 'og:image', content: 'https://www.atalaylardekorasyon.com/images/hero-decoration.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'İzmir Tadilat & Dekorasyon | Ücretsiz Keşif | Atalay Dekorasyon' },
        { name: 'twitter:description', content: 'İzmir\'de anahtar teslim ev tadilatı, alçıpan asma tavan, boya badana, çatı izolasyonu ve mantolama. Mehmet Usta güvencesiyle yerinde ücretsiz keşif ve sözleşmeli teslimat: 0544 997 87 60.' },
        { name: 'twitter:image', content: 'https://www.atalaylardekorasyon.com/images/hero-decoration.jpg' },
        { name: 'google-site-verification', content: 'W8B8tqn61qKBtmkIaY74U7dun9h1SzJk175o9iDLtvU' }
      ],
      link: [
        { rel: 'canonical', href: 'https://www.atalaylardekorasyon.com/' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
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
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Atalay Dekorasyon',
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

import type { BusinessConfig } from '~/types/site'

export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'Atalaylar Dekorasyon',
  tagline: 'İzmir Yapı, İzolasyon ve Anahtar Teslim Dekorasyon Uygulamaları',
  description: 'İzmir genelinde alçı, iç ve dış cephe boya, sıva, çatı izolasyonu, su ve ısı yalıtımı, komple anahtar teslim dekorasyon ve tadilat hizmetleri sunan güvenilir çözüm ortağınız.',
  contact: {
    phone: '+905449978760',
    phoneFormatted: '+90 (544) 997 87 60',
    whatsapp: '905449978760',
    whatsappFormatted: '+90 544 997 87 60',
    email: 'info@atalaylardekorasyon.com',
    address: 'İzmir / Türkiye',
    district: 'Merkez',
    city: 'İzmir',
    workingHours: 'Pazartesi - Cumartesi: 08:30 - 19:30'
  },
  social: {
    instagram: 'https://instagram.com/atalaylardekorasyon',
    facebook: 'https://facebook.com/atalaylardekorasyon'
  }
}

export const MAIN_NAV_LINKS = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Hakkımızda', to: '/hakkimizda' },
  {
    label: 'Hizmetlerimiz',
    to: '/hizmetlerimiz',
    children: [
      { label: 'Alçı Uygulamaları', to: '/hizmetlerimiz/alci-uygulamalari' },
      { label: 'İç Cephe Boya', to: '/hizmetlerimiz/ic-cephe-boya' },
      { label: 'Dış Cephe Boya', to: '/hizmetlerimiz/dis-cephe-boya' },
      { label: 'Sıva ve Duvar Uygulamaları', to: '/hizmetlerimiz/siva-ve-duvar-uygulamalari' },
      { label: 'Çatı İzolasyonu', to: '/hizmetlerimiz/cati-izolasyonu' },
      { label: 'Su Yalıtımı', to: '/hizmetlerimiz/su-yalitimi' },
      { label: 'Isı Yalıtımı (Mantolama)', to: '/hizmetlerimiz/isi-yalitimi' },
      { label: 'Dekorasyon ve Tadilat', to: '/hizmetlerimiz/dekorasyon-ve-tadilat' }
    ]
  },
  { label: 'Projeler', to: '/projeler' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'Müşteri Yorumları', to: '/musteri-yorumlari' },
  { label: 'İletişim', to: '/iletisim' }
]

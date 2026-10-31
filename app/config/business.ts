import type { BusinessConfig } from '~/types/site'

export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'Atalay Dekorasyon',
  masterCraftsman: 'Mehmet Atalay (Mehmet Usta)',
  tagline: 'İzmir Genelinde Profesyonel Yapı, İzolasyon ve Tadilat Hizmetleri',
  description: 'İzmir genelinde alçı, iç ve dış cephe boya, sıva, çatı izolasyonu, su ve ısı yalıtımı ile komple anahtar teslim tadilat hizmetleri sunan güvenilir çözüm ortağınız.',
  contact: {
    phone: '+905449978760',
    phoneFormatted: '+90 (544) 997 87 60',
    whatsapp: '905449978760',
    whatsappFormatted: '+90 544 997 87 60',
    email: 'info@atalaylardekorasyon.com',
    address: 'Ofisimiz bulunmamaktadır; İzmir genelinde adresinize gelerek hizmet veriyoruz.',
    streetAddress: 'İzmir Geneli Gezici Keşif & Uygulama Hizmeti',
    neighborhood: 'İzmir Geneli',
    postalCode: '35000',
    district: 'İzmir',
    city: 'İzmir',
    workingHours: 'Pazartesi - Cumartesi: 08:30 - 19:30',
    mapsUrl: 'https://maps.google.com/?q=İzmir'
  },
  social: {
    instagram: 'https://instagram.com/atalaydekorasyon',
    facebook: 'https://facebook.com/atalaydekorasyon'
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
  { label: 'Hizmet Bölgeleri', to: '/bolgeler' },
  { label: 'Fiyat Rehberi', to: '/fiyat-rehberi' },
  { label: 'Blog', to: '/blog' },
  { label: 'İletişim', to: '/iletisim' }
]

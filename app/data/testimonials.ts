export interface TestimonialItem {
  id: string
  clientName: string
  district: string
  serviceSlug: string
  serviceTitle: string
  rating: number
  date: string
  content: string
  projectScope?: string
  isFeatured: boolean
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    clientName: 'Burak & Selin Arslan',
    district: 'Karşıyaka (Bostanlı)',
    serviceSlug: 'dekorasyon-ve-tadilat',
    serviceTitle: 'Komple Daire Tadilatı',
    rating: 5,
    date: '14 Mart 2026',
    content: 'Bostanlı’daki 3+1 dairemizi anahtar teslim komple yenilettik. Tavan alçıpanları, gizli LED ışık havuzları, kapılar ve banyo su izolasyonuna kadar her şey konuştuğumuz takvime harfiyen uyarak 26 günde teslim edildi. Mehmet Usta ve ekibine titizlikleri ve temiz işçilikleri için teşekkür ederiz.',
    projectScope: '135 m² Daire Komple Renovasyon',
    isFeatured: true
  },
  {
    id: 't-2',
    clientName: 'Mimar Hale Çetin',
    district: 'Urla (Kekliktepe)',
    serviceSlug: 'cati-izolasyonu',
    serviceTitle: 'Çatı İzolasyonu ve Kenet Kaplama',
    rating: 5,
    date: '28 Şubat 2026',
    content: 'Mimarlık ofisimizin villa projesinde çatı su yalıtımı ve ısı yalıtım detayları için Atalay Dekorasyon ile çalıştık. Kullanılan mebranların kalitesi, köşe pah detayları ve yağmur oluğu bağlantıları kusursuz yapıldı. İzmir’de işini bu kadar profesyonel takip eden usta ekibi bulmak gerçekten zor.',
    projectScope: '320 m² Villa Çatı Yalıtımı',
    isFeatured: true
  },
  {
    id: 't-3',
    clientName: 'Kenan Demir',
    district: 'Bornova (Özkanlar)',
    serviceSlug: 'alci-uygulamalari',
    serviceTitle: 'Alçı & Asma Tavan Uygulaması',
    rating: 5,
    date: '10 Şubat 2026',
    content: 'Salon ve koridor tavanlarımızda dalgalanmalar vardı. Eski yapıyı söküp galvaniz karkaslı alçıpan tavan ve saten alçı çekildi. Lazer teraziyle çalıştılar, yüzey cam gibi pürüzsüz oldu. İş bitimi evi pırıl pırıl temizleyip teslim ettiler.',
    projectScope: 'Salon & Koridor Gergi Tavan / Alçıpan',
    isFeatured: true
  },
  {
    id: 't-4',
    clientName: 'Dr. Cengiz Yücel',
    district: 'Alsancak',
    serviceSlug: 'ic-cephe-boya',
    serviceTitle: 'İç Cephe Boya ve Renklendirme',
    rating: 5,
    date: '19 Ocak 2026',
    content: 'Tarihi bir apartmandaki muayenehanemizin duvar tamiratları ve boyasını 3 günde tamamladılar. Eşyaları koruyucu naylonlarla tek tek sardılar, zeminlerde tek bir boya damlası dahi kalmadı. Jotun boya uygulandı, renk geçişleri harika oldu.',
    projectScope: '180 m² Muayenehane Boya & Alçı Rötuş',
    isFeatured: true
  },
  {
    id: 't-5',
    clientName: 'Murat & Şule Öztürk',
    district: 'Çiğli (Mavişehir Yakını)',
    serviceSlug: 'isi-yalitimi',
    serviceTitle: 'Dış Cephe Mantolama',
    rating: 5,
    date: '5 Ocak 2026',
    content: '4 katlı aile apartmanımızın dış cephe ısı yalıtımını yaptırdık. İzmir’in rüzgarına ve nemine karşı taş yünü ve fileli sıva kullanıldı. Doğalgaz faturamızda hemen ilk aydan %35 düşüş hissettik. Emeğinize sağlık.',
    projectScope: '4 Katlı Bina Dış Cephe Mantolama',
    isFeatured: true
  },
  {
    id: 't-6',
    clientName: 'Hakan Eren',
    district: 'Bayraklı (Manavkuyu)',
    serviceSlug: 'siva-ve-duvar-uygulamalari',
    serviceTitle: 'Bölme Duvar ve Kaba Sıva',
    rating: 5,
    date: '18 Aralık 2025',
    content: 'Yeni kiraladığımız ofis katında 4 adet bağımsız çalışma odası oluşturmak için çift kat ses yalıtımlı alçıpan bölme duvar yaptırdık. Akustik taş yünü dolgusu sayesinde odalar arası ses geçişi tamamen kesildi. Hızlı ve temiz çalıştılar.',
    projectScope: 'Ofis Katı Bölme Duvar & Akustik Yalıtım',
    isFeatured: false
  },
  {
    id: 't-7',
    clientName: 'Ayşe Korkmaz',
    district: 'Buca (Şirinyer)',
    serviceSlug: 'su-yalitimi',
    serviceTitle: 'Teras & Banyo Su Yalıtımı',
    rating: 5,
    date: '2 Aralık 2025',
    content: 'Üst terasımızdan alt kata su sızıyordu, kış aylarında kabusumuz olmuştu. Çift bileşenli elastik sürme izolasyon ve seramik altı yalıtım yapıldı. Son sağanak yağmurlarda tek bir damla dahi sızmadı. Kesinlikle tavsiye ediyorum.',
    projectScope: '65 m² Teras Su İzolasyonu',
    isFeatured: false
  },
  {
    id: 't-8',
    clientName: 'Serdar Çakır (Site Yöneticisi)',
    district: 'Gaziemir',
    serviceSlug: 'dis-cephe-boya',
    serviceTitle: 'Site Dış Cephe Boya & İskele',
    rating: 5,
    date: '15 Kasım 2025',
    content: '3 bloktan oluşan sitemizin dış cephesini güvenlikli iskele kurarak sözleşmede belirtilen günde teslim ettiler. İskele güvenlik standartları ve usta sigortaları konusunda çok hassas davrandılar. Yönetim olarak çok memnun kaldık.',
    projectScope: '3 Blok Dış Cephe Boyama & Silikonlu Koruma',
    isFeatured: false
  }
]

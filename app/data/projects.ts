import type { ProjectItem } from '~/types/project'

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'prj-1',
    slug: 'karsiyaka-salon-asma-tavan-dekorasyon',
    title: 'Karşıyaka Salon Asma Tavan ve Gizli Işık Tasarımı',
    serviceSlug: 'alci-uygulamalari',
    serviceTitle: 'Alçı Uygulamaları',
    category: 'alci',
    location: 'Karşıyaka / İzmir',
    completionDuration: '5 İş Günü',
    completionDate: '2026-08-15',
    beforeImageUrl: '/images/hero-decoration.jpg',
    afterImageUrl: '/images/hero-decoration.jpg',
    galleryImages: [
      {
        url: '/images/hero-decoration.jpg',
        alt: 'Karşıyaka salon asma tavan ve gizli LED aydınlatma bitmiş hali',
        caption: 'Gizli ışık havuzu ve pürüzsüz saten alçı tavan uygulaması'
      },
      {
        url: '/images/hero-decoration.jpg',
        alt: 'Alçıpan tavan karkas ve aydınlatma detayı',
        caption: 'Lazer terazi ile hizalanmış galvaniz karkas ve LED kanalları'
      }
    ],
    summary: 'Karşıyaka’da 45 m² salon için modern geometrik asma tavan, gizli LED ışık bantları ve saten alçı duvar perdahı çalışması.',
    details: 'Mevcut beton tavandaki kot farkları lazer terazi ile dengelenerek 0.50 mm galvaniz karkas üzerine neme ve ısıya dayanıklı alçıpan plakalar vidalandı. Ek yerleri çatlamaz derz filesi ile güçlendirildi. Üç kat saten alçı perdahı ve zımpara sonrası tavan silinebilir mat beyaz boya ile tamamlandı.',
    materialsUsed: [
      'Knauf / Dalsan Standart Beyaz Alçıpan (12.5 mm)',
      '0.50 mm Paslanmaz Galvaniz Tavan C ve U Profilleri',
      'Kendinden yapışkanlı cam elyaf derz filesi',
      'Filli Boya / Marshall Tavan Boyası'
    ],
    isFeatured: true,
    isDemo: true,
    displayOrder: 1
  },
  {
    id: 'prj-2',
    slug: 'urla-villa-cati-izolasyonu-mantolama',
    title: 'Urla Müstakil Villa Çatı İzolasyonu ve Dış Mantolama',
    serviceSlug: 'cati-izolasyonu',
    serviceTitle: 'Çatı İzolasyonu & Dış Cephe',
    category: 'cati',
    location: 'Urla / İzmir',
    completionDuration: '14 İş Günü',
    completionDate: '2026-07-20',
    beforeImageUrl: '/images/hero-decoration.jpg',
    afterImageUrl: '/images/project-facade.jpg',
    galleryImages: [
      {
        url: '/images/project-facade.jpg',
        alt: 'Urla villa çatı izolasyonu ve dış cephe mantolama teslim görüntüsü',
        caption: 'Kiremit altı membran yalıtımı ve silikonlu dış cephe mantolaması'
      },
      {
        url: '/images/project-facade.jpg',
        alt: 'Çatı kiremit aktarma ve membran detayı',
        caption: 'Baca dipleri ve gizli dere su yalıtım sacları montajı'
      }
    ],
    summary: 'Urla’da şiddetli rüzgar ve yağmurda su alan müstakil villanın çatı aktarımı, 4 mm polyester keçeli membran kaplaması ve 5 cm taşyünü mantolaması.',
    details: 'Çatı kiremitleri tek tek kaldırılarak kırık olanlar yenilendi. Ahşap karkas takviye edilip OSB üzerine şaloma aleviyle çift kat membran kaynatıldı. Dış cephede ise enerji tasarrufu ve ses yalıtımı amacıyla taşyünü levhalar dübellenip fileli sıva ve silikonlu dış cephe boyası ile binaya estetik ve koruyucu zırh kazandırıldı.',
    materialsUsed: [
      '4 mm Polyester Keçeli Bitümlü Membran (-20°C dayanımlı)',
      '5 cm 150 Yoğunluk Taşyünü Isı Yalıtım Levhası',
      '160 gr/m² Alkali Dayanımlı Dış Cephe Sıva Filesi',
      'Jotun / Dyo Silikonlu Su İtici Dış Cephe Boyası'
    ],
    isFeatured: true,
    isDemo: true,
    displayOrder: 2
  },
  {
    id: 'prj-3',
    slug: 'bornova-komple-daire-tadilat-boya',
    title: 'Bornova 3+1 Daire Komple Tadilat ve İtalyan Boya',
    serviceSlug: 'dekorasyon-ve-tadilat',
    serviceTitle: 'Dekorasyon ve Tadilat',
    category: 'tadilat',
    location: 'Bornova / İzmir',
    completionDuration: '21 İş Günü',
    completionDate: '2026-06-10',
    afterImageUrl: '/images/hero-decoration.jpg',
    galleryImages: [
      {
        url: '/images/hero-decoration.jpg',
        alt: 'Bornova daire komple tadilat ve İtalyan efekt boya uygulaması',
        caption: 'Mutfak-salon açık konsept tadilatı ve dekoratif duvar boyası'
      }
    ],
    summary: 'Bornova’da 125 m² dairenin sıhhi tesisat revizyonu, banyo seramikleri, alçıpan TV ünitesi ve İtalyan efekt boya ile anahtar teslim yenilenmesi.',
    details: 'Eski fayans ve zeminler kırılarak molozlar tahliye edildi. Temiz ve atık su tesisatı sıfırdan çekildi. Banyoda çift kat su yalıtımı yapıldıktan sonra 60x120 granit seramikler lazerle döşendi. Salonda özel mermer dokulu İtalyan efekt boya ile çağdaş bir atmosfer yaratıldı.',
    materialsUsed: [
      'San Deco / Novacolor İtalyan Efekt Mermer Boya',
      '60x120 Rektifiyeli Porselen Granit Seramik',
      'Kalekim Elastik Çift Bileşenli Su Yalıtım Harcı',
      'Fıratpen / Dizayn PPRC Tesisat Boruları'
    ],
    isFeatured: true,
    isDemo: true,
    displayOrder: 3
  },
  {
    id: 'prj-4',
    slug: 'cigli-bina-dis-cephe-boya-onarim',
    title: 'Çiğli 4 Katlı Apartman Dış Cephe Boyası ve Çatlak Onarımı',
    serviceSlug: 'dis-cephe-boya',
    serviceTitle: 'Dış Cephe Boya',
    category: 'boya',
    location: 'Çiğli / İzmir',
    completionDuration: '9 İş Günü',
    completionDate: '2026-05-18',
    afterImageUrl: '/images/project-facade.jpg',
    galleryImages: [
      {
        url: '/images/project-facade.jpg',
        alt: 'Çiğli apartman dış cephe boya teslimatı',
        caption: 'Güvenlikli iskele üzerinde çatlak köprüleme ve silikonlu boya'
      }
    ],
    summary: 'Çiğli’de deniz tuzu ve nem nedeniyle kabaran apartman dış cephesinin iskele kurularak raspalanması, elastik tamiri ve 2 kat silikonlu boyanması.',
    details: 'Binanın dış cephesindeki tüm gevşek sıvalar kazındı, demir korozyonu olan bölgeler pas dönüştürücü ve tamir harcıyla izole edildi. Yüksek yapışma gücüne sahip silikonlu astar çekilerek antrasit ve kırık beyaz tonlarında çift kat dış cephe boyası uygulandı.',
    materialsUsed: [
      'Betek / Filli Boya Amphisilan Silikonlu Dış Cephe Boyası',
      'Silikonlu Dış Cephe Astarı',
      'Elyaf Katkılı Yapısal Çatlak Tamir Harcı'
    ],
    isFeatured: false,
    isDemo: true,
    displayOrder: 4
  },
  {
    id: 'prj-5',
    slug: 'cesme-teras-su-izolasyonu',
    title: 'Çeşme Teras ve Açık Balkon Su Yalıtımı',
    serviceSlug: 'su-yalitimi',
    serviceTitle: 'Su Yalıtımı',
    category: 'yalitim',
    location: 'Çeşme / İzmir',
    completionDuration: '4 İş Günü',
    completionDate: '2026-04-12',
    afterImageUrl: '/images/project-facade.jpg',
    galleryImages: [
      {
        url: '/images/project-facade.jpg',
        alt: 'Çeşme teras su yalıtımı teslimatı',
        caption: 'Poliüretan likit membran ile UV dayanımlı teras yalıtımı'
      }
    ],
    summary: 'Çeşme’de şiddetli rüzgar ve kış yağışlarında alt kata su sızdıran 80 m² terasın kırımsız şeffaf poliüretan membran ile yalıtılması.',
    details: 'Mevcut teras seramiklerinin derzleri yenilendi, dip köşelere elastik pah bandı çekildi. Üzerine güneşe ve yaya trafiğine tam dayanıklı şeffaf poliüretan likit membran çift kat uygulanarak 24 saat su testi ile sıfır sızıntı garanti altına alındı.',
    materialsUsed: [
      'Mariseal / Basf UV Dirençli Poliüretan Likit Su Yalıtımı',
      'Poliüretan Mastik ve Pah Bandı'
    ],
    isFeatured: false,
    isDemo: true,
    displayOrder: 5
  },
  {
    id: 'prj-6',
    slug: 'gaziemir-ofis-alcipan-bolme-duvar',
    title: 'Gaziemir Ticari Ofis Alçıpan Bölme Duvar ve Sıva',
    serviceSlug: 'siva-ve-duvar-uygulamalari',
    serviceTitle: 'Sıva ve Duvar Uygulamaları',
    category: 'siva',
    location: 'Gaziemir / İzmir',
    completionDuration: '6 İş Günü',
    completionDate: '2026-03-05',
    afterImageUrl: '/images/hero-decoration.jpg',
    galleryImages: [
      {
        url: '/images/hero-decoration.jpg',
        alt: 'Gaziemir ofis alçıpan bölme duvar ve boya uygulaması',
        caption: 'Taşyünü ses yalıtımlı oda bölme ve saten alçı duvar işçiliği'
      }
    ],
    summary: 'Açık ofis planının taşyünü dolgulu çift kat alçıpan duvarlarla toplantı ve çalışma odalarına bölünmesi, pürüzsüz boyaya hazırlanması.',
    details: 'Ofis içerisinde çalışma konforunu korumak amacıyla akustik taşyünü dolgulu çift kat alçıpan bölme duvarlar inşa edildi. Kapı kasaları güçlendirilmiş profillerle bağlandı, derzler filelenip saten alçı ile pürüzsüz hale getirildi.',
    materialsUsed: [
      '75 mm Galvaniz Duvar U ve C Profilleri',
      'Knauf Akustik Ses Yalıtımlı Alçıpan',
      '5 cm 50 Yoğunluk Taşyünü Ses İzolasyon Şiltesi'
    ],
    isFeatured: false,
    isDemo: true,
    displayOrder: 6
  }
]

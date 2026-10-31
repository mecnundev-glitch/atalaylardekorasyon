export interface DistrictDetail {
  slug: string
  name: string
  title: string
  metaDescription: string
  heroBadge: string
  summary: string
  neighborhoods: string[]
  regionalIssues: {
    title: string
    problem: string
    solution: string
  }[]
  topServices: {
    title: string
    slug: string
    description: string
  }[]
  dispatchNote: string
  sampleProject: {
    title: string
    neighborhood: string
    description: string
    image: string
  }
  faqs: {
    question: string
    answer: string
  }[]
}

export const DISTRICTS_DETAILED_DATA: DistrictDetail[] = [
  {
    slug: 'bornova',
    name: 'Bornova',
    title: 'Bornova Boya Badana, Alçıpan & Komple Tadilat Ustası | Atalay Dekorasyon',
    metaDescription: 'Bornova genelinde Evka 3, Kazımdirik, Erzene, Çamdibi dahil tüm mahallelere yerinde ücretsiz keşif, boya badana, alçı ve anahtar teslim tadilat hizmeti.',
    heroBadge: 'Bornova Yerinde Keşif & Tadilat',
    summary: 'Atalay Dekorasyon, Mehmet Usta öncülüğünde Bornova\'nın tüm semtlerinde yerinde keşif yaparak; alçıpan, boya badana, çatı izolasyonu ve komple daire tadilatı hizmeti sunmaktadır.',
    neighborhoods: [
      'Mevlana Mahallesi',
      'Kazımdirik Mahallesi',
      'Erzene Mahallesi',
      'Evka 3 Mahallesi',
      'Evka 4 Mahallesi',
      'Çamdibi (Yıldırım Beyazıt / Meriç)',
      'Yeşilova Mahallesi',
      'Işıklar Mahallesi',
      'Pınarbaşı Mahallesi',
      'Altındağ Mahallesi'
    ],
    regionalIssues: [
      {
        title: 'Vadi Ayazı ve Yaz Sıcaklığına Bağlı Isı Kayıpları',
        problem: 'Bornova, Yamanlar ve Kemalpaşa yönünden gelen hava akımları nedeniyle kışın ayaz, yazın ise basık sıcak yaşar. Yalıtımsız binalarda duvar içi yoğuşma ve aşırı klima/doğalgaz faturası oluşur.',
        solution: 'Taşyünü ve karbonlu EPS dış cephe mantolama ile ısı köprülerini kesiyor; faturaları %40-50 düşürüyoruz.'
      },
      {
        title: 'Öğrenci ve Kiracı Sirkülasyonunda Dayanıklı Boya İhtiyacı',
        problem: 'Ege Üniversitesi çevresi (Küçükpark, Kazımdirik, Erzene) dairelerinde sık taşınma kaynaklı duvar sürtünmeleri, çivi delikleri ve sararma sıkça görülür.',
        solution: 'Duvarlara astar üzeri teflon katkılı silinebilir ipek mat boya uygulayarak leke tutmayan, yıllarca silinebilen ferah yüzeyler hazırlıyoruz.'
      },
      {
        title: 'Çatı ve Teras Su Sızıntıları',
        problem: 'Bornova’nın eski apartmanlarında ve çatı katlarında yağmur tahliye derelerinin tıkanması veya kiremit altı yıpranması sonucu tavan kabarmaları yaşanır.',
        solution: 'Polyester keçeli 4 mm arduvazlı membran kaynak uygulaması ve gizli dere sacı değişimiyle kalıcı su sızdırmazlık sağlıyoruz.'
      }
    ],
    topServices: [
      {
        title: 'İç Cephe Boya Badana',
        slug: 'ic-cephe-boya',
        description: 'Eşyalı veya boş dairelerde tozsuz maskeleme, çatlak tamiri ve silinebilir boya.'
      },
      {
        title: 'Komple Daire Tadilatı',
        slug: 'dekorasyon-ve-tadilat',
        description: 'Banyo seramik, sıhhi tesisat, asma tavan ve mutfak yenileme tek elden.'
      },
      {
        title: 'Alçıpan & Asma Tavan',
        slug: 'alci-uygulamalari',
        description: 'Lazer terazili gizli ışık havuzları ve saten alçı duvar perdahı.'
      }
    ],
    dispatchNote: 'Bornova içi keşif taleplerinizde Mehmet Usta adresinize gelerek lazer metre ile detaylı metraj ve keşif çalışması gerçekleştirir.',
    sampleProject: {
      title: 'Bornova 3+1 Daire Komple Tadilat ve İtalyan Boya',
      neighborhood: 'Mevlana & Kazımdirik bölgesi',
      description: 'Eski fayansların kırılarak tesisatın yenilenmesi, 60x120 granit seramikler ve açık salon konsepti.',
      image: '/images/projects/prj-apartment-renovation.jpg'
    },
    faqs: [
      {
        question: 'Bornova içi keşif için ücret alıyor musunuz?',
        answer: 'Hayır, Bornova’daki tüm mahallelerde yerinde keşif ve metraj çıkarma hizmetimiz tamamen ücretsizdir.'
      },
      {
        question: 'Hizmet almak için ofise gelmemiz gerekiyor mu?',
        answer: 'Hayır. Sabit bir müşteri kabul ofisimiz bulunmamaktadır; mobil keşif modelimiz sayesinde doğrudan sizin evinize veya iş yerinize gelerek tüm keşif ve projelendirmeyi adresinizde yapıyoruz.'
      },
      {
        question: 'Bornova’da 3+1 daire boyası kaç gün sürer?',
        answer: 'Boş daireler 2 günde; eşyalı ve titiz maskeleme gerektiren daireler 3 iş gününde temizlenmiş olarak teslim edilir.'
      }
    ]
  },
  {
    slug: 'karsiyaka',
    name: 'Karşıyaka',
    title: 'Karşıyaka Boya Badana, Asma Tavan & Banyo Tadilatı | Atalay Dekorasyon',
    metaDescription: 'Karşıyaka Bostanlı, Mavişehir, Alaybey, Bahçelievler ve Aksoy mahallelerinde deniz havasına dayanıklı boya, alçı tavan, banyo tadilatı ve su yalıtımı.',
    heroBadge: 'Deniz Tuzu ve Nem Korumalı Uygulamalar',
    summary: 'Karşıyaka’nın sahil bandı ve yüksek katlı modern binalarında deniz tuzunun neden olduğu cephe dökülmelerine, nemli tavanlara ve lüks iç dekorasyon taleplerine uzman Mehmet Usta çözümleri.',
    neighborhoods: [
      'Bostanlı Mahallesi',
      'Mavişehir Mahallesi',
      'Alaybey Mahallesi',
      'Bahçelievler Mahallesi',
      'Aksoy Mahallesi',
      'Donanmacı Mahallesi',
      'Nergiz Mahallesi',
      'Şemikler Mahallesi',
      'Tersane Mahallesi',
      'Demirköprü Mahallesi'
    ],
    regionalIssues: [
      {
        title: 'Deniz Havası ve Tuz Serpintisine Bağlı Sıva Kabarmaları',
        problem: 'Bostanlı ve Alaybey sahil hattında denizden gelen tuzlu rüzgar sıva gözeneklerine işleyerek boyanın kabarmasına ve çatlamasına neden olur.',
        solution: 'Yüksek tuz direncine sahip silikonlu hidrofobik dış cephe boyaları ve elastik tamir harçları kullanıyoruz.'
      },
      {
        title: 'Zemin ve Giriş Katlarda Yeraltı Su Tablası Rutubeti',
        problem: 'Mavişehir ve Karşıyaka sahil dolgu alanına yakın zemin katlarda kılcal su yükselmesi ve küf kokusu sıklıkla görülür.',
        solution: 'Kristalize su yalıtım kimyasalları ve nefes alan kireç-alçı kombinasyonlu sıva sistemleriyle duvarları rutubetten arındırıyoruz.'
      },
      {
        title: 'Lüks Dairelerde Modern Asma Tavan & Gizli Aydınlatma Talebi',
        problem: 'Bostanlı ve Aksoy’daki geniş salonlarda eski tip tavanların demode kalması ve spot aydınlatma ihtiyacı.',
        solution: 'Lazer gönyesinde galvaniz karkaslı neme dayanıklı alçıpan asma tavanlar ve dimerli gizli LED kanalları inşa ediyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Asma Tavan & Alçıpan',
        slug: 'alci-uygulamalari',
        description: 'Bostanlı ve Mavişehir konutlarına özel gizli ışık havuzları ve saten alçı.'
      },
      {
        title: 'Lüks Banyo Yenileme',
        slug: 'dekorasyon-ve-tadilat',
        description: 'Büyük ebat porselen seramikler, gömme rezervuar ve çift kat sürme yalıtım.'
      },
      {
        title: 'İç Cephe İpek Mat Boya',
        slug: 'ic-cephe-boya',
        description: 'Leke tutmaz, silinebilen ve nefes alan yüksek kalite boyalar.'
      }
    ],
    dispatchNote: 'Çevreyolu üzerinden Karşıyaka ve Bostanlı’ya ortalama 20-30 dakikada ulaşıp yerinde inceleme yapıyoruz.',
    sampleProject: {
      title: 'Karşıyaka Salon Asma Tavan ve Gizli Işık Tasarımı',
      neighborhood: 'Bostanlı & Aksoy Hattı',
      description: 'Lazer terazi ile hizalanmış tavan karkası, gizli LED ışık bantları ve pürüzsüz saten alçı perdahı.',
      image: '/images/projects/prj-drywall-ceiling.jpg'
    },
    faqs: [
      {
        question: 'Karşıyaka’da deniz tuzu boyanın ömrünü kısaltır mı?',
        answer: 'Standart plastik boyalar 1-2 yılda solar veya kabarır. Biz Karşıyaka sahil şeridinde sadece silikonlu ve UV dayanımlı dış cephe boyaları uygulayarak 7-10 yıl koruma sağlıyoruz.'
      },
      {
        question: 'Eşyalı evlerde tavan ve boya yaparken eşyalar zarar görür mü?',
        answer: 'Tüm zeminleri kalın hışır örtü ve zemin mukavvası ile, mobilyaları ise statik toz tutucu naylonlarla %100 sarıyoruz.'
      }
    ]
  },
  {
    slug: 'konak',
    name: 'Konak',
    title: 'Konak Komple Daire Tadilatı, Boya & Tesisat Yenileme | Atalay Dekorasyon',
    metaDescription: 'Konak Alsancak, Güzelyalı, Hatay, Göztepe ve Küçükyalı mahallelerinde eski bina komple tadilatı, sıhhi tesisat yenileme, kara sıva ve anahtar teslim boya.',
    heroBadge: 'Tarihi & Köklü Bina Tadilat Uzmanlığı',
    summary: 'Alsancak, Göztepe, Hatay ve Küçükyalı’daki 30-50 yıllık betonarme yapılarda dökülen tavanların, eskiyen boruların ve çatlayan duvarların kökten yenilenmesi.',
    neighborhoods: [
      'Alsancak Mahallesi',
      'Güzelyalı Mahallesi',
      'Göztepe Mahallesi',
      'Hatay (İnönü Caddesi)',
      'Küçükyalı Mahallesi',
      'Kahramanlar Mahallesi',
      'Mithatpaşa Mahallesi',
      'Eşrefpaşa Mahallesi',
      'Murat Reis Mahallesi',
      'Basmane / Çankaya'
    ],
    regionalIssues: [
      {
        title: 'Eski Sıhhi ve Elektrik Tesisat Borularının Ömrünü Tamamlaması',
        problem: 'Alsancak ve Göztepe’deki eski binalarda demir su borularının paslanması, kaçaklar ve yetersiz elektrik sigorta hatları sıkça arıza çıkarır.',
        solution: 'Tüm tesisatı kırım esnasında sıfırlıyor; PPRC kaynaklı borular ve bağımsız hatlı sigorta panoları kuruyoruz.'
      },
      {
        title: 'Tavan Sıvalarında Dökülme ve Demir Korozyonu',
        problem: 'Üst kat banyo kaçakları nedeniyle betonarme demirleri paslanarak pas payı betonunu patlatır ve tavan sıvaları dökülür.',
        solution: 'Demirleri kumlama ve pas dönüştürücüyle temizliyor; yapısal tamir harcı ve fileli saten alçıyla güçlendiriyoruz.'
      },
      {
        title: 'Bitişik Nizamda Ses ve Isı Yalıtımı Yetersizliği',
        problem: 'Yan daireden gelen konuşma ve gürültüler, bina aralarındaki dilatasyon derzlerinden sızan su ve soğuk.',
        solution: 'Taşyünü dolgulu çift kat alçıpan ses yalıtım duvarları ve poliüretan dilatasyon dolguları uyguluyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Komple Anahtar Teslim Tadilat',
        slug: 'dekorasyon-ve-tadilat',
        description: 'Kırım, moloz atımı, elektrik, su, seramik, tavan ve boya tek elden.'
      },
      {
        title: 'İç Cephe Silinebilir Boya',
        slug: 'ic-cephe-boya',
        description: 'Alsancak ve Güzelyalı yüksek tavanlı dairelerine özel astar ve boya.'
      },
      {
        title: 'Su Yalıtımı & Banyo İzolasyonu',
        slug: 'su-yalitimi',
        description: 'Alt kata su sızmasını %100 engelleyen çift kat elastik sürme yalıtım.'
      }
    ],
    dispatchNote: 'Konak, Alsancak ve Göztepe bölgesine merkezimizden hızlı ulaşım sağlayarak keşif metrajını çıkarıyoruz.',
    sampleProject: {
      title: 'Güzelyalı Daire İçi Silinebilir Boya Badana',
      neighborhood: 'Güzelyalı & Mithatpaşa',
      description: 'Eski sıvaların raspalanması, çatlak köprüleme filesi ve teflon katkılı silinebilir boya uygulaması.',
      image: '/images/projects/prj-interior-painting.jpg'
    },
    faqs: [
      {
        question: 'Alsancak’ta eski bir binada tadilat yaparken bina sakinleri rahatsız olur mu?',
        answer: 'Gürültülü kırım işlerini yasal saatler (10:00 - 17:00) arasına topluyor, apartman merdivenlerini her gün temizleyip molozları brandalı torbalarla asansörsüz tahliye ediyoruz.'
      },
      {
        question: 'Daire tadilatında sözleşme yapıyor musunuz?',
        answer: 'Evet. Yapılacak tüm işleri, kullanılacak marka ve modelleri, başlama ve teslim tarihlerini yazılı sözleşmeye bağlıyoruz.'
      }
    ]
  },
  {
    slug: 'buca',
    name: 'Buca',
    title: 'Buca Boyacı, Çatı İzolasyonu & Daire Boya Badana | Atalay Dekorasyon',
    metaDescription: 'Buca Şirinyer, Adatepe, Efeler, Kozağaç ve Buca Koop mahallelerinde uygun fiyatlı kaliteli boya badana, tavan küf önleme, çatı aktarma ve mantolama.',
    heroBadge: 'Ekonomik Fiyat & Dayanıklı Malzeme Güvencesi',
    summary: 'Buca’nın yoğun yapılaşmasında binalarda yaşanan havalandırma kaynaklı tavan küflenmesi, kiremit çatı kırıkları ve iç mekan boya ihtiyaçlarına Mehmet Usta güvencesi.',
    neighborhoods: [
      'Şirinyer Mahallesi',
      'Adatepe Mahallesi',
      'Efeler Mahallesi',
      'Kozağaç Mahallesi',
      'Buca Koop Mahallesi',
      'Çamlıkule Mahallesi',
      'Yenigün Mahallesi',
      'İşçievleri Mahallesi',
      'Kuruçeşme Mahallesi',
      'Gediz Mahallesi'
    ],
    regionalIssues: [
      {
        title: 'Bitişik Nizam Binalarda Havalandırma Yetersizliği ve Küf',
        problem: 'Aydınlığa bakan banyo ve yatak odası tavanlarında kış aylarında yoğuşma sonucu siyah küf ve rutubet lekeleri oluşur.',
        solution: 'Yüzeyi mantar/küf temizleyici solüsyonla sterilize edip antibakteriyel gümüş iyonlu küf önleyici tavan boyası çekiyoruz.'
      },
      {
        title: 'Eski Çatılarda Kiremit Kırıkları ve Oluk Akıntıları',
        problem: 'Şirinyer ve Kozağaç’taki müstakil veya 4-5 katlı apartman çatılarında şiddetli yağmurda son katlara su sızar.',
        solution: 'Kiremit aktarma, kırıkların değişimi, OSB üzeri şaloma aleviyle polyester keçeli membran kaynağı yapıyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Boya Badana Hizmeti',
        slug: 'ic-cephe-boya',
        description: 'Ekonomik, temiz ve hızlı 1. sınıf işçilikle teslim edilen ev boyaları.'
      },
      {
        title: 'Çatı İzolasyonu & Aktarma',
        slug: 'cati-izolasyonu',
        description: 'Tavan akıntılarına son veren çift kat membran ve dere tamiri.'
      },
      {
        title: 'Dış Cephe Mantolama',
        slug: 'isi-yalitimi',
        description: 'Doğalgaz faturalarını düşüren EPS ve taşyünü mantolama.'
      }
    ],
    dispatchNote: 'Buca ve Şirinyer bölgesine araçlarımızla aynı gün keşif yapıp en net fiyat teklifini hazırlıyoruz.',
    sampleProject: {
      title: 'Buca 3+1 Daire Tavan Küf Onarımı ve Silinebilir Boya',
      neighborhood: 'Şirinyer & Efeler',
      description: 'Küf sterilizasyonu, çatlakların derz dolgusu ve 2 kat antibakteriyel tavan ve duvar boyası.',
      image: '/images/projects/prj-interior-painting.jpg'
    },
    faqs: [
      {
        question: 'Küflü duvarın üzerine direkt boya yapılır mı?',
        answer: 'Asla yapılmaz. Direkt boyanırsa küf 1 ay içinde tekrar yüzeye çıkar. Özel kimyasal solüsyonla kökü kurutulup astarlandıktan sonra antibakteriyel boya uygulanmalıdır.'
      }
    ]
  },
  {
    slug: 'urla',
    name: 'Urla',
    title: 'Urla Villa Çatı İzolasyonu, Dış Cephe Mantolama & Boya | Atalay Dekorasyon',
    metaDescription: 'Urla İskele, Kalabak, Çeşmealtı ve Zeytinalanı’nda müstakil villa çatı aktarma, membran yalıtımı, taşyünü mantolama ve Ege iklimine dayanıklı dış cephe boyası.',
    heroBadge: 'Müstakil Villa ve Çatı İzolasyon Uzmanlığı',
    summary: 'Urla’nın rüzgarlı ve nemli Ege sahil ikliminde villaların çatı izolasyonu, açık teras su yalıtımı, taşyünü mantolama ve kış yağışlarına karşı koruyucu cephe uygulamaları.',
    neighborhoods: [
      'İskele Mahallesi',
      'Kalabak Mahallesi',
      'Çeşmealtı',
      'Zeytinalanı Mahallesi',
      'Gülbahçe Mahallesi',
      'Sıra Mahallesi',
      'Özbek Mahallesi',
      'Yenikent Mahallesi',
      'Torasan Mahallesi',
      'Kuşçular Mahallesi'
    ],
    regionalIssues: [
      {
        title: 'Şiddetli Ege Fırtınaları ve Çatı Kiremit Oynamaları',
        problem: 'Urla ve Çeşmealtı’nda kış fırtınaları kiremitlerin yerinden oynamasına ve alt kata yoğun su sızmasına yol açar.',
        solution: 'Kiremit altı 4 mm polyester keçeli bitümlü membran kaynak uygulaması ve rüzgar kilitli kiremit döşemesi yapıyoruz.'
      },
      {
        title: 'Açık Teraslarda Alt Kat Tavanına Su Yürümesi',
        problem: 'Geniş villa teraslarında derz aralarından sızan su betonarmeyi çürütür ve alt kattaki tavan boyasını mahveder.',
        solution: 'Kırımsız veya seramik altı çift bileşenli UV dayanımlı poliüretan likit su yalıtım sistemleri uyguluyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Çatı İzolasyonu & Membran',
        slug: 'cati-izolasyonu',
        description: 'Villalarda kiremit altı membran, gizli dere ve baca yalıtımı.'
      },
      {
        title: 'Dış Cephe Mantolama',
        slug: 'isi-yalitimi',
        description: 'Taşyünü levhalarla kışın sıcak, yazın serin tutan enerji zırhı.'
      },
      {
        title: 'Teras Su Yalıtımı',
        slug: 'su-yalitimi',
        description: 'UV ışınlarına ve dona dayanıklı elastik teras izolasyonu.'
      }
    ],
    dispatchNote: 'Urla ve Çeşmealtı bölgesindeki müstakil ev ve villalara yerinde keşif aracı çıkarıyoruz.',
    sampleProject: {
      title: 'Urla Müstakil Villa Çatı İzolasyonu ve Dış Mantolama',
      neighborhood: 'Kalabak & Çeşmealtı',
      description: 'Çatı kiremit aktarımı, 4 mm membran kaynağı ve 5 cm taşyünü mantolama teslimatı.',
      image: '/images/projects/prj-roof-insulation.jpg'
    },
    faqs: [
      {
        question: 'Urla’da teras seramiklerini kırmadan yalıtım mümkün mü?',
        answer: 'Evet. Yaya trafiğine ve güneşe dayanıklı şeffaf poliüretan likit yalıtım katmanıyla kırımsız su sızdırmazlık sağlıyoruz.'
      }
    ]
  },
  {
    slug: 'cesme',
    name: 'Çeşme',
    title: 'Çeşme Teras Su Yalıtımı, Çatı & Dış Cephe Boya | Atalay Dekorasyon',
    metaDescription: 'Çeşme Alaçatı, Ilıca, Dalyan ve Reisdere’de villa teras su yalıtımı, taş ev derz sıva tamiratı, çatı izolasyonu ve güneş solmasına dirençli Jotun dış cephe boyası.',
    heroBadge: 'Alaçatı & Çeşme Villa Yalıtım Çözümleri',
    summary: 'Çeşme’nin kış aylarındaki yoğun yağış ve fırtınalarına, yaz aylarındaki yüksek ultraviyole güneş ışınlarına karşı villalarda çatı, teras ve cephe izolasyonu.',
    neighborhoods: [
      'Alaçatı Mahallesi',
      'Ilıca Mahallesi',
      'Dalyan Mahallesi',
      'Reisdere Mahallesi',
      'Çiftlikköy',
      'Ovacık Mahallesi',
      'Fahrettinpaşa Mahallesi',
      'Musalla Mahallesi'
    ],
    regionalIssues: [
      {
        title: 'Kış Yağışlarında Havuz Kenarı ve Teras Su Kaçakları',
        problem: 'Sezon dışında kapalı kalan villalarda sızan sular parkelerin şişmesine ve tavanların dökülmesine neden olur.',
        solution: 'Elastik pah bantlı, UV ve donma dirençli poliüretan membran kaplama ile 10 yıl sızdırmazlık sunuyoruz.'
      },
      {
        title: 'Kavurucu Güneşte Dış Cephe Boyalarının Tebeşirlenmesi',
        problem: 'Aşırı UV radyasyonu boyanın pigmentlerini yakarak solmaya ve ufalanmaya yol açar.',
        solution: '100% saf akrilik ve silikonlu mikronize dış cephe boyalarıyla binaya kalıcı estetik sağlıyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Teras Su İzolasyonu',
        slug: 'su-yalitimi',
        description: 'Çeşme açık teraslarına özel kırımsız sürme poliüretan yalıtım.'
      },
      {
        title: 'Çatı İzolasyonu',
        slug: 'cati-izolasyonu',
        description: 'Kiremit altı membran ve gizli oluk tamiratı.'
      },
      {
        title: 'Dış Cephe Koruma',
        slug: 'dis-cephe-boya',
        description: 'UV dayanımlı, tuz serpintisine dirençli villa boyaları.'
      }
    ],
    dispatchNote: 'Çeşme ve Alaçatı için randevulu keşif programı oluşturarak adresinize geliyoruz.',
    sampleProject: {
      title: 'Çeşme Teras ve Açık Balkon Su Yalıtımı',
      neighborhood: 'Ilıca & Dalyan',
      description: '80 m² terasın poliüretan likit membran ile kaplanarak 24 saat su testi ile teslimi.',
      image: '/images/projects/prj-terrace-waterproofing.jpg'
    },
    faqs: [
      {
        question: 'Çeşme’de yalıtım ve boya için en uygun mevsim hangisidir?',
        answer: 'İlkbahar (Mart - Mayıs) ve Sonbahar (Eylül - Kasım) ayları hava koşulları açısından en ideal uygulama dönemidir.'
      }
    ]
  },
  {
    slug: 'cigli',
    name: 'Çiğli',
    title: 'Çiğli Dış Cephe Boya, Mantolama & Alçıpan Ustası | Atalay Dekorasyon',
    metaDescription: 'Çiğli Ataşehir, Balatçık, Sasalı, Evka 5 ve Egekent’te apartman dış cephe boyası, çatlak tamiratı, taşyünü mantolama ve alçı sıva işçiliği.',
    heroBadge: 'Apartman & Site Dış Cephe Çözümleri',
    summary: 'Çiğli Ataşehir sitelerindeki çok katlı binalarda iskeleli dış cephe boyası ve Sasalı villalarında kiremit çatı su yalıtımı uygulamaları.',
    neighborhoods: [
      'Ataşehir Mahallesi',
      'Balatçık Mahallesi',
      'Sasalı Mahallesi',
      'Evka 5 Mahallesi',
      'Egekent Mahallesi',
      'İzkent Mahallesi',
      'Küçük Çiğli',
      'Harmandalı'
    ],
    regionalIssues: [
      {
        title: 'Yüksek Binalarda Rüzgar Erozyonu ve Sıva Çatlakları',
        problem: 'Ataşehir ve Evka 5’teki yüksek katlı apartmanlarda rüzgar sıva birleşim noktalarından çatlaklar açarak yağmur suyu çeker.',
        solution: 'Güvenlikli iskele üzerinde elastik elyaf takviyeli tamir harçları ve silikonlu elastik dış cephe boyası uyguluyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Dış Cephe Boya & İskele',
        slug: 'dis-cephe-boya',
        description: 'Çelik iskeleli, çatlak tamiratlı ve garantili apartman cephe yenileme.'
      },
      {
        title: 'Alçıpan & Duvar',
        slug: 'alci-uygulamalari',
        description: 'Balatçık ve Ataşehir konutlarına özel pürüzsüz saten alçı ve asma tavan.'
      }
    ],
    dispatchNote: 'Çiğli ve Sasalı bölgesine merkezimizden hızlı keşif ekibi yönlendiriyoruz.',
    sampleProject: {
      title: 'Çiğli 4 Katlı Apartman Dış Cephe Boyası',
      neighborhood: 'Ataşehir & Egekent',
      description: 'Tüm cephenin raspalanması, çatlakların elastik tamiri ve 2 kat silikonlu antrasit-beyaz boya.',
      image: '/images/projects/prj-facade-scaffolding.jpg'
    },
    faqs: [
      {
        question: 'Apartman dış cephesi için site yönetimine resmi teklif veriyor musunuz?',
        answer: 'Evet. Kaşeli, imzalı, ayrıntılı teknik şartnameli ve taksitlendirme seçenekli resmi teklif dosyası hazırlıyoruz.'
      }
    ]
  },
  {
    slug: 'bayrakli',
    name: 'Bayraklı',
    title: 'Bayraklı Boyacı, Alçıpan Asma Tavan & Daire Tadilatı | Atalay Dekorasyon',
    metaDescription: 'Bayraklı Manavkuyu, Mansuroğlu, Adalet, Osmangazi mahallelerinde modern daire içi tadilat, saten alçı, silinebilir boya ve ofis bölme duvarları.',
    heroBadge: 'Yeni & Modern Konut Dekorasyonları',
    summary: 'Bayraklı Manavkuyu ve Mansuroğlu bölgesindeki rezidans, ofis ve dairelerde çağdaş alçıpan çözümleri, gizli aydınlatmalar ve silinebilir boya uygulamaları.',
    neighborhoods: [
      'Manavkuyu Mahallesi',
      'Mansuroğlu Mahallesi',
      'Adalet Mahallesi',
      'Osmangazi Mahallesi',
      'Postacılar Mahallesi',
      'Tepekule Mahallesi',
      'Soğukkuyu Mahallesi',
      'Cengizhan Mahallesi'
    ],
    regionalIssues: [
      {
        title: 'Yeni Yapılarda Oturma Çatlakları',
        problem: 'Yeni inşa edilen binalarda ilk 2-3 yıl içinde beton oturması kaynaklı alçı ve boya çatlakları meydana gelir.',
        solution: 'Ek yerlerinde kendinden yapışkanlı cam elyaf derz filesi ve elastik derz dolguları kullanarak çatlamayı önlüyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Alçıpan Asma Tavan',
        slug: 'alci-uygulamalari',
        description: 'Rezidans ve geniş salonlara özel modern geometrik ışık bantları.'
      },
      {
        title: 'İç Cephe Boya Badana',
        slug: 'ic-cephe-boya',
        description: 'Teflon katkılı leke tutmaz boyalar ve kusursuz maskeleme.'
      }
    ],
    dispatchNote: 'Bayraklı ilçesindeki tüm mahallelere kısa sürede ücretsiz keşfe gelerek yerinde inceleme yapıyoruz.',
    sampleProject: {
      title: 'Bayraklı Ofis ve Salon Alçıpan Işık Havuzu',
      neighborhood: 'Manavkuyu & Mansuroğlu',
      description: 'Lazer gönyesinde galvaniz karkaslı asma tavan ve İtalyan efekt mermer boya.',
      image: '/images/projects/prj-drywall-ceiling.jpg'
    },
    faqs: [
      {
        question: 'Bayraklı’ya ne kadar sürede keşfe gelebiliyorsunuz?',
        answer: 'Bayraklı, Manavkuyu ve Mansuroğlu bölgelerine aynı gün içinde ulaşıp yerinde metraj ve hasar tespiti yapabiliyoruz.'
      }
    ]
  },
  {
    slug: 'gaziemir',
    name: 'Gaziemir',
    title: 'Gaziemir Boya Badana, Ofis Alçıpan & Çatı İzolasyonu | Atalay Dekorasyon',
    metaDescription: 'Gaziemir Beyazevler, Atıfbey, Gazi Mahallesi ve Serbest Bölge yakınlarında ticari ofis bölme duvar, daire boya badana ve çatı yalıtımı.',
    heroBadge: 'Ticari Mekan & Konut Çözümleri',
    summary: 'Gaziemir’deki sanayi, serbest bölge ofisleri ve konut alanlarında ses yalıtımlı alçıpan bölme duvarlar, dayanıklı epoksi/akrilik boyalar ve çatı izolasyonları.',
    neighborhoods: [
      'Beyazevler Mahallesi',
      'Atıfbey Mahallesi',
      'Gazi Mahallesi',
      'Aktepe Mahallesi',
      'Sevgi Mahallesi',
      'Irmak Mahallesi',
      'Emrez Mahallesi',
      'Menderes Mahallesi'
    ],
    regionalIssues: [
      {
        title: 'Ticari Ofislerde Ses Yalıtımı İhtiyacı',
        problem: 'Yan yana çalışan departmanlar arasında ses geçişi iş verimini düşürür.',
        solution: 'Taşyünü dolgulu çift kat akustik alçıpan bölme duvar sistemleri inşa ediyoruz.'
      }
    ],
    topServices: [
      {
        title: 'Sıva ve Bölme Duvar',
        slug: 'siva-ve-duvar-uygulamalari',
        description: 'Ofis ve iş yerlerine özel ses yalıtımlı galvaniz karkaslı duvarlar.'
      },
      {
        title: 'Daire Boya Badana',
        slug: 'ic-cephe-boya',
        description: 'Gaziemir konutlarında hızlı, temiz ve silinebilir boya teslimatı.'
      }
    ],
    dispatchNote: 'Gaziemir ve çevresine aynı gün keşif planlayarak yazılı fiyat teklifi sunuyoruz.',
    sampleProject: {
      title: 'Gaziemir Ticari Ofis Alçıpan Bölme Duvar ve Sıva',
      neighborhood: 'Beyazevler & Atıfbey',
      description: 'Taşyünü ses yalıtımlı toplantı odası bölmeleri ve saten alçı duvar işçiliği.',
      image: '/images/projects/prj-office-partition.jpg'
    },
    faqs: [
      {
        question: 'İş yerinde mesai saatleri dışında tadilat yapabiliyor musunuz?',
        answer: 'Evet. Ticari ofislerde iş akışının aksamaması için akşam veya hafta sonu çalışma programı uygulayabiliyoruz.'
      }
    ]
  }
]

export const getDistrictBySlug = (slug: string): DistrictDetail | undefined => {
  return DISTRICTS_DETAILED_DATA.find(d => d.slug === slug)
}


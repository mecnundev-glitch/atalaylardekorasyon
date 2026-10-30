import type { ServiceItem } from '~/types/service'

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'alci-uygulamalari',
    title: 'Alçı Uygulamaları',
    subtitle: 'Asma Tavan, Gizli Işık Bandı ve Alçıpan Bölme Duvar Sistemleri',
    shortDescription: 'İzmir genelinde asma tavan, LED gizli aydınlatma bantları, kartonpiyer, bölme duvar ve saten alçı yüzey düzeltme hizmetleri.',
    description: 'Atalay Dekorasyon olarak konut, ofis ve ticari mekanlarınızda modern mimari trendlere uygun alçıpan ve alçı çözümleri üretiyoruz. Akustik ve ısı yalıtımı sağlayan asma tavanlardan şık gizli ışık havuzlarına, alanları fonksiyonel kılan alçıpan bölme duvarlardan pürüzsüz saten alçı perdahına kadar tüm uygulamaları birinci sınıf malzeme ve lazer terazili titiz işçilikle teslim ediyoruz.',
    scope: [
      'Alçıpan asma tavan ve modüler tavan sistemleri',
      'LED ve spot uyumlu gizli ışık havuzu ve tavan bantları',
      'Ses ve ısı yalıtımlı alçıpan bölme duvar yapımı',
      'Klasik ve modern kartonpiyer, poliüretan çıta ve köşe çıtalama',
      'Duvar yüzeylerinde saten alçı ve pürüzsüz macun perdahı',
      'Dekoratif niş ve TV ünitesi alçıpan tasarımları'
    ],
    processSteps: [
      {
        title: '1. Keşif & Lazer Ölçüm',
        description: 'Tavan ve duvarların kot farkları lazer terazi ile ölçülür; tesisat geçişleri ve aydınlatma planı belirlenir.'
      },
      {
        title: '2. Galvaniz Karkas Montajı',
        description: 'Paslanmaz galvaniz profiller standart aks aralıklarında çelik dübellerle tavana ve zemine sabitlenir.'
      },
      {
        title: '3. Alçıpan Plaka Vidalama',
        description: 'Mekana uygun (neme dayanıklı yeşil veya standart beyaz) alçıpan plakalar karkasa nizami vidalanır.'
      },
      {
        title: '4. File & Derz Dolgu İşlemi',
        description: 'Tüm ek yerlerine derz filesi çekilerek çatlamayı önleyen dolgu alçısı ve ardından saten perdah alçısı uygulanır.'
      },
      {
        title: '5. Zımpara & Teslimat',
        description: 'Işık altında pürüzsüzlük kontrolü yapılarak zımparalanır ve boyaya hazır kusursuz halde teslim edilir.'
      }
    ],
    technicalStandards: [
      'TSE belgeli standart ve neme dayanıklı alçıpan paneller',
      '0.50 mm - 0.60 mm galvaniz tavan C ve U profilleri',
      'Çatlama riskini sıfıra indiren kendinden yapışkanlı derz filesi',
      'Lazer terazili milimetrik kot ve gönye hassasiyeti'
    ],
    iconName: 'Layers',
    coverImageUrl: '/images/projects/prj-drywall-ceiling.jpg',
    features: [
      'Lazer Terazili Montaj',
      'Neme Dayanıklı Yeşil Plaka Seçeneği',
      'Çatlamaz Derz Filesi Güvencesi'
    ],
    faqs: [
      {
        question: 'Asma tavan ne kadar tavan yüksekliği kaybına yol açar?',
        answer: 'Standart spot ve gizli ışık uygulamalarında tavan yüksekliğinden genellikle 10-15 cm arasında bir pay kullanılır. Mekanın yüksekliğine göre minimum 8 cm ile de çözüm üretebilmekteyiz.'
      },
      {
        question: 'Alçıpan bölme duvar ses geçirir mi?',
        answer: 'Profil karkas arasına taşyünü veya camyünü ses yalıtım şiltesi yerleştirilerek çift kat alçıpan uygulandığında tuğla duvardan daha yüksek ses yalıtım performansı elde edilir.'
      }
    ],
    relatedSlugs: ['ic-cephe-boya', 'siva-ve-duvar-uygulamalari', 'dekorasyon-ve-tadilat'],
    displayOrder: 1
  },
  {
    id: 'srv-2',
    slug: 'ic-cephe-boya',
    title: 'İç Cephe Boya',
    subtitle: 'Silinebilir Su Bazlı Boyalar, İtalyan Efekt ve Dekoratif Uygulamalar',
    shortDescription: 'İzmir genelinde ev ve iş yerleri için silinebilir antibakteriyel boyalar, tavan boyası, İtalyan mermer efekt ve dekoratif boya işçiliği.',
    description: 'İç mekan boya işçiliği sadece duvara renk vermek değil, zemin hazırlığı ve kusursuz yüzey oluşturma sanatıdır. Atalay Dekorasyon olarak İzmir genelinde eşyalı veya boş mekanlarınızda titiz maskeleme yaparak toza ve boya damlamalarına karşı %100 koruma sağlıyoruz. Duvarlardaki çatlak ve çivileri onarıyor, astar uygulayarak kaliteli marka boyalarla uzun yıllar silinebilen, nefes alan ve leke tutmayan ferah alanlar oluşturuyoruz.',
    scope: [
      'Tüm mobilya, kapı, süpürgelik ve zeminlerin kalın naylonla maskelenmesi',
      'Duvarlardaki çatlak, çukur ve kabarmaların kazınıp alçıyla tamiri',
      'Yüzey emiciliğini dengeleyen binder veya dönüştürücü astar uygulaması',
      'En az 2 kat silinebilir, antibakteriyel su bazlı iç cephe boyası',
      'Tavanlarda nefes alan, sararmayan tavan boyası uygulaması',
      'Özel tasarım İtalyan efekt, mermer dokulu veya simli dekoratif boyalar'
    ],
    processSteps: [
      {
        title: '1. Koruma & Maskeleme',
        description: 'Eşyalar odanın ortasına toplanır, zeminler koruyucu karton ve naylon ile süpürgelikler maskeleme bantlarıyla kapatılır.'
      },
      {
        title: '2. Yüzey Onarımı & Zımpara',
        description: 'Eski dökülen boyalar kazınır, çatlaklar doldurulur ve duvarlar pürüzsüzleşene kadar zımparalanır.'
      },
      {
        title: '3. Astar Katı',
        description: 'Boya sarfiyatını azaltan ve yapışmayı güçlendiren kaliteli astar çekilir.'
      },
      {
        title: '4. İki Kat Boya Uygulaması',
        description: 'Seçilen renkte TSE belgeli silinebilir boya katlar arası kuruma süresi beklenerek rulo ve fırça ile uygulanır.'
      },
      {
        title: '5. Temizlik & Kontrol',
        description: 'Tüm maskelemeler sökülür, alan temizlenir ve müşteriyle birlikte gün ışığında son kontrol yapılır.'
      }
    ],
    technicalStandards: [
      'VOC oranı düşük, kokusuz ve insan sağlığına dost su bazlı boyalar',
      'Silinebilir, teflon katkılı veya mat kadife doku seçenekleri',
      'Boya öncesi aderans artırıcı şeffaf astar kullanımı',
      'Leke bırakmayan profesyonel kadife ve saten rulolar'
    ],
    iconName: 'Paintbrush',
    coverImageUrl: '/images/projects/prj-interior-painting.jpg',
    features: [
      'Mobilya ve Zemin Maskeleme Koruması',
      'Silinebilir & Leke Tutmaz Marka Boyalar',
      'İtalyan Efekt ve Özel Doku Seçenekleri'
    ],
    faqs: [
      {
        question: '3+1 daire boyası kaç günde tamamlanır?',
        answer: 'Standart 3+1 boş bir daire genellikle 2-3 iş günü içerisinde; eşyalı ve detaylı tamirat gerektiren daireler ise 3-4 iş günü içerisinde temizlenmiş olarak teslim edilir.'
      },
      {
        question: 'Evde otururken boya yaptırmak mümkün mü, koku yapar mı?',
        answer: 'Kullandığımız yeni nesil su bazlı akrilik boyalar solvent içermez, kokusuzdur ve kuruma süresi çok hızlıdır. Odaları parça parça yaparak otururken de rahatlıkla uygulama yapabiliyoruz.'
      }
    ],
    relatedSlugs: ['alci-uygulamalari', 'dis-cephe-boya', 'dekorasyon-ve-tadilat'],
    displayOrder: 2
  },
  {
    id: 'srv-3',
    slug: 'dis-cephe-boya',
    title: 'Dış Cephe Boya',
    subtitle: 'Zorlu Hava Koşullarına Dayanıklı Silikonlu ve Akrilik Cephe Boyaları',
    shortDescription: 'İzmir’in güneşi, nemi ve deniz tuzuna dayanıklı silikonlu dış cephe boyası, çatlak köprüleme ve iskeleli profesyonel cephe yenileme.',
    description: 'İzmir ve Ege sahil kuşağındaki binalar; yüksek UV ışınları, deniz tuzu, nem ve kış rüzgarları nedeniyle dış cephe yıpranmasına maruz kalır. Atalay Dekorasyon olarak binaların dış cephesindeki sıva çatlaklarını ve su alan noktaları onarıyor; su itici silikonlu, elastik ve nefes alan yüksek korumalı dış cephe boyalarıyla binanızı hem güzelleştiriyor hem de dış etkenlere karşı zırh gibi koruyoruz.',
    scope: [
      'Bina çevresine güvenlikli çelik iskele kurulumu ve sökümü',
      'Eski kabarmış sıva ve boya katmanlarının basınçlı su/kazıma ile temizliği',
      'Kılcal ve yapısal cephe çatlaklarının elastik tamir harçlarıyla doldurulması',
      'Yüksek penetrasyonlu silikonlu dış cephe astarı uygulaması',
      'En az 2 kat silikonlu, su itici ve UV dirençli dış cephe boyası',
      'Balkon altları, denizlikler ve parapetlerin su yalıtımlı boyanması'
    ],
    processSteps: [
      {
        title: '1. Güvenlikli İskele Kurulumu',
        description: 'İş sağlığı ve güvenliği standartlarına uygun çelik iskele ve güvenlik fileleri kurulur.'
      },
      {
        title: '2. Yüzey Yıkama & Kazıma',
        description: 'Toz, yosun ve gevşek sıvalar basınçlı su ve raspalarla tamamen arındırılır.'
      },
      {
        title: '3. Çatlak Onarımı & Pah Çekimi',
        description: 'Su sızmasına yol açan tüm derzler ve kılcal çatlaklar elastik mastik ve elyaflı harçla kapatılır.'
      },
      {
        title: '4. Silikonlu Astar Katı',
        description: 'Tüm yüzeye cephenin su emiciliğini kesen güçlü dış cephe astarı doyurulur.'
      },
      {
        title: '5. İki Kat Dış Cephe Boyası',
        description: 'İzmir iklimine dayanıklı silikonlu boya homojen şekilde uygulanarak bina teslim edilir.'
      }
    ],
    technicalStandards: [
      'Su itici hidrofobik silikon teknolojisi',
      'Tuzlu deniz havasına ve UV solmasına karşı 5-10 yıl renk stabilitesi',
      'Binanın nefes almasını sağlayan yüksek buhar geçirgenliği',
      'İSG mevzuatına uygun güvenlikli iskele ve emniyet kemeri kullanımı'
    ],
    iconName: 'Building',
    coverImageUrl: '/images/projects/prj-facade-scaffolding.jpg',
    features: [
      'Su İtici Silikon Teknolojisi',
      'Güneş ve Neme Karşı UV Direnci',
      'Güvenlikli İskeleli Profesyonel Kadro'
    ],
    faqs: [
      {
        question: 'Dış cephe boyası için en uygun mevsim hangisidir?',
        answer: 'İzmir şartlarında dış cephe boyası için en elverişli aylar ilkbahar ve sonbahar aylarıdır (Nisan-Haziran ve Eylül-Kasım). Ancak yağışsız ve don riski olmayan her mevsimde uygulama yapılabilir.'
      },
      {
        question: 'Apartman yönetimi için keşif ve sunum yapıyor musunuz?',
        answer: 'Evet. Apartman ve site yönetim kurullarına yerinde keşif yaparak metraj tablosu, malzeme alternatifleri ve ödeme planı içeren resmi teklif dosyası hazırlıyoruz.'
      }
    ],
    relatedSlugs: ['isi-yalitimi', 'cati-izolasyonu', 'siva-ve-duvar-uygulamalari'],
    displayOrder: 3
  },
  {
    id: 'srv-4',
    slug: 'siva-ve-duvar-uygulamalari',
    title: 'Sıva ve Duvar Uygulamaları',
    subtitle: 'Kara Sıva, Alçı Sıva, Çatı & Duvar Tamiratı ve Dekoratif Kaplamalar',
    shortDescription: 'Kaba inşaat kara sıva, pürüzsüz makineli ve el alçı sıva, kültür taşı, dekoratif tuğla kaplama ve duvar örme ustalık hizmetleri.',
    description: 'Dayanıklı ve düzgün bir yapının temeli doğru sıva uygulamasından geçer. Atalay Dekorasyon olarak terazi ve mastar gönyesinde kara sıva, pürüzsüz alçı sıva, dış cephe kaba-ince sıva ve dekoratif taş duvar kaplama hizmetleri veriyoruz. Çatlak, dökülen veya rutubetten kabaran duvarları kökten kazıyarak doğru harç karışımı ve aderans kimyasallarıyla ilk günkü sağlamlığına kavuşturuyoruz.',
    scope: [
      'Tuğla ve gazbeton üzeri terazi ve mastarında kara sıva uygulaması',
      'İç mekanlarda pürüzsüz yüzey oluşturan alçı sıva çekimi',
      'Rutubetli ve tuzlanan duvarlarda rehabilitasyon ve sıva yenileme',
      'Kültür tuğlası, patlatma taş ve dekoratif panel duvar kaplamaları',
      'İç mekan oda bölme amaçlı gazbeton (ytong) ve briket duvar örme',
      'Kiriş ve kolon köşelerine paslanmaz çelik sıva filesi ve köşe profili montajı'
    ],
    processSteps: [
      {
        title: '1. Yüzey Temizliği & Serpme',
        description: 'Duvar tozlardan arındırılır, aderans artırıcı çimento şerbeti ve serpme harç atılır.'
      },
      {
        title: '2. Ano Çıtaları & Mastar Kotu',
        description: 'Lazer terazi ile duvara ano çıtaları yerleştirilerek düzlemsellik garanti edilir.'
      },
      {
        title: '3. Kaba ve İnce Sıva',
        description: 'Kum, çimento ve kireç karışımı harç ano aralarına basılarak alüminyum mastarla düzlenir.'
      },
      {
        title: '4. Tirfil ve Perdahlama',
        description: 'İnce sıva katmanı tirfil süngeri ile dairesel hareketlerle pürüzsüzleştirilir.'
      },
      {
        title: '5. Kürleme ve Son Kontrol',
        description: 'Sıvanın yanmaması için belirli periyotlarda sulama kürlemesi yapılarak mukavemet sağlanır.'
      }
    ],
    technicalStandards: [
      'TSE EN 998-1 standartlarında hazır veya geleneksel sıva harçları',
      'Köşe çatlamalarını engelleyen paslanmaz delikli köşe profilleri',
      'Farklı malzeme birleşimlerinde sıva donatı filesi kullanımı',
      'Lazer terazi ile mastar kontrolü'
    ],
    iconName: 'Hammer',
    coverImageUrl: '/images/projects/prj-office-partition.jpg',
    features: [
      'Mastar ve Lazer Terazili Düzlemsellik',
      'Fileli Köşe Profili Desteği',
      'Dekoratif Taş ve Tuğla Seçenekleri'
    ],
    faqs: [
      {
        question: 'Kara sıva ile alçı sıva arasındaki fark nedir?',
        answer: 'Kara sıva çimento ve kum bazlı olup yüksek mekanik dayanım ve neme direnç sağlar; genellikle kaba yapıda veya banyolarda tercih edilir. Alçı sıva ise iç mekanlarda pürüzsüz, nefes alan ve doğrudan boyaya hazır beyaz yüzeyler sunar.'
      }
    ],
    relatedSlugs: ['alci-uygulamalari', 'ic-cephe-boya', 'dekorasyon-ve-tadilat'],
    displayOrder: 4
  },
  {
    id: 'srv-5',
    slug: 'cati-izolasyonu',
    title: 'Çatı İzolasyonu',
    subtitle: 'Kiremit Altı Membran, Shingle, Sandviç Panel ve Gizli Dere Yalıtımı',
    shortDescription: 'İzmir’de su sızdıran çatılara kesin çözüm: Kiremit aktarma, arduvazlı membran kaplama, shingle, oluk tamiratı ve ısı yalıtımlı çatı izolasyonu.',
    description: 'Yağmur mevsiminde evlerin en büyük kabusu olan tavan akıntıları, kiremit kırıkları ve çatı sızıntılarını kalıcı olarak çözüyoruz. Atalay Dekorasyon olarak çatı iskeletini inceliyor; yıpranmış ahşap veya demir konstrüksiyonu onarıyor, OSB kaplama üzeri polyester keçeli bitümlü membran veya arduvazlı membran şaloma aleviyle kaynatıyoruz. Baca dipleri ve su tahliye derelerini titizlikle yalıtarak binanızı su hasarlarına karşı güvenceye alıyoruz.',
    scope: [
      'Mevcut kiremitlerin toplanması, yıkanması ve kırıkların yenilenmesi (Çatı Aktarma)',
      'Çatı ahşap veya profil karkasının güçlendirilmesi, meyil kontrolü',
      'OSB plaka çakımı ve zemin düzeltme',
      '3 mm veya 4 mm polyester keçeli bitümlü membran kaynak uygulaması',
      'Üst katman olarak dekoratif arduvazlı (kumlu) membran veya shingle kaplama',
      'Gizli dere, çinko oluk, baca dibi ve parapet su yalıtım saclarının montajı'
    ],
    processSteps: [
      {
        title: '1. Çatı Analizi & Eğim Kontrolü',
        description: 'Çatıya çıkılarak suyun göllendiği yerler, dere meyli ve ahşap karkasın sağlamlığı incelenir.'
      },
      {
        title: '2. Kaba Temizlik & Tamir',
        description: 'Eski yıpranmış kaplamalar sökülür, kırık kiremitler ve çürük tahtalar yenilenir.'
      },
      {
        title: '3. Astar & Membran Kaynağı',
        description: 'Zemine bitüm astar çekilir; polyester keçeli membran şaloma aleviyle binme paylarına dikkat edilerek kaynatılır.'
      },
      {
        title: '4. Baca Dibi & Dere İzolasyonu',
        description: 'Kritik sızdırma noktalarına çift kat membran ve alüminyum baskı çıtasıyla kilit yalıtım yapılır.'
      },
      {
        title: '5. Su Testi & Teslimat',
        description: 'Su tahliyesi kontrol edilerek çatı sözleşmeli garanti ile teslim edilir.'
      }
    ],
    technicalStandards: [
      '-20°C ile +120°C arası esnekliğini koruyan APP modifiyeli bitümlü membranlar',
      'Polyester keçe taşıyıcılı yüksek yırtılma direnci',
      'Baca ve duvar diplerinde alüminyum baskı çıtası ve poliüretan mastik kilitlemesi',
      'Su göllenmesini engelleyen minimum %5 akıntı meyli'
    ],
    iconName: 'Home',
    coverImageUrl: '/images/projects/prj-roof-insulation.jpg',
    features: [
      'Şaloma Kaynaklı Çift Kat Membran',
      'Baca Dibi ve Gizli Dere Kilitlemesi',
      'Sözleşmeli Su Sızdırmazlık Güvencesi'
    ],
    faqs: [
      {
        question: 'Çatı yalıtımı kaç yıl dayanır?',
        answer: 'Doğru eğim verilmiş, kaliteli polyester keçeli membran ve doğru işçilikle yapılan çatı izolasyonları ortalama 15-20 yıl boyunca su sızdırmadan güvenle hizmet verir.'
      },
      {
        question: 'Kiremit aktarma mı yoksa membran kaplama mı daha iyidir?',
        answer: 'İzmir genelinde en sağlıklı çözüm kiremitlerin altına membran çekilmesidir. Böylece kiremitler rüzgar ve güneşi keserken, membran ise sıfır su sızdırmazlığı garanti eder.'
      }
    ],
    relatedSlugs: ['su-yalitimi', 'isi-yalitimi', 'dis-cephe-boya'],
    displayOrder: 5
  },
  {
    id: 'srv-6',
    slug: 'su-yalitimi',
    title: 'Su Yalıtımı',
    subtitle: 'Temel Bohçalama, Perde Beton, Teras, Balkon ve Islak Hacim İzolasyonu',
    shortDescription: 'Yapılarınızı korozyondan ve nemden koruyan çimento/poliüretan esaslı teras, balkon, temel ve banyo su yalıtım çözümleri.',
    description: 'Su sızıntısı binaların taşıyıcı demir donatısını paslandırarak deprem güvenliğini ciddi biçimde tehdit eder. Atalay Dekorasyon olarak İzmir genelinde teraslardan alt kata su akması, temelden yükselen rutubet, banyo/duş gideri sızıntıları gibi kritik sorunlara profesyonel kimyasal ve membranlı su yalıtım sistemleri uyguluyoruz. Seramik altı elastik yalıtım harçları ve UV dayanımlı poliüretan likit membranlarla yapınızı sudan tamamen arındırıyoruz.',
    scope: [
      'Açık teras ve balkonlarda seramik altı veya seramik üzeri su izolasyonu',
      'Bina temelleri ve perde betonlarda bohçalama su yalıtımı',
      'Banyo, duşakabin ve tuvalet ıslak hacimlerinde elastik pah bantlı su yalıtımı',
      'Asansör kuyusu ve bodrum kat su baskınlarına karşı negatif/pozitif izolasyon',
      'Su depoları ve havuzlarda basınca dayanıklı çift bileşenli kaplama',
      'Gider süzgeçleri ve boru geçişlerinde özel yalıtım flanşları'
    ],
    processSteps: [
      {
        title: '1. Nem ve Hasar Tespiti',
        description: 'Sızıntının kaynağı, betonun nem oranı ve yüzey mukavemeti incelenir.'
      },
      {
        title: '2. Yüzey Kırımı & Pah Çekimi',
        description: 'Tüm zemin-duvar birleşim köşelerine 45 derecelik yapısal pah harcı çekilir.'
      },
      {
        title: '3. Pah Bandı & Astar',
        description: 'Kritik ek yerlerine elastik su yalıtım filesi/bandı yerleştirilir ve astar sürülür.'
      },
      {
        title: '4. Çift Kat Elastik Yalıtım',
        description: 'Çimento-akrilik veya poliüretan esaslı malzeme katlar birbirine dik olacak şekilde 2 kat uygulanır.'
      },
      {
        title: '5. Su Sızdırmazlık Testi',
        description: 'Teras ve ıslak hacimler suyla doldurularak 24 saat test edilir, sıfır kaçak onaylandıktan sonra kaplamaya geçilir.'
      }
    ],
    technicalStandards: [
      'EN 14891 ve EN 1504-2 normlarına uygun çift bileşenli elastik su yalıtım harçları',
      'Yüksek çatlak köprüleme kabiliyetine sahip elastik pah bantları',
      'UV ışınlarına ve yaya trafiğine dayanıklı poliüretan reçineler',
      'Kimyasal maddelere ve klora dayanıklı yapı'
    ],
    iconName: 'Shield',
    coverImageUrl: '/images/projects/prj-terrace-waterproofing.jpg',
    features: [
      'Pah Bantlı Köşe Güçlendirmesi',
      '24 Saat Su Doldurma Testi',
      'Temel ve Perde Betonda Tam Koruma'
    ],
    faqs: [
      {
        question: 'Teras seramiklerini kırmadan su yalıtımı yapılabilir mi?',
        answer: 'Evet. Eğer mevcut seramikler sağlam ve oynamıyorsa; şeffaf veya renkli UV dayanımlı poliüretan likit membran sistemleri ile seramik sökülmeden de su sızdırmazlık sağlanabilmektedir.'
      }
    ],
    relatedSlugs: ['cati-izolasyonu', 'isi-yalitimi', 'dekorasyon-ve-tadilat'],
    displayOrder: 6
  },
  {
    id: 'srv-7',
    slug: 'isi-yalitimi',
    title: 'Isı Yalıtımı (Mantolama)',
    subtitle: 'Dış Cephe Taşyünü ve Karbonlu EPS ile %50’ye Varan Enerji Tasarrufu',
    shortDescription: 'İzmir’de yazın serin, kışın sıcak evler için TSE belgeli taşyünü ve EPS mantolama, küf/yoğuşma önleme ve dış cephe yenileme.',
    description: 'Doğru yapılan bir dış cephe ısı yalıtımı (mantolama), klima ve doğalgaz faturalarınızı %40 ila %50 oranında düşürürken evinizin değerini artırır. Atalay Dekorasyon olarak İzmir’in sıcak yazlarında serinliği koruyan, kışın ise duvarlardaki soğuk hava köprülerini ve nem/küf oluşumunu engelleyen taşyünü veya karbonlu EPS mantolama sistemleri kuruyoruz. Dübelleme, fileli sıva ve dekoratif kaplamayı paket sistem garantisiyle uyguluyoruz.',
    scope: [
      'Bina cephesine uygun yalıtım levhası seçimi (A1 sınıfı yanmaz taşyünü veya karbonlu EPS)',
      'Subasman profilinin lazer kotunda çakılması',
      'Yalıtım levhalarının taraklı harçla yapıştırılması ve çelik çivili mantolama dübeliyle sabitlenmesi',
      '160 gr/m² alkali dayanımlı sıva filesi ile çift kat fileli sıva çekimi',
      'Pencerelerde fileli köşe profili ve damlalıklı profillerin montajı',
      'Dekoratif mineral tane dokulu kaplama sıvası ve silikonlu dış cephe boyası'
    ],
    processSteps: [
      {
        title: '1. Cephe İncelemesi & Kalınlık Hesabı',
        description: 'İzmir iklim bölgesine göre binanın optimum yalıtım kalınlığı (4 cm, 5 cm veya 6 cm) belirlenir.'
      },
      {
        title: '2. Yapıştırma & Şaşırtmalı Döşeme',
        description: 'Levhalar şaşırtmalı olarak yapıştırılır; ısı kaçışına neden olabilecek derz aralıkları köpükle izole edilir.'
      },
      {
        title: '3. Geniş Başlıklı Dübelleme',
        description: 'Rüzgar yüklerine karşı m² başına standartlara uygun sayıda dübel atılır.'
      },
      {
        title: '4. Fileli Sıva Katmanı',
        description: 'Donatı filesi harç içine gömülerek çatlak oluşumuna karşı esnek ve darbe emici kabuk oluşturulur.'
      },
      {
        title: '5. Mineral Doku & Boya',
        description: 'Dekoratif mineral sıva üzerine nefes alan silikonlu dış cephe boyası vurularak iş teslim edilir.'
      }
    ],
    technicalStandards: [
      'TS 825 Binalarda Isı Yalıtım Kuralları standartlarına tam uyum',
      'Yangına karşı A1 sınıfı yanmazlık (Taşyünü uygulamalarında)',
      '160 gr/m² yüksek çekme dayanımlı alkali dayanımlı donatı filesi',
      'Bina enerji kimlik belgesi (EKB) alımına uygun paket sistem'
    ],
    iconName: 'Flame',
    coverImageUrl: '/images/projects/prj-roof-insulation.jpg',
    features: [
      '%50’ye Varan Fatura Tasarrufu',
      'A1 Sınıfı Yanmaz Taşyünü Seçeneği',
      'Duvar İçi Rutubet ve Küfe Son'
    ],
    faqs: [
      {
        question: 'İzmir gibi sıcak bir şehirde ısı yalıtımı gerçekten gerekli mi?',
        answer: 'Kesinlikle evet. Isı yalıtımı sadece kışın soğuktan değil, yazın kavurucu sıcakların bina betonuna işlemesini önler. Yazın klimanın harcadığı elektrik enerjisini yarı yarıya düşürür.'
      },
      {
        question: 'Taşyünü mü yoksa EPS köpük mü tercih edilmelidir?',
        answer: 'Taşyünü hem mükemmel ısı yalıtımı hem ses yalıtımı hem de A1 sınıfı yanmazlık sağlar; yüksek binalarda ve maksimum konfor arayanlarda önerimizdir. Karbonlu EPS ise daha hafif ve ekonomik bir alternatif sunar.'
      }
    ],
    relatedSlugs: ['dis-cephe-boya', 'cati-izolasyonu', 'su-yalitimi'],
    displayOrder: 7
  },
  {
    id: 'srv-8',
    slug: 'dekorasyon-ve-tadilat',
    title: 'Dekorasyon ve Tadilat',
    subtitle: 'Komple Ev, Ofis ve Mutfak/Banyo Anahtar Teslim Yenileme',
    shortDescription: 'İzmir genelinde elektrik, su tesisatı, seramik, alçı, boya ve zemin kaplama dahil anahtar teslim komple tadilat ve mimari dekorasyon.',
    description: 'Ev veya ofis yenilemek yorucu ve karmaşık bir süreç olmak zorunda değil. Atalay Dekorasyon olarak tesisat ustası, alçıcı, boyacı, seramikçi ayrı ayrı arama derdini ortadan kaldırıyoruz. Projenizi tek elden, sözleşmeli ve taahhüt edilen tarihte teslim ediyoruz. Yıkım ve kırım işlerinden yeni elektrik/su altyapısına, banyo-mutfak seramiklerinden asma tavan ve İtalyan boyaya kadar her adımı profesyonelce koordine ediyoruz.',
    scope: [
      'Mevcut duvar, zemin ve banyo fayanslarının kırılarak molozların atılması',
      'Sıhhi tesisat (PPRC temiz su ve PVC atık su boruları) altyapısının sıfırlanması',
      'Elektrik tesisatı, sigorta panosu, anahtar ve priz hatlarının yenilenmesi',
      'Banyo ve mutfak zemin-duvar seramik/granit döşeme işçiliği',
      'Mutfak dolabı, tezgah, banyo dolabı ve duşakabin montaj koordinasyonu',
      'Tüm odalarda asma tavan, alçıpan, kapı montajı ve silinebilir iç cephe boyası'
    ],
    processSteps: [
      {
        title: '1. Projelendirme & İstek Listesi',
        description: 'Mekanda ihtiyaçlar belirlenir; elektrik priz yerleri, aydınlatma ve tesisat planı netleştirilir.'
      },
      {
        title: '2. Yıkım & Kırım İşleri',
        description: 'Eski seramikler, gereksiz duvarlar kırılır ve molozlar belediye izinli araçlarla sevk edilir.'
      },
      {
        title: '3. Tesisat Altyapısı',
        description: 'Tüm elektrik ve sıhhi tesisat hatları test edilerek yenilenir ve sıva altına alınır.'
      },
      {
        title: '4. Alçı, Seramik & Tavan',
        description: 'Islak hacimlerde su yalıtımı ve seramik; salon ve odalarda asma tavan ve sıva düzeltme yapılır.'
      },
      {
        title: '5. Boya & Anahtar Teslim',
        description: 'İç mekan boyaları tamamlanır, armatür ve aksesuarlar takılarak temiz şekilde anahtar teslim edilir.'
      }
    ],
    technicalStandards: [
      'TSE belgeli boru, kablo ve sigorta altyapısı',
      'Lazer terazi ile sıfır hatalı seramik döşeme işçiliği',
      'Islak hacimlerde çift kat çimento-akrilik su yalıtımı',
      'Ayrıntılı teknik şartname ve teslim takvimli sözleşme'
    ],
    iconName: 'Palette',
    coverImageUrl: '/images/projects/prj-apartment-renovation.jpg',
    features: [
      'Tek Elden Proje Yönetimi',
      'Tesisat, Seramik, Alçı ve Boya Bir Arada',
      'Sözleşmeli ve Zamanında Teslimat'
    ],
    faqs: [
      {
        question: 'Komple daire tadilatı ortalama ne kadar sürer?',
        answer: 'Standart 100-120 m² bir dairenin komple banyo, mutfak, tesisat, tavan ve boya dahil anahtar teslim tadilatı ortalama 20 ila 30 iş günü arasında tamamlanmaktadır.'
      },
      {
        question: 'Tadilat sırasında başında durmamız gerekiyor mu?',
        answer: 'Hayır. Sürecin başında onayladığınız malzeme ve projeye göre çalışan ekibimiz düzenli fotoğraf ve video ile sizi bilgilendirir. Şantiyede beklemenize gerek kalmaz.'
      }
    ],
    relatedSlugs: ['alci-uygulamalari', 'ic-cephe-boya', 'su-yalitimi'],
    displayOrder: 8
  }
]

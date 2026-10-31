export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  category: string
  publishedAt: string
  readingTime: string
  summary: string
  author: {
    name: string
    role: string
  }
  image: string
  relatedServiceSlug: string
  relatedServiceTitle: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cati-izolasyonu-fiyatini-etkileyen-faktorler',
    title: 'Çatı İzolasyonu Fiyatını Etkileyen Faktörler: İzmir İkliminde Malzeme ve Maliyet Rehberi',
    metaDescription: 'İzmir\'de çatı izolasyonu ve su yalıtımı maliyetlerini belirleyen faktörler: Membran seçimi, kiremit altı onarımı, gizli dere sacları ve yerinde keşif önemi.',
    category: 'Çatı & Yalıtım',
    publishedAt: '2026-02-15',
    readingTime: '6 dk okuma',
    summary: 'Çatı izolasyonunda ezbere metrekare fiyatı neden yanıltıcıdır? Kiremit altı membran, gizli dere onarımı, ahşap karkas durumu ve baca kenarı yalıtımının maliyete etkileri.',
    author: {
      name: 'Mehmet Atalay (Mehmet Usta)',
      role: 'Uygulama Ustası · Atalay Dekorasyon'
    },
    image: '/images/hero-decoration.jpg',
    relatedServiceSlug: 'cati-izolasyonu',
    relatedServiceTitle: 'Çatı İzolasyonu Hizmetimiz',
    content: `
      <h2>İzmir’de Çatı İzolasyonu Neden Standart Bir Fiyatla Hesaplanamaz?</h2>
      <p>Çatı izolasyonu yaptırmak isteyen mülk sahiplerinin en sık sorduğu soru genellikle "Çatının metrekaresi ne kadar?" olmaktadır. Ancak sahada çalışan bir usta olarak açıkça belirtmeliyiz ki; çatıyı görmeden verilen sabit metrekare fiyatları ya işin ortasında ek masraf çıkarır ya da kalitesiz malzeme kullanılmasına yol açar.</p>
      <p>İzmir, Akdeniz iklim kuşağında yer alır; yaz aylarında çatı yüzeyi 60-70°C sıcaklığa ulaşırken, kış aylarında yoğun sağanak yağışlar ve lodos fırtınaları çatıyı zorlar. Bu sıcaklık farklarına ve su yüküne dayanacak bir çatı yalıtımında maliyeti belirleyen 5 ana kalem bulunur:</p>

      <h3>1. Mevcut Çatı Kaplamasının Durumu ve Karkas Sağlamlığı</h3>
      <p>Var olan çatı kiremit mi, shingle mı, yoksa sandviç panel mi? Kiremit altındaki ahşap karkas ya da çelik aşıklar çürüme yapmış mı? Eğer taşıyıcı tahtalar su almış ve esnemişse, üzerine sadece yeni membran sermek sorunu çözmez. Tahta tamiratı veya OSB levha takviyesi yapılması gerekir.</p>

      <h3>2. Kullanılacak Su Yalıtım Membranının Kalitesi ve Kat Sayısı</h3>
      <p>Su yalıtımında piyasada 2 mm, 3 mm ve 4 mm kalınlıkta membranlar bulunmaktadır. Cam tülü taşıyıcılı membranlar yırtılmaya karşı daha zayıfken, polyester keçe taşıyıcılı ve elastik (SBS veya APP katkılı) membranlar lodos fırtınalarına ve bina hareketlerine karşı çok daha dirençlidir. Doğru uygulama; astar üzeri en az 3.5 - 4 mm polyester keçeli arduvazlı veya düz membran şaloma kaynağıdır.</p>

      <h3>3. Gizli Dere, Yağmur Olukları ve Baca Kenarı İzolasyonları</h3>
      <p>Çatı su kaçaklarının %70'i geniş yüzeyden değil; baca dipleri, asansör kulesi birleşimleri ve yağmur iniş derelerinden kaynaklanır. Eski galvaniz derelerin çinko veya eksiz alüminyumla yenilenmesi, dere içlerinin çift kat membranla havuzlanması toplam işçilik ve malzeme maliyetini doğrudan etkiler.</p>

      <h3>4. Çatı Eğimi, Kat Yüksekliği ve Güvenlik Tedbirleri</h3>
      <p>Binanın 2 katlı bir müstakil ev olması ile 7 katlı bir apartman olması arasında vinç, malzeme çekme makarası ve emniyet iskelesi gereksinimleri açısından ciddi fark vardır. Dik eğimli çatılarda çalışma güvenliği ekipmanları ve işçilik süresi artar.</p>

      <h3>5. Yalıtıma Isı Yalıtımı (Taşyünü/XPS) Eklenmesi</h3>
      <p>Yalnızca su sızıntısını önlemek istiyorsanız su yalıtım membranı yeterli olabilir. Ancak son kat dairede oturuyorsanız ve yazın sıcaktan, kışın soğuktan şikayetçiyseniz; çatı zeminine veya mertek aralarına taşyünü / camyünü şilte serilmesi gerekir. Bu da konforu ikiye katlarken malzeme maliyetine eklenir.</p>

      <h2>Çatı İzolasyonunda En Sık Yapılan Hatalar</h2>
      <ul>
        <li><strong>Eski çürümüş karkasın üzerine doğrudan membran sermek:</strong> 1-2 yıl içinde alttaki ahşap kırılır ve su yalıtımı delinir.</li>
        <li><strong>Biner paylarını (ek yerlerini) dar tutmak:</strong> Membran rulolarının birbiri üzerine en az 10 cm binmesi ve pürmüz aleviyle homojen eritilip ezilmesi şarttır.</li>
        <li><strong>Baca kenarlarında metal baskı çıtası ve poliüretan mastik kullanmamak:</strong> Membranın duvara sadece yapıştırılıp bırakılması zamanla açılmasına neden olur.</li>
      </ul>

      <h2>Sonuç: Sağlıklı Fiyat İçin Yerinde Keşif Şarttır</h2>
      <p>Atalay Dekorasyon olarak İzmir genelinde hiçbir çatıyı gözümüzle görmeden ezbere fiyatlandırmıyoruz. Mehmet Usta ile adresinize geliyor, çatı arasına ve üstüne çıkarak çatlakları, dereleri ve karkası inceliyor; malzeme markası ve uygulama adımlarını içeren net yazılı teklifimizi ücretsiz hazırlıyoruz.</p>
    `
  },
  {
    slug: 'mantolama-yatiriminin-geri-donusu',
    title: 'Mantolama Yatırımının Geri Dönüşü: Isı Yalıtımı İzmir’de Kaç Yılda Kendini Amorti Eder?',
    metaDescription: 'Dış cephe mantolama İzmir\'de doğalgaz ve klima faturalarını ne kadar düşürür? Taşyünü ve EPS karşılaştırması ile amortisman hesabı.',
    category: 'Isı Yalıtımı',
    publishedAt: '2026-02-18',
    readingTime: '5 dk okuma',
    summary: 'İzmir\'in yaz sıcağı ve kış neminde dış cephe mantolama yaptırmak faturayı nasıl etkiler? Taşyünü ve EPS arasındaki maliyet-fayda dengesi.',
    author: {
      name: 'Mehmet Atalay (Mehmet Usta)',
      role: 'Uygulama Ustası · Atalay Dekorasyon'
    },
    image: '/images/hero-decoration.jpg',
    relatedServiceSlug: 'isi-yalitimi',
    relatedServiceTitle: 'Isı Yalıtımı (Mantolama) Hizmetimiz',
    content: `
      <h2>İzmir Gibi Ilıman Bir Şehirde Mantolama Gerekli midir?</h2>
      <p>Genel kanının aksine, dış cephe mantolaması yalnızca kışın don yaşanan Erzurum veya Ankara gibi şehirler için değildir. Hatta İzmir gibi yaz aylarında günlerce 40°C sıcaklığın ve yüksek nemin hissedildiği kıyı kentlerinde mantolama, yazın harcanan klima elektrik faturasını düşürmede çok daha etkilidir.</p>
      <p>Betonarme binalar yazın güneş ışınlarını hapseder ve gece boyunca bu ısıyı iç mekanlara yayar. Yalıtımsız bir evde klimayı kapattığınız anda odanın tekrar fırına dönmesinin sebebi budur.</p>

      <h3>Doğalgaz ve Klima Faturalarına Etkisi</h3>
      <p>Standartlara uygun olarak yapılan 4-5 cm kalınlığında EPS veya taşyünü dış cephe mantolaması:</p>
      <ul>
        <li><strong>Kış Aylarında:</strong> Duvarlardan kaynaklanan ısı kaybını ortalama %35 ile %45 oranında azaltır. Kombiniz daha düşük derecede çalışarak evi ısıtır.</li>
        <li><strong>Yaz Aylarında:</strong> Dış duvarların ısınmasını engelleyerek klima kullanım ihtiyacını ciddi oranda düşürür ve elektrik sarfiyatını hafifletir.</li>
        <li><strong>İç Hava Kalitesi:</strong> Duvar içi yoğuşmayı (terlemeyi) önlediği için iç mekanlarda rutubet, küf ve boya kabarmasını tamamen bitirir.</li>
      </ul>

      <h3>Taşyünü mü, Karbonlu EPS mi Tercih Edilmeli?</h3>
      <p>Mantolamada en çok kullanılan iki ana levha türü vardır:</p>
      <ol>
        <li><strong>Karbonlu EPS (Grafitli Strafor):</strong> Isı iletkenlik değeri çok iyidir, hafiftir ve bütçe dostudur. Apartman ve konut dış cephelerinde en yaygın tercihtir.</li>
        <li><strong>Taşyünü:</strong> Doğal bazalt taşından üretilir. A1 sınıfı yanmazlık özelliğine sahiptir ve yüksek ses yalıtımı sağlar. Yangın yönetmeliği gereği yüksek binalarda ve ses problemi olan ana cadde cephelerinde önerilir. Maliyeti EPS'ye göre yaklaşık %30-40 daha yüksektir.</li>
      </ol>

      <h3>Yatırım Kaç Yılda Geri Döner?</h3>
      <p>Enerji fiyatlarının seyri ve dairenin cephesi (kuzey/güney, ara kat/son kat) dikkate alındığında; doğru yapılmış bir mantolama yatırımı İzmir'de ortalama <strong>3 ila 5 yıl</strong> içinde sağladığı yakıt ve elektrik tasarrufuyla kendi maliyetini çıkarır. Binaya kattığı değer ve boyanın uzun ömürlü kalması ise cabasıdır.</p>

      <h2>Mantolamada Dikkat Edilmesi Gereken Kritik Detaylar</h2>
      <p>Sadece iyi levha almak yetmez; sistemin bileşenleri bir bütün olmalıdır:</p>
      <ul>
        <li><strong>Dübel Kalitesi:</strong> Gazbeton veya tuğla tipine uygun tırnaklı çelik çivili dübel kullanılmalı, m² başına en az 6 adet atılmalıdır.</li>
        <li><strong>Yapıştırma Tekniği:</strong> Noktasal yapıştırma yerine çerçeve metoduyla hava akımı kesilmelidir.</li>
        <li><strong>Donatı Filesi:</strong> En az 160 gr/m² alkaliye dayanıklı cam elyaf file kullanılmalı, ek yerlerinde 10 cm bindirme yapılmalıdır.</li>
      </ul>

      <h2>Ücretsiz Keşif ve Cephe İncelemesi</h2>
      <p>Atalay Dekorasyon olarak binanızın cephe durumunu, dökülen eski sıvaları ve ısı köprülerini yerinde inceliyor; en doğru yalıtım kalınlığını ve paket sistemini belirleyerek şeffaf teklif sunuyoruz.</p>
    `
  },
  {
    slug: 'tavandan-su-sizmasinin-nedenleri',
    title: 'Tavandan Su Sızmasının Nedenleri ve Kalıcı Çözüm Yolları (Teras, Çatı, Üst Kat)',
    metaDescription: 'Tavandan su damlaması veya sararma neden olur? Üst kat temiz/pis su tesisatı, teras derz açılması ve çatı akıntısı teşhis ve tamir rehberi.',
    category: 'Su Yalıtımı',
    publishedAt: '2026-02-21',
    readingTime: '6 dk okuma',
    summary: 'Tavanınızda kabarma, damlama veya sarı lekeler mi var? Sızıntının kaynağını tespit etme yöntemleri ve kırmadan çözüm olasılıkları.',
    author: {
      name: 'Mehmet Atalay (Mehmet Usta)',
      role: 'Uygulama Ustası · Atalay Dekorasyon'
    },
    image: '/images/hero-decoration.jpg',
    relatedServiceSlug: 'su-yalitimi',
    relatedServiceTitle: 'Su Yalıtımı Hizmetimiz',
    content: `
      <h2>Tavanda Sarı Leke ve Damlama: Tehlike İşareti</h2>
      <p>Tavanda beliren sarı lekeler, boya dökülmeleri, küf kokusu veya doğrudan su damlaması ev sahiplerinin en can sıkıcı kabuslarından biridir. Çoğu zaman kullanıcılar yalnızca dökülen boyayı kazıyıp tekrar boyama yoluna gider; ancak suyun kaynağı kurutulmadığı sürece 1 ay sonra aynı leke daha geniş biçimde geri döner.</p>

      <h3>Sızıntının 3 Ana Kaynağı Nasıl Ayırt Edilir?</h3>

      <h4>1. Yağmur Yağdığında Başlayan Sızıntılar (Çatı veya Teras)</h4>
      <p>Eğer tavanınız yalnızca sağanak yağmurlar sonrasında veya kar erimesinde damlıyorsa, sorun üst çatı örtüsünde, parapet duvarı birleşimlerinde veya açık teras izolasyonundadır. Teras fayanslarının derz araları güneşten kavrulup çatladığında, yağmur suyu seramiğin altına geçer ve betonarme tablayı doyurarak en zayıf noktadan tavana damlar.</p>

      <h4>2. Sürekli ve Kesintisiz Damlayan Su (Temiz Su Borusu Patlağı)</h4>
      <p>Yağmur yağsın veya yağmasın, gece-gündüz kesintisiz damlama veya hızlı tavan kabarması varsa, üst katın veya şaft boşluğunun PPRC temiz su hattında delinme veya pres dirsek ayrılması vardır. Su saati vanası kapatıldığında damlama azalıyorsa teşhis kesinleşir.</p>

      <h4>3. Banyo veya Mutfak Kullanıldığında Oluşan Lekeler (Gider / Pimaş Sızıntısı)</h4>
      <p>Üst komşunuz duş aldığında veya çamaşır makinesi çalıştırdığında tavanınızda ıslaklık ve ağır koku oluşuyorsa; duş süzgeci çevresindeki su yalıtım pahı yırtılmış veya pimaş boru contasından kaçak vardır.</p>

      <h2>Kalıcı Çözüm Yolları Nelerdir?</h2>
      <ul>
        <li><strong>Açık Teraslarda Kırmadan Şeffaf Hibrit Yalıtım:</strong> Seramikler sağlamsa, fayansları kırmadan UV dayanımlı şeffaf poliüretan veya polyurea likit membran uygulanarak derz sızıntıları kesilebilir.</li>
        <li><strong>Kapsamlı Teras Yalıtımı (Garantili Çözüm):</strong> Seramiklerin sökülmesi, meyilli şap atılması, pah bantları ve çift kat elastik çimento-akrilik sürme yalıtım sonrası yeniden kaplama yapılmasıdır.</li>
        <li><strong>Çatı Derelerinde Membran Havuzlama:</strong> Gizli derelerin içi temizlenerek astar üzeri 4 mm polyester keçeli arduvazlı membranla kaplanır.</li>
        <li><strong>Tavan Alçı ve Boya Onarımı:</strong> Su kaynağı kuruduktan sonra (en az 1-2 hafta kuruma payı verilmelidir), pas ve küf önleyici astar sürülür, saten alçı ile perdah çekilip silinebilir tavan boyası uygulanır.</li>
      </ul>

      <h2>Yerinde Hasar Tespiti İçin Mehmet Usta Yanınızda</h2>
      <p>Atalay Dekorasyon olarak su sızıntısı problemlerinde kaynağı yerinde inceliyor, geçici çözümler yerine sorunu kökünden çözecek yalıtım planını hazırlıyoruz.</p>
    `
  },
  {
    slug: 'daire-tadilat-suresini-etkileyen-faktorler',
    title: 'Daire Tadilatı Ne Kadar Sürer? 1+1, 2+1 ve 3+1 Evlerde Süreci Belirleyen Faktörler',
    metaDescription: 'Komple ev tadilatı kaç günde biter? Kırım, tesisat, alçıpan, banyo seramik ve boya aşamalarının gerçek teslim takvimi ve gecikme nedenleri.',
    category: 'Dekorasyon & Tadilat',
    publishedAt: '2026-02-24',
    readingTime: '7 dk okuma',
    summary: 'Anahtar teslim ev yenilemede hangi aşama kaç gün sürer? Kırım, tesisat, şap kuruma süresi ve boya badana teslim takvimini gerçekçi planlayın.',
    author: {
      name: 'Mehmet Atalay (Mehmet Usta)',
      role: 'Uygulama Ustası · Atalay Dekorasyon'
    },
    image: '/images/hero-decoration.jpg',
    relatedServiceSlug: 'dekorasyon-ve-tadilat',
    relatedServiceTitle: 'Komple Tadilat ve Dekorasyon',
    content: `
      <h2>Tadilat Süresi Neden Baştan Doğru Planlanmalıdır?</h2>
      <p>Ev tadilatı yaptıracak ailelerin en büyük endişesi işin uzaması, geçici kiralık ev masrafı ve belirsizliktir. Birçok müteahhit veya usta işi alabilmek için "10 günde bitiririz" gibi gerçek dışı vaatlerde bulunur; ancak kimyasal kuruma süreleri ve malzeme temin aşamaları fizik kurallarına tabidir.</p>

      <h3>Ortalama Tadilat Süreleri (Gerçekçi Saha Takvimi)</h3>
      <ul>
        <li><strong>Sadece Boya Badana & Ufak Alçı Tamirleri (Eşyalı Daire):</strong> 2 ila 4 iş günü.</li>
        <li><strong>Kısmi Tadilat (Mutfak veya Banyo Yenileme + Boya):</strong> 10 ila 15 iş günü.</li>
        <li><strong>2+1 Daire Komple Anahtar Teslim Tadilat:</strong> 20 ila 30 iş günü.</li>
        <li><strong>3+1 Daire Komple Anahtar Teslim Tadilat:</strong> 30 ila 45 iş günü.</li>
      </ul>

      <h3>Aşama Aşama Bir Daire Tadilatının Yol Haritası</h3>

      <h4>1. Kırım, Söküm ve Moloz Tahliyesi (1 - 3 Gün)</h4>
      <p>Eski banyo fayansları, mutfak dolapları, kapılar sökülür. Duvar yıkımı varsa gerçekleştirilir. Molozların çuvallanıp belediye izinli döküm alanlarına nakliyesi yapılır.</p>

      <h4>2. Elektrik ve Sıhhi Tesisat Altyapısı (3 - 6 Gün)</h4>
      <p>Kanal açma makineleriyle duvarlar yarılır, yeni priz hatları, sigorta panosu, internet kablolaması ve sıcak/soğuk su PPRC boruları çekilir. Tesisat testleri yapılmadan üzeri kapatılmaz.</p>

      <h4>3. Şap, Alçı Sıva ve Alçıpan Asma Tavan (5 - 8 Gün)</h4>
      <p>Zemin tesviye şapı atılır. Lazer terazi ile tavan karkasları monte edilir, LED ışık bantları ve bölme duvarlar alçıpan ile kapatılır. Duvarlara saten alçı perdahı çekilir.</p>

      <h4>4. Islak Zemin Seramik & Fayans Uygulaması (4 - 7 Gün)</h4>
      <p>Banyo ve koridorlarda su yalıtımı sonrası lazer gönyesinde 60x120 veya istenen ebatta seramikler döşenir, derz dolguları çekilir.</p>

      <h4>5. Zemin Parke, Kapı ve Dolap Montajları (3 - 5 Gün)</h4>
      <p>Laminat parkeler, oda kapıları, mutfak tezgahı ve banyo vitrifiyeleri monte edilir.</p>

      <h4>6. İç Cephe Boya ve İnce Temizlik (3 - 5 Gün)</h4>
      <p>Tüm süpürgelik ve kapılar maskelenir, tavan ve duvar boyaları 2 kat uygulanır. Kaba ve ince temizlik yapılarak anahtar teslim edilir.</p>

      <h2>Süreyi Uzatan En Yaygın Tuzaklar</h2>
      <ul>
        <li><strong>Özel Sipariş Ürünlerin Gecikmesi:</strong> Özel imalat mutfak dolapları veya ithal seramiklerin kırım başlamadan önce sipariş edilmemesi.</li>
        <li><strong>Şap ve Alçının Kuruma Süresine Saygı Duymamak:</strong> Nemli şapın üzerine hemen parke döşemek parkelerin şişmesine yol açar.</li>
        <li><strong>Birden Çok Bağımsız Ustayla Çalışmak:</strong> Elektrikçi boyacıyı, fayansçı su tesisatçısını beklerken günler heba olur. Tek elden sözleşmeli yönetim zaman tasarrufu sağlar.</li>
      </ul>

      <h2>Sözleşmeli Takvim Anlayışı</h2>
      <p>Atalay Dekorasyon olarak keşif sonrası imzaladığımız iş sözleşmesinde başlangıç ve bitiş tarihini açıkça belirtiyor; sürecin her adımında sizi WhatsApp üzerinden fotoğraf ve bilgilendirmelerle güncel tutuyoruz.</p>
    `
  },
  {
    slug: 'boya-badana-maliyeti-nasil-hesaplanir',
    title: 'Boya Badana Maliyeti Nasıl Hesaplanır? 2026 İzmir Daire Boyama Metraj ve Malzeme Rehberi',
    metaDescription: 'İzmir\'de ev boyatma maliyetini neler belirler? 1+1, 2+1, 3+1 daire metraj hesabı, tavan boyası, astar ve silinebilir boya seçim rehberi.',
    category: 'İç Cephe Boya',
    publishedAt: '2026-02-27',
    readingTime: '5 dk okuma',
    summary: 'Taban alanı ile duvar boya alanı arasındaki fark nedir? Eşyalı ev maskeleme masrafı, astar gereksinimi ve kaliteli boya markalarının maliyete etkisi.',
    author: {
      name: 'Mehmet Atalay (Mehmet Usta)',
      role: 'Uygulama Ustası · Atalay Dekorasyon'
    },
    image: '/images/hero-decoration.jpg',
    relatedServiceSlug: 'ic-cephe-boya',
    relatedServiceTitle: 'İç Cephe Boya Badana',
    content: `
      <h2>Taban Metrekaresi ile Duvar Metrekaresi Neden Karıştırılır?</h2>
      <p>Ev sahipleri genellikle "Evim 100 metrekare, boyası ne kadar tutar?" diye sorar. Oysa 100 m² dairenin taban (zemin) alanıdır. Boyanacak alan ise 4 duvar ve tavandır; yani 100 m² tabanlı bir 3+1 dairede ortalama <strong>280 ile 340 metrekare</strong> boyanabilir yüzey çıkar.</p>
      <p>Boya maliyetini hesaplarken taban alanını ortalama 2.8 ile 3.2 katsayısıyla çarparak yaklaşık boya alanı bulunur. Ancak net bütçe için aşağıdaki etkenler belirleyicidir:</p>

      <h3>Boya Maliyetini Etkileyen 5 Ana Kriter</h3>

      <h4>1. Evin Boş veya Eşyalı Olması</h4>
      <p>Boş dairelerde ustalar çok daha hızlı hareket edebilir. Eşyalı dairelerde ise tüm mobilyaların ortaya toplanması, kalın hışır naylonlarla hava almayacak şekilde bantlanması, süpürgelik ve kapı pervazlarının krep bantla kapatılması en az yarım gün sürer. Bu titizlik boyanın kalitesi ve evinizin korunması için şarttır.</p>

      <h4>2. Duvarların Mevcut Durumu ve Alçı Tamiratı</h4>
      <p>Duvarda derin çatlaklar, kabarmalar, dübel delikleri veya rutubet lekeleri var mı? Yalnızca fırça vurup geçmek geçici çözümdür. Doğru işlem; kabaran kısımların spatula ile kazınması, zımparalanması, saten alçı veya dolgu alçısıyla 2 kat düzeltilmesidir.</p>

      <h4>3. Koyu Renkten Açık Renke Dönüş (Geçiş Astarı)</h4>
      <p>Mevcut duvarınız antrasit, bordo veya koyu gri ise ve siz kırık beyaz veya kum beji yaptırmak istiyorsanız; direkt boya vurulduğunda 4 katta dahi alttaki renk kapatılamaz. Mutlaka 1 kat örtücü transfer/geçiş astarı uygulanmalıdır.</p>

      <h4>4. Seçilen Boya Markası ve Silinebilirlik Sınıfı</h4>
      <p>Piyasada ucuz plastik boyalardan, teflon katkılı tam silinebilir ipek mat boyalara, antibakteriyel boyalardan İtalyan dekoratif efekt boyalara kadar geniş bir yelpaze vardır. Çocuklu veya evcil hayvanlı ailelerde silinebilir ipek mat boyalar ilk maliyeti biraz artırsa da, duvarlar bezle silinebildiği için 4-5 yıl yeniden boya gerektirmez.</p>

      <h4>5. Tavan Boyası ve Kapı / Kalorifer Peteği Boyamaları</h4>
      <p>Her boya badana işinde tavanlar da dahil midir? Kapılar veya kalorifer petekleri yağlı boya ile yenilenecek midir? Bunların her biri ayrı birer işçilik ve malzeme kalemidir.</p>

      <h2>Mehmet Usta’dan Ev Boyatacaklara 3 Altın Tavsiye</h2>
      <ol>
        <li><strong>Boya kutusunu ustanızın yanında açtırın:</strong> Anlaştığınız kaliteli markanın orijinal kutusunda geldiğinden emin olun.</li>
        <li><strong>Astarı asla atlamayın:</strong> Astarsız boya duvara tutunamaz, tozuma yapar ve boyanın ömrü yarıya iner.</li>
        <li><strong>Ucuz işçilik tuzağına düşmeyin:</strong> Yerleri ve prizleri boya içinde bırakan özensiz çalışmalar sonrasında temizlik masrafı olarak size geri döner.</li>
      </ol>

      <h2>İzmir’de Ücretsiz Keşif ve Renk Kartelası İle Ziyaret</h2>
      <p>Atalay Dekorasyon olarak adresinize geliyor, lazer metreyle net metrajınızı çıkarıyor, renk kartelamızı getirerek ışık açınıza en uygun tonları birlikte seçiyoruz. Net ve yazılı teklifimizi ücretsiz almak için bize dilediğiniz zaman ulaşabilirsiniz.</p>
    `
  }
]

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(post => post.slug === slug)
}


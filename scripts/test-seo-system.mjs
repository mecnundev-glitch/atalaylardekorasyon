console.log('='.repeat(75))
console.log('ATALAYLAR DEKORASYON — STATE 09 TEKNİK SEO & YEREL ARAMA TEST SÜİTİ')
console.log('='.repeat(75))

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

let totalTests = 0
let passedTests = 0
let failedTests = 0

function assert(condition, message, details = '') {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  [BAŞARILI] ${message}`)
  } else {
    failedTests++
    console.error(`  [BAŞARISIZ] ${message}${details ? ' -> ' + details : ''}`)
  }
}

async function runSeoTests() {
  // ------------------------------------------------------------------
  // 1. ROBOTS.TXT DOĞRULAMA
  // ------------------------------------------------------------------
  console.log('\n--- 1. ROBOTS.TXT ERİŞİLEBİLİRLİK VE KURAL KONTROLÜ ---')
  try {
    const res = await fetch(`${baseUrl}/robots.txt`)
    assert(res.status === 200, '/robots.txt başarıyla 200 OK yanıtı veriyor.')
    const text = await res.text()
    assert(text.includes('Disallow: /admin'), 'Yönetici rotaları (/admin) arama motorlarına kapatılmış.')
    assert(text.includes('Disallow: /api/'), 'Dahili API rotaları (/api/) engellenmiş.')
    assert(text.includes('Sitemap:'), 'Site haritası yönergesi (Sitemap) tanımlanmış.')
    assert(text.includes('https://atalaylardekarasyon.com/sitemap.xml'), 'Site haritası mutlak URL formatında doğru belirtilmiş.')
  } catch (err) {
    assert(false, '/robots.txt kontrolünde hata:', err.message)
  }

  // ------------------------------------------------------------------
  // 2. SITEMAP.XML DOĞRULAMA
  // ------------------------------------------------------------------
  console.log('\n--- 2. SITEMAP.XML DİNAMİK HARİTA VE XML STANDARTLARI ---')
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`)
    assert(res.status === 200, '/sitemap.xml başarıyla 200 OK yanıtı veriyor.')
    const contentType = res.headers.get('content-type') || ''
    assert(contentType.includes('xml'), `Content-Type doğru XML başlığı içeriyor (${contentType}).`)

    const sitemapXml = await res.text()
    assert(sitemapXml.includes('<urlset') && sitemapXml.includes('</urlset>'), 'Geçerli <urlset> şema sarmalayıcısı mevcut.')

    const expectedPages = [
      'https://atalaylardekarasyon.com/',
      'https://atalaylardekarasyon.com/hizmetlerimiz',
      'https://atalaylardekarasyon.com/hizmetlerimiz/alci-uygulamalari',
      'https://atalaylardekarasyon.com/hizmetlerimiz/ic-cephe-boya',
      'https://atalaylardekarasyon.com/hizmetlerimiz/cati-izolasyonu',
      'https://atalaylardekarasyon.com/projeler',
      'https://atalaylardekarasyon.com/projeler/karsiyaka-salon-asma-tavan-dekorasyon',
      'https://atalaylardekarasyon.com/galeri',
      'https://atalaylardekarasyon.com/ucretsiz-kesif',
      'https://atalaylardekarasyon.com/iletisim',
      'https://atalaylardekarasyon.com/yasal/kvkk-aydinlatma-metni'
    ]

    for (const p of expectedPages) {
      assert(sitemapXml.includes(`<loc>${p}</loc>`), `Site haritasında anahtar URL mevcut: ${p}`)
    }
  } catch (err) {
    assert(false, '/sitemap.xml kontrolünde hata:', err.message)
  }

  // ------------------------------------------------------------------
  // 3. SSR HTML, TITLE, META DESCRIPTION & CANONICAL DOĞRULAMA
  // ------------------------------------------------------------------
  console.log('\n--- 3. SAYFA BAZLI SSR HTML, META VE CANONICAL DOĞRULAMA ---')

  const pagesToTest = [
    { path: '/', titleMatch: 'Atalaylar Dekorasyon' },
    { path: '/hizmetlerimiz', titleMatch: 'Hizmetlerimiz' },
    { path: '/hizmetlerimiz/alci-uygulamalari', titleMatch: 'Alçı Uygulamaları' },
    { path: '/hizmetlerimiz/ic-cephe-boya', titleMatch: 'İç Cephe Boya' },
    { path: '/projeler', titleMatch: 'Projelerimiz' },
    { path: '/projeler/karsiyaka-salon-asma-tavan-dekorasyon', titleMatch: 'Karşıyaka' },
    { path: '/galeri', titleMatch: 'Galeri' },
    { path: '/ucretsiz-kesif', titleMatch: 'Ücretsiz Keşif' },
    { path: '/iletisim', titleMatch: 'İletişim' },
    { path: '/yasal/kvkk-aydinlatma-metni', titleMatch: 'KVKK' }
  ]

  for (const page of pagesToTest) {
    try {
      const res = await fetch(`${baseUrl}${page.path}`)
      assert(res.status === 200, `[${page.path}] 200 OK yanıt verdi.`)
      const html = await res.text()

      // Title kontrolü
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      const titleText = titleMatch ? titleMatch[1] : ''
      assert(
        titleText.length > 10 && titleText.includes(page.titleMatch),
        `[${page.path}] Özgün ve dolu <title> mevcut: "${titleText.slice(0, 50)}..."`
      )

      // Meta Description kontrolü
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)
      const descText = descMatch ? descMatch[1] : ''
      assert(
        descText.length >= 40 && descText.length <= 250,
        `[${page.path}] İdeal uzunlukta meta description mevcut (${descText.length} karakter).`
      )

      // Canonical URL kontrolü
      const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                             html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)
      const canonicalHref = canonicalMatch ? canonicalMatch[1] : ''
      const expectedCanonical = `https://atalaylardekarasyon.com${page.path}`
      assert(
        canonicalHref === expectedCanonical,
        `[${page.path}] Canonical URL doğru ve mutlak: ${canonicalHref}`
      )

      // Open Graph ve Twitter kartı kontrolleri
      assert(html.includes('property="og:title"') || html.includes('name="og:title"'), `[${page.path}] og:title tanımlı.`)
      assert(html.includes('property="og:description"') || html.includes('name="og:description"'), `[${page.path}] og:description tanımlı.`)
      assert(html.includes('property="og:image"') || html.includes('name="og:image"'), `[${page.path}] og:image tanımlı.`)
      assert(html.includes('name="twitter:card"'), `[${page.path}] twitter:card tanımlı.`)

      // Heading h1 hiyerarşisi: Sayfa başına 1 adet H1 olmalı
      const h1Count = (html.match(/<h1\b/gi) || []).length
      assert(h1Count === 1, `[${page.path}] Sayfada tam olarak 1 adet <h1> başlığı mevcut (Hiyerarşi doğru, H1 sayısı: ${h1Count}).`)
    } catch (err) {
      assert(false, `[${page.path}] Sayfa testinde hata:`, err.message)
    }
  }

  // ------------------------------------------------------------------
  // 4. YAPILANDIRILMIŞ VERİ (JSON-LD SCHEMA.ORG) KONTROLÜ
  // ------------------------------------------------------------------
  console.log('\n--- 4. YAPILANDIRILMIŞ VERİ (JSON-LD SCHEMA.ORG) DOĞRULAMA ---')

  // Ana Sayfa LocalBusiness kontrolü
  try {
    const res = await fetch(`${baseUrl}/`)
    const html = await res.text()
    const scriptMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
    let foundLocalBusiness = false

    for (const match of scriptMatches) {
      const jsonText = match[1]
      try {
        const parsed = JSON.parse(jsonText)
        if (parsed['@type'] === 'HomeAndConstructionBusiness') {
          foundLocalBusiness = true
          assert(parsed.name === 'Atalaylar Dekorasyon', 'LocalBusiness şemasında işletme adı doğru.')
          assert(parsed.telephone === '+905449978760', 'LocalBusiness şemasında telefon doğrulanabilir gerçek değerde.')
          assert(parsed.address?.addressLocality === 'İzmir', 'LocalBusiness şemasında adres İzmir olarak doğru.')
          assert(Array.isArray(parsed.areaServed) && parsed.areaServed.length > 5, 'Hizmet verilen İzmir ilçeleri doğru listelenmiş.')
        }
      } catch (e) {
        assert(false, 'JSON-LD geçersiz JSON sözdizimi içeriyor:', e.message)
      }
    }
    assert(foundLocalBusiness, 'Ana sayfada geçerli Schema.org HomeAndConstructionBusiness şeması bulundu.')
  } catch (err) {
    assert(false, 'Ana sayfa JSON-LD kontrolünde hata:', err.message)
  }

  // Hizmet Detay Service & BreadcrumbList kontrolü
  try {
    const res = await fetch(`${baseUrl}/hizmetlerimiz/alci-uygulamalari`)
    const html = await res.text()
    const scriptMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
    let foundService = false
    let foundBreadcrumb = false

    for (const match of scriptMatches) {
      try {
        const parsed = JSON.parse(match[1])
        if (parsed['@type'] === 'Service') {
          foundService = true
          assert(parsed.name?.includes('Alçı Uygulamaları'), 'Service şemasında hizmet adı doğru.')
        }
        if (parsed['@type'] === 'BreadcrumbList') {
          foundBreadcrumb = true
          assert(Array.isArray(parsed.itemListElement) && parsed.itemListElement.length === 3, 'BreadcrumbList 3 kademeli olarak doğru oluşturulmuş.')
        }
      } catch (e) {
        assert(false, 'Hizmet JSON-LD ayrıştırma hatası:', e.message)
      }
    }
    assert(foundService, 'Hizmet detay sayfasında Schema.org Service şeması bulundu.')
    assert(foundBreadcrumb, 'Hizmet detay sayfasında Schema.org BreadcrumbList şeması bulundu.')
  } catch (err) {
    assert(false, 'Hizmet detay JSON-LD kontrolünde hata:', err.message)
  }

  // ------------------------------------------------------------------
  // 5. GÖRSEL VE DAHAİ BAĞLANTI (INTERNAL LINKING) KONTROLLERİ
  // ------------------------------------------------------------------
  console.log('\n--- 5. DAHİLİ BAĞLANTILAR VE GÖRSEL ALT METİNLERİ KONTROLÜ ---')

  try {
    const res = await fetch(`${baseUrl}/hizmetlerimiz/alci-uygulamalari`)
    const html = await res.text()

    // Hizmet detayından projelere iç bağlantı kontrolü
    assert(html.includes('/projeler/karsiyaka-salon-asma-tavan-dekorasyon'), 'Hizmet sayfasından ilgili portföy projesine iç bağlantı (internal link) mevcut.')

    // Görsellerin alt metin ve optimizasyon kontrolleri
    const imgMatches = html.matchAll(/<img\b([^>]*?)>/gi)
    let imgCount = 0
    let missingAlt = 0

    for (const m of imgMatches) {
      imgCount++
      const imgAttrs = m[1]
      if (!imgAttrs.includes('alt=') || imgAttrs.includes('alt=""')) {
        missingAlt++
      }
    }
    assert(missingAlt === 0, `Sayfadaki tüm görseller (${imgCount} adet) açıklayıcı alt özniteliğine sahip.`)
  } catch (err) {
    assert(false, 'Dahili bağlantı kontrolünde hata:', err.message)
  }

  // ------------------------------------------------------------------
  // SONUÇ VE ÖZET
  // ------------------------------------------------------------------
  console.log('\n' + '='.repeat(75))
  console.log(`SEO TEST SONUÇLARI: ${passedTests} BAŞARILI, ${failedTests} BAŞARISIZ (Toplam: ${totalTests})`)
  console.log('='.repeat(75))

  if (failedTests > 0) {
    process.exit(1)
  }
}

runSeoTests().catch((err) => {
  console.error('Kritik test hatası:', err)
  process.exit(1)
})

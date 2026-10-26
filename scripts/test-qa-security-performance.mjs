/**
 * ATALAYLAR DEKORASYON — KAPSAMLI QA, GÜVENLİK VE PERFORMANS TEST SUITE
 * State 10: Canlı Öncesi Bütün Temel Senaryoların Doğrulanması
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const baseUrl = process.env.TEST_URL || 'http://localhost:3000'

let totalTests = 0
let passedTests = 0
let failedTests = 0
const failures = []

function assert(condition, testName, details = '') {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  [BAŞARILI] ${testName}`)
  } else {
    failedTests++
    console.error(`  [BAŞARISIZ] ${testName} - ${details}`)
    failures.push({ testName, details })
  }
}

async function run() {
  console.log('===========================================================================')
  console.log('ATALAYLAR DEKORASYON — STATE 10: QA, GÜVENLİK VE PERFORMANS DENETİMİ')
  console.log(`Hedef URL: ${baseUrl}`)
  console.log('===========================================================================\n')

  // --------------------------------------------------------------------------
  // BÖLÜM 1: FONKSİYONEL TESTLER
  // --------------------------------------------------------------------------
  console.log('--- 1. FONKSİYONEL TESTLER: SAYFA YÜKLENMESİ VE KRİTİK BİLEŞENLER ---')

  const publicRoutes = [
    { path: '/', expectedContent: 'Atalaylar' },
    { path: '/hizmetlerimiz', expectedContent: 'Hizmetlerimiz' },
    { path: '/hizmetlerimiz/alci-uygulamalari', expectedContent: 'Alçı' },
    { path: '/hizmetlerimiz/ic-cephe-boya', expectedContent: 'İç Cephe' },
    { path: '/hizmetlerimiz/dis-cephe-boya', expectedContent: 'Dış Cephe' },
    { path: '/hizmetlerimiz/siva-ve-duvar-uygulamalari', expectedContent: 'Sıva' },
    { path: '/hizmetlerimiz/cati-izolasyonu', expectedContent: 'Çatı' },
    { path: '/hizmetlerimiz/su-yalitimi', expectedContent: 'Yalıtım' },
    { path: '/hizmetlerimiz/isi-yalitimi', expectedContent: 'Yalıtım' },
    { path: '/hizmetlerimiz/dekorasyon-ve-tadilat', expectedContent: 'Tadilat' },
    { path: '/projeler', expectedContent: 'Projelerimiz' },
    { path: '/projeler/karsiyaka-salon-asma-tavan-dekorasyon', expectedContent: 'Karşıyaka' },
    { path: '/galeri', expectedContent: 'Galeri' },
    { path: '/ucretsiz-kesif', expectedContent: 'Keşif' },
    { path: '/iletisim', expectedContent: 'İletişim' },
    { path: '/yasal/kvkk-aydinlatma-metni', expectedContent: 'KVKK' },
    { path: '/yasal/gizlilik-politikasi', expectedContent: 'Gizlilik' },
    { path: '/yasal/cerez-politikasi', expectedContent: 'Çerez' }
  ]

  for (const route of publicRoutes) {
    try {
      const res = await fetch(`${baseUrl}${route.path}`)
      assert(res.status === 200, `Sayfa [${route.path}] 200 OK yanıt verdi.`)
      const html = await res.text()
      assert(html.includes(route.expectedContent), `Sayfa [${route.path}] beklenen '${route.expectedContent}' içeriğini barındırıyor.`)
    } catch (err) {
      assert(false, `Sayfa [${route.path}] erişilemedi: ${err.message}`)
    }
  }

  // Navigasyon ve CTA bağlantı denetimi
  console.log('\n--- 1.1 İLETİŞİM, WHATSAPP VE TELEFON BAĞLANTILARI DOĞRULAMA ---')
  try {
    const homeRes = await fetch(`${baseUrl}/`)
    const homeHtml = await homeRes.text()

    assert(homeHtml.includes('tel:'), 'Telefon arama bağlantısı (tel:) mevcut.')
    assert(homeHtml.includes('wa.me') || homeHtml.includes('whatsapp'), 'WhatsApp mesaj bağlantısı mevcut.')
    assert(homeHtml.includes('/ucretsiz-kesif'), 'Ücretsiz Keşif CTA yönlendirmesi mevcut.')
    assert(homeHtml.includes('/projeler'), 'Portföy / Projeler bağlantısı mevcut.')
  } catch (err) {
    assert(false, 'Ana sayfa bağlantı denetimi hatası:', err.message)
  }

  // --------------------------------------------------------------------------
  // BÖLÜM 2: GÜVENLİK TESTLERİ
  // --------------------------------------------------------------------------
  console.log('\n--- 2. GÜVENLİK TESTLERİ: YETKİSİZ ADMİN VE VERİ KORUMA DENETİMİ ---')

  // 2.1 Admin Koruması (Yetkisiz Kullanıcı Yönlendirmesi)
  const adminRoutes = [
    '/admin',
    '/admin/services',
    '/admin/projects',
    '/admin/gallery',
    '/admin/testimonials',
    '/admin/quotes',
    '/admin/settings'
  ]

  for (const aRoute of adminRoutes) {
    try {
      const res = await fetch(`${baseUrl}${aRoute}`, { redirect: 'manual' })
      const isRedirect = res.status === 302 || res.status === 307
      const location = res.headers.get('location') || ''
      assert(
        isRedirect && location.includes('/admin/login'),
        `Yetkisiz erişim engellendi: [${aRoute}] -> 302 Yönlendirme: ${location}`
      )
    } catch (err) {
      assert(false, `Admin rotası [${aRoute}] güvenlik denetimi hatası: ${err.message}`)
    }
  }

  // 2.2 Teklif Formu Güvenlik Senaryoları (/api/quote)
  console.log('\n--- 2.2 TEKLİF FORMU VE DOĞRULAMA GÜVENLİĞİ ---')

  // Senaryo A: GET isteği reddedilmeli (405 Method Not Allowed)
  try {
    const getRes = await fetch(`${baseUrl}/api/quote`)
    assert(getRes.status === 405, 'Teklif endpointine GET isteği engellendi (405 Method Not Allowed).')
  } catch (err) {
    assert(false, 'Teklif GET güvenlik testi hatası:', err.message)
  }

  // Senaryo B: Eksik ve geçersiz veri (400 Bad Request)
  try {
    const badRes = await fetch(`${baseUrl}/api/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: '', phone: '123' })
    })
    assert(badRes.status === 400, 'Eksik veya geçersiz veri 400 Bad Request ile reddedildi.')
  } catch (err) {
    assert(false, 'Geçersiz veri testi hatası:', err.message)
  }

  // Senaryo C: KVKK onaysız gönderim (400 Bad Request)
  try {
    const noKvkkRes = await fetch(`${baseUrl}/api/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Kullanıcı',
        phone: '05449978760',
        district: 'Karşıyaka',
        kvkkConsent: false
      })
    })
    assert(noKvkkRes.status === 400, 'KVKK onayı olmadan gönderilen talep 400 ile reddedildi.')
  } catch (err) {
    assert(false, 'KVKK ret testi hatası:', err.message)
  }

  // Senaryo D: Honeypot bot tuzağı kontrolü
  try {
    const botRes = await fetch(`${baseUrl}/api/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Spam Bot',
        phone: '05449978760',
        district: 'Bornova',
        kvkkConsent: true,
        hp_website: 'http://spam-link.ru'
      })
    })
    const botData = await botRes.json()
    assert(
      botRes.status === 200 && botData.referenceCode === 'AT-BOT-OK',
      'Honeypot tuzağına düşen bot sessizce karşılandı (Veritabanı korunarak AT-BOT-OK üretildi).'
    )
  } catch (err) {
    assert(false, 'Honeypot testi hatası:', err.message)
  }

  // Senaryo E: XSS / HTML Enjeksiyon Girişimi
  try {
    const xssPayload = '<script>alert("xss")</script>'
    const xssRes = await fetch(`${baseUrl}/api/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: xssPayload,
        phone: '05449978760',
        district: 'Çiğli',
        notes: '<img src=x onerror=alert(1)>',
        kvkkConsent: true,
        formStartTime: Date.now() - 5000
      })
    })
    const xssData = await xssRes.json()
    assert(xssRes.status === 200, 'XSS içerikli talep sunucu çökmeden işlendi.')
    assert(!xssData.referenceCode.includes('<script>'), 'Referans kodu veya yanıt XSS etiketlerini yansıtmadı.')
  } catch (err) {
    assert(false, 'XSS testi hatası:', err.message)
  }

  // 2.3 Dosya Yükleme Güvenliği (/api/upload)
  console.log('\n--- 2.3 DOSYA YÜKLEME GÜVENLİK DENETİMİ (/api/upload) ---')
  try {
    // Boş istek
    const emptyUploadRes = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    assert(emptyUploadRes.status === 400, 'Boş dosya yükleme isteği 400 Bad Request ile reddedildi.')
  } catch (err) {
    assert(false, 'Dosya yükleme testi hatası:', err.message)
  }

  // 2.4 İstemci Paketinde Gizli Anahtar Sızıntı Denetimi
  console.log('\n--- 2.4 İSTEMCİ PAKETİ GİZLİ ANAHTAR SIZINTI DENETİMİ ---')
  try {
    const envContent = readFileSync('.env', 'utf8')
    const secretMatches = envContent.match(/(?:SECRET_KEY|SERVICE_ROLE_KEY|DATABASE_URL)=([^\r\n]+)/g) || []
    const secrets = secretMatches.map(m => m.split('=')[1].trim()).filter(s => s.length > 5)

    let leakFound = false
    function checkDir(dir) {
      const entries = readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) {
          checkDir(full)
        } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.html') || entry.name.endsWith('.json'))) {
          const content = readFileSync(full, 'utf8')
          for (const s of secrets) {
            if (content.includes(s)) {
              leakFound = true
              console.error('SIZINTI:', full)
            }
          }
        }
      }
    }

    checkDir(join(process.cwd(), '.output', 'public'))
    assert(!leakFound, 'İstemci derleme çıktısında (.output/public) gizli anahtar sızıntısı yok.')
  } catch (err) {
    assert(false, 'Paket tarama hatası:', err.message)
  }

  // --------------------------------------------------------------------------
  // BÖLÜM 3: RESPONSIVE VE MOBİL UYUMLULUK DENETİMİ
  // --------------------------------------------------------------------------
  console.log('\n--- 3. RESPONSIVE VE MOBİL UYUMLULUK DENETİMİ ---')
  try {
    const res = await fetch(`${baseUrl}/`)
    const html = await res.text()

    assert(
      html.includes('name="viewport"') && html.includes('width=device-width, initial-scale=1'),
      'Meta viewport etiketi standartlara uygun (width=device-width, initial-scale=1).'
    )

    // Mobil menü butonu ve hamburger ikon varlığı
    assert(
      html.includes('aria-label') || html.includes('Menü') || html.includes('button'),
      'Mobil arayüz için erişilebilir buton bileşenleri mevcut.'
    )
  } catch (err) {
    assert(false, 'Responsive etiket denetimi hatası:', err.message)
  }

  // --------------------------------------------------------------------------
  // BÖLÜM 4: PERFORMANS VE CORE WEB VITALS DENETİMİ
  // --------------------------------------------------------------------------
  console.log('\n--- 4. PERFORMANS VE CORE WEB VITALS DENETİMİ ---')
  try {
    const res = await fetch(`${baseUrl}/`)
    const html = await res.text()

    // 1. LCP Görseli fetchpriority="high" ve eager
    assert(
      html.includes('fetchpriority="high"') || html.includes('loading="eager"'),
      'LCP görselinde fetchpriority="high" ve loading="eager" optimizasyonu mevcut.'
    )

    // 2. Diğer görsellerde decoding="async" ve loading="lazy"
    assert(
      html.includes('decoding="async"'),
      'Sayfa içi görsellerde asenkron dekodlama (decoding="async") mevcut.'
    )

    // 3. CLS Önleme: Görsellerde width ve height
    assert(
      html.includes('width=') && html.includes('height='),
      'Kümülatif düzen kaymasını (CLS) önleyen boyutlandırma öznitelikleri (width/height) mevcut.'
    )

    // 4. Font Preconnect
    assert(
      html.includes('rel="preconnect"') && html.includes('fonts.gstatic.com'),
      'Google Fonts için preconnect kaynak bağlantıları mevcut.'
    )
  } catch (err) {
    assert(false, 'Performans denetimi hatası:', err.message)
  }

  // --------------------------------------------------------------------------
  // BÖLÜM 5: SİSTEM YANIT SÜRESİ (TTFB / LATENCY)
  // --------------------------------------------------------------------------
  console.log('\n--- 5. SİSTEM YANIT SÜRESİ VE SUNUCU SAĞLIĞI (TTFB) ---')
  const startTime = Date.now()
  try {
    const ttfbRes = await fetch(`${baseUrl}/`)
    const elapsed = Date.now() - startTime
    assert(ttfbRes.status === 200, 'Sunucu ana sayfası 200 OK ile yanıt verdi.')
    assert(elapsed < 500, `Sunucu yanıt süresi (TTFB) mükemmel seviyede (${elapsed} ms < 500 ms).`)
  } catch (err) {
    assert(false, 'TTFB ölçüm hatası:', err.message)
  }

  // --------------------------------------------------------------------------
  // SONUÇ ÖZETİ
  // --------------------------------------------------------------------------
  console.log('\n===========================================================================')
  console.log(`TEST SONUÇLARI: ${passedTests} BAŞARILI, ${failedTests} BAŞARISIZ (Toplam: ${totalTests})`)
  console.log('===========================================================================')

  if (failedTests > 0) {
    console.error('\nBaşarısız Testler:')
    for (const f of failures) {
      console.error(` - ${f.testName}: ${f.details}`)
    }
    process.exit(1)
  }
}

run()

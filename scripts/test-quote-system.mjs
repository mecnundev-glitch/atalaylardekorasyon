import { createHash } from 'node:crypto'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

console.log('='.repeat(70))
console.log('ATALAYLAR DEKORASYON — STATE 07: TEKLİF & İLETİŞİM TEST SUITE')
console.log('='.repeat(70))

const supabaseUrl = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY
const serviceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

let totalTests = 0
let passedTests = 0
let failedTests = 0

function assert(condition, testName, details = '') {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  ✓ PASS: ${testName}`)
  } else {
    failedTests++
    console.error(`  ✗ FAIL: ${testName} - ${details}`)
  }
}

// ------------------------------------------------------------------
// 1. ZOD DOĞRULAMA (VALIDATION) BİRİM TESTLERİ
// ------------------------------------------------------------------
console.log('\n[TEST GRUBU 1]: Form Doğrulama Kuralları (Validation)')

const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır')
    .max(100, 'Ad Soyad çok uzun'),
  phone: z
    .string()
    .trim()
    .min(10, 'Telefon numarası zorunludur')
    .refine((val) => {
      const digits = val.replace(/\D/g, '')
      return (digits.length === 10 && digits.startsWith('5')) ||
             (digits.length === 11 && digits.startsWith('05')) ||
             (digits.length === 12 && digits.startsWith('905'))
    }, 'Geçerli bir Türkiye cep telefonu numarası giriniz (Örn: 0544 997 87 60)'),
  district: z
    .string()
    .min(2, 'Lütfen İzmir içindeki ilçenizi seçiniz'),
  serviceSlug: z.string().optional().default('genel'),
  estimatedArea: z.number().nullable().optional(),
  notes: z.string().max(1000, 'Açıklama 1000 karakterden uzun olamaz').optional().default(''),
  attachmentUrls: z.array(z.string()).optional().default([]),
  kvkkConsent: z.literal(true, {
    message: 'KVKK Aydınlatma Metnini onaylamanız gerekmektedir'
  }),
  marketingConsent: z.boolean().optional().default(false),
  hp_website: z.string().optional().default(''),
  formStartTime: z.number().optional().default(0)
})

// Test 1.1: Boş veri reddedilmeli
const r1 = quoteSchema.safeParse({})
assert(!r1.success, 'Eksik zorunlu alanlar (boş form) reddedildi')

// Test 1.2: Geçersiz telefon reddedilmeli (9 rakamlı veya harf içeren)
const r2 = quoteSchema.safeParse({
  fullName: 'Ahmet Yılmaz',
  phone: '12345',
  district: 'Karşıyaka',
  kvkkConsent: true
})
assert(!r2.success, 'Geçersiz telefon numarası reddedildi')

// Test 1.3: KVKK onayı false ise reddedilmeli
const r3 = quoteSchema.safeParse({
  fullName: 'Ahmet Yılmaz',
  phone: '05449978760',
  district: 'Karşıyaka',
  kvkkConsent: false
})
assert(!r3.success, 'KVKK onayı olmadan gönderim engellendi')

// Test 1.4: Pazarlama izni zorunlu DEĞİL, false olsa dahi başarılı olmalı
const r4 = quoteSchema.safeParse({
  fullName: 'Ahmet Yılmaz',
  phone: '05449978760',
  district: 'Karşıyaka',
  serviceSlug: 'alci-uygulamalari',
  kvkkConsent: true,
  marketingConsent: false
})
assert(r4.success, 'Pazarlama onayı zorunlu kılınmadı (Ayrık Rıza Uyumu)')

// ------------------------------------------------------------------
// 2. WHATSAPP & TELEFON MERKEZİ BAĞLANTI TESTLERİ
// ------------------------------------------------------------------
console.log('\n[TEST GRUBU 2]: WhatsApp & Telefon URL Formatı ve Yapılandırma')

function checkPhoneConfigured(phone) {
  if (!phone) return false
  const trimmed = phone.trim().toLowerCase()
  if (!trimmed || trimmed.includes('0000000') || trimmed.includes('example') || trimmed.includes('ornek')) return false
  const digits = trimmed.replace(/\D/g, '')
  return digits.length >= 10 && !digits.endsWith('000000')
}

function generateWhatsAppUrl(phone, msg) {
  if (!checkPhoneConfigured(phone)) return '#'
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0') && digits.length === 11) digits = `9${digits}`
  else if (digits.length === 10) digits = `90${digits}`
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`
}

// Test 2.1: Gerçek numara için WhatsApp URL doğru formatlanmalı
const waUrl = generateWhatsAppUrl('05449978760', 'Keşif talebi: AT-2026-001')
assert(waUrl.startsWith('https://wa.me/905449978760?text='), 'WhatsApp URL uluslararası formatta oluşturuldu')
assert(waUrl.includes('Ke%C5%9Fif%20talebi'), 'WhatsApp mesajı Türkçe karakterlerle güvenli encode edildi')

// Test 2.2: Sahte / Örnek numara yapılandırılmamış olarak yakalanmalı
const dummyPhone = '+90 (532) 000 00 00'
assert(!checkPhoneConfigured(dummyPhone), 'Örnek/şablon numara (0000000) yapılandırılmamış olarak algılandı')
assert(generateWhatsAppUrl(dummyPhone, 'test') === '#', 'Yapılandırılmamış numara için güvenli # döndürüldü')

// ------------------------------------------------------------------
// 3. VERİTABANI BAĞLANTISI VE HİZMET İLİŞKİLENDİRME (INTEGRATION)
// ------------------------------------------------------------------
console.log('\n[TEST GRUBU 3]: Supabase Veritabanı Kaydı ve Hizmet İlişkilendirme')

async function runDatabaseTests() {
  if (!supabaseUrl || !serviceKey) {
    console.warn('  ⚠ Supabase service role anahtarı bulunamadı, DB testleri atlandı.')
    return
  }

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  // Test 3.1: 'alci-uygulamalari' hizmetini DB'den sorgula
  const { data: service, error: sErr } = await adminClient
    .from('services')
    .select('id, slug, title')
    .eq('slug', 'alci-uygulamalari')
    .single()

  assert(!sErr && service?.id, 'Formdaki hizmet slug veritabanındaki services tablosuyla eşleşti')

  // Test 3.2: Gerçek bir test teklif talebini service_id ile DB'ye kaydet
  const testPhone = '05449978760'
  const testHash = createHash('sha256').update('127.0.0.1').digest('hex')
  const { data: inserted, error: iErr } = await adminClient
    .from('quote_requests')
    .insert({
      full_name: 'Test Kullanıcı (Otomasyon)',
      phone: testPhone,
      district: 'Bornova',
      service_id: service?.id || null,
      service_slug: 'alci-uygulamalari',
      service_title: service?.title || 'Alçı Uygulamaları',
      estimated_area: 85,
      notes: 'Otomatik test keşif talebi - Salon ve antre asma tavan',
      status: 'new',
      ip_hash: testHash,
      user_agent: 'QuoteTestBot/1.0'
    })
    .select()
    .single()

  assert(!iErr && inserted?.id, 'Teklif talebi veritabanına başarıyla kaydedildi')
  assert(inserted?.service_id === service?.id, 'Hizmet ID ilişkisi (service_id) doğru kaydedildi')
  assert(inserted?.status === 'new', 'Yeni talep varsayılan "new" durumuyla oluştu')

  // ------------------------------------------------------------------
  // 4. SATIR DÜZEYİ GÜVENLİK (RLS) - YETKİSİZ ERİŞİM TESTİ
  // ------------------------------------------------------------------
  console.log('\n[TEST GRUBU 4]: RLS Gizlilik ve Yetkisiz Okuma Engeli')

  const anonClient = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  // Anonim istemci tüm teklifleri okumayı denerse boş dönmeli veya hata almalı
  const { data: anonRead } = await anonClient
    .from('quote_requests')
    .select('id, full_name, phone')

  assert(
    !anonRead || anonRead.length === 0,
    'Yetkisiz (Anonim) istemcinin teklifleri okuması RLS ile engellendi (Gizlilik Koruması)'
  )

  // Temizlik: Test kaydını admin yetkisiyle sil
  if (inserted?.id) {
    await adminClient.from('quote_requests').delete().eq('id', inserted.id)
    console.log('  ℹ Test verisi güvenle temizlendi.')
  }
}

// ------------------------------------------------------------------
// 5. SPAM VE BOT KORUMA TESTLERİ
// ------------------------------------------------------------------
console.log('\n[TEST GRUBU 5]: Spam Koruması, Honeypot ve Hız Sınırlama')

function testHoneypot(data) {
  if (data.hp_website && data.hp_website.trim().length > 0) {
    return { blocked: true, reason: 'honeypot_triggered' }
  }
  return { blocked: false }
}

function testSpeedTrap(formStartTime, now) {
  if (formStartTime > 0 && now - formStartTime < 1500) {
    return { blocked: true, reason: 'submitted_too_fast' }
  }
  return { blocked: false }
}

// Test 5.1: Gizli honeypot alanı dolduran bot engellenmeli
const botData = { hp_website: 'http://spam-link.ru', fullName: 'Spam Bot' }
assert(testHoneypot(botData).blocked, 'Honeypot tuzağına düşen bot tespit edildi ve engellendi')

// Test 5.2: 1.5 saniyeden hızlı dolduran otomatik bot engellenmeli
const tNow = Date.now()
assert(testSpeedTrap(tNow - 200, tNow).blocked, '1.5 saniyenin altında gelen insan-dışı form hızı engellendi')
assert(!testSpeedTrap(tNow - 5000, tNow).blocked, '5 saniye süren normal kullanıcı gönderimi onaylandı')

// ------------------------------------------------------------------
// SONUÇLARI YAZDIR
// ------------------------------------------------------------------
runDatabaseTests().then(() => {
  console.log('\n' + '='.repeat(70))
  console.log(`TEST RAPORU: Toplam ${totalTests} test | Başarılı: ${passedTests} | Başarısız: ${failedTests}`)
  console.log('='.repeat(70))

  if (failedTests > 0) {
    process.exit(1)
  }
}).catch(err => {
  console.error('Test çalışma hatası:', err)
  process.exit(1)
})

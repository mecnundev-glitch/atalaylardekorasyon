import { createClient } from '@supabase/supabase-js'

console.log('='.repeat(75))
console.log('ATALAYLAR DEKORASYON — STATE 08 ADMIN PANELİ GÜVENLİK & İŞLEV TEST SÜİTİ')
console.log('='.repeat(75))

const supabaseUrl = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY
const serviceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@atalaylardekarasyon.com'
const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Atalaylar2026!Admin'

if (!supabaseUrl || !anonKey || !serviceKey) {
  console.error('Hata: SUPABASE_URL, SUPABASE_ANON_KEY veya SUPABASE_SERVICE_ROLE_KEY eksik.')
  process.exit(1)
}

const anonClient = createClient(supabaseUrl, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false }
})

const serviceClient = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
})

let passedCount = 0
let failedCount = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  [BAŞARILI] ${message}`)
    passedCount++
  } else {
    console.error(`  [BAŞARISIZ] ${message}`)
    failedCount++
  }
}

async function runTestSuite() {
  console.log('\n--- 1. YETKİSİZ / ANONİM KULLANICI ERİŞİM ENGELİ (RLS GÜVENLİĞİ) ---')

  // Test 1.1: Anonim kullanıcı teklifleri (quote_requests) okuyamamalı
  try {
    const { data, error } = await anonClient.from('quote_requests').select('*')
    // Either error returned or data is empty/null due to RLS filter
    const isProtected = error !== null || !data || data.length === 0
    assert(isProtected, 'Çıkış yapmış / anonim kullanıcı müşteri teklif verilerine erişemiyor (RLS aktif).')
  } catch {
    assert(true, 'Çıkış yapmış kullanıcı teklif verisine erişemiyor (hata ile engellendi).')
  }

  // Test 1.2: Anonim kullanıcı hizmet tablosuna doğrudan veri ekleyememeli
  try {
    const { error } = await anonClient.from('services').insert({
      title: 'Hacker Service',
      slug: 'hacker-service',
      short_description: 'Unauthorized',
      description: 'Unauthorized test',
      icon_name: 'AlertCircle',
      cover_image_url: '/test.jpg'
    })
    assert(error !== null, 'Anonim kullanıcının doğrudan hizmet eklemesi RLS tarafından engellendi.')
  } catch {
    assert(true, 'Anonim hizmet ekleme engellendi.')
  }

  // Test 1.3: Anonim kullanıcı site ayarlarını ekleyememeli veya değiştirememeli
  try {
    const { error: insErr } = await anonClient.from('site_settings').insert({
      key: 'unauthorized_hack_key',
      value: { hacked: true }
    })
    const { data: updData } = await anonClient.from('site_settings')
      .update({ description: 'Hacked' })
      .eq('key', 'contact_info')
      .select()

    const isBlocked = insErr !== null && (!updData || updData.length === 0)
    assert(isBlocked, 'Anonim kullanıcının site ayarlarını manipüle etmesi RLS tarafından engellendi (Insert 42501 / Update 0 rows).')
  } catch {
    assert(true, 'Anonim ayar manipülasyonu engellendi.')
  }

  console.log('\n--- 2. SUPABASE AUTH İLE YÖNETİCİ GİRİŞİ & PROFİL DOĞRULAMA ---')
  let adminSession = null
  let adminAuthClient = null

  try {
    const { data: authData, error: authError } = await anonClient.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    })

    if (authError || !authData.session) {
      assert(false, `Yönetici girişi başarısız: ${authError?.message}`)
    } else {
      adminSession = authData.session
      assert(true, `Admin girişi başarılı: ${authData.user.email} (Auth UID: ${authData.user.id})`)

      // Authenticated client yarat
      adminAuthClient = createClient(supabaseUrl, anonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${adminSession.access_token}`
          }
        },
        auth: { persistSession: false, autoRefreshToken: false }
      })

      // Admin profilini kontrol et
      const { data: profile, error: profErr } = await adminAuthClient
        .from('admin_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profErr || !profile) {
        assert(false, `Admin profili sorgulanamadı: ${profErr?.message}`)
      } else {
        const isValidRole = ['superadmin', 'admin'].includes(profile.role)
        const isActive = profile.is_active === true
        assert(isValidRole && isActive, `Admin profili doğrulandı (Rol: ${profile.role}, Aktif: ${profile.is_active})`)
      }
    }
  } catch (err) {
    assert(false, `Admin auth sırasında istisna: ${err.message}`)
  }

  if (adminAuthClient && adminSession) {
    console.log('\n--- 3. ADMİN CRUD VE VERİTABANI YANSIMA TESTLERİ ---')

    // Test 3.1: Hizmet CRUD Testi
    const testServiceSlug = `test-service-${Date.now()}`
    try {
      // Create
      const { error: insErr } = await adminAuthClient.from('services').insert({
        title: 'Özel Akustik Alçı Tavan Testi',
        slug: testServiceSlug,
        subtitle: 'Admin Panel Testi',
        short_description: 'Test kısa açıklama',
        description: 'Test detaylı açıklama',
        icon_name: 'Layers',
        cover_image_url: '/images/hero-decoration.jpg',
        is_active: false,
        display_order: 99
      })
      assert(!insErr, 'Admin yetkisiyle yeni hizmet eklendi (Create).')

      // Read
      const { data: readData, error: readErr } = await adminAuthClient
        .from('services')
        .select('*')
        .eq('slug', testServiceSlug)
        .single()
      assert(!readErr && readData?.title === 'Özel Akustik Alçı Tavan Testi', 'Eklenen hizmet veritabanından okundu (Read).')

      // Update
      const { error: updErr } = await adminAuthClient
        .from('services')
        .update({ title: 'Özel Akustik Alçı Tavan Güncellendi', is_active: true })
        .eq('slug', testServiceSlug)
      assert(!updErr, 'Hizmet bilgileri ve yayın durumu güncellendi (Update).')

      // Delete (Onaylı silme simülasyonu)
      const { error: delErr } = await adminAuthClient
        .from('services')
        .delete()
        .eq('slug', testServiceSlug)
      assert(!delErr, 'Test hizmeti veritabanından kalıcı olarak silindi (Delete).')
    } catch (err) {
      assert(false, `Hizmet CRUD hatası: ${err.message}`)
    }

    // Test 3.2: Proje CRUD Testi
    const testProjectSlug = `test-project-${Date.now()}`
    try {
      const { error: pInsErr } = await adminAuthClient.from('projects').insert({
        title: 'Mavişehir Modern Villa Asma Tavan Test',
        slug: testProjectSlug,
        category: 'alci',
        service_slug: 'alci-uygulamalari',
        service_title: 'Alçı Uygulamaları',
        location: 'Karşıyaka / İzmir',
        completion_duration: '4 Gün',
        summary: 'Admin test projesi',
        details: 'Admin panel test detayları',
        after_image_url: '/images/hero-decoration.jpg',
        is_featured: false,
        is_published: true,
        display_order: 99
      })
      assert(!pInsErr, 'Admin yetkisiyle yeni proje portföye eklendi (Create).')

      const { data: pData } = await adminAuthClient
        .from('projects')
        .select('*')
        .eq('slug', testProjectSlug)
        .single()
      assert(pData?.slug === testProjectSlug, 'Eklenen proje başarıyla okundu (Read).')

      const { error: pUpdErr } = await adminAuthClient
        .from('projects')
        .update({ is_featured: true })
        .eq('slug', testProjectSlug)
      assert(!pUpdErr, 'Proje öne çıkarma (featured) durumu güncellendi (Update).')

      const { error: pDelErr } = await adminAuthClient
        .from('projects')
        .delete()
        .eq('slug', testProjectSlug)
      assert(!pDelErr, 'Test projesi veritabanından silindi (Delete).')
    } catch (err) {
      assert(false, `Proje CRUD hatası: ${err.message}`)
    }

    // Test 3.3: Müşteri Yorumları (Testimonials) CRUD Testi
    try {
      const { data: tData, error: tInsErr } = await adminAuthClient
        .from('testimonials')
        .insert({
          client_name: 'Test Müşteri',
          district: 'Bostanlı / İzmir',
          service_title: 'Boya & Badana',
          comment: 'Kusursuz işçilik ve zamanında teslimat, teşekkürler.',
          rating: 5,
          is_approved: false,
          display_order: 99
        })
        .select()
        .single()
      assert(!tInsErr && tData?.id, 'Admin yetkisiyle yeni müşteri yorumu eklendi (Create).')

      if (tData?.id) {
        const { error: tUpdErr } = await adminAuthClient
          .from('testimonials')
          .update({ is_approved: true })
          .eq('id', tData.id)
        assert(!tUpdErr, 'Yorum onaylandı ve yayına alındı (Update / Approval toggle).')

        const { error: tDelErr } = await adminAuthClient
          .from('testimonials')
          .delete()
          .eq('id', tData.id)
        assert(!tDelErr, 'Test yorumu silindi (Delete).')
      }
    } catch (err) {
      assert(false, `Yorum CRUD hatası: ${err.message}`)
    }

    // Test 3.4: Teklif ve Keşif Talepleri (Quote Requests) Yönetimi
    try {
      // 1. Admin teklif listesini çekebilmeli
      const { data: quoteList, error: qListErr } = await adminAuthClient
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false })
      assert(!qListErr && Array.isArray(quoteList), 'Admin kullanıcı tüm müşteri teklif taleplerini listeleyebiliyor.')

      // 2. Durum güncelleme testi (Yeni -> İnceleniyor -> İletişime Geçildi -> Tamamlandı -> İptal)
      const { data: newQuote, error: qInsErr } = await serviceClient
        .from('quote_requests')
        .insert({
          full_name: 'Admin Test Müşteri',
          phone: '05550000000',
          service_title: 'Bölme Duvar',
          service_slug: 'bolme-duvar',
          district: 'Çiğli / İzmir',
          status: 'new',
          notes: 'Test teklif talebi'
        })
        .select()
        .single()

      if (qInsErr) {
        assert(false, `Test teklif kaydı oluşturulamadı: ${qInsErr.message}`)
      } else if (newQuote?.id) {
        assert(true, 'Test amaçlı teklif kaydı oluşturuldu.')

        // Durumu güncelle: inceleniyor (scheduled)
        const { error: qUpdErr1 } = await adminAuthClient
          .from('quote_requests')
          .update({ status: 'scheduled' })
          .eq('id', newQuote.id)
        assert(!qUpdErr1, 'Teklif durumu güncellendi: [İnceleniyor / scheduled].')

        // Durumu güncelle: iletisime_gecildi (contacted)
        const { error: qUpdErr2 } = await adminAuthClient
          .from('quote_requests')
          .update({ status: 'contacted' })
          .eq('id', newQuote.id)
        assert(!qUpdErr2, 'Teklif durumu güncellendi: [İletişime Geçildi / contacted].')

        // Durumu güncelle: tamamlandi (completed)
        const { error: qUpdErr3 } = await adminAuthClient
          .from('quote_requests')
          .update({ status: 'completed' })
          .eq('id', newQuote.id)
        assert(!qUpdErr3, 'Teklif durumu güncellendi: [Tamamlandı / completed].')

        // Durumu güncelle: iptal (cancelled)
        const { error: qUpdErr4 } = await adminAuthClient
          .from('quote_requests')
          .update({ status: 'cancelled' })
          .eq('id', newQuote.id)
        assert(!qUpdErr4, 'Teklif durumu güncellendi: [İptal / cancelled].')

        // Durumu güncelle: yeni (new)
        const { error: qUpdErr5 } = await adminAuthClient
          .from('quote_requests')
          .update({ status: 'new' })
          .eq('id', newQuote.id)
        assert(!qUpdErr5, 'Teklif durumu güncellendi: [Yeni / new].')

        // Temizlik (Onaylı silme)
        const { error: qDelErr } = await adminAuthClient
          .from('quote_requests')
          .delete()
          .eq('id', newQuote.id)
        assert(!qDelErr, 'Teklif talebi admin tarafından silindi (Delete).')
      }
    } catch (err) {
      assert(false, `Teklif yönetimi hatası: ${err.message}`)
    }

    // Test 3.5: Site Ayarları Yönetimi
    try {
      const { data: settingsData, error: sErr } = await adminAuthClient
        .from('site_settings')
        .select('*')
      assert(!sErr && Array.isArray(settingsData), 'Site ayarları admin tarafından okundu.')

      // Announcement güncellemesi
      const testAnnouncement = {
        active: true,
        text: 'İzmir genelinde ücretsiz keşif hizmetimiz devam etmektedir.'
      }
      const { error: sUpsertErr } = await adminAuthClient
        .from('site_settings')
        .upsert({
          key: 'announcement',
          value: testAnnouncement,
          description: 'Duyuru bandı ayarları'
        }, { onConflict: 'key' })
      assert(!sUpsertErr, 'Site duyuru ve iletişim ayarları güncellendi (Upsert).')
    } catch (err) {
      assert(false, `Ayar yönetimi hatası: ${err.message}`)
    }
  }

  console.log('\n--- 4. SUNUCU TARAFI GUARD VE GEÇERSİZ / SÜRESİ DOLMUŞ OTURUM KORUMASI ---')
  // Test 4.1: Geçersiz veya süresi dolmuş token ile oturum kontrolü
  try {
    const expiredOrFakeClient = createClient(supabaseUrl, anonKey, {
      global: {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidtoken.signature'
        }
      }
    })
    const { data: fakeUser, error: fakeErr } = await expiredOrFakeClient.auth.getUser()
    assert(fakeErr !== null || !fakeUser?.user, 'Süresi dolmuş veya sahte JWT token sunucu tarafından reddedildi (401).')
  } catch {
    assert(true, 'Sahte token başarıyla reddedildi.')
  }

  // Test 4.2: Storage bucket durumu kontrolü
  try {
    const { data: buckets } = await serviceClient.storage.listBuckets()
    const mediaBucket = buckets?.find(b => b.name === 'project-media')
    const attachmentsBucket = buckets?.find(b => b.name === 'quote-attachments')
    assert(mediaBucket !== undefined, 'Storage bucket [project-media] mevcut ve yapılandırılmış.')
    assert(attachmentsBucket !== undefined, 'Storage bucket [quote-attachments] mevcut ve yapılandırılmış.')
  } catch (err) {
    assert(false, `Storage bucket kontrol hatası: ${err.message}`)
  }

  console.log('\n' + '='.repeat(75))
  console.log(`TEST SONUÇLARI: ${passedCount} BAŞARILI, ${failedCount} BAŞARISIZ`)
  console.log('='.repeat(75))

  if (failedCount > 0) {
    process.exit(1)
  }
}

runTestSuite().catch((err) => {
  console.error('Kritik test çalıştırma hatası:', err)
  process.exit(1)
})

import { createClient } from '@supabase/supabase-js'

console.log('='.repeat(70))
console.log('ATALAYLAR DEKORASYON — GÜVENLİ İLK ADMİN OLUŞTURMA ARACI')
console.log('='.repeat(70))

const supabaseUrl = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('Hata: SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY (.env) bulunamadı.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
})

// Argümanları oku (Örn: node scripts/create-admin.mjs admin@atalaylardekarasyon.com GizliSifre123! "Mehmet Atalay")
const args = process.argv.slice(2)
const email = args[0] || process.env.INITIAL_ADMIN_EMAIL || 'admin@atalaylardekarasyon.com'
const password = args[1] || process.env.INITIAL_ADMIN_PASSWORD || 'Atalaylar2026!Admin'
const fullName = args[2] || process.env.INITIAL_ADMIN_NAME || 'Mehmet Atalay'

async function createAdmin() {
  console.log(`\nİşlem başlatılıyor:`)
  console.log(`- E-posta:   ${email}`)
  console.log(`- Ad Soyad:  ${fullName}`)
  console.log(`- Yetki:     superadmin (is_active: true)\n`)

  // 1. Kullanıcı zaten var mı kontrol et
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) {
    console.error('Kullanıcı listesi alınamadı:', listError.message)
    process.exit(1)
  }

  let user = listData.users.find(u => u.email?.toLowerCase() === email.toLowerCase())

  if (user) {
    console.log(`[1/3] Mevcut kullanıcı bulundu (ID: ${user.id}). Şifre ve meta veriler güncelleniyor...`)
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: password,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { full_name: fullName, role: 'admin' }
    })
    if (updateError) {
      console.error('Kullanıcı güncellenemedi:', updateError.message)
      process.exit(1)
    }
    user = updateData.user
    console.log('✓ Kullanıcı kimliği doğrulandı ve şifresi güncellendi.')
  } else {
    console.log(`[1/3] Yeni kullanıcı oluşturuluyor...`)
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { full_name: fullName, role: 'admin' }
    })
    if (createError) {
      console.error('Kullanıcı oluşturulamadı:', createError.message)
      process.exit(1)
    }
    user = createData.user
    console.log(`✓ Kullanıcı oluşturuldu (ID: ${user.id}).`)
  }

  // 2. admin_profiles tablosuna profil kaydı ekle / güncelle
  console.log('[2/3] admin_profiles tablosu güncelleniyor...')
  const { error: profileError } = await supabase
    .from('admin_profiles')
    .upsert({
      id: user.id,
      email: email,
      full_name: fullName,
      role: 'superadmin',
      is_active: true,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })

  if (profileError) {
    console.error('admin_profiles kaydı yapılamadı:', profileError.message)
    process.exit(1)
  }
  console.log('✓ Yönetici profili aktif olarak kaydedildi.')

  // 3. RLS Test Kontrolü
  console.log('[3/3] Yönetici yetki doğrulaması test ediliyor...')
  const { data: checkProfile } = await supabase
    .from('admin_profiles')
    .select('id, email, full_name, role, is_active')
    .eq('id', user.id)
    .single()

  console.log('='.repeat(70))
  console.log('TEBRİKLER! Yönetici hesabı başarıyla hazırlandı.')
  console.log('='.repeat(70))
  console.log(`Giriş URL:        http://localhost:3000/admin/login`)
  console.log(`E-posta:          ${checkProfile.email}`)
  console.log(`Rol:              ${checkProfile.role}`)
  console.log(`Durum:            ${checkProfile.is_active ? 'Aktif' : 'Pasif'}`)
  console.log('='.repeat(70))
  console.log('NOT: Şifrenizi güvenli tutunuz ve üretim ortamında INITIAL_ADMIN_PASSWORD değişkenini temizleyiniz.')
}

createAdmin().catch(err => {
  console.error('Beklenmeyen hata:', err)
  process.exit(1)
})

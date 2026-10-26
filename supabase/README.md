# Atalaylar Dekorasyon — Supabase Kurulum ve Güvenlik Rehberi

Bu dizin, **Atalaylar Dekorasyon** web uygulaması için PostgreSQL şemasını, Row Level Security (RLS) politikalarını, Storage yapılandırmasını ve sentetik tohum (seed) verilerini içerir.

---

## 1. Supabase Projesi Oluşturma

1. [https://supabase.com](https://supabase.com) adresine gidin ve oturum açın.
2. **New Project** butonuna tıklayın:
   * **Name:** `atalaylar-dekorasyon`
   * **Database Password:** Güçlü bir şifre belirleyin.
   * **Region:** Türkiye'ye en düşük gecikme sağlayan `Frankfurt (eu-central-1)` seçeneğini tercih edin.
3. Proje oluştuktan sonra **Project Settings > API** bölümünden şu değerleri kopyalayın:
   * **Project URL:** `https://your-project.supabase.co`
   * **Project API keys:**
     * `anon` / `public` ➔ İstemci tarafı erişim anahtarı
     * `service_role` (secret) ➔ Yalnızca sunucu Nitro API kullanımı için

---

## 2. Migration Dosyalarını Çalıştırma Sırası

Supabase Dashboard üzerindeki **SQL Editor** ekranına giderek aşağıdaki dosyaları sırayla çalıştırın:

| Sıra | Dosya | Amaç |
| :--- | :--- | :--- |
| **1** | [`migrations/20261004000001_initial_schema.sql`](file:///c:/Users/Tayfur/OneDrive/Desktop/Projelerim/atalaylardekarasyon/supabase/migrations/20261004000001_initial_schema.sql) | Tablolar, indeksler, foreign key ve `updated_at` tetikleyicileri |
| **2** | [`migrations/20261004000002_rls_policies.sql`](file:///c:/Users/Tayfur/OneDrive/Desktop/Projelerim/atalaylardekarasyon/supabase/migrations/20261004000002_rls_policies.sql) | Tüm tablolarda RLS aktivasyonu, halka açık okuma ve admin koruması |
| **3** | [`migrations/20261004000003_storage_buckets.sql`](file:///c:/Users/Tayfur/OneDrive/Desktop/Projelerim/atalaylardekarasyon/supabase/migrations/20261004000003_storage_buckets.sql) | `project-media` (public) ve `quote-attachments` (private) bucket'ları |
| **4** | [`migrations/20261004000004_seed_synthetic_data.sql`](file:///c:/Users/Tayfur/OneDrive/Desktop/Projelerim/atalaylardekarasyon/supabase/migrations/20261004000004_seed_synthetic_data.sql) | Hizmetler, demo projeler, onaylı yorumlar ve site ayarları |

---

## 3. İlk Yöneticiyi (Admin) Tanımlama

1. Supabase Dashboard ➔ **Authentication > Users** ekranından **Add User > Create User** diyerek yönetici e-posta ve parolasını oluşturun (Örn: `admin@atalaylardekarasyon.com`).
2. Kullanıcının `User UID` değerini kopyalayın.
3. **SQL Editor** üzerinden bu kullanıcıyı yönetici profiline ekleyin:
```sql
INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
VALUES (
  'KULLANICI_UUID_BURAYA',
  'admin@atalaylardekarasyon.com',
  'Yönetici',
  'superadmin',
  true
);

-- Veya JWT app_metadata üzerine doğrudan admin rolü atayın:
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE id = 'KULLANICI_UUID_BURAYA';
```

---

## 4. RLS Güvenlik Kuralları Özeti

* **Kişisel Verilerin Gizliliği (KVKK):** `quote_requests` tablosu anonim ziyaretçiler tarafından **ASLA listelenemez veya okunamaz**. Yalnızca `INSERT` (ekleme) izni vardır.
* **Müşteri Fotoğrafları Gizliliği:** `quote-attachments` Storage bucket'ı **Private** olarak ayarlanmıştır. Ziyaretçi evinin fotoğrafını yükleyebilir; ancak bu görselleri yalnızca giriş yapmış yetkili adminler indirebilir/görebilir.
* **İçerik Güvenliği:** `services`, `projects` ve `testimonials` tablolarında `INSERT`, `UPDATE` ve `DELETE` yetkisi yalnızca `is_admin_user()` doğrulaması geçen kullanıcılara açıktır.
* **Yorum Filtresi:** Ziyaretçilerin gönderdiği müşteri yorumları `is_approved = false` olarak kaydedilir; admin onaylamadan sitede gösterilmez.

---

## 5. RLS Doğrulama SQL Test Komutları

Supabase SQL Editor'da anonim bir ziyaretçi gibi test yapmak için:
```sql
-- 1. Anonim rolüne geç:
SET ROLE anon;

-- 2. Aktif hizmetleri okuma (Başarılı olmalı):
SELECT id, title, slug FROM public.services WHERE is_active = true;

-- 3. Teklif taleplerini okuma denemesi (0 satır dönmeli / Boş dönmeli!):
SELECT * FROM public.quote_requests;

-- 4. Yetkisiz içerik silme denemesi (Hata vermeli veya 0 satır etkilemeli):
DELETE FROM public.services WHERE slug = 'alci-uygulamalari';

-- 5. Test sonrası postgres rolüne geri dön:
RESET ROLE;
```

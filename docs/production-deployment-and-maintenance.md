# ATALAYLAR DEKORASYON — CANLI YAYINLAMA, DNS VE BAKIM KILAVUZU

**Sürüm:** 1.0.0 (Production)  
**Tarih:** 2026-10-05  
**Platform:** Vercel (Edge/Serverless SSR) & Supabase (PostgreSQL 15 + RLS + Storage)  

---

## 1. Canlı Yayın Bilgileri

* **Vercel Proje Adı:** `atalaylardekarasyon`
* **Vercel Hesabı / Scope:** `tayfurs-projects`
* **Canlı Production URL (Vercel):** [https://atalaylardekarasyon.vercel.app](https://atalaylardekarasyon.vercel.app)
* **Kalıcı Dağıtım Kimliği:** `dpl_3PbpmFukQUjVVahVqSzqXrEdddX7`
* **Hedef Özel Alan Adı:** `https://atalaylardekarasyon.com`
* **SSL Durumu:** Otomatik Let's Encrypt SSL (Vercel tarafından yönetilir, HTTP/2 & HTTPS zorunlu)

---

## 2. Özel Alan Adı (DNS) ve SSL Yapılandırma Adımları

Domain tescil firmanızın (Natro, İsimTescil, GoDaddy, Cloudflare, vb.) DNS yönetim paneline aşağıdaki kayıtları ekleyiniz:

### DNS Kayıt Tablosu
| Kayıt Türü | Host / Ad | Değer / Hedef | TTL | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (kök domain) | `76.76.21.21` | Otomatik / 3600 | Vercel Anycast Global IP |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Otomatik / 3600 | `www` alt alan adı yönlendirmesi |

### Vercel Panelinden Domain Ekleme
1. Vercel Dashboard'da **atalaylardekarasyon** projesine giriniz.
2. **Settings** $\rightarrow$ **Domains** sekmesini açınız.
3. `atalaylardekarasyon.com` alan adını yazıp **Add** butonuna tıklayınız.
4. "Redirect `www.atalaylardekarasyon.com` to `atalaylardekarasyon.com`" seçeneğini işaretleyiniz.
5. DNS kayıtları yayıldıktan sonra SSL sertifikası (HTTPS) 2-5 dakika içinde otomatik olarak aktif olacaktır.

---

## 3. Canlı Ortam Değişkenleri (Environment Variables)

Vercel üzerinde tanımlı olan ve çalışan çevre değişkenleri listesi:

| Değişken Adı | Ortam | Tür | Açıklama |
| :--- | :--- | :--- | :--- |
| `SUPABASE_URL` | Production, Preview | Hassas (Gizli) | Supabase proje API uç noktası |
| `SUPABASE_KEY` | Production, Preview | Hassas (Gizli) | Supabase anonim istemci genel anahtarı |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview | Hassas (Sunucu) | Nitro sunucu tarafı yetkili veritabanı anahtarı |
| `SITE_URL` | Production, Preview | Genel | `https://atalaylardekarasyon.vercel.app` (Özel domain sonrası `https://atalaylardekarasyon.com`) |
| `NUXT_PUBLIC_SITE_NAME` | Production, Preview | Genel | "Atalaylar Dekorasyon" |
| `NUXT_PUBLIC_CONTACT_PHONE` | Production, Preview | Genel | İşletme resmi arama hattı |
| `NUXT_PUBLIC_WHATSAPP_PHONE` | Production, Preview | Genel | WhatsApp sipariş ve keşif hattı |
| `NUXT_PUBLIC_CONTACT_EMAIL` | Production, Preview | Genel | `info@atalaylardekarasyon.com` |
| `NUXT_PUBLIC_LOCATION_CITY` | Production, Preview | Genel | "İzmir" |

---

## 4. Veritabanı ve Medya Yedekleme Prosedürleri

### Otomatik Supabase Yedekleri
* Supabase PostgreSQL veritabanı her gün otomatik günlük snapshot (Point-in-Time Recovery - PITR) yedek almaktadır.
* Veritabanı yedekleri Supabase Dashboard $\rightarrow$ **Settings** $\rightarrow$ **Database** $\rightarrow$ **Backups** sekmesinden izlenebilir.

### Manuel SQL Yedeği Alma (pg_dump)
Yerel veya harici bir diske tam veritabanı dökümü almak için terminalden:
```bash
pg_dump "postgresql://postgres:[SIFRE]@db.[PROJE-REF].supabase.co:5432/postgres" > backup_$(date +%Y%m%d).sql
```

### Storage Bucket Güvenliği
* `project-media`: Herkese açık galeri ve proje fotoğrafları (CDN önbellekli).
* `quote-attachments`: Müşteri teklif belgeleri ve keşif fotoğrafları (Özel/Gizli bucket - RLS yetkilendirmesiyle yalnızca admin tarafından okunabilir).

---

## 5. Canlı Hata Takibi ve Log Yönetimi

1. **Vercel Çalışma Zamanı (Runtime) Logları:**
   - Vercel Dashboard $\rightarrow$ **Logs** sekmesinden canlı gelen HTTP istekleri, 4xx/5xx hata durumları ve Nitro sunucu çıktıları anlık izlenebilir.
   - CLI üzerinden izleme: `npx vercel logs atalaylardekarasyon.vercel.app`
2. **Supabase API ve Sorgu Logları:**
   - Supabase Dashboard $\rightarrow$ **Logs** $\rightarrow$ **API Logs** & **Postgres Logs** sekmesinden şüpheli veya başarısız yetkilendirme istekleri takip edilebilir.

---

## 6. Geri Dönüş (Rollback) ve Felaket Kurtarma

Olası bir hatalı kod gönderiminde anında önceki kararlı sürüme dönmek için:

1. **Tek Tıkla Rollback (Önerilen):**
   - Vercel Dashboard $\rightarrow$ **Deployments** sekmesine gidiniz.
   - Sorunsuz çalışan önceki derlemenin sağındaki üç noktaya tıklayarak **Instant Rollback** seçeneğini seçiniz. Sıfır kesintiyle 1 saniye içinde önceki sürüm yayına alınır.
2. **CLI ile Rollback:**
   ```bash
   npx vercel rollback [onceki-deployment-url]
   ```

---

## 7. Rutin Bakım ve Güncelleme Takvimi

* **Aylık:** `npm audit` çalıştırılarak bağımlılıkların güvenlik yamaları incelenmelidir.
* **3 Aylık:** Admin şifreleri yenilenmeli, kullanılmayan admin hesapları pasife alınmalıdır.
* **Sezonluk:** İzmir iklim koşullarına göre bahar/kış başlarında yalıtım ve boya kampanyaları veya öne çıkan projeler admin panelinden güncellenmelidir.

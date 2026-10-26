# Atalaylar Dekorasyon — SEO ve Analitik Kurulum Kılavuzu

Bu kılavuz, **Atalaylar Dekorasyon** web sitesinin arama motorlarında (özellikle İzmir yerel arama sonuçlarında) en üst düzeyde görünürlük kazanması ve kullanıcı gizliliğini (KVKK) ihlal etmeden analitik verisi toplanması için hazırlanmıştır.

---

## 1. Google Search Console Kurulumu ve Doğrulama

Google Search Console, sitenizin Google dizinindeki durumunu, arama sorgularını, tıklama oranlarını ve teknik indeksleme sağlığını izlemek için resmi araçtır.

### Adım 1: Mülk Ekleme
1. [Google Search Console](https://search.google.com/search-console) paneline giriş yapın.
2. **Mülk Ekle** butonuna tıklayın.
3. İki seçenekten birini seçin:
   - **Alan Adı (Önerilen):** `atalaylardekarasyon.com` yazın (DNS TXT kaydı gerektirir; tüm alt alan adlarını ve protokolleri kapsar).
   - **URL Ön Eki:** `https://atalaylardekarasyon.com` yazın.

### Adım 2: Doğrulama Yöntemleri
* **Yöntem A — DNS TXT Kaydı (En Sağlam Yöntem):**
  Alan adı sağlayıcınızın (Cloudflare, GoDaddy, Natro vb.) DNS yönetim paneline gidin ve verilen `google-site-verification=...` değerini TXT kaydı olarak ekleyin.
* **Yöntem B — HTML Meta Etiketi:**
  Search Console'un verdiği doğrulama kodunu `nuxt.config.ts` içerisindeki `app.head.meta` dizisine ekleyebilirsiniz:
  ```typescript
  { name: 'google-site-verification', content: 'SIZIN_DOGRULAMA_KODUNUZ' }
  ```

### Adım 3: XML Site Haritasını Gönderme
Doğrulama tamamlandıktan sonra sol menüden **Site Haritaları (Sitemaps)** sekmesine gelin:
* Yeni site haritası ekle alanına: `sitemap.xml` yazıp **Gönder** butonuna tıklayın.
* Sistem dinamik olarak oluşturulan `https://atalaylardekarasyon.com/sitemap.xml` dosyasını tarayarak tüm hizmet, proje ve yasal sayfaları dizine ekleyecektir.

---

## 2. Google İşletme Profili (Google My Business / Harita Kaydı)

İzmir'de boya, alçı ve tadilat aramalarında Google Haritalar (Local 3-Pack) en yüksek dönüşümü sağlar.

1. **İşletme Adı:** `Atalaylar Dekorasyon — İzmir Yapı & Tadilat`
2. **Birincil Kategori:** `Genel Yüklenici (General Contractor)` veya `Boya Ustası (Painter)` / `Alçıpan Ustası (Dry Wall Contractor)`
3. **Hizmet Verilen Bölgeler:** İzmir merkez ve çevre ilçeler (Karşıyaka, Bornova, Konak, Çiğli, Bayraklı, Buca, Gaziemir, Menemen, Urla, Balçova, Narlıdere).
4. **Çalışma Saatleri:** `Pazartesi - Cumartesi: 08:30 - 19:30` (Sitedeki Schema.org verisiyle birebir aynı olmalıdır).
5. **Telefon:** `+90 (544) 997 87 60` (Sitedeki iletişim numarasıyla eşleşmelidir).
6. **Web Sitesi Bağlantısı:** `https://atalaylardekarasyon.com`
7. **Fotoğraflar:** Şantiyelerden yüksek çözünürlüklü öncesi/sonrası fotoğrafları düzenli olarak yüklenmelidir.

---

## 3. Gizlilik Odaklı & KVKK Uyumlu Analitik Entegrasyonu

Geleneksel Google Analytics gibi araçlar ziyaretçilerin cihazına takip çerezleri (cookies) yerleştirdiği için KVKK uyarınca zorunlu açık rıza (consent banner) gerektirir ve sayfa hızını düşürür. Bunun yerine iki yaklaşım önerilir:

### Seçenek 1: Cloudflare Web Analytics (Önerilen — Çerezsiz & Ücretsiz)
* **Avantajları:** Sıfır çerez, sıfır KVKK onay zorunluluğu, kişisel veri toplamayan anonim ölçüm, ultra hafif script (1 KB'tan küçük).
* **Kurulum:**
  1. Cloudflare Dashboard > Web Analytics > Add a site.
  2. Verilen JavaScript kodunu `nuxt.config.ts` veya `app.vue` içerisine ekleyin:
  ```typescript
  // nuxt.config.ts -> app.head.script
  {
    src: 'https://static.cloudflareinsights.com/beacon.min.js',
    defer: true,
    'data-cf-beacon': '{"token": "YOUR_CLOUDFLARE_TOKEN"}'
  }
  ```

### Seçenek 2: Google Analytics 4 + Consent Mode v2 (İsteğe Bağlı)
Eğer Google Ads reklam kampanyaları yönetilecekse GA4 kurulabilir:
1. `G-XXXXXXXXXX` ölçüm kimliğinizi alın.
2. Ziyaretçi `/yasal/cerez-politikasi` üzerinde rıza verene kadar `analytics_storage: 'denied'` modunda çalıştırılmalıdır (Google Consent Mode v2).

---

## 4. Teknik SEO Mimarisi Özeti

Sitede uygulanan teknik optimizasyonlar:
* **SSR (Server-Side Rendering):** Tüm sayfalar sunucuda tam HTML olarak oluşturulur, arama motoru botları (Googlebot, YandexBot) sayfayı JavaScript çalıştırma gecikmesi olmaksızın eksiksiz okur.
* **Canonical URL'ler:** Her sayfada yinelenen içerik (duplicate content) riskini sıfıra indiren mutlak ve temiz canonical linkler tanımlanmıştır.
* **Schema.org Yapılandırılmış Veriler:**
  - `HomeAndConstructionBusiness` (Ana Sayfa & İletişim)
  - `Service` (Hizmet sayfaları)
  - `CreativeWork` (Proje detay sayfaları)
  - `BreadcrumbList` (Tüm alt sayfalar)
* **Semantik H1 Hiyerarşisi:** Her sayfada yalnızca 1 adet hedeflenmiş `<h1>` başlığı bulunur.
* **Görsel Optimizasyonu:** `width`, `height`, `loading="lazy"`, `decoding="async"` ve LCP adayında `fetchpriority="high"` ile Cumulative Layout Shift (CLS) ve LCP optimize edilmiştir.
* **İç Bağlantı (Internal Linking):** Hizmetler ile o hizmeti kapsayan projeler arasında çift yönlü semantik bağlantılar kurulmuştur.

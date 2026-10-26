# ATALAYLAR DEKORASYON — VERİ SAKLAMA, İMHA VE GİZLİLİK POLİTİKASI (DATA RETENTION POLICY)

Bu doküman, Atalaylar Dekorasyon web uygulaması üzerinden toplanan teklif ve keşif taleplerinin (KVKK ve GDPR ilkeleri doğrultusunda) nasıl saklandığını, yetkilendirmesini ve imha sürecini tanımlar.

---

## 1. Toplanan Kişisel Veriler ve Kapsam

Teklif ve keşif formu (`quote_requests` tablosu) üzerinden yalnızca hizmetin ifası için gerekli olan asgari veriler toplanır:

| Veri Alanı | Veri Türü | Amaç | Zorunluluk |
| :--- | :--- | :--- | :--- |
| `full_name` | Kimlik | Ziyaretçiye hitap ve keşif randevusu | Zorunlu |
| `phone` | İletişim | Randevu saati teyidi ve keşif koordinasyonu | Zorunlu |
| `district` | Lokasyon | İzmir içi keşif ekibinin yönlendirilmesi | Zorunlu |
| `service_slug` / `service_id` | Hizmet Bilgisi | Doğru usta/uzman ekibin atanması | Zorunlu |
| `notes` | Proje Açıklaması | İşin kapsamı, bina katı veya özel istekler | İsteğe Bağlı |
| `attachment_urls` | Medya | Tavan/cephe hasar durumu ön teşhisi | İsteğe Bağlı |
| `ip_hash` | Güvenlik / Log | Rate limiting ve spam önleme (SHA-256 hash) | Otomatik |

> [!NOTE]
> Ziyaretçinin açık IP adresi kaydedilmez; gizlilik gereği tek yönlü SHA-256 özeti (`ip_hash`) saklanır.

---

## 2. Satır Düzeyi Güvenlik (Row-Level Security - RLS)

Veritabanında toplanan talepler kamuya açık **değildir**.
- **Anonim / Genel Ziyaretçiler:** Yalnızca yeni teklif talebi ekleyebilir (`INSERT WITH CHECK status = 'new'`).
- **Okuma / Listeleme Yetkisi (`SELECT`):** Anonim kullanıcılara kapalıdır. Yalnızca kimliği doğrulanmış yönetici rolündeki hesaplar (`is_admin_user() = true`) okuyabilir.
- **Medya Dosyaları (`quote-attachments` Bucket):** Müşterilerin yüklediği ortam fotoğrafları private bucket altında saklanır. Yalnızca yöneticiler tarafından görüntülenebilir.

---

## 3. Saklama Süreleri (Retention Schedule)

| Talep Durumu | Saklama Süresi | İmha / Anonimleştirme Yöntemi |
| :--- | :--- | :--- |
| **Sonuçlanmayan / İptal Edilen Talepler** (`cancelled`, `new` yanıtsız) | 1 Yıl (365 Gün) | Otomatik silme veya telefon/isim maskeleme |
| **Tamamlanan / İşe Dönüşen Talepler** (`completed`) | 10 Yıl (Yasal Zamanaşımı) | Türk Borçlar Kanunu ve VUK gereği fatura/sözleşme yasal süresi sonuna kadar saklanır |
| **Yüklenen Keşif Fotoğrafları** (`quote-attachments`) | 6 Ay | Keşif ve iş tesliminin ardından otomatik temizlenir |

---

## 4. Veri İmha ve Silme Yordamı (SQL Cleanup Routine)

Supabase veritabanında belirli aralıklarla çalıştırılabilen veya `pg_cron` eklentisiyle zamanlanabilen imha yordamı:

```sql
-- 1 yıldan eski ve sonuçlanmamış talepleri temizleme yordamı
CREATE OR REPLACE FUNCTION public.cleanup_expired_quote_requests()
RETURNS void AS $$
BEGIN
    -- 1 yılı geçen ve işe dönüşmemiş talepleri sil
    DELETE FROM public.quote_requests
    WHERE status IN ('cancelled', 'new')
      AND created_at < NOW() - INTERVAL '1 year';

    -- 2 yılı geçen tamamlanmış taleplerin isim ve telefonunu anonimleştir
    UPDATE public.quote_requests
    SET full_name = 'Anonim Talep',
        phone = '+900000000000',
        notes = '[Süre aşımı nedeniyle temizlendi]',
        attachment_urls = '[]'::jsonb
    WHERE status = 'completed'
      AND created_at < NOW() - INTERVAL '2 years';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. İlgili Kişi Hakları ve İletişim

KVKK 11. maddesi ve ilgili mevzuat uyarınca; verilerinin silinmesini veya düzeltilmesini talep eden ziyaretçiler, işletmenin merkezi iletişim kanalı olan `info@atalaylardekarasyon.com` adresine yazılı bildirimde bulunabilir. Talepler en geç 30 gün içerisinde yerine getirilir.

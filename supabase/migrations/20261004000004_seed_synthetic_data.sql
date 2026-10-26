-- ====================================================================
-- ATALAYLAR DEKORASYON — SENTETİK TEST VERİLERİ (SEED DATA)
-- Migration: 20261004000004_seed_synthetic_data.sql
-- ====================================================================

-- 1. HİZMETLER SEED
INSERT INTO public.services (
  slug, title, subtitle, short_description, description, scope, process_steps, technical_standards, icon_name, cover_image_url, features, is_active, display_order
) VALUES
(
  'alci-uygulamalari',
  'Alçı Uygulamaları',
  'Asma Tavan, Gizli Işık Bandı ve Alçıpan Bölme Duvar Sistemleri',
  'İzmir genelinde asma tavan, LED gizli aydınlatma bantları, kartonpiyer, bölme duvar ve saten alçı yüzey düzeltme hizmetleri.',
  'Atalaylar Dekorasyon olarak konut, ofis ve ticari mekanlarınızda modern mimari trendlere uygun alçıpan ve alçı çözümleri üretiyoruz.',
  '["Alçıpan asma tavan ve modüler tavan sistemleri", "LED ve spot uyumlu gizli ışık havuzu", "Ses ve ısı yalıtımlı bölme duvar", "Saten alçı perdahı"]'::jsonb,
  '[{"title": "1. Lazer Ölçüm", "description": "Lazer terazi ile kot ve gönye tespiti."}, {"title": "2. Karkas Montajı", "description": "Galvaniz profillerin sabitlenmesi."}]'::jsonb,
  '["TSE belgeli alçıpan paneller", "0.50 mm galvaniz profil karkas"]'::jsonb,
  'Layers',
  '/images/hero-decoration.jpg',
  '["Lazer Terazili Montaj", "Neme Dayanıklı Yeşil Plaka", "Çatlamaz Derz Filesi"]'::jsonb,
  true,
  1
),
(
  'ic-cephe-boya',
  'İç Cephe Boya',
  'Silinebilir Su Bazlı Boyalar, İtalyan Efekt ve Dekoratif Uygulamalar',
  'İzmir genelinde ev ve iş yerleri için silinebilir antibakteriyel boyalar, tavan boyası, İtalyan mermer efekt ve dekoratif boya işçiliği.',
  'İç mekan boya işçiliği sadece duvara renk vermek değil, zemin hazırlığı ve kusursuz yüzey oluşturma sanatıdır.',
  '["Eşyaların kalın naylonla maskelenmesi", "Çatlak tamiri ve astar uygulaması", "En az 2 kat silinebilir boya"]'::jsonb,
  '[{"title": "1. Maskeleme", "description": "Zemin ve mobilyaların korunması."}, {"title": "2. Boya", "description": "İki kat boya uygulaması."}]'::jsonb,
  '["VOC oranı düşük kokusuz boyalar", "Teflon katkılı silinebilir yüzey"]'::jsonb,
  'Paintbrush',
  '/images/hero-decoration.jpg',
  '["Mobilya Maskeleme Koruması", "Silinebilir Marka Boyalar", "İtalyan Efekt Dokular"]'::jsonb,
  true,
  2
),
(
  'cati-izolasyonu',
  'Çatı İzolasyonu',
  'Kiremit Altı Membran, Shingle, Sandviç Panel ve Gizli Dere Yalıtımı',
  'İzmir’de su sızdıran çatılara kesin çözüm: Kiremit aktarma, arduvazlı membran kaplama, shingle, oluk tamiratı ve ısı yalıtımlı çatı izolasyonu.',
  'Yağmur mevsiminde evlerin en büyük kabusu olan tavan akıntıları ve çatı sızıntılarını kalıcı olarak çözüyoruz.',
  '["Kiremit aktarma ve kırıkların yenilenmesi", "OSB üzeri polyester keçeli membran kaynağı", "Baca dibi ve dere izolasyonu"]'::jsonb,
  '[{"title": "1. Eğim Kontrolü", "description": "Çatı meyli ve karkas incelemesi."}, {"title": "2. Membran Kaynağı", "description": "Şaloma aleviyle yapıştırma."}]'::jsonb,
  '["-20°C dayanımlı APP modifiyeli bitümlü membran", "Polyester keçe taşıyıcı"]'::jsonb,
  'Home',
  '/images/project-facade.jpg',
  '["Şaloma Kaynaklı Çift Kat Membran", "Baca Dibi Kilitlemesi", "Sözleşmeli Su Sızdırmazlık"]'::jsonb,
  true,
  5
)
ON CONFLICT (slug) DO NOTHING;

-- 2. PROJELER SEED (AÇIKÇA IS_DEMO=TRUE OLARAK İŞARETLİ)
INSERT INTO public.projects (
  slug, title, service_slug, service_title, category, location, completion_duration, completion_date, before_image_url, after_image_url, summary, details, materials_used, is_featured, is_published, is_demo, display_order
) VALUES
(
  'karsiyaka-salon-asma-tavan-dekorasyon',
  'Karşıyaka Salon Asma Tavan ve Gizli Işık Tasarımı',
  'alci-uygulamalari',
  'Alçı Uygulamaları',
  'alci',
  'Karşıyaka / İzmir',
  '5 İş Günü',
  '2026-08-15',
  '/images/hero-decoration.jpg',
  '/images/hero-decoration.jpg',
  'Karşıyaka’da 45 m² salon için modern geometrik asma tavan, gizli LED ışık bantları ve saten alçı duvar perdahı çalışması.',
  'Lazer terazi ile kot ve gönye dengelenerek 0.50 mm galvaniz karkas üzerine neme dayanıklı alçıpan paneller vidalandı.',
  '["Knauf / Dalsan Standart Beyaz Alçıpan (12.5 mm)", "0.50 mm Galvaniz C/U Profili", "Filli Boya Tavan Boyası"]'::jsonb,
  true,
  true,
  true,
  1
),
(
  'urla-villa-cati-izolasyonu-mantolama',
  'Urla Müstakil Villa Çatı İzolasyonu ve Dış Mantolama',
  'cati-izolasyonu',
  'Çatı İzolasyonu & Dış Cephe',
  'cati',
  'Urla / İzmir',
  '14 İş Günü',
  '2026-07-20',
  '/images/hero-decoration.jpg',
  '/images/project-facade.jpg',
  'Urla’da şiddetli rüzgar ve yağmurda su alan müstakil villanın çatı aktarımı ve dış cephe mantolaması.',
  'Kiremitler kaldırılarak 4 mm polyester keçeli membran kaynatıldı, cepheye 5 cm taşyünü mantolama uygulandı.',
  '["4 mm Polyester Keçeli Bitümlü Membran", "5 cm 150 Yoğunluk Taşyünü", "Jotun Dış Cephe Boyası"]'::jsonb,
  true,
  true,
  true,
  2
)
ON CONFLICT (slug) DO NOTHING;

-- 3. TESTİMONİALS SEED (Sentetik onaylı test yorumları)
INSERT INTO public.testimonials (
  client_name, district, service_title, comment, rating, is_approved, display_order
) VALUES
(
  'M. Y****',
  'Karşıyaka / İzmir',
  'Asma Tavan & Boya',
  'Salonumuzdaki tavan çatlakları ve eski tavanı komple alçıpan gizli ışık havuzuna dönüştürdüler. Zamanında ve temiz teslim ettiler.',
  5,
  true,
  1
),
(
  'A. K****',
  'Urla / İzmir',
  'Çatı İzolasyonu',
  'Kış aylarında tavanımızdan akan su sızıntısını membran ve kiremit aktarmayla tamamen kestiler. İlgi ve ustalıkları için teşekkürler.',
  5,
  true,
  2
)
ON CONFLICT DO NOTHING;

-- 4. SİTE AYARLARI SEED
INSERT INTO public.site_settings (key, value, description)
VALUES
(
  'contact_info',
  '{"phone": "+905320000000", "whatsapp": "905320000000", "email": "info@atalaylardekarasyon.com", "city": "İzmir", "address": "İzmir / Türkiye", "working_hours": "Pazartesi - Cumartesi: 08:30 - 19:30"}'::jsonb,
  'İşletme iletişim ve çalışma bilgileri'
),
(
  'announcement',
  '{"active": true, "text": "İzmir genelinde ücretsiz keşif fırsatından yararlanmak için hemen arayın."}'::jsonb,
  'Üst duyuru bandı ayarları'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

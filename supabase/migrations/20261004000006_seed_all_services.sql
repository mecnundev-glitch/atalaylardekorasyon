-- ====================================================================
-- ATALAYLAR DEKORASYON — TÜM HİZMETLERİN VERİTABANINA EKLENMESİ
-- Migration: 20261004000006_seed_all_services.sql
-- ====================================================================

INSERT INTO public.services (
  slug, title, subtitle, short_description, description, scope, process_steps, technical_standards, icon_name, cover_image_url, features, is_active, display_order
) VALUES
(
  'dis-cephe-boya',
  'Dış Cephe Boya',
  'Zorlu Hava Koşullarına Dayanıklı Silikonlu ve Akrilik Cephe Boyaları',
  'İzmir’in güneşi, nemi ve deniz tuzuna dayanıklı silikonlu dış cephe boyası, çatlak köprüleme ve iskeleli profesyonel cephe yenileme.',
  'İzmir ve Ege sahil kuşağındaki binalar; yüksek UV ışınları, deniz tuzu, nem ve kış rüzgarları nedeniyle dış cephe yıpranmasına maruz kalır. Atalaylar Dekorasyon olarak binaların dış cephesindeki sıva çatlaklarını ve su alan noktaları onarıyor; su itici silikonlu, elastik ve nefes alan yüksek korumalı dış cephe boyalarıyla binanızı hem güzelleştiriyor hem de dış etkenlere karşı koruyoruz.',
  '["Bina çevresine güvenlikli çelik iskele kurulumu", "Eski kabarmış sıva ve boyaların temizliği", "Çatlakların elastik tamir harçlarıyla doldurulması", "Silikonlu dış cephe astarı ve 2 kat boya uygulaması"]'::jsonb,
  '[{"title": "1. İskele & Güvenlik", "description": "İSG standartlarında çelik iskele kurulumu."}, {"title": "2. Yıkama & Tamirat", "description": "Basınçlı suyla temizlik ve çatlak onarımı."}]'::jsonb,
  '["Su itici hidrofobik silikon teknolojisi", "UV direnci ve renk stabilitesi"]'::jsonb,
  'Building',
  '/images/project-facade.jpg',
  '["Su İtici Silikon Teknolojisi", "Güneş ve Neme Karşı UV Direnci", "Güvenlikli İskeleli Profesyonel Kadro"]'::jsonb,
  true,
  3
),
(
  'siva-ve-duvar-uygulamalari',
  'Sıva ve Duvar Uygulamaları',
  'Kara Sıva, Alçı Sıva, Çatı & Duvar Tamiratı ve Dekoratif Kaplamalar',
  'Kaba inşaat kara sıva, pürüzsüz makineli ve el alçı sıva, kültür taşı, dekoratif tuğla kaplama ve duvar örme ustalık hizmetleri.',
  'Dayanıklı ve düzgün bir yapının temeli doğru sıva uygulamasından geçer. Atalaylar Dekorasyon olarak terazi ve mastar gönyesinde kara sıva, pürüzsüz alçı sıva, dış cephe kaba-ince sıva ve dekoratif taş duvar kaplama hizmetleri veriyoruz.',
  '["Tuğla üzeri terazi ve mastarında kara sıva", "İç mekanlarda pürüzsüz alçı sıva", "Rutubetli duvarlarda rehabilitasyon ve sıva yenileme", "Tuğla ve gazbeton duvar örme"]'::jsonb,
  '[{"title": "1. Hazırlık", "description": "Yüzey temizliği ve serpme harç."}, {"title": "2. Ano Çıtaları", "description": "Lazer terazi ile mastar kotu."}]'::jsonb,
  '["TSE EN 998-1 hazır ve geleneksel sıva harçları", "Köşe çatlamalarını engelleyen profiller"]'::jsonb,
  'Hammer',
  '/images/project-facade.jpg',
  '["Mastar ve Lazer Terazili Düzlemsellik", "Fileli Köşe Profili Desteği", "Dekoratif Taş ve Tuğla Seçenekleri"]'::jsonb,
  true,
  4
),
(
  'su-yalitimi',
  'Su Yalıtımı',
  'Temel Bohçalama, Perde Beton, Teras, Balkon ve Islak Hacim İzolasyonu',
  'Yapılarınızı korozyondan ve nemden koruyan çimento/poliüretan esaslı teras, balkon, temel ve banyo su yalıtım çözümleri.',
  'Su sızıntısı binaların taşıyıcı demir donatısını paslandırarak deprem güvenliğini ciddi biçimde tehdit eder. Atalaylar Dekorasyon olarak İzmir genelinde teraslardan alt kata su akması, temelden yükselen rutubet, banyo/duş gideri sızıntıları gibi kritik sorunlara profesyonel kimyasal ve membranlı su yalıtım sistemleri uyguluyoruz.',
  '["Açık teras ve balkonlarda elastik su izolasyonu", "Bina temelleri ve perde betonlarda bohçalama", "Banyo ve ıslak hacimlerde pah bantlı su yalıtımı", "Asansör kuyusu ve bodrum kat izolasyonu"]'::jsonb,
  '[{"title": "1. Teşhis", "description": "Nem ve hasar tespiti."}, {"title": "2. Pah ve Astar", "description": "Köşelere pah çekimi ve astar."}, {"title": "3. Çift Kat Yalıtım", "description": "Elastik yalıtım harcı uygulaması."}]'::jsonb,
  '["EN 14891 ve EN 1504-2 standartlarına uygun çift bileşenli elastik harçlar", "Yüksek çatlak köprüleme kabiliyeti"]'::jsonb,
  'Shield',
  '/images/project-facade.jpg',
  '["Pah Bantlı Köşe Güçlendirmesi", "24 Saat Su Doldurma Testi", "Temel ve Perde Betonda Tam Koruma"]'::jsonb,
  true,
  6
),
(
  'isi-yalitimi',
  'Isı Yalıtımı (Mantolama)',
  'Dış Cephe Taşyünü ve Karbonlu EPS ile %50’ye Varan Enerji Tasarrufu',
  'İzmir’de yazın serin, kışın sıcak evler için TSE belgeli taşyünü ve EPS mantolama, küf/yoğuşma önleme ve dış cephe yenileme.',
  'Doğru yapılan bir dış cephe ısı yalıtımı (mantolama), klima ve doğalgaz faturalarınızı %40 ila %50 oranında düşürürken evinizin değerini artırır. Atalaylar Dekorasyon olarak İzmir’in sıcak yazlarında serinliği koruyan, kışın ise duvarlardaki soğuk hava köprülerini ve nem/küf oluşumunu engelleyen mantolama sistemleri kuruyoruz.',
  '["Bina cephesine uygun taşyünü veya karbonlu EPS seçimi", "Subasman profili montajı", "Geniş başlıklı dübelleme ve fileli sıva", "Dekoratif mineral sıva ve dış cephe boyası"]'::jsonb,
  '[{"title": "1. Analiz", "description": "Cephe incelemesi ve kalınlık hesabı."}, {"title": "2. Yapıştırma & Dübel", "description": "Levha yapıştırma ve mekanik sabitleme."}]'::jsonb,
  '["TS 825 standartlarına uygun paket sistem", "Yangına karşı A1 sınıfı yanmazlık seçeneği"]'::jsonb,
  'Flame',
  '/images/project-facade.jpg',
  '["%50’ye Varan Fatura Tasarrufu", "A1 Sınıfı Yanmaz Taşyünü Seçeneği", "Duvar İçi Rutubet ve Küfe Son"]'::jsonb,
  true,
  7
),
(
  'dekorasyon-ve-tadilat',
  'Dekorasyon ve Tadilat',
  'Komple Ev, Ofis ve Mutfak/Banyo Anahtar Teslim Yenileme',
  'İzmir genelinde elektrik, su tesisatı, seramik, alçı, boya ve zemin kaplama dahil anahtar teslim komple tadilat ve mimari dekorasyon.',
  'Ev veya ofis yenilemek yorucu ve karmaşık bir süreç olmak zorunda değil. Atalaylar Dekorasyon olarak tesisat ustası, alçıcı, boyacı, seramikçi ayrı ayrı arama derdini ortadan kaldırıyoruz. Projenizi tek elden, sözleşmeli ve taahhüt edilen tarihte teslim ediyoruz.',
  '["Mevcut seramik ve duvarların kırılarak molozların atılması", "Sıhhi ve elektrik tesisat altyapısının yenilenmesi", "Banyo ve mutfak seramik kaplama işçiliği", "Asma tavan, alçıpan ve iç mekan boyası"]'::jsonb,
  '[{"title": "1. Keşif & Proje", "description": "İhtiyaç listesi ve yerinde lazer ölçüm."}, {"title": "2. Altyapı & Tesisat", "description": "Elektrik ve su hatlarının yenilenmesi."}, {"title": "3. İnce İşçilik & Teslim", "description": "Seramik, alçı ve boya ile anahtar teslim."}]'::jsonb,
  '["TSE belgeli altyapı malzemeleri", "Lazer terazi ile sıfır hatalı uygulama", "Sözleşmeli teslimat takvimi"]'::jsonb,
  'Palette',
  '/images/hero-decoration.jpg',
  '["Tek Elden Proje Yönetimi", "Tesisat, Seramik, Alçı ve Boya Bir Arada", "Sözleşmeli ve Zamanında Teslimat"]'::jsonb,
  true,
  8
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  scope = EXCLUDED.scope,
  technical_standards = EXCLUDED.technical_standards,
  features = EXCLUDED.features,
  display_order = EXCLUDED.display_order;

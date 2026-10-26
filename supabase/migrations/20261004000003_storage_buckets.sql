-- ====================================================================
-- ATALAYLAR DEKORASYON — STORAGE BUCKET VE ERİŞİM POLİTİKALARI
-- Migration: 20261004000003_storage_buckets.sql
-- ====================================================================

-- 1. BUCKET TANIMLARI
-- project-media: Herkese açık galeri ve hizmet görselleri
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-media',
  'project-media',
  true,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- quote-attachments: Müşteri keşif fotoğrafları (KESİNLİKLE GİZLİ / PRIVATE)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-attachments',
  'quote-attachments',
  false,
  10485760, -- 10 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

-- ====================================================================
-- 2. STORAGE POLİTİKALARI: project-media
-- ====================================================================
-- Herkes okuyabilir (CDN hızlı dağıtım)
CREATE POLICY "Public can view project media"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-media');

-- Yalnızca yöneticiler medya yükleyebilir
CREATE POLICY "Admins can upload project media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-media'
  AND public.is_admin_user()
);

-- Yalnızca yöneticiler silebilir veya güncelleyebilir
CREATE POLICY "Admins can modify or delete project media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-media' AND public.is_admin_user());

CREATE POLICY "Admins can delete project media"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-media' AND public.is_admin_user());

-- ====================================================================
-- 3. STORAGE POLİTİKALARI: quote-attachments (GİZLİLİK ODAKLI)
-- ====================================================================
-- Formu dolduran ziyaretçiler fotoğraf/belge yükleyebilir
CREATE POLICY "Public can upload quote attachments"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'quote-attachments'
);

-- Yüklenen fotoğrafları SADECE yetkili adminler görüntüleyebilir ve indirebilir
CREATE POLICY "Only admins can view quote attachments"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'quote-attachments'
  AND public.is_admin_user()
);

-- Yalnızca yöneticiler silebilir
CREATE POLICY "Only admins can delete quote attachments"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'quote-attachments'
  AND public.is_admin_user()
);

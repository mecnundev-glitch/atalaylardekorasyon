-- ====================================================================
-- ATALAYLAR DEKORASYON — ROW LEVEL SECURITY (RLS) POLİTİKALARI
-- Migration: 20261004000002_rls_policies.sql
-- ====================================================================

-- 1. Yetki Doğrulama Fonksiyonu (is_admin_user)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- Service role doğrudan tam yetkilidir
  IF (auth.jwt() ->> 'role' = 'service_role') THEN
    RETURN true;
  END IF;

  -- JWT app_metadata kontrolü
  IF (auth.jwt() -> 'app_metadata' ->> 'role' IN ('admin', 'superadmin')) THEN
    RETURN true;
  END IF;

  -- admin_profiles tablosu üzerinden aktif kullanıcı kontrolü
  IF auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND is_active = true
  ) THEN
    RETURN true;
  END IF;

  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. TÜM TABLOLARDA RLS'Yİ ETKİNLEŞTİR
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- 3. POLİTİKALAR: services
-- ====================================================================
-- Ziyaretçiler: Yalnızca aktif hizmetleri okuyabilir
CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
USING (is_active = true);

-- Yöneticiler: Tüm hizmetleri görebilir, ekleyebilir, güncelleyebilir ve silebilir
CREATE POLICY "Admins have full access to services"
ON public.services FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- ====================================================================
-- 4. POLİTİKALAR: projects
-- ====================================================================
-- Ziyaretçiler: Yalnızca yayında olan projeleri okuyabilir
CREATE POLICY "Public can view published projects"
ON public.projects FOR SELECT
USING (is_published = true);

-- Yöneticiler: Tüm projelere tam erişim
CREATE POLICY "Admins have full access to projects"
ON public.projects FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- ====================================================================
-- 5. POLİTİKALAR: project_images
-- ====================================================================
-- Ziyaretçiler: Yalnızca yayındaki projelerin görsellerini okuyabilir
CREATE POLICY "Public can view project images"
ON public.project_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = project_images.project_id AND projects.is_published = true
  )
);

-- Yöneticiler: Proje görsellerine tam erişim
CREATE POLICY "Admins have full access to project images"
ON public.project_images FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- ====================================================================
-- 6. POLİTİKALAR: testimonials
-- ====================================================================
-- Ziyaretçiler: Yalnızca onaylanmış müşteri yorumlarını okuyabilir
CREATE POLICY "Public can view approved testimonials"
ON public.testimonials FOR SELECT
USING (is_approved = true);

-- Ziyaretçiler: Yorum gönderebilir (ancak kesinlikle is_approved=false olmak zorunda)
CREATE POLICY "Public can insert pending testimonials"
ON public.testimonials FOR INSERT
WITH CHECK (is_approved = false);

-- Yöneticiler: Yorumlara tam erişim (onaylama, düzenleme, silme)
CREATE POLICY "Admins have full access to testimonials"
ON public.testimonials FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- ====================================================================
-- 7. POLİTİKALAR: quote_requests (ÖNEMLİ: KİŞİSEL VERİ GÜVENLİĞİ)
-- ====================================================================
-- Anonim ziyaretçiler: Form üzerinden teklif talebi ekleyebilir (status varsayılan 'new')
CREATE POLICY "Public can insert quote request"
ON public.quote_requests FOR INSERT
WITH CHECK (status = 'new');

-- Anonim/yetkisiz kullanıcıların teklifleri okuması KESİNLİKLE ENGELLENMİŞTİR!
-- (SELECT politikası sadece adminler için tanımlanır)
CREATE POLICY "Admins can view and manage quote requests"
ON public.quote_requests FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- ====================================================================
-- 8. POLİTİKALAR: site_settings
-- ====================================================================
-- Ziyaretçiler: Genel ayarları okuyabilir
CREATE POLICY "Public can view site settings"
ON public.site_settings FOR SELECT
USING (true);

-- Yöneticiler: Ayarları güncelleyebilir ve ekleyebilir
CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- ====================================================================
-- 9. POLİTİKALAR: admin_profiles
-- ====================================================================
-- Giriş yapan yönetici kendi profilini okuyabilir
CREATE POLICY "Users can view own admin profile"
ON public.admin_profiles FOR SELECT
USING (auth.uid() = id);

-- Yöneticiler profilleri yönetebilir
CREATE POLICY "Admins can manage admin profiles"
ON public.admin_profiles FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- ====================================================================
-- ATALAYLAR DEKORASYON — VERİTABANI ŞEMASI (PostgreSQL / Supabase)
-- Migration: 20261004000001_initial_schema.sql
-- ====================================================================

-- 1. Eklentiler
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Otomatik updated_at güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. HİZMETLER TABLOSU (services)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    scope JSONB DEFAULT '[]'::jsonb NOT NULL,
    process_steps JSONB DEFAULT '[]'::jsonb NOT NULL,
    technical_standards JSONB DEFAULT '[]'::jsonb NOT NULL,
    icon_name VARCHAR(50) DEFAULT 'Layers' NOT NULL,
    cover_image_url TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb NOT NULL,
    faqs JSONB DEFAULT '[]'::jsonb,
    related_slugs JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active_order ON public.services(is_active, display_order);

CREATE TRIGGER trg_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. PROJELER VE PORTFÖY TABLOSU (projects)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_slug VARCHAR(100) NOT NULL,
    service_title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('alci', 'boya', 'siva', 'cati', 'yalitim', 'tadilat')),
    location VARCHAR(120) NOT NULL, -- Örn: "Karşıyaka / İzmir"
    completion_duration VARCHAR(60) NOT NULL, -- Örn: "5 İş Günü"
    completion_date DATE,
    before_image_url TEXT,
    after_image_url TEXT NOT NULL,
    summary TEXT NOT NULL,
    details TEXT NOT NULL,
    materials_used JSONB DEFAULT '[]'::jsonb NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    is_demo BOOLEAN DEFAULT false NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category_pub ON public.projects(category, is_published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured) WHERE is_featured = true;

CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. PROJE GALERİ GÖRSELLERİ TABLOSU (project_images)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    image_type VARCHAR(30) DEFAULT 'gallery' CHECK (image_type IN ('gallery', 'before', 'after')),
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id, display_order);

-- 5. MÜŞTERİ YORUMLARI TABLOSU (testimonials)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL, -- Örn: "Bornova / İzmir"
    service_title VARCHAR(120) NOT NULL,
    comment TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    is_approved BOOLEAN DEFAULT false NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(is_approved, display_order);

-- 6. TEKLİF VE KEŞİF TALEPLERİ (quote_requests)
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    district VARCHAR(100) NOT NULL, -- İzmir ilçesi
    service_slug VARCHAR(100),
    estimated_area INT CHECK (estimated_area IS NULL OR estimated_area >= 0),
    notes TEXT,
    attachment_urls JSONB DEFAULT '[]'::jsonb NOT NULL,
    status VARCHAR(30) DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
    ip_hash VARCHAR(64), -- Gizlilik odaklı SHA-256 IP özeti
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_status_created ON public.quote_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_phone ON public.quote_requests(phone);

CREATE TRIGGER trg_quote_requests_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. MERKEZİ SİTE AYARLARI TABLOSU (site_settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(60) PRIMARY KEY,
    value JSONB NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER trg_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. YÖNETİCİ PROFİLLERİ (admin_profiles)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role VARCHAR(30) DEFAULT 'admin' NOT NULL CHECK (role IN ('superadmin', 'admin', 'editor')),
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER trg_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

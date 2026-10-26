-- ====================================================================
-- ATALAYLAR DEKORASYON — TEKLİF FORMU VE HİZMET İLİŞKİSİ
-- Migration: 20261004000005_quote_requests_service_relation.sql
-- ====================================================================

ALTER TABLE public.quote_requests
ADD COLUMN IF NOT EXISTS service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS service_title VARCHAR(150);

CREATE INDEX IF NOT EXISTS idx_quote_requests_service_id ON public.quote_requests(service_id);

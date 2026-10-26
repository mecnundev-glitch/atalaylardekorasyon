<template>
  <div class="min-h-screen bg-brand-black text-slate-200">
    <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <AppBreadcrumb
        :items="[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Yasal' },
          { label: 'Gizlilik Politikası' }
        ]"
        class="mb-6"
      />

      <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <AppBadge variant="gold" size="sm" dot class="mb-4">
          Gizlilik ve Güvenlik
        </AppBadge>

        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Gizlilik Politikası
        </h1>

        <p class="mt-2 text-xs text-slate-400">
          Son Güncelleme: 04 Ekim 2026
        </p>

        <div class="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              1. Genel Bilgilendirme
            </h2>
            <p>
              Atalaylar Dekorasyon olarak web sitemizi ziyaret eden kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. Bu metin, siteyi kullanımınız sırasında hangi bilgilerin toplandığını ve nasıl korunduğunu açıklar.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              2. Teklif ve İletişim Bilgileri
            </h2>
            <p>
              Sitemizdeki teklif formu veya doğrudan iletişim kanalları (telefon, WhatsApp, e-posta) vasıtasıyla ilettiğiniz bilgiler sadece talep ettiğiniz keşif ve dekorasyon hizmetlerinin planlanması amacıyla kullanılır. Verileriniz üçüncü şahıslara satılmaz ve pazarlama amacıyla üçüncü partilere aktarılmaz.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              3. Veri Güvenliği Standartları
            </h2>
            <p>
              Web sitemiz üzerinden iletilen tüm veriler SSL (HTTPS) şifreleme sertifikası ile korunur. Veritabanımızda Satır Düzeyi Güvenlik (Row-Level Security) kuralları aktiftir; yetkisiz kişilerin ziyaretçi bilgilerine erişmesi teknik olarak engellenmiştir.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              4. İletişim
            </h2>
            <p>
              Gizlilik politikamız ile ilgili her türlü soru ve talebiniz için <a :href="`mailto:${config.contact.email}`" class="text-brand-gold hover:underline">{{ config.contact.email }}</a> adresimizden bize ulaşabilirsiniz.
            </p>
          </section>
        </div>

        <div class="mt-8 border-t border-brand-anthracite-border pt-6">
          <AppButton to="/" variant="secondary" size="sm">
            ← Ana Sayfaya Dön
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { config } = useSiteConfig()

useAppSeo({
  title: 'Gizlilik Politikası | Atalaylar Dekorasyon',
  description: 'Atalaylar Dekorasyon gizlilik ve veri güvenliği politikaları hakkında bilgilendirme.',
  path: '/yasal/gizlilik-politikasi',
  jsonLd: buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Yasal', path: '/yasal/gizlilik-politikasi' },
    { name: 'Gizlilik Politikası', path: '/yasal/gizlilik-politikasi' }
  ])
})
</script>

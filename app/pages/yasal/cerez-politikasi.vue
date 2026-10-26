<template>
  <div class="min-h-screen bg-brand-black text-slate-200">
    <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <AppBreadcrumb
        :items="[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Yasal' },
          { label: 'Çerez Politikası' }
        ]"
        class="mb-6"
      />

      <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <AppBadge variant="gold" size="sm" dot class="mb-4">
          Çerez ve Takip Teknolojileri
        </AppBadge>

        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Çerez (Cookie) Politikası
        </h1>

        <p class="mt-2 text-xs text-slate-400">
          Son Güncelleme: 04 Ekim 2026
        </p>

        <div class="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              1. Çerez Nedir?
            </h2>
            <p>
              Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Sitenin güvenli çalışması, form güvenliği ve temel kullanıcı deneyiminin sağlanması için kullanılır.
            </p>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              2. Sitemizde Kullanılan Çerez Türleri
            </h2>
            <ul class="list-disc list-inside mt-2 space-y-2 text-slate-400">
              <li>
                <strong class="text-white">Zorunlu ve Güvenlik Çerezleri:</strong> Teklif formlarının spam botlarına karşı korunması, CSRF saldırılarının önlenmesi ve oturum güvenliği için gereklidir.
              </li>
              <li>
                <strong class="text-white">İşlevsel Çerezler:</strong> Dil tercihi ve form doldurma aşamasındaki geçici durumların korunmasına yardımcı olur.
              </li>
            </ul>
          </section>

          <section>
            <h2 class="font-display text-base font-semibold text-white mb-2">
              3. Çerezlerin Yönetimi
            </h2>
            <p>
              İnternet tarayıcınızın ayarlarından dilediğiniz zaman çerezleri silebilir veya engelleyebilirsiniz. Ancak zorunlu güvenlik çerezlerinin kapatılması durumunda teklif formlarının çalışmasında aksaklıklar yaşanabilir.
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

useAppSeo({
  title: 'Çerez Politikası | Atalaylar Dekorasyon',
  description: 'Atalaylar Dekorasyon web sitesi çerez politikası ve çerez yönetim süreçleri.',
  path: '/yasal/cerez-politikasi',
  jsonLd: buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Yasal', path: '/yasal/cerez-politikasi' },
    { name: 'Çerez Politikası', path: '/yasal/cerez-politikasi' }
  ])
})
</script>

<template>
  <div class="min-h-screen bg-brand-black text-slate-100">
    <!-- Header Section -->
    <section class="relative overflow-hidden border-b border-brand-anthracite-border/70 bg-gradient-to-b from-brand-black-soft via-brand-anthracite/60 to-brand-black py-12 sm:py-16">
      <div
        class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb
          :items="[
            { label: 'Ana Sayfa', to: '/' },
            { label: 'İletişim & Keşif' }
          ]"
          class="mb-6"
        />

        <div class="max-w-3xl">
          <AppBadge variant="gold" size="sm" dot class="mb-4">
            Doğrudan İletişim & Keşif Randevusu
          </AppBadge>
          <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Bizimle <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">İletişime Geçin</span>
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            İzmir'in tüm ilçelerinde konut, apartman, villa ve ticari mekan tadilatlarınız için uzman ekibimize telefon, WhatsApp veya teklif formu üzerinden kolayca ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- 4 İletişim Kartı (Telefon, WhatsApp, E-posta, Çalışma Saatleri) -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <!-- Telefon Kartı -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-6 shadow-lg transition-transform hover:-translate-y-1">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
              <Phone class="h-6 w-6" />
            </div>
            <h3 class="mt-4 font-display text-base font-bold text-white">
              Telefonla Arayın
            </h3>
            <p class="mt-1 text-xs text-slate-400">
              Acil keşif talepleri ve doğrudan usta görüşmesi için arayabilirsiniz.
            </p>
            <div class="mt-4">
              <a
                v-if="isPhoneConfigured"
                :href="getPhoneCallUrl()"
                class="inline-flex items-center text-sm font-semibold text-brand-gold hover:underline"
              >
                {{ config.contact.phoneFormatted }}
                <ArrowUpRight class="ml-1 h-4 w-4" />
              </a>
              <span
                v-else
                class="text-xs text-amber-400"
              >
                Numara yapılandırılmamış
              </span>
            </div>
          </div>

          <!-- WhatsApp Kartı -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-6 shadow-lg transition-transform hover:-translate-y-1">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <MessageCircle class="h-6 w-6" />
            </div>
            <h3 class="mt-4 font-display text-base font-bold text-white">
              WhatsApp Keşif Hattı
            </h3>
            <p class="mt-1 text-xs text-slate-400">
              Uygulama yapılacak mekanın fotoğraflarını ve konumunu hemen gönderin.
            </p>
            <div class="mt-4">
              <a
                v-if="isWhatsAppConfigured"
                :href="getWhatsAppUrl('Merhaba Atalaylar Dekorasyon, keşif hakkında bilgi almak istiyorum.')"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm font-semibold text-emerald-400 hover:underline"
              >
                Mesaj Başlat
                <ArrowUpRight class="ml-1 h-4 w-4" />
              </a>
              <span
                v-else
                class="text-xs text-amber-400"
              >
                WhatsApp yapılandırılmamış
              </span>
            </div>
          </div>

          <!-- E-posta Kartı -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-6 shadow-lg transition-transform hover:-translate-y-1">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
              <Mail class="h-6 w-6" />
            </div>
            <h3 class="mt-4 font-display text-base font-bold text-white">
              E-posta ile İletişim
            </h3>
            <p class="mt-1 text-xs text-slate-400">
              Kurumsal projeler, mimari şartnameler ve ihale dosyaları için:
            </p>
            <div class="mt-4">
              <a
                :href="`mailto:${config.contact.email}`"
                class="inline-flex items-center text-sm font-semibold text-sky-400 hover:underline break-all"
              >
                {{ config.contact.email }}
                <ArrowUpRight class="ml-1 h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>

          <!-- Çalışma Saatleri & Bölge -->
          <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-6 shadow-lg transition-transform hover:-translate-y-1">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Clock class="h-6 w-6" />
            </div>
            <h3 class="mt-4 font-display text-base font-bold text-white">
              Çalışma & Keşif Saatleri
            </h3>
            <p class="mt-1 text-xs text-slate-400">
              {{ config.contact.workingHours }}
            </p>
            <p class="mt-3 text-xs text-brand-gold-light">
              Pazar: Randevulu acil keşifler
            </p>
          </div>
        </div>

        <!-- Form ve Bölge Kapsamı Grid -->
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <!-- Form Alanı (8 Col) -->
          <div class="lg:col-span-8">
            <QuoteRequestForm />
          </div>

          <!-- Hizmet Bölgeleri ve Bilgilendirme (4 Col) -->
          <div class="space-y-6 lg:col-span-4">
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl text-left">
              <h3 class="font-display text-base font-bold text-white flex items-center">
                <MapPin class="mr-2 h-5 w-5 text-brand-gold" />
                Hizmet Verdiğimiz İlçeler
              </h3>
              <p class="mt-2 text-xs text-slate-300 leading-relaxed">
                Atalaylar Dekorasyon olarak İzmir'in 30 ilçesine kendi uzman usta kadromuz ve araçlarımızla yerinde keşif hizmeti sunuyoruz.
              </p>

              <div class="mt-4 flex flex-wrap gap-1.5 max-h-64 overflow-y-auto pr-1">
                <span
                  v-for="d in IZMIR_DISTRICTS"
                  :key="d"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-black/60 px-2.5 py-1 text-[11px] text-slate-300"
                >
                  {{ d }}
                </span>
              </div>
            </div>

            <!-- Kurumsal Güvenceler -->
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/40 p-6 text-left space-y-4 text-xs text-slate-300">
              <h4 class="font-display font-bold text-white text-sm">
                Neden Yazılı Keşif?
              </h4>
              <p class="leading-relaxed">
                Dekorasyon ve tadilat işlerinde en çok yaşanan sorun sürpriz ek maliyetlerdir. Yerinde keşif ile metrajınızı lazer terazi ile kesinleştirir, şeffaf malzeme ve işçilik teklifi hazırlarız.
              </p>
              <div class="border-t border-brand-anthracite-border/70 pt-3 flex items-center text-slate-400">
                <ShieldCheck class="mr-2 h-4 w-4 text-brand-gold shrink-0" />
                <span>Sözleşmeli, faturalı ve garantili hizmet.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Phone, MessageCircle, Mail, Clock, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import QuoteRequestForm from '~/components/quote/QuoteRequestForm.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'
import { IZMIR_DISTRICTS } from '~/data/districts'

const { config, isPhoneConfigured, isWhatsAppConfigured, getPhoneCallUrl, getWhatsAppUrl } = useSiteConfig()

useAppSeo({
  title: 'İletişim & Keşif Randevusu | Atalaylar Dekorasyon İzmir',
  description: 'Atalaylar Dekorasyon İzmir ile doğrudan iletişime geçin. Telefon, WhatsApp ve teklif formu üzerinden yerinde ücretsiz keşif randevusu oluşturun.',
  path: '/iletisim',
  image: '/images/hero-decoration.jpg',
  jsonLd: [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: 'Ana Sayfa', path: '/' },
      { name: 'İletişim', path: '/iletisim' }
    ])
  ]
})
</script>

<template>
  <div v-if="district" class="min-h-screen bg-brand-black text-slate-100 text-left">
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
            { label: 'Hizmet Bölgelerimiz', to: '/bolgeler' },
            { label: district.name }
          ]"
          class="mb-6"
        />

        <div class="max-w-3xl">
          <AppBadge variant="gold" size="sm" dot class="mb-4">
            {{ district.heroBadge }}
          </AppBadge>
          <!-- Single semantic H1 for Local SEO -->
          <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            {{ district.title }}
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {{ district.summary }}
          </p>

          <!-- Quick Contact Actions -->
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <a
              v-if="isPhoneConfigured"
              :href="getPhoneCallUrl()"
              class="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-5 py-2.5 text-xs sm:text-sm font-bold text-brand-black shadow-gold-sm hover:bg-brand-gold-light transition-colors"
            >
              <Phone class="h-4 w-4" />
              {{ config.contact.phoneFormatted }}
            </a>
            <a
              v-if="isWhatsAppConfigured"
              :href="getWhatsAppUrl(`Merhaba Atalay Dekorasyon, ${district.name} ilçesindeki mekanım için keşif randevusu almak istiyorum.`)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
            >
              <MessageCircle class="h-4 w-4" />
              WhatsApp Keşif Hattı
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Dispatch & Center Notice Banner -->
    <div class="border-b border-brand-anthracite-border/60 bg-brand-anthracite/50 py-4">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 text-slate-300">
          <MapPin class="h-4 w-4 shrink-0 text-brand-gold" />
          <span><strong>Hizmet Modeli:</strong> Ofisimiz bulunmamakta olup, İzmir genelinde adresinize gelerek yerinde ücretsiz keşif sunuyoruz.</span>
        </div>
        <div class="text-brand-gold-light font-medium">
          {{ district.dispatchNote }}
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <!-- 1. Hizmet Verilen Mahalleler -->
        <div>
          <div class="mb-6">
            <h2 class="font-display text-2xl font-bold text-white">
              {{ district.name }} Genelinde Hizmet Verdiğimiz Mahalleler
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Aşağıdaki tüm mahallelerde kendi araçlarımızla aynı gün ücretsiz yerinde keşif yapıyoruz.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div
              v-for="(n, idx) in district.neighborhoods"
              :key="idx"
              class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2.5 text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
              <span class="truncate">{{ n }}</span>
            </div>
          </div>
        </div>

        <!-- 2. Bölgeye Özgü Yapı & İklim Sorunları ve Çözümlerimiz (Anti-Doorway Core) -->
        <div>
          <div class="mb-6">
            <span class="text-xs uppercase font-semibold tracking-wider text-brand-gold">Teknik Analiz</span>
            <h2 class="font-display text-2xl font-bold text-white mt-1">
              {{ district.name }} Yapı ve İklim Koşullarına Özgü Çözümlerimiz
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Her bölgenin zemin nemi, rüzgar yönü, hava kirliliği ve yapı yaşı farklıdır. Ezbere boya değil, kalıcı teknik çözüm uyguluyoruz.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(issue, idx) in district.regionalIssues"
              :key="idx"
              class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-6 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertCircle class="h-4 w-4" />
                  Bölgesel Sorun
                </div>
                <h3 class="font-display text-base font-bold text-white">
                  {{ issue.title }}
                </h3>
                <p class="mt-2 text-xs text-slate-300 leading-relaxed">
                  {{ issue.problem }}
                </p>
              </div>

              <div class="mt-6 border-t border-brand-anthracite-border/70 pt-4">
                <div class="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <CheckCircle2 class="h-4 w-4" />
                  Mehmet Usta Çözümü
                </div>
                <p class="text-xs text-slate-200 leading-relaxed font-medium">
                  {{ issue.solution }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Bu İlçede En Çok Tercih Edilen Hizmetler -->
        <div>
          <div class="mb-6">
            <h2 class="font-display text-2xl font-bold text-white">
              {{ district.name }} İlçesinde Popüler Hizmetlerimiz
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <NuxtLink
              v-for="(srv, idx) in district.topServices"
              :key="idx"
              :to="`/hizmetlerimiz/${srv.slug}`"
              class="group rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 transition-transform hover:-translate-y-1 hover:border-brand-gold/60"
            >
              <h3 class="font-display text-lg font-bold text-white group-hover:text-brand-gold transition-colors flex items-center justify-between">
                <span>{{ srv.title }}</span>
                <ArrowRight class="h-4 w-4 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-transform" />
              </h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-300">
                {{ srv.description }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <!-- 4. İlçede Yerinde Keşif ve Hizmet Sürecimiz -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/40 p-6 sm:p-8">
          <div class="max-w-3xl space-y-4">
            <span class="text-xs font-semibold text-brand-gold uppercase tracking-wider">Hizmet İşleyişi</span>
            <h3 class="font-display text-2xl font-bold text-white">
              {{ district.name }} İlçesinde Keşif ve Uygulama Nasıl İlerler?
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed">
              Atalay Dekorasyon olarak İzmir genelinde sabit bir müşteri ofisi işletmiyoruz; tüm operasyonumuzu doğrudan adresinize gelerek gezici keşif araçlarımızla yürütüyoruz. {{ district.name }}'deki yapınız için keşif talebinde bulunduğunuzda:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-4">
                <span class="text-xs font-bold text-brand-gold">1. Yerinde İnceleme</span>
                <p class="text-xs text-slate-300 mt-1">Lazer metre ile net alan ölçümü yapılır, yüzeydeki nem, çatlak veya yıpranma tespit edilir.</p>
              </div>
              <div class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-4">
                <span class="text-xs font-bold text-brand-gold">2. Şeffaf Metraj & Teklif</span>
                <p class="text-xs text-slate-300 mt-1">İşçilik kalemleri ve TSE standartlarındaki malzeme markaları belirtilerek yazılı fiyat teklifi sunulur.</p>
              </div>
              <div class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 p-4">
                <span class="text-xs font-bold text-brand-gold">3. Temiz & Planlı Teslim</span>
                <p class="text-xs text-slate-300 mt-1">Belirlenen takvimde uygulama başlatılır, şantiye temizlenerek eksiksiz teslim edilir.</p>
              </div>
            </div>
            <div class="pt-2 flex flex-wrap gap-3">
              <NuxtLink
                to="/fiyat-rehberi"
                class="inline-flex items-center gap-1.5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-200 hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              >
                Fiyat Nasıl Belirlenir?
                <ArrowRight class="h-3.5 w-3.5" />
              </NuxtLink>
              <NuxtLink
                to="/hizmetlerimiz"
                class="inline-flex items-center gap-1.5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-200 hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              >
                Tüm Hizmetlerimizi Gör
                <ArrowRight class="h-3.5 w-3.5" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 5. İlçeye Özel Sıkça Sorulan Sorular -->
        <div>
          <div class="mb-6">
            <h2 class="font-display text-2xl font-bold text-white">
              {{ district.name }} Hakkında Sıkça Sorulan Sorular
            </h2>
          </div>

          <div class="space-y-4">
            <div
              v-for="(faq, fIdx) in district.faqs"
              :key="fIdx"
              class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/60 p-5"
            >
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-brand-gold" />
                {{ faq.question }}
              </h3>
              <p class="mt-2 text-xs text-slate-300 leading-relaxed pl-4">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>

        <!-- 6. Form Alanı -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 sm:p-10">
          <div class="max-w-2xl mb-8">
            <span class="text-xs font-semibold text-brand-gold uppercase tracking-wider">Hemen Başlayın</span>
            <h2 class="font-display text-2xl font-bold text-white mt-1">
              {{ district.name }} Yerinde Ücretsiz Keşif Randevusu Alın
            </h2>
            <p class="text-xs text-slate-300 mt-2">
              Aşağıdaki formu doldurun, Atalay Dekorasyon ekibi aynı gün içinde sizi arasın ve {{ district.name }}'deki adresiniz için yerinde ücretsiz keşif randevusu saati belirleyelim.
            </p>
          </div>

          <QuoteRequestForm :initial-district="district.name" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, createError } from '#app'
import { MapPin, Phone, MessageCircle, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import QuoteRequestForm from '~/components/quote/QuoteRequestForm.vue'
import { getDistrictBySlug } from '~/data/districts-data'
import { useSiteConfig } from '~/composables/useSiteConfig'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const district = computed(() => getDistrictBySlug(slug.value))

if (!district.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Aradığınız ilçe sayfası bulunamadı.'
  })
}

const { config, isPhoneConfigured, isWhatsAppConfigured, getPhoneCallUrl, getWhatsAppUrl } = useSiteConfig()

useAppSeo({
  title: district.value.title,
  description: district.value.metaDescription,
  path: `/bolgeler/${district.value.slug}`,
  image: district.value.sampleProject.image,
  jsonLd: [
    buildDistrictSchema(district.value.name, district.value.neighborhoods),
    buildBreadcrumbSchema([
      { name: 'Ana Sayfa', path: '/' },
      { name: 'Hizmet Bölgelerimiz', path: '/bolgeler' },
      { name: district.value.name, path: `/bolgeler/${district.value.slug}` }
    ])
  ]
})
</script>


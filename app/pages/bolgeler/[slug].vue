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
          <span><strong>Merkez Atölyemiz:</strong> Mevlana Mah. 1776/23 Sok. No:7 Daire:2 Bornova / İzmir</span>
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

        <!-- 4. Bölgeden Gerçek Referans Uygulamamız -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/40 p-6 sm:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-anthracite-border">
              <img
                :src="district.sampleProject.image"
                :alt="`${district.sampleProject.title} - Atalay Dekorasyon ${district.name}`"
                loading="lazy"
                decoding="async"
                width="600"
                height="450"
                class="h-full w-full object-cover"
              >
              <span class="absolute top-3 left-3 rounded-full bg-brand-black/80 px-3 py-1 text-[11px] font-semibold text-brand-gold border border-brand-gold/30 backdrop-blur-md">
                {{ district.sampleProject.neighborhood }}
              </span>
            </div>

            <div class="lg:col-span-7 space-y-4">
              <span class="text-xs font-semibold text-brand-gold uppercase tracking-wider">Bölgesel Referans</span>
              <h3 class="font-display text-2xl font-bold text-white">
                {{ district.sampleProject.title }}
              </h3>
              <p class="text-sm text-slate-300 leading-relaxed">
                {{ district.sampleProject.description }}
              </p>
              <div class="pt-2 flex flex-wrap gap-3">
                <NuxtLink
                  to="/projeler"
                  class="inline-flex items-center gap-1.5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-200 hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
                >
                  Tüm Projeleri İncele
                  <ArrowRight class="h-3.5 w-3.5" />
                </NuxtLink>
                <NuxtLink
                  to="/galeri"
                  class="inline-flex items-center gap-1.5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-200 hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
                >
                  Şantiye Galerisine Git
                  <ArrowRight class="h-3.5 w-3.5" />
                </NuxtLink>
              </div>
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
              Aşağıdaki formu doldurun, Mehmet Usta gün içinde sizi arasın ve {{ district.name }}'deki adresiniz için randevu saati belirleyelim.
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


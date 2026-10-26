<template>
  <div class="relative overflow-hidden">
    <!-- Breadcrumb Header Banner -->
    <div class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb :items="breadcrumbItems" />

        <div class="mt-4 max-w-3xl text-left">
          <AppBadge variant="gold" size="sm" dot class="mb-3">
            Hizmet Kataloğumuz
          </AppBadge>
          <!-- Single H1 for the listing page -->
          <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            İzmir Yapı, İzolasyon ve <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Dekorasyon Hizmetlerimiz</span>
          </h1>
          <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            Alçıpan asma tavandan silikonlu dış cepheye, çatı ve temel su izolasyonundan anahtar teslim komple ev tadilatına kadar uzman kadromuz ve TSE onaylı malzemelerimizle yanınızdayız.
          </p>
        </div>
      </div>
    </div>

    <!-- 8 Services Grid Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="service in allServices"
            :key="service.slug"
            as="article"
            variant="default"
            padding="none"
            hoverable
            class="group flex flex-col justify-between overflow-hidden text-left"
          >
            <!-- Image & Badge -->
            <div class="relative aspect-[16/10] overflow-hidden bg-brand-anthracite">
              <img
                :src="service.coverImageUrl"
                :alt="`${service.title} - İzmir Atalaylar Dekorasyon`"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent" />
              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span class="rounded-full bg-brand-black/80 px-2.5 py-0.5 text-[11px] font-semibold text-brand-gold-light border border-brand-gold/30 backdrop-blur-md">
                  İzmir & Çevre İlçeler
                </span>
                <span class="text-[10px] text-slate-400 font-mono">
                  #0{{ service.displayOrder }}
                </span>
              </div>
            </div>

            <!-- Content Body -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="font-display text-xl font-bold text-white transition-colors group-hover:text-brand-gold-light">
                  {{ service.title }}
                </h2>
                <p class="mt-1 text-xs text-brand-gold-muted font-medium">
                  {{ service.subtitle }}
                </p>
                <p class="mt-3 text-xs leading-relaxed text-slate-300">
                  {{ service.shortDescription }}
                </p>

                <!-- Scope Highlights -->
                <ul class="mt-4 space-y-1.5 border-t border-brand-anthracite-border/70 pt-4 text-xs text-slate-400">
                  <li v-for="(item, i) in service.features.slice(0, 3)" :key="i" class="flex items-center gap-2">
                    <Check class="h-3.5 w-3.5 text-brand-gold shrink-0" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Action Links -->
              <div class="mt-6 pt-4 border-t border-brand-anthracite-border/70 flex items-center justify-between gap-3">
                <NuxtLink
                  :to="`/hizmetlerimiz/${service.slug}`"
                  class="inline-flex items-center text-xs font-semibold text-brand-gold transition-colors hover:text-white"
                >
                  <span>Hizmet Detayı</span>
                  <ArrowRight class="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </NuxtLink>

                <NuxtLink
                  :to="`/ucretsiz-kesif?hizmet=${service.slug}`"
                  class="rounded-lg bg-brand-anthracite-surface px-3 py-1.5 text-[11px] font-semibold text-slate-200 border border-brand-anthracite-border hover:border-brand-gold/50 hover:text-brand-gold transition-all"
                >
                  Keşif / Teklif İste
                </NuxtLink>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </section>

    <!-- Transparent Pricing & Workmanship Principle -->
    <section class="border-b border-brand-anthracite-border bg-brand-black-soft/40 py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8 text-left">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div class="md:col-span-8">
              <h3 class="font-display text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck class="h-5 w-5 text-brand-gold" />
                <span>Neden Sabit Paket Fiyat Vermiyoruz?</span>
              </h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-300">
                Her mekanın tavan yüksekliği, sıva hasar durumu, metrajı ve malzeme kalitesi tercihi farklıdır. Telefonda veya webde ezbere verilen fiyatlar sonradan sürpriz ek maliyetlere dönüşür. Atalaylar Dekorasyon olarak İzmir genelinde adresinize gelip <strong>ücretsiz keşif</strong> yapıyor; net metraj ve şeffaf malzeme listesiyle en doğru yazılı teklifi sunuyoruz.
              </p>
            </div>
            <div class="md:col-span-4 flex justify-start md:justify-end">
              <AppButton to="/ucretsiz-kesif" variant="primary" size="md">
                <span>Ücretsiz Keşif Randevusu Al</span>
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Global CTA -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Check, ShieldCheck } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppCard from '~/components/ui/AppCard.vue'
import AppButton from '~/components/common/AppButton.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'
import { useServices } from '~/composables/useServices'

const { getAllServices } = useServices()
const allServices = getAllServices()

const breadcrumbItems = [
  { label: 'Hizmetlerimiz' }
]

useAppSeo({
  title: 'Hizmetlerimiz | İzmir Alçı, Boya, İzolasyon & Tadilat',
  description: 'İzmir genelinde alçı uygulamaları, iç ve dış cephe boya, sıva, çatı izolasyonu, su ve ısı yalıtımı ile anahtar teslim komple tadilat hizmetlerimiz. Yerinde ücretsiz keşif.',
  path: '/hizmetlerimiz',
  image: '/images/hero-decoration.jpg',
  jsonLd: buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' }
  ])
})
</script>

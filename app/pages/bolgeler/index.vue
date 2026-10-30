<template>
  <div class="min-h-screen bg-brand-black text-slate-100 text-left">
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
            { label: 'Hizmet Bölgelerimiz' }
          ]"
          class="mb-6"
        />

        <div class="max-w-3xl">
          <AppBadge variant="gold" size="sm" dot class="mb-4">
            İzmir Genelinde Yerinde Keşif
          </AppBadge>
          <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            İzmir <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Hizmet Bölgelerimiz</span>
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            Atölyemiz ve merkezimiz <strong class="text-white">Bornova Mevlana Mahallesi</strong>'nde olmak üzere; Karşıyaka'dan Urla'ya, Konak'tan Çeşme'ye kadar İzmir'in tüm ilçelerinde iklim ve yapı özelliklerine özgü boya, alçı, çatı izolasyonu ve anahtar teslim tadilat hizmeti veriyoruz.
          </p>
        </div>
      </div>
    </section>

    <!-- Districts Grid Section -->
    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Search & Filter Bar -->
        <div class="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="relative w-full sm:w-80">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="İlçe veya semt ara..."
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-anthracite/80 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            >
          </div>
          <span class="text-xs text-slate-400">
            Toplam {{ filteredDistricts.length }} İlçe Rehberi
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="dist in filteredDistricts"
            :key="dist.slug"
            :to="`/bolgeler/${dist.slug}`"
            class="group relative overflow-hidden rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-gold-sm flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold">
                  <MapPin class="h-4 w-4" />
                  {{ dist.heroBadge }}
                </span>
                <ArrowRight class="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-gold" />
              </div>

              <h2 class="mt-3 font-display text-xl font-bold text-white transition-colors group-hover:text-brand-gold">
                {{ dist.name }}
              </h2>

              <p class="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-3">
                {{ dist.summary }}
              </p>

              <!-- Neighborhood Pills -->
              <div class="mt-4 flex flex-wrap gap-1.5">
                <span
                  v-for="(n, idx) in dist.neighborhoods.slice(0, 4)"
                  :key="idx"
                  class="rounded-md border border-brand-anthracite-border/80 bg-brand-black/60 px-2 py-0.5 text-[11px] text-slate-300"
                >
                  {{ n.replace(' Mahallesi', '') }}
                </span>
                <span v-if="dist.neighborhoods.length > 4" class="text-[10px] text-brand-gold/80 self-center">
                  +{{ dist.neighborhoods.length - 4 }} mahalle
                </span>
              </div>
            </div>

            <!-- Bottom Dispatch Note -->
            <div class="mt-6 border-t border-brand-anthracite-border/70 pt-3 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Mehmet Usta Keşif Hattı</span>
              <span class="font-semibold text-brand-gold-light group-hover:underline">Detaylı İncele →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MapPin, ArrowRight } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import { DISTRICTS_DETAILED_DATA } from '~/data/districts-data'

const searchQuery = ref('')

const filteredDistricts = computed(() => {
  if (!searchQuery.value.trim()) return DISTRICTS_DETAILED_DATA
  const q = searchQuery.value.toLowerCase()
  return DISTRICTS_DETAILED_DATA.filter(
    d =>
      d.name.toLowerCase().includes(q) ||
      d.neighborhoods.some(n => n.toLowerCase().includes(q))
  )
})

useAppSeo({
  title: 'İzmir Hizmet Bölgelerimiz | Atalay Dekorasyon',
  description: 'Bornova, Karşıyaka, Konak, Buca, Urla, Çeşme ve İzmir genelinde Mehmet Usta güvencesiyle boya badana, alçı, çatı izolasyonu ve anahtar teslim tadilat hizmet bölgelerimiz.',
  path: '/bolgeler',
  image: '/images/projects/prj-apartment-renovation.jpg'
})
</script>


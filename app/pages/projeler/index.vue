<template>
  <div class="relative overflow-hidden text-left">
    <!-- Breadcrumb & Header Banner -->
    <div class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb :items="breadcrumbItems" />

        <div class="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div class="max-w-3xl">
            <AppBadge variant="gold" size="sm" dot class="mb-3">
              Uygulama Portföyü
            </AppBadge>
            <!-- Single H1 for SEO -->
            <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              İzmir Tamamlanan <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Uygulamalar ve Projelerimiz</span>
            </h1>
            <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Konut, villa, apartman ve ticari mekanlarda gerçekleştirdiğimiz alçı, boya, çatı ve yalıtım çalışmalarımızın detayları.
            </p>
          </div>

          <!-- Demo Indicator Notice -->
          <div class="shrink-0">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-anthracite px-3.5 py-1.5 text-xs font-medium text-slate-300 border border-brand-anthracite-border">
              <span class="h-2 w-2 rounded-full bg-amber-400" />
              Örnek Uygulama Vitrini
            </span>
          </div>
        </div>

        <!-- Accessible Category Filter Tabs (Mobile Scrollable) -->
        <div class="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Hizmet Kategorisi Filtresi">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            role="tab"
            :aria-selected="selectedCategory === cat.id"
            :class="[
              'shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-150 min-h-[44px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black shadow-gold-sm'
                : 'border border-brand-anthracite-border bg-brand-anthracite-card text-slate-300 hover:text-white hover:border-brand-gold/40'
            ]"
            @click="selectedCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Grid Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- If projects exist for category -->
        <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AppCard
            v-for="project in filteredProjects"
            :key="project.slug"
            as="article"
            variant="default"
            padding="none"
            hoverable
            class="group flex flex-col justify-between overflow-hidden text-left"
          >
            <!-- Image & Badge Container -->
            <div class="relative aspect-[16/10] overflow-hidden bg-brand-anthracite">
              <img
                :src="project.afterImageUrl"
                :alt="`${project.title} - ${project.location} Mehmet Usta uygulaması · Atalay Dekorasyon`"
                loading="lazy"
                decoding="async"
                width="640"
                height="400"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />

              <div class="absolute top-3 left-3 flex gap-2">
                <span class="rounded-full bg-brand-black/85 px-2.5 py-0.5 text-[10px] font-semibold text-brand-gold-light border border-brand-gold/30 backdrop-blur-md">
                  {{ project.serviceTitle }}
                </span>
                <span v-if="project.isDemo" class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300 backdrop-blur-md">
                  Örnek Uygulama
                </span>
              </div>

              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                <span class="font-medium text-brand-gold-light">{{ project.location }}</span>
                <span>{{ project.completionDuration }}</span>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="font-display text-lg font-bold text-white transition-colors group-hover:text-brand-gold-light">
                  {{ project.title }}
                </h2>
                <p class="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-3">
                  {{ project.summary }}
                </p>

                <!-- Materials used pills -->
                <div class="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-brand-anthracite-border/70">
                  <span
                    v-for="(mat, mIdx) in project.materialsUsed.slice(0, 2)"
                    :key="mIdx"
                    class="rounded-md bg-brand-anthracite px-2 py-0.5 text-[10px] text-slate-400 border border-brand-anthracite-border"
                  >
                    {{ mat }}
                  </span>
                </div>
              </div>

              <!-- Card Action Button -->
              <div class="mt-6 pt-4 border-t border-brand-anthracite-border/70 flex items-center justify-between">
                <NuxtLink
                  :to="`/projeler/${project.slug}`"
                  class="inline-flex items-center text-xs font-semibold text-brand-gold hover:text-white transition-colors"
                >
                  <span>Proje Detayı & Galeri</span>
                  <ArrowRight class="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </NuxtLink>

                <NuxtLink
                  :to="`/ucretsiz-kesif?hizmet=${project.serviceSlug}`"
                  class="text-[11px] font-semibold text-slate-400 hover:text-brand-gold transition-colors"
                >
                  Teklif İste
                </NuxtLink>
              </div>
            </div>
          </AppCard>
        </div>

        <!-- Empty State (Boş Durum) -->
        <div
          v-else
          class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite-card p-12 text-center max-w-xl mx-auto"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold mb-4">
            <Layers class="h-7 w-7 text-brand-gold" />
          </div>
          <h3 class="font-display text-lg font-bold text-white">Bu Kategoride Henüz Proje Yayınlanmadı</h3>
          <p class="mt-2 text-xs text-slate-400 leading-relaxed">
            Seçtiğiniz alanda devam eden şantiyelerimiz bulunmaktadır. Projeniz için yerinde inceleme ve özel keşif teklifi almak için bize hemen ulaşabilirsiniz.
          </p>
          <div class="mt-6 flex justify-center gap-3">
            <AppButton to="/ucretsiz-kesif" variant="primary" size="sm">
              <span>Ücretsiz Keşif İste</span>
            </AppButton>
            <button
              type="button"
              class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
              @click="selectedCategory = 'all'"
            >
              Tüm Projeleri Göster
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Global CTA -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowRight, Layers } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppCard from '~/components/ui/AppCard.vue'
import AppButton from '~/components/common/AppButton.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'
import { useProjects } from '~/composables/useProjects'

const { categories, getProjectsByCategory } = useProjects()

const selectedCategory = ref('all')

const filteredProjects = computed(() => {
  return getProjectsByCategory(selectedCategory.value)
})

const breadcrumbItems = [
  { label: 'Projelerimiz' }
]

useAppSeo({
  title: 'Projelerimiz | İzmir Tamamlanan Uygulamalar & Referanslar',
  description: 'İzmir genelinde gerçekleştirdiğimiz asma tavan, çatı izolasyonu, dış cephe mantolama ve komple daire tadilatı projelerimiz ve uygulama detayları.',
  path: '/projeler',
  image: '/images/hero-decoration.jpg',
  jsonLd: buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Projelerimiz', path: '/projeler' }
  ])
})
</script>

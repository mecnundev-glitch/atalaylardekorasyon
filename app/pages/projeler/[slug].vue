<template>
  <div v-if="project" class="relative overflow-hidden text-left">
    <!-- Breadcrumb & Title Banner -->
    <div class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb :items="breadcrumbItems" />

        <div class="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div class="max-w-3xl">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="rounded-full bg-brand-black/90 px-3 py-1 text-xs font-semibold text-brand-gold-light border border-brand-gold/30">
                {{ project.serviceTitle }}
              </span>
              <span class="rounded-full bg-brand-anthracite px-3 py-1 text-xs text-slate-300 border border-brand-anthracite-border">
                {{ project.location }}
              </span>
              <span v-if="project.isDemo" class="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300 border border-amber-500/30">
                Örnek / Demo Uygulama
              </span>
            </div>

            <!-- Single H1 for SEO -->
            <h1 class="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {{ project.title }}
            </h1>
            <p class="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {{ project.summary }}
            </p>
          </div>

          <div class="shrink-0 flex flex-col sm:flex-row gap-3">
            <AppButton
              :to="`/ucretsiz-kesif?hizmet=${project.serviceSlug}`"
              variant="primary"
              size="md"
            >
              <ClipboardCheck class="h-4 w-4" />
              <span>Benzer İş İçin Keşif Al</span>
            </AppButton>

            <AppButton
              :to="getWhatsAppUrl(`Merhaba, '${project.title}' projenize benzer bir uygulama için keşif almak istiyorum.`)"
              variant="whatsapp"
              size="md"
            >
              <MessageCircle class="h-4 w-4" />
              <span>WhatsApp'tan Danış</span>
            </AppButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Project Content Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Before / After Slider (If before image exists) -->
        <div v-if="project.beforeImageUrl && project.beforeImageUrl !== project.afterImageUrl" class="mb-14">
          <SectionHeading
            badge="Öncesi / Sonrası"
            title="Dönüşüm Karşılaştırması"
            description="Mekanın işlem öncesi yıpranmış hali ile teslim edilen yeni durumu arasındaki farkı inceleyin."
            align="left"
            size="sm"
            class="mb-6"
          />

          <BeforeAfterSlider
            :before-image="project.beforeImageUrl"
            :after-image="project.afterImageUrl"
            :title="project.title"
            description="Lazer terazili tesviye, kaliteli malzeme ve garantili işçilikle tamamlanan uygulama."
            before-label="Uygulama Öncesi"
            after-label="Teslim Edilen Yeni Durum"
          />
        </div>

        <!-- Project Details Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Left Column: Story & Process -->
          <div class="lg:col-span-8 space-y-8">
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite-card p-6 sm:p-8">
              <h2 class="font-display text-xl font-bold text-white mb-4">
                Proje Kapsamı ve Yapılan İşlemler
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {{ project.details }}
              </p>
            </div>

            <!-- Project Image Gallery -->
            <div v-if="project.galleryImages && project.galleryImages.length">
              <h2 class="font-display text-xl font-bold text-white mb-4">
                Uygulama Fotoğraf Galerisi
              </h2>
              <p class="text-xs text-slate-400 mb-6">
                Büyük boyutta incelemek ve detayları görmek için fotoğrafların üzerine tıklayın.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="(img, idx) in project.galleryImages"
                  :key="idx"
                  class="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-brand-anthracite-border bg-brand-anthracite cursor-pointer"
                  tabindex="0"
                  role="button"
                  :aria-label="`Fotoğrafı büyüt: ${img.alt}`"
                  @click="openLightbox(idx)"
                  @keydown.enter="openLightbox(idx)"
                  @keydown.space.prevent="openLightbox(idx)"
                >
                  <img
                    :src="img.url"
                    :alt="`${img.alt} - Atalay Dekorasyon İzmir`"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="450"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                  <div class="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-black shadow-gold-md">
                      <Maximize2 class="h-5 w-5" />
                    </div>
                  </div>
                  <div v-if="img.caption" class="absolute bottom-2 inset-x-2 rounded-lg bg-brand-black/80 px-2.5 py-1 text-[11px] text-slate-300 backdrop-blur-md truncate">
                    {{ img.caption }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Project Meta Sidebar -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Project Facts Card -->
            <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite-card p-6">
              <h3 class="font-display text-base font-bold text-white pb-3 border-b border-brand-anthracite-border">
                Proje Özeti
              </h3>

              <dl class="mt-4 space-y-4 text-xs">
                <div>
                  <dt class="text-slate-400">Hizmet Türü</dt>
                  <dd class="mt-1 font-semibold text-white">
                    <NuxtLink :to="`/hizmetlerimiz/${project.serviceSlug}`" class="text-brand-gold hover:underline">
                      {{ project.serviceTitle }}
                    </NuxtLink>
                  </dd>
                </div>

                <div>
                  <dt class="text-slate-400">Uygulama Bölgesi</dt>
                  <dd class="mt-1 font-semibold text-white">{{ project.location }}</dd>
                </div>

                <div>
                  <dt class="text-slate-400">Tamamlanma Süresi</dt>
                  <dd class="mt-1 font-semibold text-white">{{ project.completionDuration }}</dd>
                </div>

                <div>
                  <dt class="text-slate-400 mb-2">Kullanılan Malzemeler</dt>
                  <dd class="space-y-1.5">
                    <span
                      v-for="(mat, mIdx) in project.materialsUsed"
                      :key="mIdx"
                      class="block rounded-lg bg-brand-black/60 px-2.5 py-1 text-[11px] text-slate-300 border border-brand-anthracite-border"
                    >
                      {{ mat }}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Free Discovery Callout -->
            <div class="rounded-3xl border border-brand-gold/30 bg-gradient-to-b from-brand-anthracite to-brand-black p-6 text-center shadow-xl">
              <h4 class="font-display text-base font-bold text-white">
                Benzer Bir Projeniz mi Var?
              </h4>
              <p class="mt-2 text-xs text-slate-300 leading-relaxed">
                İzmir genelinde adresinize gelerek metraj ve zemin analizi yapalım; malzeme ve işçilik dahil en doğru teklifi hazırlayalım.
              </p>
              <div class="mt-5">
                <AppButton
                  :to="`/ucretsiz-kesif?hizmet=${project.serviceSlug}`"
                  variant="primary"
                  block
                  size="md"
                >
                  <ClipboardCheck class="h-4 w-4" />
                  <span>Ücretsiz Keşif İste</span>
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <AppLightbox
      :is-open="isLightboxOpen"
      :images="project.galleryImages"
      :start-index="lightboxIndex"
      @close="isLightboxOpen = false"
    />

    <!-- Global CTA -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ClipboardCheck, MessageCircle, Maximize2 } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppButton from '~/components/common/AppButton.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import BeforeAfterSlider from '~/components/home/BeforeAfterSlider.vue'
import AppLightbox from '~/components/ui/AppLightbox.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'
import { useProjects } from '~/composables/useProjects'
import { useSiteConfig } from '~/composables/useSiteConfig'

const route = useRoute()
const slug = String(route.params.slug)

const { getProjectBySlug } = useProjects()
const { getWhatsAppUrl } = useSiteConfig()

const project = getProjectBySlug(slug)

// Graceful 404 handling if project does not exist
if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Aradığınız proje kaydı bulunamadı.',
    fatal: true
  })
}

// Lightbox state
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  isLightboxOpen.value = true
}

// Breadcrumb
const breadcrumbItems = computed(() => [
  { label: 'Projelerimiz', to: '/projeler' },
  { label: project.title }
])

// SEO, Canonical, Open Graph & Schema.org JSON-LD
const canonicalPath = `/projeler/${project.slug}`
const canonicalUrl = `https://atalaylardekarasyon.com${canonicalPath}`

useAppSeo({
  title: `${project.title} | Atalay Dekorasyon`,
  description: `${project.summary} İzmir ${project.location} uygulama fotoğrafları ve malzeme detayları.`,
  path: canonicalPath,
  image: project.afterImageUrl,
  type: 'article',
  jsonLd: [
    buildProjectSchema(project, canonicalUrl),
    buildBreadcrumbSchema([
      { name: 'Ana Sayfa', path: '/' },
      { name: 'Projelerimiz', path: '/projeler' },
      { name: project.title, path: canonicalPath }
    ])
  ]
})
</script>

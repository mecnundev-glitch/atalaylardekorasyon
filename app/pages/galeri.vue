<template>
  <div class="relative overflow-hidden text-left">
    <!-- Breadcrumb & Header Banner -->
    <div class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb :items="breadcrumbItems" />

        <div class="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div class="max-w-3xl">
            <AppBadge variant="gold" size="sm" dot class="mb-3">
              Fotoğraf Galerisi
            </AppBadge>
            <!-- Single H1 for SEO -->
            <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              İzmir Uygulama ve <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Şantiye Fotoğraf Galerisi</span>
            </h1>
            <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Alçıpan tavan, dekoratif boya, çatı yalıtımı ve tadilat uygulamalarımızdan yüksek çözünürlüklü teslim kareleri.
            </p>
          </div>

          <div class="shrink-0">
            <span class="rounded-full bg-brand-anthracite px-3.5 py-1.5 text-xs text-slate-300 border border-brand-anthracite-border">
              Toplam {{ galleryImages.length }} Uygulama Görseli
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Grid Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(img, idx) in galleryImages"
            :key="idx"
            class="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-anthracite-border bg-brand-anthracite cursor-pointer"
            tabindex="0"
            role="button"
            :aria-label="`Fotoğrafı büyüt: ${img.alt}`"
            @click="openLightbox(idx)"
            @keydown.enter="openLightbox(idx)"
            @keydown.space.prevent="openLightbox(idx)"
          >
            <img
              :src="img.url"
              :alt="`${img.alt} - Mehmet Usta uygulaması · Atalay Dekorasyon`"
              loading="lazy"
              decoding="async"
              width="600"
              height="450"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            >

            <!-- Gradient & Hover Caption -->
            <div class="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            <!-- Zoom Icon on Hover -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold text-brand-black shadow-gold-md">
                <Maximize2 class="h-5 w-5" />
              </div>
            </div>

            <!-- Bottom Content -->
            <div class="absolute bottom-3 inset-x-3 text-left">
              <span class="text-[10px] uppercase tracking-wider text-brand-gold-light font-semibold">
                {{ img.location }}
              </span>
              <p class="text-xs font-semibold text-white truncate mt-0.5">
                {{ img.projectTitle }}
              </p>
              <p v-if="img.caption" class="text-[11px] text-slate-400 truncate mt-0.5">
                {{ img.caption }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <AppLightbox
      :is-open="isLightboxOpen"
      :images="galleryImages"
      :start-index="activeImageIndex"
      @close="isLightboxOpen = false"
    />

    <!-- Global CTA -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Maximize2 } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppLightbox from '~/components/ui/AppLightbox.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'
import { useProjects } from '~/composables/useProjects'

const { getAllGalleryImages } = useProjects()
const galleryImages = getAllGalleryImages()

const isLightboxOpen = ref(false)
const activeImageIndex = ref(0)

const openLightbox = (index: number) => {
  activeImageIndex.value = index
  isLightboxOpen.value = true
}

const breadcrumbItems = [
  { label: 'Uygulama Galerisi' }
]

useAppSeo({
  title: 'Uygulama ve Şantiye Galerisi | Atalay Dekorasyon İzmir',
  description: 'İzmir genelinde gerçekleştirdiğimiz asma tavan, dış cephe, boya, çatı ve yalıtım işçiliği öncesi ve sonrası fotoğrafları.',
  path: '/galeri',
  image: '/images/hero-decoration.jpg',
  jsonLd: buildBreadcrumbSchema([
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Uygulama Galerisi', path: '/galeri' }
  ])
})
</script>

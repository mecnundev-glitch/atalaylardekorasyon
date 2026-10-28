<template>
  <div class="relative overflow-hidden text-left">
    <!-- Breadcrumb & Header Banner -->
    <div class="border-b border-brand-anthracite-border bg-brand-black-soft/90 py-8 sm:py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppBreadcrumb :items="breadcrumbItems" />

        <div class="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div class="max-w-3xl">
            <AppBadge variant="gold" size="sm" dot class="mb-3">
              Müşteri Deneyimleri ve Referanslar
            </AppBadge>
            <!-- Single H1 for SEO -->
            <h1 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              İzmir Müşterilerimizin Gözünden: <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Atalaylar Dekorasyon Yorumları</span>
            </h1>
            <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Karşıyaka'dan Urla'ya, Bornova'dan Alsancak'a kadar evini ve iş yerini bize emanet eden müşterilerimizin gerçek deneyimleri.
            </p>
          </div>

          <div class="shrink-0">
            <AppButton to="/ucretsiz-kesif" variant="primary" size="md">
              <Sparkles class="mr-1.5 h-4 w-4" />
              <span>Siz de Teklif Alın</span>
            </AppButton>
          </div>
        </div>

        <!-- Rating Summary Card -->
        <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-anthracite/90 via-brand-black-soft/90 to-brand-anthracite/90 p-6 shadow-2xl backdrop-blur-xl">
          <div class="text-center md:border-r md:border-brand-anthracite-border/80 p-2">
            <div class="flex items-center justify-center gap-1 text-brand-gold mb-1">
              <Star v-for="i in 5" :key="i" class="h-4 w-4 fill-brand-gold text-brand-gold" />
            </div>
            <div class="font-display text-2xl sm:text-3xl font-black text-white">4.9 / 5.0</div>
            <p class="text-[11px] font-medium text-slate-400 mt-1">Ortalama Müşteri Puanı</p>
          </div>

          <div class="text-center md:border-r md:border-brand-anthracite-border/80 p-2">
            <div class="font-display text-2xl sm:text-3xl font-black text-brand-gold">450+</div>
            <p class="text-xs font-semibold text-white mt-1">Tamamlanan Proje</p>
            <p class="text-[11px] text-slate-400">İzmir ve İlçeleri</p>
          </div>

          <div class="text-center md:border-r md:border-brand-anthracite-border/80 p-2">
            <div class="font-display text-2xl sm:text-3xl font-black text-emerald-400">%99</div>
            <p class="text-xs font-semibold text-white mt-1">Zamanında Teslim</p>
            <p class="text-[11px] text-slate-400">Gecikmesiz Sözleşmeli Süreç</p>
          </div>

          <div class="text-center p-2">
            <div class="font-display text-2xl sm:text-3xl font-black text-brand-gold">%100</div>
            <p class="text-xs font-semibold text-white mt-1">Sabit Fiyat Güvencesi</p>
            <p class="text-[11px] text-slate-400">Sürpriz Ekstra Masraf Yok</p>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <!-- Categories Filter -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
            <button
              v-for="cat in filterCategories"
              :key="cat.slug"
              type="button"
              class="shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-150 min-h-[40px]"
              :class="selectedCategory === cat.slug
                ? 'bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black shadow-gold-sm font-bold'
                : 'border border-brand-anthracite-border bg-brand-anthracite-card text-slate-300 hover:text-white hover:border-brand-gold/40'"
              @click="selectedCategory = cat.slug"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full md:w-72">
            <Search class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="İlçe, hizmet veya müşteri ara..."
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-anthracite/70 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Grid Section -->
    <section class="border-b border-brand-anthracite-border bg-brand-black py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Review Cards -->
        <div v-if="filteredReviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AppCard
            v-for="item in filteredReviews"
            :key="item.id"
            class="flex flex-col justify-between p-6 sm:p-7 relative transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40"
          >
            <!-- Top Card Header: Stars & Date -->
            <div>
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1 text-brand-gold">
                  <Star v-for="s in item.rating" :key="s" class="h-4 w-4 fill-brand-gold text-brand-gold" />
                </div>
                <span class="text-[11px] font-medium text-slate-500">{{ item.date }}</span>
              </div>

              <!-- Quote Content -->
              <p class="mt-4 text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                “{{ item.content }}”
              </p>

              <!-- Scope Tag -->
              <div v-if="item.projectScope" class="mt-4">
                <span class="inline-flex items-center rounded-lg bg-brand-black/70 border border-brand-anthracite-border px-2.5 py-1 text-[11px] font-medium text-brand-gold">
                  <Tag class="mr-1 h-3 w-3" />
                  {{ item.projectScope }}
                </span>
              </div>
            </div>

            <!-- Client Info Footer -->
            <div class="mt-6 pt-5 border-t border-brand-anthracite-border/70 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-light text-brand-black font-black text-xs">
                  {{ getInitials(item.clientName) }}
                </div>
                <div>
                  <h3 class="text-xs font-bold text-white leading-snug">{{ item.clientName }}</h3>
                  <p class="text-[11px] text-slate-400 flex items-center mt-0.5">
                    <MapPin class="mr-1 h-3 w-3 text-brand-gold/70" />
                    {{ item.district }}
                  </p>
                </div>
              </div>

              <span class="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 class="mr-1 h-3 w-3" />
                Doğrulandı
              </span>
            </div>
          </AppCard>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite-card p-12 text-center max-w-md mx-auto"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-anthracite border border-brand-gold/30 text-brand-gold mb-4">
            <MessageSquareHeart class="h-7 w-7 text-brand-gold" />
          </div>
          <h3 class="font-display text-base font-bold text-white">Aradığınız Kriterde Yorum Bulunamadı</h3>
          <p class="mt-2 text-xs text-slate-400 leading-relaxed">
            Arama terimini değiştirebilir veya tüm yorumları görüntülemek için filtreyi sıfırlayabilirsiniz.
          </p>
          <button
            type="button"
            class="mt-5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
            @click="resetFilters"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </section>

    <!-- Global CTA -->
    <ContactCtaSection />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Star,
  Sparkles,
  Search,
  MapPin,
  Tag,
  CheckCircle2,
  MessageSquareHeart
} from 'lucide-vue-next'
import AppBreadcrumb from '~/components/ui/AppBreadcrumb.vue'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppCard from '~/components/ui/AppCard.vue'
import AppButton from '~/components/common/AppButton.vue'
import ContactCtaSection from '~/components/common/ContactCtaSection.vue'
import { useTestimonials } from '~/composables/useTestimonials'

const breadcrumbItems = [
  { label: 'Müşteri Yorumları' }
]

const { getAllTestimonials } = useTestimonials()
const allReviews = getAllTestimonials()

const selectedCategory = ref('all')
const searchQuery = ref('')

const filterCategories = [
  { slug: 'all', label: 'Tüm Yorumlar' },
  { slug: 'dekorasyon-ve-tadilat', label: 'Komple Tadilat' },
  { slug: 'alci-uygulamalari', label: 'Alçı & Tavan' },
  { slug: 'ic-cephe-boya', label: 'Boya & Badana' },
  { slug: 'cati-izolasyonu', label: 'Çatı İzolasyonu' },
  { slug: 'isi-yalitimi', label: 'Mantolama' }
]

const filteredReviews = computed(() => {
  return allReviews.filter((item) => {
    // Kategori Filtresi
    if (selectedCategory.value !== 'all' && item.serviceSlug !== selectedCategory.value) {
      return false
    }

    // Arama Sorgusu
    if (searchQuery.value.trim().length > 0) {
      const q = searchQuery.value.toLowerCase().trim()
      const inName = item.clientName.toLowerCase().includes(q)
      const inDistrict = item.district.toLowerCase().includes(q)
      const inService = item.serviceTitle.toLowerCase().includes(q)
      const inContent = item.content.toLowerCase().includes(q)
      return inName || inDistrict || inService || inContent
    }

    return true
  })
})

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ')
  if (parts.length >= 2 && parts[0] && parts[parts.length - 1]) {
    const first = parts[0][0] || 'M'
    const last = parts[parts.length - 1]?.[0] || ''
    return `${first}${last}`.toUpperCase()
  }
  return (name[0] || 'M').toUpperCase()
}

const resetFilters = () => {
  selectedCategory.value = 'all'
  searchQuery.value = ''
}

// SEO ve Doğrulanmış Yapılandırılmış Veri
useAppSeo({
  title: 'Müşteri Yorumları & Değerlendirmeleri | Atalaylar Dekorasyon İzmir',
  description: 'İzmir genelinde alçı, boya, çatı ve komple tadilat hizmetlerimize ilişkin müşteri değerlendirmeleri ve referanslar.',
  path: '/musteri-yorumlari',
  image: '/images/hero-decoration.jpg',
  jsonLd: [
    buildBreadcrumbSchema([
      { name: 'Ana Sayfa', path: '/' },
      { name: 'Müşteri Yorumları', path: '/musteri-yorumlari' }
    ]),
    buildLocalBusinessSchema()
  ]
})
</script>

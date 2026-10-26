<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Hoş Geldiniz, <span class="text-brand-gold">{{ profile?.full_name || 'Yönetici' }}</span>
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          Atalaylar Dekorasyon içerik, teklif ve müşteri yönetimi paneli
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors min-h-[38px]"
          :disabled="isRefreshing"
          @click="fetchDashboardData"
        >
          <RefreshCw class="mr-1.5 h-3.5 w-3.5 text-brand-gold" :class="{ 'animate-spin': isRefreshing }" />
          <span>Yenile</span>
        </button>

        <NuxtLink
          to="/admin/quotes"
          class="inline-flex items-center rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-4 py-2 text-xs font-bold text-brand-black shadow-gold-sm hover:brightness-110 transition-all min-h-[38px]"
        >
          <Inbox class="mr-1.5 h-4 w-4" />
          <span>Talepleri İncele</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Error Alert if any -->
    <div
      v-if="fetchError"
      class="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-center justify-between"
      role="alert"
    >
      <div class="flex items-center space-x-2">
        <AlertCircle class="h-4 w-4 text-rose-400 shrink-0" />
        <span>{{ fetchError }}</span>
      </div>
      <button class="font-bold underline text-rose-200" @click="fetchDashboardData">
        Tekrar Dene
      </button>
    </div>

    <!-- Metric KPI Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <!-- 1. Teklif Talepleri -->
      <NuxtLink
        to="/admin/quotes"
        class="group rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-5 shadow-lg transition-all hover:border-brand-gold/40 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Teklif Talepleri</span>
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold group-hover:scale-110 transition-transform">
            <ClipboardList class="h-5 w-5" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline space-x-2">
          <span class="font-display text-3xl font-extrabold text-white">
            {{ isLoading ? '...' : metrics.totalQuotes }}
          </span>
          <span v-if="metrics.newQuotes > 0" class="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
            {{ metrics.newQuotes }} Yeni
          </span>
        </div>
        <p class="mt-1 text-[11px] text-slate-400">
          İzmir genelinden gelen yerinde keşif talepleri
        </p>
      </NuxtLink>

      <!-- 2. Hizmetlerimiz -->
      <NuxtLink
        to="/admin/services"
        class="group rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-5 shadow-lg transition-all hover:border-brand-gold/40 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Hizmet Sayısı</span>
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
            <Layers class="h-5 w-5" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline space-x-2">
          <span class="font-display text-3xl font-extrabold text-white">
            {{ isLoading ? '...' : metrics.totalServices }}
          </span>
          <span class="text-[11px] text-slate-400">Aktif</span>
        </div>
        <p class="mt-1 text-[11px] text-slate-400">
          Alçı, boya, çatı ve yalıtım hizmetleri
        </p>
      </NuxtLink>

      <!-- 3. Portföy / Projeler -->
      <NuxtLink
        to="/admin/projects"
        class="group rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-5 shadow-lg transition-all hover:border-brand-gold/40 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Tamamlanan Projeler</span>
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
            <FolderKanban class="h-5 w-5" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline space-x-2">
          <span class="font-display text-3xl font-extrabold text-white">
            {{ isLoading ? '...' : metrics.totalProjects }}
          </span>
          <span class="text-[11px] text-slate-400">Yayında</span>
        </div>
        <p class="mt-1 text-[11px] text-slate-400">
          Önce / Sonra görselli tamamlanmış işler
        </p>
      </NuxtLink>

      <!-- 4. Müşteri Yorumları -->
      <NuxtLink
        to="/admin/testimonials"
        class="group rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/70 p-5 shadow-lg transition-all hover:border-brand-gold/40 hover:-translate-y-0.5"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Müşteri Yorumları</span>
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
            <MessageSquareHeart class="h-5 w-5" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline space-x-2">
          <span class="font-display text-3xl font-extrabold text-white">
            {{ isLoading ? '...' : metrics.totalTestimonials }}
          </span>
          <span v-if="metrics.pendingTestimonials > 0" class="inline-flex items-center rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
            {{ metrics.pendingTestimonials }} Bekleyen
          </span>
        </div>
        <p class="mt-1 text-[11px] text-slate-400">
          Onaylı ve değerlendirme aşamasındaki geri bildirimler
        </p>
      </NuxtLink>
    </div>

    <!-- Son Teklif Talepleri & Hızlı İşlemler Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- Son Talepler Tablosu (8 Col) -->
      <div class="lg:col-span-8 rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl">
        <div class="flex items-center justify-between pb-4 border-b border-brand-anthracite-border/70">
          <div>
            <h2 class="font-display text-base font-bold text-white">
              Son Gelen Keşif Talepleri
            </h2>
            <p class="text-xs text-slate-400">
              Müşterilerin yerinde inceleme için bıraktığı en son 5 talep
            </p>
          </div>
          <NuxtLink
            to="/admin/quotes"
            class="text-xs font-semibold text-brand-gold hover:underline flex items-center"
          >
            Tümünü Gör
            <ArrowRight class="ml-1 h-3.5 w-3.5" />
          </NuxtLink>
        </div>

        <!-- Table / List -->
        <div v-if="isLoading" class="py-12 text-center text-xs text-slate-400">
          <Loader2 class="mx-auto h-6 w-6 animate-spin text-brand-gold mb-2" />
          <span>Veriler yükleniyor...</span>
        </div>

        <div v-else-if="recentQuotes.length === 0" class="py-12 text-center text-xs text-slate-400">
          <Inbox class="mx-auto h-10 w-10 text-slate-600 mb-2" />
          <p class="font-medium text-slate-300">Henüz teklif talebi bulunmuyor.</p>
          <p class="text-[11px] text-slate-500 mt-1">Gelen talepler otomatik olarak burada listelenecektir.</p>
        </div>

        <div v-else class="divide-y divide-brand-anthracite-border/60">
          <div
            v-for="quote in recentQuotes"
            :key="quote.id"
            class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div class="space-y-1">
              <div class="flex items-center space-x-2">
                <span class="font-semibold text-sm text-white">{{ quote.full_name }}</span>
                <span class="text-xs text-slate-400">· {{ quote.district }}</span>
              </div>
              <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <a :href="`tel:${quote.phone}`" class="text-brand-gold hover:underline font-mono">
                  {{ quote.phone }}
                </a>
                <span>•</span>
                <span class="text-slate-300">{{ quote.service_title || quote.service_slug }}</span>
                <span v-if="quote.estimated_area" class="text-slate-500">({{ quote.estimated_area }} m²)</span>
              </div>
              <p v-if="quote.notes" class="text-xs text-slate-400 line-clamp-1 italic">
                "{{ quote.notes }}"
              </p>
            </div>

            <div class="flex items-center space-x-3 shrink-0">
              <!-- Durum Rozeti -->
              <span
                class="px-2.5 py-1 rounded-lg text-xs font-semibold"
                :class="getStatusBadgeClass(quote.status)"
              >
                {{ getStatusLabel(quote.status) }}
              </span>

              <NuxtLink
                :to="`/admin/quotes?id=${quote.id}`"
                class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                Detay
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Hızlı İşlemler Kartı (4 Col) -->
      <div class="lg:col-span-4 space-y-6">
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl">
          <h2 class="font-display text-base font-bold text-white mb-1">
            Hızlı Yönetim İşlemleri
          </h2>
          <p class="text-xs text-slate-400 mb-4">
            Sık kullanılan içerik ve yönetim bağlantıları
          </p>

          <div class="space-y-2.5">
            <NuxtLink
              to="/admin/services"
              class="flex items-center justify-between rounded-xl border border-brand-anthracite-border/70 bg-brand-black/60 p-3 text-xs font-medium text-slate-200 hover:border-brand-gold hover:text-white transition-colors"
            >
              <div class="flex items-center space-x-3">
                <Layers class="h-4 w-4 text-brand-gold" />
                <span>Hizmet Ekle veya Düzenle</span>
              </div>
              <ArrowRight class="h-3.5 w-3.5 text-slate-500" />
            </NuxtLink>

            <NuxtLink
              to="/admin/projects"
              class="flex items-center justify-between rounded-xl border border-brand-anthracite-border/70 bg-brand-black/60 p-3 text-xs font-medium text-slate-200 hover:border-brand-gold hover:text-white transition-colors"
            >
              <div class="flex items-center space-x-3">
                <FolderKanban class="h-4 w-4 text-brand-gold" />
                <span>Yeni Proje / Portföy Ekle</span>
              </div>
              <ArrowRight class="h-3.5 w-3.5 text-slate-500" />
            </NuxtLink>

            <NuxtLink
              to="/admin/gallery"
              class="flex items-center justify-between rounded-xl border border-brand-anthracite-border/70 bg-brand-black/60 p-3 text-xs font-medium text-slate-200 hover:border-brand-gold hover:text-white transition-colors"
            >
              <div class="flex items-center space-x-3">
                <Images class="h-4 w-4 text-brand-gold" />
                <span>Görsel Yükle & Galeri Yönet</span>
              </div>
              <ArrowRight class="h-3.5 w-3.5 text-slate-500" />
            </NuxtLink>

            <NuxtLink
              to="/admin/settings"
              class="flex items-center justify-between rounded-xl border border-brand-anthracite-border/70 bg-brand-black/60 p-3 text-xs font-medium text-slate-200 hover:border-brand-gold hover:text-white transition-colors"
            >
              <div class="flex items-center space-x-3">
                <Sliders class="h-4 w-4 text-brand-gold" />
                <span>İletişim & WhatsApp Numarası</span>
              </div>
              <ArrowRight class="h-3.5 w-3.5 text-slate-500" />
            </NuxtLink>
          </div>
        </div>

        <!-- Sistem ve Güvenlik Durumu Kartı -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-black/40 p-5 text-xs text-slate-400 space-y-3">
          <div class="flex items-center justify-between text-slate-300 font-semibold">
            <span class="flex items-center">
              <ShieldCheck class="mr-1.5 h-4 w-4 text-emerald-400" />
              Sistem Durumu
            </span>
            <span class="text-emerald-400 text-[11px]">Güvenli & Çevrimiçi</span>
          </div>
          <p class="text-[11px] leading-relaxed">
            Veritabanı Satır Düzeyi Güvenlik (RLS) devrede. Müşteri teklifleri anonim okumaya tamamen kapalıdır.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ClipboardList,
  Layers,
  FolderKanban,
  MessageSquareHeart,
  RefreshCw,
  Inbox,
  ArrowRight,
  Loader2,
  AlertCircle,
  Images,
  Sliders,
  ShieldCheck
} from 'lucide-vue-next'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useSupabase } from '~/composables/useSupabase'
import type { Database } from '~/types/database'

type QuoteRequest = Database['public']['Tables']['quote_requests']['Row']

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Genel Bakış | Atalaylar Dekorasyon Yönetim Paneli',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const { profile } = useAdminAuth()
const { client } = useSupabase()

const isLoading = ref(true)
const isRefreshing = ref(false)
const fetchError = ref('')

const metrics = ref({
  totalQuotes: 0,
  newQuotes: 0,
  totalServices: 0,
  totalProjects: 0,
  totalTestimonials: 0,
  pendingTestimonials: 0
})

const recentQuotes = ref<QuoteRequest[]>([])

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'new': return 'Yeni Talep'
    case 'scheduled': return 'İnceleniyor / Randevu'
    case 'contacted': return 'İletişime Geçildi'
    case 'completed': return 'Tamamlandı'
    case 'cancelled': return 'İptal'
    default: return status
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'new': return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
    case 'scheduled': return 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
    case 'contacted': return 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
    case 'completed': return 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
    case 'cancelled': return 'bg-slate-500/15 text-slate-400 border border-slate-500/30'
    default: return 'bg-slate-700 text-slate-300'
  }
}

const fetchDashboardData = async () => {
  if (!client) return
  fetchError.value = ''
  isRefreshing.value = true

  try {
    // 1. Teklifleri çek
    const { data: quotes, count: totalQuotesCount, error: qErr } = await client
      .from('quote_requests')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5)

    if (qErr) throw qErr
    recentQuotes.value = quotes || []
    metrics.value.totalQuotes = totalQuotesCount || 0

    // Yeni olanların sayısını bul
    const { count: newCount } = await client
      .from('quote_requests')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'new')
    metrics.value.newQuotes = newCount || 0

    // 2. Hizmetleri say
    const { count: sCount } = await client
      .from('services')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
    metrics.value.totalServices = sCount || 0

    // 3. Projeleri say
    const { count: pCount } = await client
      .from('projects')
      .select('id', { count: 'exact', head: true })
      .eq('is_published', true)
    metrics.value.totalProjects = pCount || 0

    // 4. Yorumları say
    const { count: tCount } = await client
      .from('testimonials')
      .select('id', { count: 'exact', head: true })
    metrics.value.totalTestimonials = tCount || 0

    const { count: pendingTCount } = await client
      .from('testimonials')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', false)
    metrics.value.pendingTestimonials = pendingTCount || 0
  } catch (err: unknown) {
    const e = err as Error
    console.error('Dashboard veri çekme hatası:', e)
    fetchError.value = 'Veriler yüklenirken bir sorun oluştu: ' + (e.message || 'Lütfen bağlantıyı kontrol ediniz.')
  } finally {
    isLoading.value = false
    isRefreshing.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

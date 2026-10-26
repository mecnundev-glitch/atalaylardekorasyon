<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center">
          <FolderKanban class="mr-2.5 h-6 w-6 text-brand-gold" />
          Proje ve Portföy Yönetimi
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          İzmir genelinde tamamlanan dekorasyon, alçı, çatı ve yalıtım projelerini yönetin
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
          :disabled="isLoading"
          @click="fetchProjects"
        >
          <RefreshCw class="mr-1.5 h-3.5 w-3.5 text-brand-gold" :class="{ 'animate-spin': isLoading }" />
          <span>Yenile</span>
        </button>

        <button
          type="button"
          class="inline-flex items-center rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-4 py-2 text-xs font-bold text-brand-black shadow-gold-sm hover:brightness-110 transition-all min-h-[38px]"
          @click="openCreateModal"
        >
          <Plus class="mr-1.5 h-4 w-4" />
          <span>Yeni Proje Ekle</span>
        </button>
      </div>
    </div>

    <!-- Feedback Message -->
    <div
      v-if="feedbackMessage"
      class="rounded-2xl border p-4 text-xs flex items-center justify-between transition-all"
      :class="feedbackType === 'success'
        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
        : 'border-rose-500/40 bg-rose-500/10 text-rose-300'"
      role="alert"
    >
      <div class="flex items-center space-x-2">
        <CheckCircle2 v-if="feedbackType === 'success'" class="h-4 w-4 text-emerald-400 shrink-0" />
        <AlertCircle v-else class="h-4 w-4 text-rose-400 shrink-0" />
        <span>{{ feedbackMessage }}</span>
      </div>
      <button class="text-xs font-semibold opacity-70 hover:opacity-100" @click="feedbackMessage = ''">
        Kapat
      </button>
    </div>

    <!-- Toolbar: Search & Category Filter -->
    <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-4">
      <div class="relative flex-1 max-w-md">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Proje başlığı, ilçe veya detay ara..."
          class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
        >
      </div>

      <!-- Category Filter -->
      <div class="flex items-center space-x-2">
        <select
          v-model="selectedCategory"
          class="rounded-xl border border-brand-anthracite-border bg-brand-black px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-gold"
        >
          <option value="all">Tüm Kategoriler</option>
          <option value="alci">Alçı & Asma Tavan</option>
          <option value="boya">Boya & Badana</option>
          <option value="siva">Sıva & Duvar</option>
          <option value="cati">Çatı İzolasyonu</option>
          <option value="yalitim">Su & Isı Yalıtımı</option>
          <option value="tadilat">Komple Tadilat</option>
        </select>

        <span class="text-xs text-slate-400">({{ filteredProjects.length }} Proje)</span>
      </div>
    </div>

    <!-- Projects Grid / Table -->
    <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 shadow-xl overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoading" class="py-16 text-center text-xs text-slate-400">
        <Loader2 class="mx-auto h-8 w-8 animate-spin text-brand-gold mb-3" />
        <p class="font-medium text-slate-200">Projeler veritabanından alınıyor...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProjects.length === 0" class="py-16 text-center text-xs text-slate-400">
        <FolderKanban class="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p class="text-sm font-bold text-slate-200">Proje Bulunamadı</p>
        <p class="mt-1 text-slate-500">Aramanıza uygun bir proje kaydı yok veya portföy boş.</p>
      </div>

      <!-- Table Body -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-brand-anthracite-border bg-brand-black-soft/70 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <th class="py-3.5 px-4 w-20">Görsel</th>
              <th class="py-3.5 px-4">Proje Başlığı & Lokasyon</th>
              <th class="py-3.5 px-4">Kategori / Hizmet</th>
              <th class="py-3.5 px-4">Süre</th>
              <th class="py-3.5 px-4 text-center">Öne Çıkan</th>
              <th class="py-3.5 px-4 text-center">Yayın</th>
              <th class="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-anthracite-border/60">
            <tr
              v-for="proj in filteredProjects"
              :key="proj.id"
              class="hover:bg-brand-anthracite/40 transition-colors"
            >
              <!-- Görsel Önizleme -->
              <td class="py-3 px-4">
                <img
                  :src="proj.after_image_url || '/images/hero-decoration.jpg'"
                  :alt="proj.title"
                  class="h-12 w-16 object-cover rounded-lg border border-brand-anthracite-border bg-brand-black"
                >
              </td>

              <!-- Başlık ve Lokasyon -->
              <td class="py-3 px-4">
                <span class="font-bold text-white text-sm block">{{ proj.title }}</span>
                <span class="text-xs text-brand-gold-light mt-0.5 block">{{ proj.location }}</span>
              </td>

              <!-- Kategori / Hizmet -->
              <td class="py-3 px-4">
                <span class="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-anthracite text-slate-300 border border-brand-anthracite-border mb-1">
                  {{ proj.category.toUpperCase() }}
                </span>
                <span class="text-slate-400 block text-[11px]">{{ proj.service_title }}</span>
              </td>

              <!-- Süre -->
              <td class="py-3 px-4 whitespace-nowrap text-slate-300">
                {{ proj.completion_duration }}
              </td>

              <!-- Öne Çıkan Toggle -->
              <td class="py-3 px-4 text-center">
                <button
                  type="button"
                  class="p-1.5 rounded-lg transition-colors"
                  :class="proj.is_featured ? 'text-brand-gold bg-brand-gold/10' : 'text-slate-600 hover:text-slate-400'"
                  :title="proj.is_featured ? 'Öne Çıkarıldı (Tıkla kaldır)' : 'Öne Çıkar'"
                  @click="toggleFeatured(proj)"
                >
                  <Star class="h-4 w-4" :class="{ 'fill-brand-gold': proj.is_featured }" />
                </button>
              </td>

              <!-- Yayın Toggle -->
              <td class="py-3 px-4 text-center">
                <button
                  type="button"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer"
                  :class="proj.is_published
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-500/15 text-slate-400 border border-slate-600'"
                  @click="togglePublish(proj)"
                >
                  <span class="mr-1.5 h-1.5 w-1.5 rounded-full" :class="proj.is_published ? 'bg-emerald-400' : 'bg-slate-400'" />
                  {{ proj.is_published ? 'Yayında' : 'Taslak' }}
                </button>
              </td>

              <!-- İşlemler -->
              <td class="py-3 px-4 text-right whitespace-nowrap space-x-1">
                <NuxtLink
                  :to="`/projeler/${proj.slug}`"
                  target="_blank"
                  class="inline-flex items-center rounded-lg border border-brand-anthracite-border bg-brand-anthracite p-1.5 text-slate-400 hover:text-white hover:border-brand-gold transition-colors"
                  title="Sitede Görüntüle"
                >
                  <ExternalLink class="h-3.5 w-3.5" />
                </NuxtLink>
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite px-2.5 py-1 text-xs font-semibold text-slate-200 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  @click="openEditModal(proj)"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 transition-colors"
                  title="Projeyi Sil"
                  @click="confirmDelete(proj)"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Proje Ekle / Düzenle Modalı -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-3xl rounded-3xl border border-brand-anthracite-border bg-brand-black-soft p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-brand-anthracite-border/80 pb-4">
          <h3 class="font-display text-lg font-bold text-white">
            {{ isEditing ? 'Projeyi Düzenle' : 'Yeni Proje / Portföy Ekle' }}
          </h3>
          <button
            type="button"
            class="rounded-lg p-1.5 text-slate-400 hover:text-white"
            @click="isModalOpen = false"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <form class="mt-6 space-y-4 text-xs" @submit.prevent="saveProject">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Proje Başlığı *</label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="Örn: Karşıyaka Salon Asma Tavan ve Boya"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                @input="onTitleInput"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">URL Slug *</label>
              <input
                v-model="form.slug"
                type="text"
                required
                placeholder="karsiyaka-salon-asma-tavan"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs font-mono text-brand-gold focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Kategori *</label>
              <select
                v-model="form.category"
                required
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
                <option value="alci">Alçı & Asma Tavan</option>
                <option value="boya">Boya & Badana</option>
                <option value="siva">Sıva & Duvar</option>
                <option value="cati">Çatı İzolasyonu</option>
                <option value="yalitim">Su & Isı Yalıtımı</option>
                <option value="tadilat">Komple Tadilat</option>
              </select>
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Lokasyon / İlçe *</label>
              <input
                v-model="form.location"
                type="text"
                required
                placeholder="Karşıyaka / İzmir"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Uygulama Süresi *</label>
              <input
                v-model="form.completion_duration"
                type="text"
                required
                placeholder="Örn: 5 İş Günü"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">İlişkili Hizmet Slug *</label>
              <input
                v-model="form.service_slug"
                type="text"
                required
                placeholder="alci-uygulamalari"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">İlişkili Hizmet Başlığı *</label>
              <input
                v-model="form.service_title"
                type="text"
                required
                placeholder="Alçı Uygulamaları"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Sonraki (After) Görsel URL *</label>
              <input
                v-model="form.after_image_url"
                type="text"
                required
                placeholder="/images/hero-decoration.jpg"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Önceki (Before) Görsel URL (İsteğe Bağlı)</label>
              <input
                v-model="form.before_image_url"
                type="text"
                placeholder="/images/hero-decoration.jpg"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">Proje Özeti *</label>
            <textarea
              v-model="form.summary"
              rows="2"
              required
              placeholder="Karşıyaka'da 45 m² salon için modern geometrik asma tavan çalışması..."
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">Uygulama Detayları ve Açıklama *</label>
            <textarea
              v-model="form.details"
              rows="4"
              required
              placeholder="Lazer terazi ile kot dengelenerek neme dayanıklı alçıpan paneller vidalandı..."
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <!-- Toggles -->
          <div class="flex flex-wrap gap-5 pt-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="form.is_published"
                type="checkbox"
                class="h-4 w-4 rounded border-brand-anthracite-border bg-brand-anthracite text-brand-gold focus:ring-brand-gold"
              >
              <span class="text-slate-300 font-medium">Sitede Yayına Al (Aktif)</span>
            </label>

            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="form.is_featured"
                type="checkbox"
                class="h-4 w-4 rounded border-brand-anthracite-border bg-brand-anthracite text-brand-gold focus:ring-brand-gold"
              >
              <span class="text-slate-300 font-medium">Ana Sayfada Öne Çıkar</span>
            </label>
          </div>

          <div class="mt-6 flex items-center justify-end space-x-3 pt-4 border-t border-brand-anthracite-border/70">
            <button
              type="button"
              class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              @click="isModalOpen = false"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-5 py-2 text-xs font-bold text-brand-black hover:brightness-110 shadow-gold-sm min-h-[38px]"
            >
              {{ isSaving ? 'Kaydediliyor...' : (isEditing ? 'Projeyi Güncelle' : 'Projeyi Ekle') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div
      v-if="projectToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md rounded-3xl border border-rose-500/40 bg-brand-black-soft p-6 shadow-2xl">
        <div class="flex items-center space-x-3 text-rose-400">
          <AlertCircle class="h-6 w-6" />
          <h3 class="font-display text-base font-bold text-white">
            Projeyi Sil
          </h3>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-300">
          <strong class="text-white">{{ projectToDelete.title }}</strong> adlı projeyi portföyden kalıcı olarak silmek istediğinize emin misiniz?
        </p>
        <p class="mt-1 text-[11px] text-rose-400 font-semibold">
          ⚠ Bu işlem geri alınamaz! Projeye ait galeri görselleri de silinecektir.
        </p>

        <div class="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            @click="projectToDelete = null"
          >
            Vazgeç
          </button>
          <button
            type="button"
            class="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 shadow-lg"
            :disabled="isDeleting"
            @click="executeDelete"
          >
            {{ isDeleting ? 'Siliniyor...' : 'Evet, Kalıcı Olarak Sil' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  FolderKanban,
  Search,
  Plus,
  RefreshCw,
  Loader2,
  Trash2,
  Star,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-vue-next'
import { useSupabase } from '~/composables/useSupabase'
interface ProjectRow {
  id: string
  title: string
  slug: string
  category: string
  service_id?: string | null
  service_slug: string
  service_title: string
  location: string
  completion_duration: string
  completion_date?: string | null
  summary: string
  details: string
  before_image_url?: string | null
  after_image_url: string
  is_featured: boolean
  is_published: boolean
  display_order: number
  created_at: string
  updated_at: string
  features?: any
  gallery_images?: any
}

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Proje ve Portföy Yönetimi | Atalaylar Dekorasyon Admin',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const { client } = useSupabase()

const projects = ref<ProjectRow[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const searchQuery = ref('')
const selectedCategory = ref<string>('all')
const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

const isModalOpen = ref(false)
const isEditing = ref(false)
const currentId = ref<string | null>(null)
const projectToDelete = ref<ProjectRow | null>(null)

const form = ref({
  title: '',
  slug: '',
  category: 'alci',
  service_slug: 'alci-uygulamalari',
  service_title: 'Alçı Uygulamaları',
  location: 'İzmir',
  completion_duration: '5 İş Günü',
  summary: '',
  details: '',
  before_image_url: '',
  after_image_url: '/images/hero-decoration.jpg',
  is_featured: false,
  is_published: true,
  display_order: 1
})

const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    if (selectedCategory.value !== 'all' && p.category !== selectedCategory.value) {
      return false
    }
    if (!searchQuery.value.trim()) return true
    const q = searchQuery.value.toLowerCase().trim()
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.details.toLowerCase().includes(q)
    )
  })
})

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const onTitleInput = () => {
  if (!isEditing.value) {
    form.value.slug = generateSlug(form.value.title)
  }
}

const fetchProjects = async () => {
  if (!client) return
  isLoading.value = true
  feedbackMessage.value = ''

  try {
    const { data, error } = await client
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    projects.value = (data as any) || []
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Projeler yüklenirken hata oluştu: ' + e.message
  } finally {
    isLoading.value = false
  }
}

const openCreateModal = () => {
  isEditing.value = false
  currentId.value = null
  form.value = {
    title: '',
    slug: '',
    category: 'alci',
    service_slug: 'alci-uygulamalari',
    service_title: 'Alçı Uygulamaları',
    location: 'Karşıyaka / İzmir',
    completion_duration: '5 İş Günü',
    summary: '',
    details: '',
    before_image_url: '',
    after_image_url: '/images/hero-decoration.jpg',
    is_featured: false,
    is_published: true,
    display_order: projects.value.length + 1
  }
  isModalOpen.value = true
}

const openEditModal = (p: ProjectRow) => {
  isEditing.value = true
  currentId.value = p.id
  form.value = {
    title: p.title,
    slug: p.slug,
    category: p.category,
    service_slug: p.service_slug,
    service_title: p.service_title,
    location: p.location,
    completion_duration: p.completion_duration,
    summary: p.summary,
    details: p.details,
    before_image_url: p.before_image_url || '',
    after_image_url: p.after_image_url,
    is_featured: p.is_featured,
    is_published: p.is_published,
    display_order: p.display_order
  }
  isModalOpen.value = true
}

const saveProject = async () => {
  if (!client) return
  isSaving.value = true
  feedbackMessage.value = ''

  try {
    if (isEditing.value && currentId.value) {
      const { error } = await (client as any)
        .from('projects')
        .update({
          title: form.value.title,
          slug: form.value.slug,
          category: form.value.category as any,
          service_slug: form.value.service_slug,
          service_title: form.value.service_title,
          location: form.value.location,
          completion_duration: form.value.completion_duration,
          summary: form.value.summary,
          details: form.value.details,
          before_image_url: form.value.before_image_url || null,
          after_image_url: form.value.after_image_url,
          is_featured: form.value.is_featured,
          is_published: form.value.is_published,
          display_order: form.value.display_order
        })
        .eq('id', currentId.value)

      if (error) throw error
      feedbackType.value = 'success'
      feedbackMessage.value = 'Proje başarıyla güncellendi.'
    } else {
      const { error } = await (client as any)
        .from('projects')
        .insert({
          title: form.value.title,
          slug: form.value.slug,
          category: form.value.category as any,
          service_slug: form.value.service_slug,
          service_title: form.value.service_title,
          location: form.value.location,
          completion_duration: form.value.completion_duration,
          summary: form.value.summary,
          details: form.value.details,
          before_image_url: form.value.before_image_url || null,
          after_image_url: form.value.after_image_url,
          is_featured: form.value.is_featured,
          is_published: form.value.is_published,
          is_demo: false,
          display_order: form.value.display_order,
          materials_used: []
        })

      if (error) throw error
      feedbackType.value = 'success'
      feedbackMessage.value = 'Yeni proje başarıyla eklendi.'
    }

    isModalOpen.value = false
    await fetchProjects()
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Kayıt sırasında hata oluştu: ' + e.message
  } finally {
    isSaving.value = false
  }
}

const toggleFeatured = async (p: ProjectRow) => {
  if (!client) return
  const newFeatured = !p.is_featured

  try {
    const { error } = await (client as any)
      .from('projects')
      .update({ is_featured: newFeatured })
      .eq('id', p.id)

    if (error) throw error
    p.is_featured = newFeatured
    feedbackType.value = 'success'
    feedbackMessage.value = `"${p.title}" ${newFeatured ? 'öne çıkarıldı' : 'öne çıkanlardan kaldırıldı'}.`
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Öne çıkan durumu değiştirilemedi: ' + e.message
  }
}

const togglePublish = async (p: ProjectRow) => {
  if (!client) return
  const newPublished = !p.is_published

  try {
    const { error } = await (client as any)
      .from('projects')
      .update({ is_published: newPublished })
      .eq('id', p.id)

    if (error) throw error
    p.is_published = newPublished
    feedbackType.value = 'success'
    feedbackMessage.value = `"${p.title}" ${newPublished ? 'yayına alındı' : 'taslağa alındı'}.`
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Yayın durumu değiştirilemedi: ' + e.message
  }
}

const confirmDelete = (p: ProjectRow) => {
  projectToDelete.value = p
}

const executeDelete = async () => {
  if (!client || !projectToDelete.value) return
  isDeleting.value = true

  try {
    const { error } = await (client as any)
      .from('projects')
      .delete()
      .eq('id', projectToDelete.value.id)

    if (error) throw error
    projects.value = projects.value.filter(p => p.id !== projectToDelete.value?.id)
    feedbackType.value = 'success'
    feedbackMessage.value = 'Proje portföyden silindi.'
    projectToDelete.value = null
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Silme işlemi başarısız: ' + e.message
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

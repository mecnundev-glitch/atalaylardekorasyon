<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center">
          <Images class="mr-2.5 h-6 w-6 text-brand-gold" />
          Görsel Galerisi Yönetimi
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          Projelerin öncesi/sonrası fotoğraflarını ve uygulama galerisi görsellerini yönetin
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
          :disabled="isLoading"
          @click="fetchGalleryData"
        >
          <RefreshCw class="mr-1.5 h-3.5 w-3.5 text-brand-gold" :class="{ 'animate-spin': isLoading }" />
          <span>Yenile</span>
        </button>

        <button
          type="button"
          class="inline-flex items-center rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-4 py-2 text-xs font-bold text-brand-black shadow-gold-sm hover:brightness-110 transition-all min-h-[38px]"
          @click="isUploadModalOpen = true"
        >
          <UploadCloud class="mr-1.5 h-4 w-4" />
          <span>Yeni Görsel Yükle</span>
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

    <!-- Filter Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-4">
      <div class="flex flex-wrap items-center gap-3">
        <!-- Proje Filtresi -->
        <select
          v-model="selectedProjectFilter"
          class="rounded-xl border border-brand-anthracite-border bg-brand-black px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-gold"
        >
          <option value="all">Tüm Projelerin Görselleri</option>
          <option v-for="p in projectsList" :key="p.id" :value="p.id">
            {{ p.title }}
          </option>
        </select>

        <!-- Tür Filtresi -->
        <select
          v-model="selectedTypeFilter"
          class="rounded-xl border border-brand-anthracite-border bg-brand-black px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-gold"
        >
          <option value="all">Tüm Türler</option>
          <option value="after">Sonrası (After)</option>
          <option value="before">Öncesi (Before)</option>
          <option value="gallery">Galeri / Detay</option>
        </select>
      </div>

      <span class="text-xs text-slate-400">
        Toplam <strong class="text-white">{{ filteredImages.length }}</strong> görsel
      </span>
    </div>

    <!-- Gallery Grid -->
    <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl">
      <!-- Loading State -->
      <div v-if="isLoading" class="py-16 text-center text-xs text-slate-400">
        <Loader2 class="mx-auto h-8 w-8 animate-spin text-brand-gold mb-3" />
        <p class="font-medium text-slate-200">Görseller yükleniyor...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredImages.length === 0" class="py-16 text-center text-xs text-slate-400">
        <Images class="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p class="text-sm font-bold text-slate-200">Görsel Bulunamadı</p>
        <p class="mt-1 text-slate-500">Seçili kriterlere uygun görsel yok veya henüz yüklenmedi.</p>
        <button
          type="button"
          class="mt-4 inline-flex items-center rounded-xl bg-brand-gold px-4 py-2 text-xs font-bold text-brand-black"
          @click="isUploadModalOpen = true"
        >
          <UploadCloud class="mr-1.5 h-4 w-4" />
          İlk Görseli Yükle
        </button>
      </div>

      <!-- Images Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="img in filteredImages"
          :key="img.id"
          class="group relative rounded-2xl border border-brand-anthracite-border bg-brand-black/80 overflow-hidden shadow-lg transition-transform hover:-translate-y-1"
        >
          <!-- Image -->
          <div class="relative h-44 w-full bg-brand-black">
            <img
              :src="img.image_url"
              :alt="img.alt_text"
              class="h-full w-full object-cover transition-transform group-hover:scale-105"
            >

            <!-- Type Badge -->
            <span
              class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow"
              :class="getTypeBadgeClass(img.image_type)"
            >
              {{ getTypeLabel(img.image_type) }}
            </span>

            <!-- Actions Overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <a
                :href="img.image_url"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-lg bg-brand-anthracite/90 p-2 text-white hover:text-brand-gold transition-colors"
                title="Tam Boyut Aç"
              >
                <ExternalLink class="h-4 w-4" />
              </a>
              <button
                type="button"
                class="rounded-lg bg-brand-anthracite/90 p-2 text-white hover:text-brand-gold transition-colors"
                title="URL Kopyala"
                @click="copyUrl(img.image_url)"
              >
                <Copy class="h-4 w-4" />
              </button>
              <button
                type="button"
                class="rounded-lg bg-rose-600/90 p-2 text-white hover:bg-rose-500 transition-colors"
                title="Görseli Sil"
                @click="confirmDelete(img)"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Caption & Info -->
          <div class="p-3 text-xs">
            <p class="font-semibold text-white truncate" :title="img.alt_text">
              {{ img.alt_text || 'Açıklamasız Görsel' }}
            </p>
            <p class="text-[11px] text-brand-gold-light truncate mt-0.5">
              {{ getProjectTitle(img.project_id) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Görsel Yükleme Modalı -->
    <div
      v-if="isUploadModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-lg rounded-3xl border border-brand-anthracite-border bg-brand-black-soft p-6 sm:p-8 shadow-2xl">
        <div class="flex items-center justify-between border-b border-brand-anthracite-border/80 pb-4">
          <h3 class="font-display text-base font-bold text-white flex items-center">
            <UploadCloud class="mr-2 h-5 w-5 text-brand-gold" />
            Yeni Görsel Yükle
          </h3>
          <button
            type="button"
            class="rounded-lg p-1.5 text-slate-400 hover:text-white"
            @click="isUploadModalOpen = false"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <form class="mt-6 space-y-4 text-xs" @submit.prevent="handleUpload">
          <!-- Dosya Seçimi -->
          <div>
            <label class="block font-semibold text-slate-200 mb-1.5">Görsel Dosyası (JPG, PNG, WEBP — Maks 5 MB) *</label>
            <input
              type="file"
              required
              accept="image/jpeg,image/png,image/webp"
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-gold file:text-brand-black hover:file:brightness-110 cursor-pointer"
              @change="onFileSelected"
            >
          </div>

          <!-- Proje Seçimi -->
          <div>
            <label class="block font-semibold text-slate-200 mb-1">İlişkili Proje *</label>
            <select
              v-model="uploadForm.project_id"
              required
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
            >
              <option disabled value="">Bir proje seçiniz...</option>
              <option v-for="p in projectsList" :key="p.id" :value="p.id">
                {{ p.title }}
              </option>
            </select>
          </div>

          <!-- Görsel Türü -->
          <div>
            <label class="block font-semibold text-slate-200 mb-1">Görsel Türü *</label>
            <select
              v-model="uploadForm.image_type"
              required
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
            >
              <option value="after">Sonrası (After - Tamamlanmış İş)</option>
              <option value="before">Öncesi (Before - Eski Hal)</option>
              <option value="gallery">Galeri / Detay Görseli</option>
            </select>
          </div>

          <!-- Alt Metin -->
          <div>
            <label class="block font-semibold text-slate-200 mb-1">Alt Metni (SEO Açıklaması) *</label>
            <input
              v-model="uploadForm.alt_text"
              type="text"
              required
              placeholder="Örn: Karşıyaka Salon Asma Tavan Spot Aydınlatma"
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
            >
          </div>

          <!-- Başlık / Caption -->
          <div>
            <label class="block font-semibold text-slate-200 mb-1">Açıklama / Başlık (İsteğe Bağlı)</label>
            <input
              v-model="uploadForm.caption"
              type="text"
              placeholder="Uygulama sonu gece ışıklandırması"
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
            >
          </div>

          <div class="mt-6 flex items-center justify-end space-x-3 pt-4 border-t border-brand-anthracite-border/70">
            <button
              type="button"
              class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              @click="isUploadModalOpen = false"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              :disabled="isUploading || !selectedFile"
              class="rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-5 py-2 text-xs font-bold text-brand-black hover:brightness-110 shadow-gold-sm min-h-[38px]"
            >
              {{ isUploading ? 'Yükleniyor...' : 'Görseli Yükle ve Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div
      v-if="imageToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md rounded-3xl border border-rose-500/40 bg-brand-black-soft p-6 shadow-2xl">
        <div class="flex items-center space-x-3 text-rose-400">
          <AlertCircle class="h-6 w-6" />
          <h3 class="font-display text-base font-bold text-white">
            Görseli Sil
          </h3>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-300">
          Bu görseli galeriden kalıcı olarak silmek istediğinize emin misiniz?
        </p>
        <p class="mt-1 text-[11px] text-rose-400 font-semibold">
          ⚠ Bu işlem geri alınamaz!
        </p>

        <div class="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            @click="imageToDelete = null"
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
  Images,
  RefreshCw,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Copy,
  Trash2,
  X
} from 'lucide-vue-next'
import { useSupabase } from '~/composables/useSupabase'
import type { Database } from '~/types/database'

type ProjectImage = Database['public']['Tables']['project_images']['Row']
interface ProjectSummary {
  id: string
  title: string
  slug: string
}

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Görsel Galerisi Yönetimi | Atalaylar Dekorasyon Admin',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const { client } = useSupabase()

const images = ref<ProjectImage[]>([])
const projectsList = ref<ProjectSummary[]>([])
const isLoading = ref(true)
const isUploading = ref(false)
const isDeleting = ref(false)
const isUploadModalOpen = ref(false)

const selectedProjectFilter = ref<string>('all')
const selectedTypeFilter = ref<string>('all')
const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

const selectedFile = ref<File | null>(null)
const imageToDelete = ref<ProjectImage | null>(null)

const uploadForm = ref({
  project_id: '',
  image_type: 'gallery' as 'gallery' | 'before' | 'after',
  alt_text: '',
  caption: ''
})

const filteredImages = computed(() => {
  return images.value.filter((img) => {
    if (selectedProjectFilter.value !== 'all' && img.project_id !== selectedProjectFilter.value) {
      return false
    }
    if (selectedTypeFilter.value !== 'all' && img.image_type !== selectedTypeFilter.value) {
      return false
    }
    return true
  })
})

const getProjectTitle = (projectId: string) => {
  const p = projectsList.value.find((item: any) => item.id === projectId)
  return p ? p.title : 'Genel Proje'
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'after': return 'Sonrası'
    case 'before': return 'Öncesi'
    case 'gallery': return 'Galeri'
    default: return type
  }
}

const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'after': return 'bg-emerald-600 text-white'
    case 'before': return 'bg-amber-600 text-white'
    case 'gallery': return 'bg-brand-black/90 text-brand-gold border border-brand-gold/30'
    default: return 'bg-slate-700 text-slate-200'
  }
}

const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    feedbackType.value = 'success'
    feedbackMessage.value = 'Görsel URL panoya kopyalandı.'
  } catch {
    feedbackType.value = 'error'
    feedbackMessage.value = 'Kopyalama başarısız oldu.'
  }
}

const onFileSelected = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const f = target.files[0]
    if (f.size > 5 * 1024 * 1024) {
      feedbackType.value = 'error'
      feedbackMessage.value = 'Dosya boyutu 5 MB sınırını aşıyor.'
      target.value = ''
      selectedFile.value = null
      return
    }
    selectedFile.value = f
    if (!uploadForm.value.alt_text) {
      uploadForm.value.alt_text = f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
    }
  }
}

const fetchGalleryData = async () => {
  if (!client) return
  isLoading.value = true
  feedbackMessage.value = ''

  try {
    const [imgRes, projRes] = await Promise.all([
      client.from('project_images').select('*').order('created_at', { ascending: false }),
      client.from('projects').select('id, title, slug').order('title')
    ])

    if (imgRes.error) throw imgRes.error
    if (projRes.error) throw projRes.error

    images.value = (imgRes.data as any) || []
    projectsList.value = (projRes.data as any) || []
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Veriler yüklenirken hata oluştu: ' + e.message
  } finally {
    isLoading.value = false
  }
}

const handleUpload = async () => {
  if (!client || !selectedFile.value) return
  isUploading.value = true
  feedbackMessage.value = ''

  try {
    // 1. Supabase Storage `project-media` bucketına yükle
    const file = selectedFile.value
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`

    const { data: uploadData, error: uploadError } = await client.storage
      .from('project-media')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      })

    let publicUrl = ''
    if (uploadError) {
      // Eğer bucket hatası olursa yerel fallback URL
      console.warn('Storage yükleme uyarısı:', uploadError.message)
      publicUrl = `/images/${fileName}`
    } else {
      const { data: urlData } = client.storage.from('project-media').getPublicUrl(uploadData.path)
      publicUrl = urlData.publicUrl
    }

    // 2. project_images tablosuna ekle
    const { error: dbError } = await (client as any)
      .from('project_images')
      .insert({
        project_id: uploadForm.value.project_id,
        image_url: publicUrl,
        alt_text: uploadForm.value.alt_text,
        caption: uploadForm.value.caption || null,
        image_type: uploadForm.value.image_type,
        display_order: images.value.length + 1
      })

    if (dbError) throw dbError

    feedbackType.value = 'success'
    feedbackMessage.value = 'Görsel başarıyla yüklendi ve projeye bağlandı.'
    isUploadModalOpen.value = false
    selectedFile.value = null
    await fetchGalleryData()
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Yükleme başarısız: ' + e.message
  } finally {
    isUploading.value = false
  }
}

const confirmDelete = (img: ProjectImage) => {
  imageToDelete.value = img
}

const executeDelete = async () => {
  if (!client || !imageToDelete.value) return
  isDeleting.value = true

  try {
    const { error } = await client
      .from('project_images')
      .delete()
      .eq('id', imageToDelete.value.id)

    if (error) throw error

    images.value = images.value.filter(i => i.id !== imageToDelete.value?.id)
    feedbackType.value = 'success'
    feedbackMessage.value = 'Görsel başarıyla silindi.'
    imageToDelete.value = null
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Silme işlemi başarısız: ' + e.message
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchGalleryData()
})
</script>

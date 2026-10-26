<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center">
          <Layers class="mr-2.5 h-6 w-6 text-brand-gold" />
          Hizmet Yönetimi
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          Sitede sergilenen alçı, boya, çatı ve yalıtım hizmetlerini ekleyin, düzenleyin ve sıralayın
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
          :disabled="isLoading"
          @click="fetchServices"
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
          <span>Yeni Hizmet Ekle</span>
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

    <!-- Search & Filter Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-4">
      <div class="relative flex-1 max-w-md">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Hizmet başlığı veya açıklaması ara..."
          class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
        >
      </div>

      <div class="flex items-center space-x-2 text-xs text-slate-400">
        <span>Toplam: <strong class="text-white">{{ services.length }}</strong> Hizmet</span>
      </div>
    </div>

    <!-- Services Table -->
    <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 shadow-xl overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoading" class="py-16 text-center text-xs text-slate-400">
        <Loader2 class="mx-auto h-8 w-8 animate-spin text-brand-gold mb-3" />
        <p class="font-medium text-slate-200">Hizmetler veritabanından alınıyor...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredServices.length === 0" class="py-16 text-center text-xs text-slate-400">
        <Layers class="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p class="text-sm font-bold text-slate-200">Hizmet Bulunamadı</p>
        <p class="mt-1 text-slate-500">Aramanıza uygun bir hizmet kaydı yok veya liste boş.</p>
      </div>

      <!-- Table Body -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-brand-anthracite-border bg-brand-black-soft/70 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <th class="py-3.5 px-4 w-16 text-center">Sıra</th>
              <th class="py-3.5 px-4">Hizmet Başlığı & Slug</th>
              <th class="py-3.5 px-4">Alt Başlık</th>
              <th class="py-3.5 px-4 w-28 text-center">Yayın Durumu</th>
              <th class="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-anthracite-border/60">
            <tr
              v-for="service in filteredServices"
              :key="service.id"
              class="hover:bg-brand-anthracite/40 transition-colors"
            >
              <!-- Sıra & Sıralama Butonları -->
              <td class="py-3 px-4 text-center">
                <div class="flex items-center justify-center space-x-1">
                  <span class="font-mono font-bold text-slate-300 w-5">{{ service.display_order }}</span>
                  <div class="flex flex-col">
                    <button
                      type="button"
                      class="text-slate-500 hover:text-brand-gold p-0.5"
                      title="Yukarı taşı"
                      @click="changeOrder(service, -1)"
                    >
                      <ChevronUp class="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      class="text-slate-500 hover:text-brand-gold p-0.5"
                      title="Aşağı taşı"
                      @click="changeOrder(service, 1)"
                    >
                      <ChevronDown class="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </td>

              <!-- Başlık ve Slug -->
              <td class="py-3 px-4">
                <span class="font-bold text-white text-sm block">{{ service.title }}</span>
                <span class="font-mono text-[11px] text-brand-gold block mt-0.5">/hizmetlerimiz/{{ service.slug }}</span>
              </td>

              <!-- Alt Başlık -->
              <td class="py-3 px-4 text-slate-300 max-w-xs truncate">
                {{ service.subtitle }}
              </td>

              <!-- Yayın Durumu Toggle -->
              <td class="py-3 px-4 text-center">
                <button
                  type="button"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer"
                  :class="service.is_active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-500/15 text-slate-400 border border-slate-600'"
                  @click="toggleActive(service)"
                >
                  <span class="mr-1.5 h-1.5 w-1.5 rounded-full" :class="service.is_active ? 'bg-emerald-400' : 'bg-slate-400'" />
                  {{ service.is_active ? 'Yayında' : 'Taslak' }}
                </button>
              </td>

              <!-- İşlemler -->
              <td class="py-3 px-4 text-right whitespace-nowrap space-x-1">
                <NuxtLink
                  :to="`/hizmetlerimiz/${service.slug}`"
                  target="_blank"
                  class="inline-flex items-center rounded-lg border border-brand-anthracite-border bg-brand-anthracite p-1.5 text-slate-400 hover:text-white hover:border-brand-gold transition-colors"
                  title="Sitede İncele"
                >
                  <ExternalLink class="h-3.5 w-3.5" />
                </NuxtLink>
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite px-2.5 py-1 text-xs font-semibold text-slate-200 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  @click="openEditModal(service)"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 transition-colors"
                  title="Hizmeti Sil"
                  @click="confirmDelete(service)"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Hizmet Ekleme / Düzenleme Modalı -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-2xl rounded-3xl border border-brand-anthracite-border bg-brand-black-soft p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-brand-anthracite-border/80 pb-4">
          <h3 class="font-display text-lg font-bold text-white">
            {{ isEditing ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle' }}
          </h3>
          <button
            type="button"
            class="rounded-lg p-1.5 text-slate-400 hover:text-white"
            @click="isModalOpen = false"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <form class="mt-6 space-y-4 text-xs" @submit.prevent="saveService">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Hizmet Başlığı *</label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="Örn: Alçı Uygulamaları"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                @input="onTitleInput"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">URL Slug (Kalıcı Bağlantı) *</label>
              <input
                v-model="form.slug"
                type="text"
                required
                placeholder="alci-uygulamalari"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs font-mono text-brand-gold focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">Alt Başlık (Slogan) *</label>
            <input
              v-model="form.subtitle"
              type="text"
              required
              placeholder="Asma Tavan, Gizli Işık Bandı ve Alçıpan Bölme Duvar Sistemleri"
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            >
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">Kısa Açıklama (Kartlar ve Arama İçin) *</label>
            <textarea
              v-model="form.short_description"
              rows="2"
              required
              placeholder="İzmir genelinde asma tavan, LED aydınlatma bantları ve pürüzsüz saten alçı perdahı..."
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">Detaylı Açıklama (Hizmet Sayfası Metni) *</label>
            <textarea
              v-model="form.description"
              rows="4"
              required
              placeholder="Atalaylar Dekorasyon olarak modern mimari standartlara uygun işçilik..."
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">İkon Adı (Lucide)</label>
              <input
                v-model="form.icon_name"
                type="text"
                placeholder="Layers, Paintbrush vb."
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Kapak Görsel URL</label>
              <input
                v-model="form.cover_image_url"
                type="text"
                placeholder="/images/hero-decoration.jpg"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Sıralama No</label>
              <input
                v-model.number="form.display_order"
                type="number"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>
          </div>

          <div class="flex items-center space-x-2 pt-2">
            <input
              id="service-active"
              v-model="form.is_active"
              type="checkbox"
              class="h-4 w-4 rounded border-brand-anthracite-border bg-brand-anthracite text-brand-gold focus:ring-brand-gold"
            >
            <label for="service-active" class="font-medium text-slate-300">
              Bu hizmeti sitede hemen yayına al (Aktif yap)
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
              {{ isSaving ? 'Kaydediliyor...' : (isEditing ? 'Değişiklikleri Güncelle' : 'Hizmeti Ekle') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div
      v-if="serviceToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md rounded-3xl border border-rose-500/40 bg-brand-black-soft p-6 shadow-2xl">
        <div class="flex items-center space-x-3 text-rose-400">
          <AlertCircle class="h-6 w-6" />
          <h3 class="font-display text-base font-bold text-white">
            Hizmeti Sil
          </h3>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-300">
          <strong class="text-white">{{ serviceToDelete.title }}</strong> adlı hizmeti veritabanından kalıcı olarak silmek istediğinize emin misiniz?
        </p>
        <p class="mt-1 text-[11px] text-rose-400 font-semibold">
          ⚠ Bu işlem geri alınamaz! Hizmete ait sayfa 404 verecektir.
        </p>

        <div class="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            @click="serviceToDelete = null"
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
  Layers,
  Search,
  Plus,
  RefreshCw,
  Loader2,
  Trash2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-vue-next'
import { useSupabase } from '~/composables/useSupabase'

interface ServiceRow {
  id: string
  title: string
  slug: string
  subtitle: string
  short_description: string
  description: string
  icon_name: string
  cover_image_url: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
  scope?: any
  process_steps?: any
  technical_standards?: any
  features?: any
}

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Hizmet Yönetimi | Atalaylar Dekorasyon Admin',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const { client } = useSupabase()

const services = ref<ServiceRow[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const searchQuery = ref('')
const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

const isModalOpen = ref(false)
const isEditing = ref(false)
const currentId = ref<string | null>(null)
const serviceToDelete = ref<ServiceRow | null>(null)

const form = ref({
  title: '',
  slug: '',
  subtitle: '',
  short_description: '',
  description: '',
  icon_name: 'Layers',
  cover_image_url: '/images/hero-decoration.jpg',
  is_active: true,
  display_order: 1
})

const filteredServices = computed(() => {
  return services.value.filter((s) => {
    if (!searchQuery.value.trim()) return true
    const q = searchQuery.value.toLowerCase().trim()
    return s.title.toLowerCase().includes(q) || s.slug.includes(q) || s.description.toLowerCase().includes(q)
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

const fetchServices = async () => {
  if (!client) return
  isLoading.value = true
  feedbackMessage.value = ''

  try {
    const { data, error } = await client
      .from('services')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    services.value = (data as any) || []
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Hizmetler yüklenirken hata oluştu: ' + e.message
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
    subtitle: '',
    short_description: '',
    description: '',
    icon_name: 'Layers',
    cover_image_url: '/images/hero-decoration.jpg',
    is_active: true,
    display_order: services.value.length + 1
  }
  isModalOpen.value = true
}

const openEditModal = (s: ServiceRow) => {
  isEditing.value = true
  currentId.value = s.id
  form.value = {
    title: s.title,
    slug: s.slug,
    subtitle: s.subtitle,
    short_description: s.short_description,
    description: s.description,
    icon_name: s.icon_name || 'Layers',
    cover_image_url: s.cover_image_url || '/images/hero-decoration.jpg',
    is_active: s.is_active,
    display_order: s.display_order
  }
  isModalOpen.value = true
}

const saveService = async () => {
  if (!client) return
  isSaving.value = true
  feedbackMessage.value = ''

  try {
    if (isEditing.value && currentId.value) {
      const { error } = await (client as any)
        .from('services')
        .update({
          title: form.value.title,
          slug: form.value.slug,
          subtitle: form.value.subtitle,
          short_description: form.value.short_description,
          description: form.value.description,
          icon_name: form.value.icon_name,
          cover_image_url: form.value.cover_image_url,
          is_active: form.value.is_active,
          display_order: form.value.display_order
        })
        .eq('id', currentId.value)

      if (error) throw error
      feedbackType.value = 'success'
      feedbackMessage.value = 'Hizmet başarıyla güncellendi.'
    } else {
      const { error } = await (client as any)
        .from('services')
        .insert({
          title: form.value.title,
          slug: form.value.slug,
          subtitle: form.value.subtitle,
          short_description: form.value.short_description,
          description: form.value.description,
          icon_name: form.value.icon_name,
          cover_image_url: form.value.cover_image_url,
          is_active: form.value.is_active,
          display_order: form.value.display_order,
          scope: [],
          process_steps: [],
          technical_standards: [],
          features: []
        })

      if (error) throw error
      feedbackType.value = 'success'
      feedbackMessage.value = 'Yeni hizmet başarıyla oluşturuldu.'
    }

    isModalOpen.value = false
    await fetchServices()
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Kayıt sırasında hata oluştu: ' + e.message
  } finally {
    isSaving.value = false
  }
}

const toggleActive = async (service: ServiceRow) => {
  if (!client) return
  const newActive = !service.is_active

  try {
    const { error } = await (client as any)
      .from('services')
      .update({ is_active: newActive })
      .eq('id', service.id)

    if (error) throw error
    service.is_active = newActive
    feedbackType.value = 'success'
    feedbackMessage.value = `"${service.title}" ${newActive ? 'yayına alındı' : 'taslağa çekildi'}.`
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Yayın durumu değiştirilemedi: ' + e.message
  }
}

const changeOrder = async (service: ServiceRow, delta: number) => {
  if (!client) return
  const newOrder = Math.max(1, service.display_order + delta)
  if (newOrder === service.display_order) return

  try {
    const { error } = await (client as any)
      .from('services')
      .update({ display_order: newOrder })
      .eq('id', service.id)

    if (error) throw error
    service.display_order = newOrder
    services.value.sort((a, b) => a.display_order - b.display_order)
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Sıralama güncellenemedi: ' + e.message
  }
}

const confirmDelete = (service: ServiceRow) => {
  serviceToDelete.value = service
}

const executeDelete = async () => {
  if (!client || !serviceToDelete.value) return
  isDeleting.value = true

  try {
    const { error } = await (client as any)
      .from('services')
      .delete()
      .eq('id', serviceToDelete.value.id)

    if (error) throw error
    services.value = services.value.filter(s => s.id !== serviceToDelete.value?.id)
    feedbackType.value = 'success'
    feedbackMessage.value = 'Hizmet başarıyla silindi.'
    serviceToDelete.value = null
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Silme işlemi başarısız: ' + e.message
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchServices()
})
</script>

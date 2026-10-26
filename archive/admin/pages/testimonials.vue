<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center">
          <MessageSquareHeart class="mr-2.5 h-6 w-6 text-brand-gold" />
          Müşteri Yorumları Yönetimi
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          Ziyaretçi geri bildirimlerini inceleyin, onaylayın veya yeni müşteri referansı ekleyin
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
          :disabled="isLoading"
          @click="fetchTestimonials"
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
          <span>Yeni Yorum Ekle</span>
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

    <!-- Filter & Search Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-brand-anthracite-border bg-brand-anthracite/50 p-4">
      <div class="relative flex-1 max-w-md">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Müşteri adı, ilçe veya yorum ara..."
          class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
        >
      </div>

      <!-- Approval Filter Tabs -->
      <div class="flex items-center space-x-1 text-xs">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          type="button"
          class="rounded-lg px-3 py-1.5 font-medium transition-all"
          :class="selectedFilter === tab.value
            ? 'bg-brand-gold text-brand-black font-bold shadow-sm'
            : 'bg-brand-anthracite/80 text-slate-300 hover:bg-brand-anthracite hover:text-white'"
          @click="selectedFilter = tab.value"
        >
          {{ tab.label }}
          <span
            v-if="getTabCount(tab.value) > 0"
            class="ml-1 rounded-full px-1.5 py-0.2 text-[10px]"
            :class="selectedFilter === tab.value ? 'bg-black/20 text-black' : 'bg-brand-black text-slate-400'"
          >
            {{ getTabCount(tab.value) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Testimonials List / Table -->
    <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 shadow-xl overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoading" class="py-16 text-center text-xs text-slate-400">
        <Loader2 class="mx-auto h-8 w-8 animate-spin text-brand-gold mb-3" />
        <p class="font-medium text-slate-200">Müşteri yorumları yükleniyor...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredList.length === 0" class="py-16 text-center text-xs text-slate-400">
        <MessageSquareHeart class="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p class="text-sm font-bold text-slate-200">Yorum Bulunamadı</p>
        <p class="mt-1 text-slate-500">Seçili filtreye uygun bir müşteri yorumu kaydı yok.</p>
      </div>

      <!-- Table Body -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-brand-anthracite-border bg-brand-black-soft/70 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <th class="py-3.5 px-4">Müşteri & İlçe</th>
              <th class="py-3.5 px-4">Hizmet</th>
              <th class="py-3.5 px-4">Puan</th>
              <th class="py-3.5 px-4">Yorum</th>
              <th class="py-3.5 px-4 text-center">Durum</th>
              <th class="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-anthracite-border/60">
            <tr
              v-for="item in filteredList"
              :key="item.id"
              class="hover:bg-brand-anthracite/40 transition-colors"
              :class="{ 'bg-amber-500/5': !item.is_approved }"
            >
              <!-- Müşteri -->
              <td class="py-3 px-4">
                <span class="font-bold text-white block">{{ item.client_name }}</span>
                <span class="text-xs text-slate-400 block mt-0.5">{{ item.district }}</span>
              </td>

              <!-- Hizmet -->
              <td class="py-3 px-4 whitespace-nowrap text-brand-gold font-medium">
                {{ item.service_title }}
              </td>

              <!-- Puan -->
              <td class="py-3 px-4 whitespace-nowrap">
                <div class="flex items-center text-brand-gold">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    class="h-3.5 w-3.5"
                    :class="i <= item.rating ? 'fill-brand-gold text-brand-gold' : 'text-slate-600'"
                  />
                </div>
              </td>

              <!-- Yorum Metni -->
              <td class="py-3 px-4 text-slate-300 max-w-sm truncate" :title="item.comment">
                "{{ item.comment }}"
              </td>

              <!-- Onay Durumu Toggle -->
              <td class="py-3 px-4 text-center whitespace-nowrap">
                <button
                  type="button"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer"
                  :class="item.is_approved
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'"
                  @click="toggleApproval(item)"
                >
                  <span class="mr-1.5 h-1.5 w-1.5 rounded-full" :class="item.is_approved ? 'bg-emerald-400' : 'bg-amber-400'" />
                  {{ item.is_approved ? 'Yayında (Onaylı)' : 'Onay Bekliyor' }}
                </button>
              </td>

              <!-- İşlemler -->
              <td class="py-3 px-4 text-right whitespace-nowrap space-x-1">
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite px-2.5 py-1 text-xs font-semibold text-slate-200 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  @click="openEditModal(item)"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 transition-colors"
                  title="Yorumu Sil"
                  @click="confirmDelete(item)"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Ekleme / Düzenleme Modalı -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-lg rounded-3xl border border-brand-anthracite-border bg-brand-black-soft p-6 sm:p-8 shadow-2xl">
        <div class="flex items-center justify-between border-b border-brand-anthracite-border/80 pb-4">
          <h3 class="font-display text-base font-bold text-white">
            {{ isEditing ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle' }}
          </h3>
          <button
            type="button"
            class="rounded-lg p-1.5 text-slate-400 hover:text-white"
            @click="isModalOpen = false"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <form class="mt-6 space-y-4 text-xs" @submit.prevent="saveTestimonial">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Müşteri Adı *</label>
              <input
                v-model="form.client_name"
                type="text"
                required
                placeholder="Örn: Ahmet Yılmaz veya M. Y****"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">İlçe / Bölge *</label>
              <input
                v-model="form.district"
                type="text"
                required
                placeholder="Karşıyaka / İzmir"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Hizmet Başlığı *</label>
              <input
                v-model="form.service_title"
                type="text"
                required
                placeholder="Asma Tavan & Boya"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Puan (1 - 5) *</label>
              <select
                v-model.number="form.rating"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
                <option :value="5">⭐⭐⭐⭐⭐ 5 Yıldız (Mükemmel)</option>
                <option :value="4">⭐⭐⭐⭐ 4 Yıldız (Çok İyi)</option>
                <option :value="3">⭐⭐⭐ 3 Yıldız (Orta)</option>
                <option :value="2">⭐⭐ 2 Yıldız</option>
                <option :value="1">⭐ 1 Yıldız</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-200 mb-1">Müşteri Yorumu *</label>
            <textarea
              v-model="form.comment"
              rows="4"
              required
              placeholder="Ustalar söz verdikleri gün gelip salon tavanını lazer teraziyle teslim ettiler..."
              class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div class="flex items-center space-x-2 pt-2">
            <input
              id="comment-approved"
              v-model="form.is_approved"
              type="checkbox"
              class="h-4 w-4 rounded border-brand-anthracite-border bg-brand-anthracite text-brand-gold focus:ring-brand-gold"
            >
            <label for="comment-approved" class="font-medium text-slate-300">
              Bu yorumu hemen onayla ve sitede yayınla
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
              {{ isSaving ? 'Kaydediliyor...' : (isEditing ? 'Yorumu Güncelle' : 'Yorumu Ekle') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div
      v-if="itemToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md rounded-3xl border border-rose-500/40 bg-brand-black-soft p-6 shadow-2xl">
        <div class="flex items-center space-x-3 text-rose-400">
          <AlertCircle class="h-6 w-6" />
          <h3 class="font-display text-base font-bold text-white">
            Yorumu Sil
          </h3>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-300">
          <strong class="text-white">{{ itemToDelete.client_name }}</strong> tarafından yapılan bu yorumu silmek istediğinize emin misiniz?
        </p>
        <p class="mt-1 text-[11px] text-rose-400 font-semibold">
          ⚠ Bu işlem geri alınamaz!
        </p>

        <div class="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            @click="itemToDelete = null"
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
  MessageSquareHeart,
  Plus,
  RefreshCw,
  Search,
  Loader2,
  Trash2,
  Star,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-vue-next'
import { useSupabase } from '~/composables/useSupabase'
interface TestimonialRow {
  id: string
  client_name: string
  district: string
  service_title: string
  comment: string
  rating: number
  is_approved: boolean
  display_order: number
  created_at: string
}

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Müşteri Yorumları Yönetimi | Atalaylar Dekorasyon Admin',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const { client } = useSupabase()

const testimonials = ref<TestimonialRow[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const searchQuery = ref('')
const selectedFilter = ref<'all' | 'pending' | 'approved'>('all')

const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

const isModalOpen = ref(false)
const isEditing = ref(false)
const currentId = ref<string | null>(null)
const itemToDelete = ref<TestimonialRow | null>(null)

const form = ref({
  client_name: '',
  district: 'İzmir',
  service_title: 'Alçı & Boya',
  comment: '',
  rating: 5,
  is_approved: true
})

const filterTabs = [
  { label: 'Tümü', value: 'all' as const },
  { label: 'Onay Bekleyenler', value: 'pending' as const },
  { label: 'Onaylanmışlar', value: 'approved' as const }
]

const getTabCount = (tabValue: 'all' | 'pending' | 'approved') => {
  if (tabValue === 'all') return testimonials.value.length
  if (tabValue === 'pending') return testimonials.value.filter(t => !t.is_approved).length
  if (tabValue === 'approved') return testimonials.value.filter(t => t.is_approved).length
  return 0
}

const filteredList = computed(() => {
  return testimonials.value.filter((item) => {
    if (selectedFilter.value === 'pending' && item.is_approved) return false
    if (selectedFilter.value === 'approved' && !item.is_approved) return false

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      return (
        item.client_name.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.service_title.toLowerCase().includes(q) ||
        item.comment.toLowerCase().includes(q)
      )
    }
    return true
  })
})

const fetchTestimonials = async () => {
  if (!client) return
  isLoading.value = true
  feedbackMessage.value = ''

  try {
    const { data, error } = await client
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    testimonials.value = (data as any) || []
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Yorumlar yüklenirken hata oluştu: ' + e.message
  } finally {
    isLoading.value = false
  }
}

const toggleApproval = async (item: TestimonialRow) => {
  if (!client) return
  const newApproved = !item.is_approved

  try {
    const { error } = await (client as any)
      .from('testimonials')
      .update({ is_approved: newApproved })
      .eq('id', item.id)

    if (error) throw error
    item.is_approved = newApproved
    feedbackType.value = 'success'
    feedbackMessage.value = `Yorum ${newApproved ? 'onaylandı ve yayına alındı' : 'onay bekleyene çekildi'}.`
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Onay durumu güncellenemedi: ' + e.message
  }
}

const openCreateModal = () => {
  isEditing.value = false
  currentId.value = null
  form.value = {
    client_name: '',
    district: 'Karşıyaka / İzmir',
    service_title: 'Alçı Uygulamaları',
    comment: '',
    rating: 5,
    is_approved: true
  }
  isModalOpen.value = true
}

const openEditModal = (t: TestimonialRow) => {
  isEditing.value = true
  currentId.value = t.id
  form.value = {
    client_name: t.client_name,
    district: t.district,
    service_title: t.service_title,
    comment: t.comment,
    rating: t.rating,
    is_approved: t.is_approved
  }
  isModalOpen.value = true
}

const saveTestimonial = async () => {
  if (!client) return
  isSaving.value = true
  feedbackMessage.value = ''

  try {
    if (isEditing.value && currentId.value) {
      const { error } = await (client as any)
        .from('testimonials')
        .update({
          client_name: form.value.client_name,
          district: form.value.district,
          service_title: form.value.service_title,
          comment: form.value.comment,
          rating: form.value.rating,
          is_approved: form.value.is_approved
        })
        .eq('id', currentId.value)

      if (error) throw error
      feedbackType.value = 'success'
      feedbackMessage.value = 'Yorum başarıyla güncellendi.'
    } else {
      const { error } = await (client as any)
        .from('testimonials')
        .insert({
          client_name: form.value.client_name,
          district: form.value.district,
          service_title: form.value.service_title,
          comment: form.value.comment,
          rating: form.value.rating,
          is_approved: form.value.is_approved,
          display_order: testimonials.value.length + 1
        })

      if (error) throw error
      feedbackType.value = 'success'
      feedbackMessage.value = 'Yeni yorum başarıyla eklendi.'
    }

    isModalOpen.value = false
    await fetchTestimonials()
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Kayıt sırasında hata oluştu: ' + e.message
  } finally {
    isSaving.value = false
  }
}

const confirmDelete = (t: TestimonialRow) => {
  itemToDelete.value = t
}

const executeDelete = async () => {
  if (!client || !itemToDelete.value) return
  isDeleting.value = true

  try {
    const { error } = await (client as any)
      .from('testimonials')
      .delete()
      .eq('id', itemToDelete.value.id)

    if (error) throw error
    testimonials.value = testimonials.value.filter(t => t.id !== itemToDelete.value?.id)
    feedbackType.value = 'success'
    feedbackMessage.value = 'Yorum başarıyla silindi.'
    itemToDelete.value = null
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Silme işlemi başarısız: ' + e.message
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchTestimonials()
})
</script>

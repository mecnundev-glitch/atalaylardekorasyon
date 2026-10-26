<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center">
          <ClipboardList class="mr-2.5 h-6 w-6 text-brand-gold" />
          Teklif ve Keşif Talepleri
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          Ziyaretçilerin web sitesi üzerinden bıraktığı yerinde inceleme ve fiyat talepleri
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
          :disabled="isLoading"
          @click="fetchQuotes"
        >
          <RefreshCw class="mr-1.5 h-3.5 w-3.5 text-brand-gold" :class="{ 'animate-spin': isLoading }" />
          <span>Yenile</span>
        </button>
      </div>
    </div>

    <!-- Feedback Alerts -->
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
      <!-- Search -->
      <div class="relative flex-1 max-w-md">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Müşteri adı, telefon, ilçe veya not ara..."
          class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
        >
      </div>

      <!-- Status Filters Tabs -->
      <div class="flex flex-wrap gap-1 text-xs">
        <button
          v-for="tab in statusTabs"
          :key="tab.value"
          type="button"
          class="rounded-lg px-2.5 py-1.5 font-medium transition-all"
          :class="selectedStatus === tab.value
            ? 'bg-brand-gold text-brand-black font-bold shadow-sm'
            : 'bg-brand-anthracite/80 text-slate-300 hover:bg-brand-anthracite hover:text-white'"
          @click="selectedStatus = tab.value"
        >
          {{ tab.label }}
          <span
            v-if="getStatusCount(tab.value) > 0"
            class="ml-1 rounded-full px-1.5 py-0.2 text-[10px]"
            :class="selectedStatus === tab.value ? 'bg-black/20 text-black' : 'bg-brand-black text-slate-400'"
          >
            {{ getStatusCount(tab.value) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Quotes Table / Card List -->
    <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 shadow-xl overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoading" class="py-16 text-center text-xs text-slate-400">
        <Loader2 class="mx-auto h-8 w-8 animate-spin text-brand-gold mb-3" />
        <p class="font-medium text-slate-200">Teklif talepleri veritabanından alınıyor...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredQuotes.length === 0" class="py-16 text-center text-xs text-slate-400">
        <Inbox class="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p class="text-sm font-bold text-slate-200">Kayıt Bulunamadı</p>
        <p class="mt-1 text-slate-500">Seçili filtre veya arama kriterine uygun bir teklif talebi yok.</p>
      </div>

      <!-- Table Body -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-brand-anthracite-border bg-brand-black-soft/70 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <th class="py-3.5 px-4">Tarih</th>
              <th class="py-3.5 px-4">Müşteri</th>
              <th class="py-3.5 px-4">İletişim</th>
              <th class="py-3.5 px-4">Hizmet / Bölge</th>
              <th class="py-3.5 px-4">Metraj</th>
              <th class="py-3.5 px-4">Durum</th>
              <th class="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-brand-anthracite-border/60">
            <tr
              v-for="quote in filteredQuotes"
              :key="quote.id"
              class="hover:bg-brand-anthracite/40 transition-colors"
              :class="{ 'bg-brand-gold/5': quote.status === 'new' }"
            >
              <!-- Tarih -->
              <td class="py-3 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                {{ formatDate(quote.created_at) }}
              </td>

              <!-- Müşteri -->
              <td class="py-3 px-4">
                <span class="font-bold text-white block">{{ quote.full_name }}</span>
                <span v-if="quote.attachment_urls && (quote.attachment_urls as any[]).length > 0" class="inline-flex items-center text-[10px] text-brand-gold mt-0.5">
                  <Paperclip class="mr-1 h-3 w-3" />
                  {{ (quote.attachment_urls as any[]).length }} Fotoğraf
                </span>
              </td>

              <!-- İletişim -->
              <td class="py-3 px-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <a
                    :href="`tel:${quote.phone}`"
                    class="font-mono text-brand-gold hover:underline"
                    title="Telefonla Ara"
                  >
                    {{ quote.phone }}
                  </a>
                  <a
                    :href="getQuoteWhatsAppUrl(quote)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-emerald-400 hover:text-emerald-300"
                    title="WhatsApp'tan Yanıtla"
                  >
                    <MessageSquare class="h-3.5 w-3.5" />
                  </a>
                </div>
              </td>

              <!-- Hizmet / Bölge -->
              <td class="py-3 px-4">
                <span class="text-slate-200 block font-medium">{{ quote.service_title || quote.service_slug }}</span>
                <span class="text-[11px] text-slate-400 block">{{ quote.district }} / İzmir</span>
              </td>

              <!-- Metraj -->
              <td class="py-3 px-4 whitespace-nowrap text-slate-300">
                {{ quote.estimated_area ? `${quote.estimated_area} m²` : '-' }}
              </td>

              <!-- Durum Seçici -->
              <td class="py-3 px-4 whitespace-nowrap">
                <select
                  :value="quote.status"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-black px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer"
                  :class="getStatusSelectClass(quote.status)"
                  @change="updateStatus(quote.id, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="new">Yeni Talep</option>
                  <option value="scheduled">İnceleniyor / Randevu</option>
                  <option value="contacted">İletişime Geçildi</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </td>

              <!-- İşlemler -->
              <td class="py-3 px-4 text-right whitespace-nowrap space-x-1">
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite px-2.5 py-1 text-xs font-semibold text-slate-200 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  @click="openDetails(quote)"
                >
                  İncele
                </button>
                <button
                  type="button"
                  class="rounded-lg border border-brand-anthracite-border bg-brand-anthracite p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 transition-colors"
                  title="Talebi Sil"
                  @click="confirmDelete(quote)"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detay İnceleme Modalı -->
    <div
      v-if="selectedQuote"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-2xl rounded-3xl border border-brand-anthracite-border bg-brand-black-soft p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <!-- Modal Header -->
        <div class="flex items-start justify-between border-b border-brand-anthracite-border/80 pb-4">
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-display text-lg font-bold text-white">{{ selectedQuote.full_name }}</span>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-semibold"
                :class="getStatusSelectClass(selectedQuote.status)"
              >
                {{ getStatusLabel(selectedQuote.status) }}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              Talep Kayıt Zamanı: {{ formatDate(selectedQuote.created_at, true) }}
            </p>
          </div>
          <button
            type="button"
            class="rounded-lg p-1.5 text-slate-400 hover:text-white"
            @click="selectedQuote = null"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="mt-6 space-y-5 text-xs">
          <!-- İletişim & Konum Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-brand-anthracite-border/70 bg-brand-black/60 p-4">
            <div>
              <span class="text-slate-400 block font-medium">Telefon Numarası:</span>
              <div class="mt-1 flex items-center space-x-3">
                <a :href="`tel:${selectedQuote.phone}`" class="font-mono text-sm font-bold text-brand-gold hover:underline">
                  {{ selectedQuote.phone }}
                </a>
                <a
                  :href="getQuoteWhatsAppUrl(selectedQuote)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center rounded bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-emerald-500"
                >
                  <MessageSquare class="mr-1 h-3 w-3" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div>
              <span class="text-slate-400 block font-medium">Uygulama Bölgesi:</span>
              <p class="mt-1 font-semibold text-white text-sm">
                {{ selectedQuote.district }} / İzmir
              </p>
            </div>

            <div>
              <span class="text-slate-400 block font-medium">İlgilenilen Hizmet:</span>
              <p class="mt-1 font-semibold text-slate-200">
                {{ selectedQuote.service_title || selectedQuote.service_slug }}
              </p>
            </div>

            <div>
              <span class="text-slate-400 block font-medium">Tahmini Metraj:</span>
              <p class="mt-1 font-semibold text-slate-200">
                {{ selectedQuote.estimated_area ? `${selectedQuote.estimated_area} m²` : 'Belirtilmedi (Yerinde ölçülecek)' }}
              </p>
            </div>
          </div>

          <!-- Müşteri Notu -->
          <div>
            <label class="block font-semibold text-slate-300 mb-1.5">Müşterinin Proje Notları / Özel İstekleri:</label>
            <div class="rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-4 text-slate-200 whitespace-pre-wrap leading-relaxed">
              {{ selectedQuote.notes || 'Açıklama girilmedi.' }}
            </div>
          </div>

          <!-- Eklenen Fotoğraflar -->
          <div v-if="selectedQuote.attachment_urls && (selectedQuote.attachment_urls as string[]).length > 0">
            <label class="block font-semibold text-slate-300 mb-2">Müşterinin Gönderdiği Görseller / Belgeler:</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div
                v-for="(url, idx) in (selectedQuote.attachment_urls as string[])"
                :key="idx"
                class="group relative rounded-xl border border-brand-anthracite-border bg-brand-black/70 overflow-hidden"
              >
                <img
                  v-if="isImageUrl(url)"
                  :src="getAttachmentFullUrl(url)"
                  :alt="`Keşif Görseli ${idx + 1}`"
                  class="h-28 w-full object-cover group-hover:scale-105 transition-transform"
                >
                <div v-else class="h-28 flex flex-col items-center justify-center p-3 text-slate-400">
                  <FileText class="h-8 w-8 text-brand-gold mb-1" />
                  <span class="text-[10px] truncate max-w-full">Ek Dosya (PDF)</span>
                </div>
                <a
                  :href="getAttachmentFullUrl(url)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-semibold"
                >
                  <ExternalLink class="mr-1 h-3.5 w-3.5" />
                  Görüntüle
                </a>
              </div>
            </div>
          </div>

          <!-- Teknik Güvenlik Detayları -->
          <div class="rounded-xl border border-brand-anthracite-border/40 bg-brand-black/40 p-3 text-[11px] text-slate-500 flex flex-wrap justify-between gap-2">
            <span>Talep ID: <code class="text-slate-400">{{ selectedQuote.id }}</code></span>
            <span>IP Özeti (SHA-256): <code class="text-slate-400">{{ selectedQuote.ip_hash?.substring(0, 16) }}...</code></span>
          </div>

          <!-- Durum Güncelleme Butonları -->
          <div class="pt-4 border-t border-brand-anthracite-border/70 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center space-x-2">
              <span class="text-slate-400 font-medium">Durumu Güncelle:</span>
              <select
                :value="selectedQuote.status"
                class="rounded-xl border border-brand-anthracite-border bg-brand-black px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                @change="updateStatus(selectedQuote.id, ($event.target as HTMLSelectElement).value)"
              >
                <option value="new">Yeni Talep</option>
                <option value="scheduled">İnceleniyor / Keşif Randevusu</option>
                <option value="contacted">İletişime Geçildi</option>
                <option value="completed">Tamamlandı (İş Alındı)</option>
                <option value="cancelled">İptal Edildi</option>
              </select>
            </div>

            <div class="flex items-center space-x-2">
              <button
                type="button"
                class="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
                @click="confirmDelete(selectedQuote)"
              >
                Talebi Kalıcı Olarak Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div
      v-if="quoteToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md rounded-3xl border border-rose-500/40 bg-brand-black-soft p-6 shadow-2xl">
        <div class="flex items-center space-x-3 text-rose-400">
          <AlertCircle class="h-6 w-6" />
          <h3 class="font-display text-base font-bold text-white">
            Teklif Talebini Sil
          </h3>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-300">
          <strong class="text-white">{{ quoteToDelete.full_name }}</strong> isimli müşteriye ait teklif talebini silmek istediğinize emin misiniz?
        </p>
        <p class="mt-1 text-[11px] text-rose-400 font-semibold">
          ⚠ Bu işlem geri alınamaz!
        </p>

        <div class="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            class="rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            @click="quoteToDelete = null"
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
  ClipboardList,
  Search,
  RefreshCw,
  Loader2,
  Inbox,
  Paperclip,
  MessageSquare,
  Trash2,
  AlertCircle,
  CheckCircle2,
  FileText,
  ExternalLink
} from 'lucide-vue-next'
import { useSupabase } from '~/composables/useSupabase'

interface QuoteRequest {
  id: string
  full_name: string
  phone: string
  service_id?: string | null
  service_slug?: string | null
  service_title: string
  district: string
  estimated_area?: string | null
  notes?: string | null
  photo_url?: string | null
  attachment_urls?: string[] | null
  status: string
  kvkk_accepted: boolean
  created_at: string
  updated_at: string
  admin_notes?: string | null
  urgency?: string | null
  contact_preference?: string | null
  ip_hash?: string | null
}

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Teklif ve Keşif Talepleri Yönetimi | Atalaylar Dekorasyon Admin',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const route = useRoute()
const { client } = useSupabase()

const quotes = ref<QuoteRequest[]>([])
const isLoading = ref(true)
const isDeleting = ref(false)
const searchQuery = ref('')
const selectedStatus = ref<string>('all')
const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

const selectedQuote = ref<QuoteRequest | null>(null)
const quoteToDelete = ref<QuoteRequest | null>(null)

const statusTabs = [
  { label: 'Tümü', value: 'all' },
  { label: 'Yeni', value: 'new' },
  { label: 'İnceleniyor', value: 'scheduled' },
  { label: 'İletişime Geçildi', value: 'contacted' },
  { label: 'Tamamlandı', value: 'completed' },
  { label: 'İptal', value: 'cancelled' }
]

const getStatusCount = (statusValue: string): number => {
  if (statusValue === 'all') return quotes.value.length
  return quotes.value.filter(q => q.status === statusValue).length
}

const filteredQuotes = computed(() => {
  return quotes.value.filter((q) => {
    // Durum filtresi
    if (selectedStatus.value !== 'all' && q.status !== selectedStatus.value) {
      return false
    }
    // Metin araması
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      const matchName = q.full_name.toLowerCase().includes(query)
      const matchPhone = q.phone.includes(query)
      const matchDistrict = q.district.toLowerCase().includes(query)
      const matchNotes = (q.notes || '').toLowerCase().includes(query)
      const matchService = (q.service_title || q.service_slug || '').toLowerCase().includes(query)
      return matchName || matchPhone || matchDistrict || matchNotes || matchService
    }
    return true
  })
})

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'new': return 'Yeni Talep'
    case 'scheduled': return 'İnceleniyor / Randevu'
    case 'contacted': return 'İletişime Geçildi'
    case 'completed': return 'Tamamlandı'
    case 'cancelled': return 'İptal Edildi'
    default: return status
  }
}

const getStatusSelectClass = (status: string) => {
  switch (status) {
    case 'new': return 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
    case 'scheduled': return 'border-amber-500/50 text-amber-300 bg-amber-500/10'
    case 'contacted': return 'border-sky-500/50 text-sky-400 bg-sky-500/10'
    case 'completed': return 'border-purple-500/50 text-purple-300 bg-purple-500/10'
    case 'cancelled': return 'border-slate-600 text-slate-400 bg-slate-800'
    default: return 'border-brand-anthracite-border text-slate-200'
  }
}

const formatDate = (dateStr: string, withTime = false) => {
  try {
    const d = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {})
    }
    return d.toLocaleDateString('tr-TR', options)
  } catch {
    return dateStr
  }
}

const getQuoteWhatsAppUrl = (quote: QuoteRequest) => {
  const digits = quote.phone.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `9${digits}` : digits.length === 10 ? `90${digits}` : digits
  const msg = `Merhaba ${quote.full_name}, Atalaylar Dekorasyon olarak web sitemiz üzerinden bıraktığınız keşif talebiyle ilgili iletişime geçiyoruz.`
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`
}

const isImageUrl = (url: string) => {
  return url.match(/\.(jpeg|jpg|png|webp|gif)$/i) || url.startsWith('data:image/') || !url.endsWith('.pdf')
}

const getAttachmentFullUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (!client) return url
  // Supabase private storage signed URL or standard public path
  const { data } = client.storage.from('quote-attachments').getPublicUrl(url)
  return data?.publicUrl || url
}

const fetchQuotes = async () => {
  if (!client) return
  isLoading.value = true
  feedbackMessage.value = ''

  try {
    const { data, error } = await client
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    quotes.value = (data as any) || []

    // URL'de ?id=... parametresi varsa doğrudan detayını aç
    if (route.query.id) {
      const target = quotes.value.find(q => q.id === route.query.id)
      if (target) {
        selectedQuote.value = target
      }
    }
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Talepler yüklenirken hata oluştu: ' + (e.message || 'Lütfen bağlantıyı kontrol ediniz.')
  } finally {
    isLoading.value = false
  }
}

const updateStatus = async (quoteId: string, newStatus: string) => {
  if (!client) return
  try {
    const { error } = await (client as any)
      .from('quote_requests')
      .update({ status: newStatus as any })
      .eq('id', quoteId)

    if (error) throw error

    // Yerel listeyi güncelle
    const item = quotes.value.find(q => q.id === quoteId)
    if (item) {
      item.status = newStatus as any
    }
    if (selectedQuote.value && selectedQuote.value.id === quoteId) {
      selectedQuote.value.status = newStatus as any
    }

    feedbackType.value = 'success'
    feedbackMessage.value = 'Talep durumu güncellendi: ' + getStatusLabel(newStatus)
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Durum güncellenemedi: ' + e.message
  }
}

const openDetails = (quote: QuoteRequest) => {
  selectedQuote.value = quote
}

const confirmDelete = (quote: QuoteRequest) => {
  quoteToDelete.value = quote
}

const executeDelete = async () => {
  if (!client || !quoteToDelete.value) return
  isDeleting.value = true

  try {
    const { error } = await (client as any)
      .from('quote_requests')
      .delete()
      .eq('id', quoteToDelete.value.id)

    if (error) throw error

    quotes.value = quotes.value.filter(q => q.id !== quoteToDelete.value?.id)
    if (selectedQuote.value?.id === quoteToDelete.value.id) {
      selectedQuote.value = null
    }

    feedbackType.value = 'success'
    feedbackMessage.value = 'Teklif talebi veritabanından kalıcı olarak silindi.'
    quoteToDelete.value = null
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Silme işlemi başarısız: ' + e.message
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchQuotes()
})
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-brand-anthracite-border bg-gradient-to-b from-brand-black-soft/95 via-brand-anthracite/90 to-brand-black/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
    <!-- Ambient Gold Glow -->
    <div
      class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl"
      aria-hidden="true"
    />

    <!-- ================================================================= -->
    <!-- 1. BAŞARI DURUMU (SUCCESS STATE) -->
    <!-- ================================================================= -->
    <div
      v-if="isSubmitted"
      class="py-8 text-center sm:py-12 animate-in fade-in zoom-in-95 duration-300"
      role="status"
      aria-live="polite"
    >
      <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10">
        <CheckCircle2 class="h-10 w-10 animate-bounce" />
      </div>

      <AppBadge variant="gold" size="sm" dot class="mt-6">
        Keşif Talebiniz Alındı
      </AppBadge>

      <h3 class="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Teşekkür Ederiz, <span class="text-brand-gold">{{ submitResponse?.fullName || form.fullName }}</span>
      </h3>

      <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
        Keşif talebiniz sistemimize güvenle kaydedilmiştir. Uzman ekibimiz adresinize gelmeden önce randevu teyidi için en geç
        <strong class="text-white">24 saat içinde</strong> sizinle iletişime geçecektir.
      </p>

      <!-- Referans Kodu Kartı -->
      <div class="mx-auto mt-6 max-w-md rounded-2xl border border-brand-gold/30 bg-brand-black/80 p-5 shadow-xl">
        <span class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Takip & Keşif Referans Kodunuz
        </span>
        <div class="mt-1 font-mono text-2xl font-bold tracking-wider text-brand-gold">
          {{ submitResponse?.referenceCode || 'AT-2026-KAYIT' }}
        </div>
        <p class="mt-1.5 text-[11px] text-slate-400">
          Bu kodu müşteri temsilcimizle görüşürken kolayca sorgulama yapmak için kullanabilirsiniz.
        </p>
      </div>

      <!-- Anında WhatsApp / Telefon Hızlı İletişim -->
      <div class="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row justify-center">
        <a
          v-if="isWhatsAppConfigured"
          :href="getWhatsAppSuccessUrl()"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <MessageSquare class="mr-2 h-4 w-4" />
          Talebi WhatsApp'a Aktar & Konum Gönder
        </a>

        <a
          v-if="isPhoneConfigured"
          :href="getPhoneCallUrl()"
          class="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-5 py-3.5 text-xs font-semibold text-slate-200 transition-all hover:border-brand-gold hover:text-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <PhoneCall class="mr-2 h-4 w-4 text-brand-gold" />
          Ustayı Doğrudan Ara
        </a>
      </div>

      <p class="mt-3 text-[11px] text-slate-400">
        WhatsApp butonuna basarak adres konumunuzu ve yapılacak yerin fotoğraflarını ustanıza anında gönderebilirsiniz.
      </p>

      <!-- Yeni Talep Oluştur Butonu -->
      <div class="mt-8 border-t border-brand-anthracite-border/70 pt-6">
        <button
          type="button"
          class="text-xs font-medium text-slate-400 transition-colors hover:text-brand-gold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded px-2 py-1"
          @click="resetForm"
        >
          Farklı bir proje için yeni keşif talebi oluştur
        </button>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- 2. FORM GİRİŞ ALANLARI -->
    <!-- ================================================================= -->
    <form
      v-else
      novalidate
      class="space-y-6"
      @submit.prevent="handleSubmit"
    >
      <!-- Form Üst Bilgi -->
      <div class="border-b border-brand-anthracite-border/70 pb-5">
        <div class="flex items-center justify-between">
          <AppBadge variant="gold" size="sm" dot>
            İzmir Ücretsiz Keşif
          </AppBadge>
          <span class="inline-flex items-center text-[11px] text-slate-400">
            <Lock class="mr-1 h-3 w-3 text-emerald-400" />
            256-Bit SSL Korumalı Form
          </span>
        </div>
        <h2 class="mt-3 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          Fiyat Teklifi ve Yerinde Keşif Formu
        </h2>
        <p class="mt-1 text-xs text-slate-400">
          Bilgilerinizi eksiksiz doldurun; ustalarımız mekanınızı yerinde inceleyerek en net fiyatı çıkarsın.
        </p>
      </div>

      <!-- Genel Hata Bildirim Kutusu -->
      <div
        v-if="generalError"
        class="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-left text-xs text-rose-300"
        role="alert"
      >
        <div class="flex items-start">
          <AlertCircle class="mr-2.5 h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
          <div>
            <p class="font-semibold text-rose-200">Lütfen formu kontrol ediniz:</p>
            <p class="mt-0.5">{{ generalError }}</p>
          </div>
        </div>
      </div>

      <!-- Grid: Ad Soyad & Telefon -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormInput
          v-model="form.fullName"
          label="Adınız ve Soyadınız"
          placeholder="Örn: Ahmet Yılmaz"
          required
          :error="errors.fullName"
          autocomplete="name"
          @blur="validateField('fullName')"
        />

        <FormInput
          v-model="form.phone"
          label="Telefon Numaranız"
          type="tel"
          placeholder="Örn: 0544 997 87 60"
          required
          :error="errors.phone"
          helper-text="Keşif randevusu için sizinle bu numaradan irtibat kurulacaktır."
          autocomplete="tel"
          @blur="validateField('phone')"
        />
      </div>

      <!-- Grid: Hizmet & İlçe -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormSelect
          v-model="form.serviceSlug"
          label="İlgilendiğiniz Hizmet"
          placeholder="Hizmet seçiniz..."
          required
          :options="serviceOptions"
          :error="errors.serviceSlug"
          @blur="validateField('serviceSlug')"
        />

        <FormSelect
          v-model="form.district"
          label="Uygulama Yapılacak İlçe (İzmir)"
          placeholder="İlçe seçiniz..."
          required
          :options="districtOptions"
          :error="errors.district"
          @blur="validateField('district')"
        />
      </div>

      <!-- Grid: Tahmini Alan (Metraj) & Proje Açıklaması -->
      <div class="space-y-5">
        <FormInput
          v-model.number="form.estimatedArea"
          label="Tahmini Alan / Metraj (m² — İsteğe Bağlı)"
          type="number"
          placeholder="Örn: 120"
          helper-text="Metrajı bilmiyorsanız boş bırakabilirsiniz; yerinde ücretsiz ölçüm yapıyoruz."
        />

        <div class="relative">
          <FormTextarea
            v-model="form.notes"
            label="Proje Detayları ve Özel İstekleriniz (İsteğe Bağlı)"
            placeholder="Yapılacak işin detayları, bina kat durumu, aciliyet veya özel tercihleriniz..."
            :rows="3"
            :error="errors.notes"
          />
          <div class="mt-1 text-right text-[11px] text-slate-400">
            {{ form.notes.length }} / 1000 karakter
          </div>
        </div>
      </div>

      <!-- Fotoğraf / Dosya Ekleme Bölümü (İsteğe Bağlı) -->
      <div class="space-y-3 text-left">
        <div class="flex items-center justify-between">
          <label class="block text-xs font-medium text-slate-200">
            Uygulama Alanı Fotoğrafları (İsteğe Bağlı)
          </label>
          <span class="text-[11px] text-slate-400">Maksimum 3 adet (JPG, PNG, WEBP, PDF — Her biri maks 5 MB)</span>
        </div>

        <!-- Yükleme Kutusu -->
        <div
          class="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-anthracite-border bg-brand-black/40 px-6 py-6 text-center transition-colors hover:border-brand-gold/50"
          :class="{ 'opacity-60 pointer-events-none': isUploadingFiles }"
        >
          <input
            id="file-upload"
            ref="fileInputRef"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,application/pdf"
            class="sr-only"
            :disabled="isUploadingFiles || selectedFiles.length >= 3"
            @change="handleFileSelect"
          >

          <label
            for="file-upload"
            class="cursor-pointer group flex flex-col items-center focus-within:outline-none"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-anthracite border border-brand-anthracite-border text-brand-gold transition-transform group-hover:scale-110">
              <UploadCloud class="h-6 w-6" />
            </div>
            <p class="mt-2 text-xs font-semibold text-slate-200 group-hover:text-brand-gold">
              Fotoğraf yüklemek için tıklayın veya dosyayı buraya bırakın
            </p>
            <p class="mt-0.5 text-[11px] text-slate-400">
              Hasarlı tavan, cephe veya odanın fotoğrafı keşif öncesi teşhisi kolaylaştırır.
            </p>
          </label>
        </div>

        <!-- Seçilen Dosyaların Önizleme Listesi -->
        <div v-if="selectedFiles.length > 0" class="space-y-2 pt-1">
          <div
            v-for="(item, idx) in selectedFiles"
            :key="idx"
            class="flex items-center justify-between rounded-xl border border-brand-anthracite-border bg-brand-black/60 px-3 py-2 text-xs"
          >
            <div class="flex items-center space-x-2.5 overflow-hidden">
              <img
                v-if="item.previewUrl"
                :src="item.previewUrl"
                alt="Önizleme"
                class="h-8 w-8 rounded-lg object-cover border border-brand-anthracite-border"
              >
              <FileText v-else class="h-6 w-6 text-brand-gold shrink-0" />
              <div class="truncate">
                <p class="truncate font-medium text-slate-200">{{ item.file.name }}</p>
                <p class="text-[10px] text-slate-400">{{ (item.file.size / (1024 * 1024)).toFixed(2) }} MB</p>
              </div>
            </div>

            <button
              type="button"
              class="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300 focus-visible:ring-1 focus-visible:ring-rose-400"
              title="Dosyayı kaldır"
              @click="removeFile(idx)"
            >
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </div>

        <p v-if="fileError" class="text-xs text-rose-400" role="alert">
          {{ fileError }}
        </p>
      </div>

      <!-- =============================================================== -->
      <!-- GİZLİLİK VE ONAY KUTULARI -->
      <!-- =============================================================== -->
      <div class="space-y-3.5 rounded-2xl border border-brand-anthracite-border/80 bg-brand-black/50 p-4 text-left">
        <!-- 1. KVKK Aydınlatma Metni Onayı (ZORUNLU) -->
        <div class="flex items-start space-x-3">
          <input
            id="kvkk-consent"
            v-model="form.kvkkConsent"
            type="checkbox"
            required
            :aria-invalid="!!errors.kvkkConsent"
            class="mt-1 h-4 w-4 rounded border-brand-anthracite-border bg-brand-anthracite text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-black"
            @change="validateField('kvkkConsent')"
          >
          <label for="kvkk-consent" class="text-xs leading-relaxed text-slate-300">
            <span class="text-amber-400 font-bold">*</span>
            Atalay Dekorasyon
            <NuxtLink
              to="/yasal/kvkk-aydinlatma-metni"
              target="_blank"
              class="font-semibold text-brand-gold hover:underline"
            >
              KVKK Aydınlatma Metni
            </NuxtLink>'ni
            okudum; keşif, teklif ve iletişim süreçlerinin yürütülmesi amacıyla kişisel verilerimin işlenmesini kabul ediyorum.
          </label>
        </div>
        <p v-if="errors.kvkkConsent" class="text-xs text-rose-400 pl-7" role="alert">
          {{ errors.kvkkConsent }}
        </p>

        <!-- 2. Ticari Elektronik İleti / Kampanya İzni (İSTEĞE BAĞLI — ZORUNLU DEĞİL) -->
        <div class="flex items-start space-x-3 border-t border-brand-anthracite-border/50 pt-3">
          <input
            id="marketing-consent"
            v-model="form.marketingConsent"
            type="checkbox"
            class="mt-1 h-4 w-4 rounded border-brand-anthracite-border bg-brand-anthracite text-brand-gold focus:ring-brand-gold focus:ring-offset-brand-black"
          >
          <label for="marketing-consent" class="text-xs leading-relaxed text-slate-400">
            (İsteğe bağlı) Gelecekteki dönemsel kampanya, indirim ve yeni hizmet duyurularından SMS ve e-posta ile haberdar olmak istiyorum.
          </label>
        </div>
      </div>

      <!-- =============================================================== -->
      <!-- GİZLİ BOT TUZAĞI (HONEYPOT & ANTI-SPAM) -->
      <!-- =============================================================== -->
      <div
        aria-hidden="true"
        style="position: absolute; left: -9999px; top: -9999px; opacity: 0; pointer-events: none;"
      >
        <label for="hp_website">Lütfen bu alanı doldurmayınız:</label>
        <input
          id="hp_website"
          v-model="form.hp_website"
          type="text"
          name="hp_website"
          tabindex="-1"
          autocomplete="off"
        >
      </div>

      <!-- Gönder Butonu -->
      <div class="pt-2">
        <AppButton
          type="submit"
          variant="primary"
          size="lg"
          block
          :disabled="isSubmitting"
          :loading="isSubmitting"
        >
          <Sparkles class="h-5 w-5" />
          <span>{{ isSubmitting ? 'Talebiniz Kaydediliyor...' : 'Ücretsiz Keşif Talebini Gönder' }}</span>
        </AppButton>
      </div>

      <!-- Doğrudan WhatsApp Seçeneği -->
      <div class="relative flex py-1 items-center">
        <div class="flex-grow border-t border-brand-anthracite-border/70" />
        <span class="flex-shrink mx-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">veya</span>
        <div class="flex-grow border-t border-brand-anthracite-border/70" />
      </div>

      <div>
        <a
          v-if="isWhatsAppConfigured"
          :href="getQuickWhatsAppUrl()"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <MessageSquare class="mr-2 h-4 w-4" />
          Form Yerine Doğrudan WhatsApp'tan Keşif İste
        </a>
      </div>

      <div class="flex items-center justify-center space-x-4 text-[11px] text-slate-400">
        <span class="inline-flex items-center">
          <CheckCircle2 class="mr-1 h-3.5 w-3.5 text-brand-gold" />
          Tamamen Ücretsiz Keşif
        </span>
        <span>•</span>
        <span class="inline-flex items-center">
          <CheckCircle2 class="mr-1 h-3.5 w-3.5 text-brand-gold" />
          Taahhüt Zorunluluğu Yok
        </span>
        <span>•</span>
        <span class="inline-flex items-center">
          <Clock class="mr-1 h-3.5 w-3.5 text-brand-gold" />
          24 Saatte Geri Dönüş
        </span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import {
  CheckCircle2,
  Clock,
  Sparkles,
  UploadCloud,
  Trash2,
  AlertCircle,
  FileText,
  PhoneCall,
  MessageSquare,
  Lock
} from 'lucide-vue-next'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import FormInput from '~/components/ui/FormInput.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import FormTextarea from '~/components/ui/FormTextarea.vue'
import { useServices } from '~/composables/useServices'
import { useSiteConfig } from '~/composables/useSiteConfig'
import { IZMIR_DISTRICTS } from '~/data/districts'

interface Props {
  initialServiceSlug?: string
  initialDistrict?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialServiceSlug: '',
  initialDistrict: ''
})

const { getAllServices } = useServices()
const allServices = getAllServices()
const { isPhoneConfigured, isWhatsAppConfigured, getPhoneCallUrl, getWhatsAppUrl } = useSiteConfig()

// Form Veri Modeli
const form = reactive({
  fullName: '',
  phone: '',
  serviceSlug: props.initialServiceSlug || 'genel',
  district: props.initialDistrict || '',
  estimatedArea: undefined as number | undefined,
  notes: '',
  kvkkConsent: false,
  marketingConsent: false,
  hp_website: '',
  formStartTime: 0
})

// Hata Durumları
const errors = reactive({
  fullName: '',
  phone: '',
  serviceSlug: '',
  district: '',
  notes: '',
  kvkkConsent: ''
})

const generalError = ref('')
const fileError = ref('')
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const isUploadingFiles = ref(false)
const submitResponse = ref<{
  referenceCode?: string
  fullName?: string
  message?: string
  prefilledWhatsAppText?: string
} | null>(null)

// Dosya Yönetimi
interface FileItem {
  file: File
  previewUrl: string | null
}
const selectedFiles = ref<FileItem[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  form.formStartTime = Date.now()
  if (props.initialServiceSlug) {
    form.serviceSlug = props.initialServiceSlug
  }
})

// Hizmet Seçenekleri
const serviceOptions = computed(() => {
  const list = allServices.map(s => ({
    label: s.title,
    value: s.slug
  }))
  return [
    ...list,
    { label: 'Komple Yenileme / Birden Fazla Hizmet', value: 'komple-tadilat' },
    { label: 'Diğer / Danışmanlık', value: 'diger' }
  ]
})

// İlçe Seçenekleri
const districtOptions = computed(() => {
  return IZMIR_DISTRICTS.map(d => ({
    label: `${d} / İzmir`,
    value: d
  }))
})

// Dosya Seçim Olayı
const handleFileSelect = (e: Event) => {
  fileError.value = ''
  const target = e.target as HTMLInputElement
  if (!target.files) return

  const files = Array.from(target.files)
  const remainingSlots = 3 - selectedFiles.value.length

  if (files.length > remainingSlots) {
    fileError.value = `En fazla 3 dosya ekleyebilirsiniz. Şu an ${selectedFiles.value.length} dosya yüklü.`
  }

  const filesToAdd = files.slice(0, remainingSlots)

  for (const file of filesToAdd) {
    if (file.size > 5 * 1024 * 1024) {
      fileError.value = `${file.name} 5 MB sınırını aşıyor.`
      continue
    }

    let previewUrl: string | null = null
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file)
    }

    selectedFiles.value.push({ file, previewUrl })
  }

  if (target) {
    target.value = ''
  }
}

// Dosya Kaldırma
const removeFile = (index: number) => {
  const item = selectedFiles.value[index]
  if (item?.previewUrl) {
    URL.revokeObjectURL(item.previewUrl)
  }
  selectedFiles.value.splice(index, 1)
}

// İstemci Tarafı Tekil Alan Doğrulaması
const validateField = (field: keyof typeof errors) => {
  switch (field) {
    case 'fullName':
      if (!form.fullName.trim()) {
        errors.fullName = 'Adınız ve soyadınız zorunludur'
      } else if (form.fullName.trim().length < 3) {
        errors.fullName = 'Ad Soyad en az 3 karakter olmalıdır'
      } else {
        errors.fullName = ''
      }
      break

    case 'phone': {
      const digits = form.phone.replace(/\D/g, '')
      if (!form.phone.trim()) {
        errors.phone = 'Telefon numarası zorunludur'
      } else if (digits.length < 10) {
        errors.phone = 'Geçerli bir telefon numarası giriniz (En az 10 rakam)'
      } else {
        errors.phone = ''
      }
      break
    }

    case 'serviceSlug':
      if (!form.serviceSlug) {
        errors.serviceSlug = 'Lütfen ilgilendiğiniz hizmeti seçiniz'
      } else {
        errors.serviceSlug = ''
      }
      break

    case 'district':
      if (!form.district) {
        errors.district = 'Lütfen İzmir içindeki ilçenizi seçiniz'
      } else {
        errors.district = ''
      }
      break

    case 'kvkkConsent':
      if (!form.kvkkConsent) {
        errors.kvkkConsent = 'Keşif talebi için KVKK metnini onaylamanız gerekmektedir'
      } else {
        errors.kvkkConsent = ''
      }
      break
  }
}

// Tüm Formu Doğrula
const validateAll = (): boolean => {
  validateField('fullName')
  validateField('phone')
  validateField('serviceSlug')
  validateField('district')
  validateField('kvkkConsent')

  return (
    !errors.fullName &&
    !errors.phone &&
    !errors.serviceSlug &&
    !errors.district &&
    !errors.kvkkConsent
  )
}

// Form Gönderim İşlemi
const handleSubmit = async () => {
  generalError.value = ''

  if (!validateAll()) {
    generalError.value = 'Lütfen kırmızı ile işaretlenen zorunlu alanları doldurunuz.'
    return
  }

  isSubmitting.value = true

  try {
    let uploadedUrls: string[] = []

    // 1. Varsa Fotoğrafları Yükle
    if (selectedFiles.value.length > 0) {
      isUploadingFiles.value = true
      try {
        const formData = new FormData()
        selectedFiles.value.forEach((item) => {
          formData.append('files', item.file)
        })

        const uploadRes = await $fetch<{ success: boolean; files: Array<{ url: string }> }>('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (uploadRes.success && uploadRes.files) {
          uploadedUrls = uploadRes.files.map(f => f.url)
        }
      } catch (err: unknown) {
        console.warn('Dosya yükleme uyarısı:', err)
        // Fotoğraf yüklenemese dahi formun kaybolmasını önle ve devam et
      } finally {
        isUploadingFiles.value = false
      }
    }

    // 2. Teklif Talebini Sunucuya Gönder
    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      serviceSlug: form.serviceSlug,
      district: form.district,
      estimatedArea: form.estimatedArea ? Number(form.estimatedArea) : null,
      notes: form.notes.trim(),
      attachmentUrls: uploadedUrls,
      kvkkConsent: form.kvkkConsent,
      marketingConsent: form.marketingConsent,
      hp_website: form.hp_website,
      formStartTime: form.formStartTime
    }

    const res = await $fetch<{
      success: boolean
      referenceCode: string
      fullName: string
      message: string
    }>('/api/quote', {
      method: 'POST',
      body: payload
    })

    if (res.success) {
      submitResponse.value = res
      isSubmitted.value = true
    } else {
      generalError.value = res.message || 'Talep kaydedilirken bir sorun oluştu.'
    }
  } catch (err: unknown) {
    const errorObj = err as { data?: { statusMessage?: string; data?: { fieldErrors?: Record<string, string[]> } }; message?: string }
    const serverMessage = errorObj?.data?.statusMessage || errorObj?.message || 'Sunucu ile iletişim kurulamadı. Lütfen tekrar deneyiniz.'
    generalError.value = serverMessage

    // Sunucudan gelen alan hatalarını formda göster
    if (errorObj?.data?.data?.fieldErrors) {
      const fe = errorObj.data.data.fieldErrors
      if (fe.fullName?.[0]) errors.fullName = fe.fullName[0]
      if (fe.phone?.[0]) errors.phone = fe.phone[0]
      if (fe.district?.[0]) errors.district = fe.district[0]
      if (fe.kvkkConsent?.[0]) errors.kvkkConsent = fe.kvkkConsent[0]
    }
  } finally {
    isSubmitting.value = false
  }
}

// Başarı ekranından sonra formu sıfırla
const resetForm = () => {
  form.fullName = ''
  form.phone = ''
  form.serviceSlug = props.initialServiceSlug || 'genel'
  form.district = ''
  form.estimatedArea = undefined
  form.notes = ''
  form.kvkkConsent = false
  form.marketingConsent = false
  form.hp_website = ''
  form.formStartTime = Date.now()
  selectedFiles.value = []
  isSubmitted.value = false
  submitResponse.value = null
  generalError.value = ''
}

// Başarı Durumunda WhatsApp Mesajı
const getWhatsAppSuccessUrl = () => {
  if (submitResponse.value?.prefilledWhatsAppText) {
    return getWhatsAppUrl(submitResponse.value.prefilledWhatsAppText)
  }
  const refCode = submitResponse.value?.referenceCode || ''
  const sName = form.fullName || ''
  const message = `Merhaba Atalay Dekorasyon, ${refCode} referans kodlu keşif talebim için adres konumu ve fotoğrafları iletiyorum. İsmim: ${sName}.`
  return getWhatsAppUrl(message)
}

// Formu Doldurmadan Hızlı Keşif İsteği
const getQuickWhatsAppUrl = () => {
  let text = 'Merhaba Atalay Dekorasyon, yerinde keşif ve fiyat teklifi almak istiyorum.'
  if (form.serviceSlug && form.serviceSlug !== 'genel') {
    const s = allServices.find(item => item.slug === form.serviceSlug)
    if (s) {
      text += ` İlgilendiğim hizmet: ${s.title}.`
    }
  }
  if (form.district) {
    text += ` Konum / İlçe: ${form.district} / İzmir.`
  }
  return getWhatsAppUrl(text)
}
</script>

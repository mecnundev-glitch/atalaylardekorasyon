<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center">
          <Sliders class="mr-2.5 h-6 w-6 text-brand-gold" />
          Site ve İletişim Ayarları
        </h1>
        <p class="mt-1 text-xs text-slate-400">
          Telefon, WhatsApp, adres, çalışma saatleri ve sosyal medya bağlantılarını merkezi olarak güncelleyin
        </p>
      </div>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
          :disabled="isLoading"
          @click="fetchSettings"
        >
          <RefreshCw class="mr-1.5 h-3.5 w-3.5 text-brand-gold" :class="{ 'animate-spin': isLoading }" />
          <span>Yenile</span>
        </button>

        <button
          type="button"
          class="inline-flex items-center rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-5 py-2 text-xs font-bold text-brand-black shadow-gold-sm hover:brightness-110 transition-all min-h-[38px]"
          :disabled="isSaving"
          @click="saveAllSettings"
        >
          <Save class="mr-1.5 h-4 w-4" />
          <span>{{ isSaving ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet' }}</span>
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

    <div v-if="isLoading" class="py-16 text-center text-xs text-slate-400">
      <Loader2 class="mx-auto h-8 w-8 animate-spin text-brand-gold mb-3" />
      <p class="font-medium text-slate-200">Ayarlar veritabanından yükleniyor...</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <!-- Sol Sütun: Telefon, WhatsApp & Temel İletişim (8 Col) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- 1. Telefon ve WhatsApp Kartı -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl space-y-4">
          <div class="flex items-center space-x-2.5 pb-3 border-b border-brand-anthracite-border/70">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
              <Phone class="h-4 w-4" />
            </div>
            <div>
              <h2 class="font-display text-sm font-bold text-white">Telefon ve WhatsApp Hatları</h2>
              <p class="text-[11px] text-slate-400">Ziyaretçilerin doğrudan arayacağı veya mesaj atacağı hatlar</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Telefon Numarası (Arama İçin)</label>
              <input
                v-model="contactForm.phone"
                type="text"
                placeholder="+905449978760"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
              <span class="text-[10px] text-slate-500 mt-1 block">Örn: +905449978760</span>
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Telefon Görünüm Formatı</label>
              <input
                v-model="contactForm.phoneFormatted"
                type="text"
                placeholder="+90 (544) 997 87 60"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
              <span class="text-[10px] text-slate-500 mt-1 block">Sitede ziyaretçinin gördüğü biçim</span>
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">WhatsApp Numarası (Uluslararası Kodla)</label>
              <input
                v-model="contactForm.whatsapp"
                type="text"
                placeholder="905449978760"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
              <span class="text-[10px] text-slate-500 mt-1 block">Başında + veya 0 olmadan (Örn: 905449978760)</span>
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">WhatsApp Görünüm Formatı</label>
              <input
                v-model="contactForm.whatsappFormatted"
                type="text"
                placeholder="+90 544 997 87 60"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
              <span class="text-[10px] text-slate-500 mt-1 block">Örn: +90 544 997 87 60</span>
            </div>
          </div>
        </div>

        <!-- 2. E-posta, Adres ve Çalışma Saatleri -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl space-y-4">
          <div class="flex items-center space-x-2.5 pb-3 border-b border-brand-anthracite-border/70">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Mail class="h-4 w-4" />
            </div>
            <div>
              <h2 class="font-display text-sm font-bold text-white">E-posta, Adres & Saatler</h2>
              <p class="text-[11px] text-slate-400">Kurumsal iletişim ve keşif mesai saatleri</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Kurumsal E-posta</label>
              <input
                v-model="contactForm.email"
                type="email"
                placeholder="info@atalaylardekarasyon.com"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Çalışma Saatleri</label>
              <input
                v-model="contactForm.workingHours"
                type="text"
                placeholder="Pazartesi - Cumartesi: 08:30 - 19:30"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Hizmet Şehri</label>
              <input
                v-model="contactForm.city"
                type="text"
                placeholder="İzmir"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Merkezi Adres Tanımı</label>
              <input
                v-model="contactForm.address"
                type="text"
                placeholder="İzmir / Türkiye"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>
          </div>
        </div>

        <!-- 3. Sosyal Medya Bağlantıları -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl space-y-4">
          <div class="flex items-center space-x-2.5 pb-3 border-b border-brand-anthracite-border/70">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Share2 class="h-4 w-4" />
            </div>
            <div>
              <h2 class="font-display text-sm font-bold text-white">Sosyal Medya Profilleri</h2>
              <p class="text-[11px] text-slate-400">Instagram ve Facebook bağlantıları</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-200 mb-1">Instagram Profil Linki</label>
              <input
                v-model="socialForm.instagram"
                type="url"
                placeholder="https://instagram.com/atalaylardekorasyon"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Facebook Sayfa Linki</label>
              <input
                v-model="socialForm.facebook"
                type="url"
                placeholder="https://facebook.com/atalaylardekorasyon"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Sağ Sütun: Duyuru Bandı ve Doğrulama Durumu (4 Col) -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Duyuru Bandı Kartı -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-anthracite/60 p-6 shadow-xl space-y-4">
          <div class="flex items-center space-x-2.5 pb-3 border-b border-brand-anthracite-border/70">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Bell class="h-4 w-4" />
            </div>
            <div>
              <h2 class="font-display text-sm font-bold text-white">Üst Duyuru Bandı</h2>
              <p class="text-[11px] text-slate-400">Site tepesinde görünen duyuru mesajı</p>
            </div>
          </div>

          <div class="space-y-3 text-xs">
            <div class="flex items-center space-x-2">
              <input
                id="announcement-active"
                v-model="announcementForm.active"
                type="checkbox"
                class="h-4 w-4 rounded border-brand-anthracite-border bg-brand-anthracite text-brand-gold focus:ring-brand-gold"
              >
              <label for="announcement-active" class="font-medium text-slate-200">
                Duyuru bandını sitede aktif yap
              </label>
            </div>

            <div>
              <label class="block font-semibold text-slate-200 mb-1">Duyuru Metni</label>
              <textarea
                v-model="announcementForm.text"
                rows="3"
                placeholder="İzmir genelinde ücretsiz keşif fırsatından yararlanmak için hemen arayın."
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-black/60 p-2.5 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Canlı Durum Kontrol Kartı -->
        <div class="rounded-3xl border border-brand-anthracite-border bg-brand-black/50 p-6 shadow-xl space-y-3 text-xs">
          <h3 class="font-display text-sm font-bold text-white flex items-center">
            <CheckCircle2 class="mr-2 h-4 w-4 text-emerald-400" />
            Canlı Durum Kontrolü
          </h3>
          <p class="text-slate-400 text-[11px] leading-relaxed">
            Burada kaydettiğiniz telefon ve WhatsApp numaraları anında site genelinde aktifleşir. Eğer numara şablon (0000000) ise sistem güvenli biçimde "Yapılandırılmamış" uyarısı verir.
          </p>

          <div class="pt-2 border-t border-brand-anthracite-border/70 space-y-2 text-[11px]">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">Telefon:</span>
              <span class="font-semibold" :class="isPhoneValid ? 'text-emerald-400' : 'text-amber-400'">
                {{ isPhoneValid ? 'Aktif & Geçerli' : 'Yapılandırılmamış' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400">WhatsApp:</span>
              <span class="font-semibold" :class="isWhatsAppValid ? 'text-emerald-400' : 'text-amber-400'">
                {{ isWhatsAppValid ? 'Aktif & Geçerli' : 'Yapılandırılmamış' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Kaydet Butonu -->
        <button
          type="button"
          class="w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-brand-gold to-brand-gold-light py-3 px-4 text-xs font-bold text-brand-black shadow-gold hover:brightness-110 active:scale-95 transition-all min-h-[46px]"
          :disabled="isSaving"
          @click="saveAllSettings"
        >
          <Save class="mr-2 h-4 w-4" />
          <span>{{ isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Sliders,
  RefreshCw,
  Save,
  Phone,
  Mail,
  Share2,
  Bell,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-vue-next'
import { useSupabase } from '~/composables/useSupabase'
import { BUSINESS_CONFIG } from '~/config/business'

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Site ve İletişim Ayarları | Atalaylar Dekorasyon Admin',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const { client } = useSupabase()

const isLoading = ref(true)
const isSaving = ref(false)
const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

const contactForm = ref({
  phone: BUSINESS_CONFIG.contact.phone,
  phoneFormatted: BUSINESS_CONFIG.contact.phoneFormatted,
  whatsapp: BUSINESS_CONFIG.contact.whatsapp,
  whatsappFormatted: BUSINESS_CONFIG.contact.whatsappFormatted,
  email: BUSINESS_CONFIG.contact.email,
  address: BUSINESS_CONFIG.contact.address,
  city: BUSINESS_CONFIG.contact.city,
  workingHours: BUSINESS_CONFIG.contact.workingHours
})

const socialForm = ref({
  instagram: BUSINESS_CONFIG.social.instagram,
  facebook: BUSINESS_CONFIG.social.facebook
})

const announcementForm = ref({
  active: true,
  text: 'İzmir genelinde ücretsiz keşif fırsatından yararlanmak için hemen arayın.'
})

const isPhoneValid = computed(() => {
  const p = contactForm.value.phone?.trim()
  return Boolean(p && !p.includes('0000000') && !p.includes('example') && p.length >= 10)
})

const isWhatsAppValid = computed(() => {
  const w = contactForm.value.whatsapp?.trim()
  return Boolean(w && !w.includes('0000000') && !w.includes('example') && w.length >= 10)
})

const fetchSettings = async () => {
  if (!client) return
  isLoading.value = true
  feedbackMessage.value = ''

  try {
    const { data, error } = await client
      .from('site_settings')
      .select('*')

    if (error) throw error

    if (data) {
      for (const item of data) {
        if (item.key === 'contact_info' && item.value) {
          const val = item.value as any
          contactForm.value = {
            phone: val.phone || contactForm.value.phone,
            phoneFormatted: val.phoneFormatted || contactForm.value.phoneFormatted,
            whatsapp: val.whatsapp || contactForm.value.whatsapp,
            whatsappFormatted: val.whatsappFormatted || contactForm.value.whatsappFormatted,
            email: val.email || contactForm.value.email,
            address: val.address || contactForm.value.address,
            city: val.city || contactForm.value.city,
            workingHours: val.working_hours || val.workingHours || contactForm.value.workingHours
          }
        } else if (item.key === 'announcement' && item.value) {
          const val = item.value as any
          announcementForm.value = {
            active: val.active ?? announcementForm.value.active,
            text: val.text || announcementForm.value.text
          }
        } else if (item.key === 'social_links' && item.value) {
          const val = item.value as any
          socialForm.value = {
            instagram: val.instagram || socialForm.value.instagram,
            facebook: val.facebook || socialForm.value.facebook
          }
        }
      }
    }
  } catch (err: unknown) {
    const e = err as Error
    console.warn('Ayar çekme uyarısı:', e.message)
  } finally {
    isLoading.value = false
  }
}

const saveAllSettings = async () => {
  if (!client) return
  isSaving.value = true
  feedbackMessage.value = ''

  try {
    const contactPayload = {
      phone: contactForm.value.phone,
      phoneFormatted: contactForm.value.phoneFormatted,
      whatsapp: contactForm.value.whatsapp,
      whatsappFormatted: contactForm.value.whatsappFormatted,
      email: contactForm.value.email,
      address: contactForm.value.address,
      city: contactForm.value.city,
      working_hours: contactForm.value.workingHours
    }

    const { error: cErr } = await (client as any)
      .from('site_settings')
      .upsert({
        key: 'contact_info',
        value: contactPayload,
        description: 'İşletme iletişim ve çalışma bilgileri'
      }, { onConflict: 'key' })

    if (cErr) throw cErr

    const { error: aErr } = await (client as any)
      .from('site_settings')
      .upsert({
        key: 'announcement',
        value: announcementForm.value,
        description: 'Üst duyuru bandı ayarları'
      }, { onConflict: 'key' })

    if (aErr) throw aErr

    const { error: sErr } = await (client as any)
      .from('site_settings')
      .upsert({
        key: 'social_links',
        value: socialForm.value,
        description: 'Sosyal medya profilleri'
      }, { onConflict: 'key' })

    if (sErr) throw sErr

    feedbackType.value = 'success'
    feedbackMessage.value = 'Tüm iletişim ve site ayarları başarıyla veritabanına kaydedildi.'
  } catch (err: unknown) {
    const e = err as Error
    feedbackType.value = 'error'
    feedbackMessage.value = 'Ayarlar kaydedilemedi: ' + e.message
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchSettings()
})
</script>

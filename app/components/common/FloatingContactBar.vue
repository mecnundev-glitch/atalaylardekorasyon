<template>
  <div
    class="fixed bottom-0 inset-x-0 z-40 block border-t border-brand-anthracite-border bg-brand-black/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden shadow-2xl"
    role="region"
    aria-label="Hızlı İletişim Çubuğu"
  >
    <div class="mx-auto flex max-w-lg items-center gap-2">
      <!-- WhatsApp Direct -->
      <a
        v-if="isWhatsAppConfigured"
        :href="getWhatsAppUrl()"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white shadow-md transition-all active:scale-95 min-h-[44px]"
        aria-label="WhatsApp üzerinden mesaj gönder"
      >
        <MessageCircle class="h-4 w-4 shrink-0 text-white" />
        <span>WhatsApp</span>
      </a>
      <NuxtLink
        v-else
        to="/iletisim"
        class="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3 py-2.5 text-xs font-medium text-slate-300 min-h-[44px]"
        aria-label="İletişim sayfasına git"
      >
        <MessageCircle class="h-4 w-4 shrink-0 text-slate-400" />
        <span>İletişim</span>
      </NuxtLink>

      <!-- Direct Phone Call -->
      <a
        v-if="isPhoneConfigured"
        :href="getPhoneCallUrl()"
        class="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite px-3 py-2.5 text-xs font-semibold text-slate-100 transition-all hover:text-brand-gold active:scale-95 min-h-[44px]"
        aria-label="Hemen telefonla ara"
      >
        <Phone class="h-4 w-4 shrink-0 text-brand-gold" />
        <span>Hemen Ara</span>
      </a>
      <NuxtLink
        v-else
        to="/ucretsiz-kesif"
        class="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 px-3 py-2.5 text-xs font-medium text-slate-300 min-h-[44px]"
        aria-label="Keşif randevusu oluştur"
      >
        <Phone class="h-4 w-4 shrink-0 text-slate-400" />
        <span>Randevu</span>
      </NuxtLink>

      <!-- Free Quote Form -->
      <NuxtLink
        to="/ucretsiz-kesif"
        class="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-3 py-2.5 text-xs font-bold text-brand-black shadow-gold-sm transition-all active:scale-95 min-h-[44px]"
        aria-label="Ücretsiz keşif formu doldur"
      >
        <ClipboardCheck class="h-4 w-4 shrink-0 text-brand-black" />
        <span>Teklif Al</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageCircle, Phone, ClipboardCheck } from 'lucide-vue-next'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { isWhatsAppConfigured, isPhoneConfigured, getWhatsAppUrl, getPhoneCallUrl } = useSiteConfig()
</script>

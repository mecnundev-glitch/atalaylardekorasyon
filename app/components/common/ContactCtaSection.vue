<template>
  <section class="relative overflow-hidden border-y border-brand-anthracite-border bg-gradient-to-b from-brand-black-soft via-brand-anthracite to-brand-black py-16 sm:py-20">
    <!-- Ambient Gold Radial Glow -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-brand-gold/20 bg-brand-black/80 p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl">
        <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <!-- Text Content -->
          <div class="lg:col-span-8 text-left">
            <AppBadge variant="gold" size="sm" dot class="mb-4">
              İzmir & Çevre İlçeler İçin Hızlı Keşif
            </AppBadge>

            <h2 class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Projeniz İçin <span class="bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">Ücretsiz Keşif</span> Talep Edin
            </h2>

            <p class="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base max-w-2xl">
              Alçı, boya, çatı ve yalıtım projeleriniz için yerinde inceleme yapalım; net metraj ve şeffaf malzeme listesiyle en doğru fiyat teklifini hazırlayalım.
            </p>

            <div class="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
              <span class="inline-flex items-center gap-1.5">
                <CheckCircle2 class="h-4 w-4 text-brand-gold" />
                Yerinde Ücretsiz Keşif
              </span>
              <span class="inline-flex items-center gap-1.5">
                <CheckCircle2 class="h-4 w-4 text-brand-gold" />
                Sözleşmeli & Garantili İşçilik
              </span>
              <span class="inline-flex items-center gap-1.5">
                <CheckCircle2 class="h-4 w-4 text-brand-gold" />
                Zamanında Teslim Sözü
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-3 sm:flex-row lg:flex-col lg:col-span-4 justify-center">
            <AppButton
              to="/ucretsiz-kesif"
              variant="primary"
              size="lg"
              block
            >
              <ClipboardCheck class="h-5 w-5" />
              <span>Hemen Keşif Formu Doldur</span>
            </AppButton>

            <AppButton
              v-if="isWhatsAppConfigured"
              :to="getWhatsAppUrl()"
              variant="whatsapp"
              size="lg"
              block
            >
              <MessageCircle class="h-5 w-5" />
              <span>WhatsApp'tan Fotoğraf Gönder</span>
            </AppButton>

            <p
              v-if="isPhoneConfigured"
              class="text-center text-[11px] text-slate-400"
            >
              Veya doğrudan arayın:
              <a
                :href="getPhoneCallUrl()"
                class="font-semibold text-brand-gold-light hover:underline"
              >
                {{ config.contact.phoneFormatted }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircle2, ClipboardCheck, MessageCircle } from 'lucide-vue-next'
import AppBadge from '~/components/ui/AppBadge.vue'
import AppButton from '~/components/common/AppButton.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { config, isWhatsAppConfigured, isPhoneConfigured, getWhatsAppUrl, getPhoneCallUrl } = useSiteConfig()
</script>

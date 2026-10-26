<template>
  <header class="sticky top-0 z-50 w-full border-b border-brand-anthracite-border/70 bg-brand-black/90 backdrop-blur-md transition-all">
    <!-- Top Bar (Desktop) -->
    <div class="hidden border-b border-white/5 bg-brand-black-soft/90 py-1.5 text-xs text-slate-300 md:block">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-4">
          <span class="inline-flex items-center text-brand-gold-light">
            <span class="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            İzmir ve Çevre İlçelerde Hizmetinizdeyiz
          </span>
          <span class="text-slate-600" aria-hidden="true">•</span>
          <span>{{ config.contact.workingHours }}</span>
        </div>
        <div class="flex items-center space-x-6">
          <a
            v-if="isPhoneConfigured"
            :href="getPhoneCallUrl()"
            class="inline-flex items-center font-medium text-slate-200 transition-colors hover:text-brand-gold focus-visible:ring-1 focus-visible:ring-brand-gold rounded px-1"
          >
            <Phone class="mr-1.5 h-3.5 w-3.5 text-brand-gold" />
            {{ config.contact.phoneFormatted }}
          </a>
          <span
            v-else
            class="inline-flex items-center text-[11px] text-amber-400/90"
          >
            <Phone class="mr-1.5 h-3 w-3 text-amber-400" />
            Telefon Hattı Yapılandırılmadı
          </span>

          <a
            v-if="isWhatsAppConfigured"
            :href="getWhatsAppUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-slate-200 transition-colors hover:text-emerald-400 focus-visible:ring-1 focus-visible:ring-emerald-400 rounded px-1"
          >
            <MessageCircle class="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
            WhatsApp Keşif Hattı
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="group flex items-center space-x-3 rounded-lg focus-visible:ring-2 focus-visible:ring-brand-gold"
        aria-label="Atalaylar Dekorasyon Ana Sayfa"
      >
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold via-brand-gold-dark to-brand-black p-0.5 shadow-gold-sm transition-transform group-hover:scale-105">
          <div class="flex h-full w-full items-center justify-center rounded-[10px] bg-brand-black font-display font-black text-brand-gold">
            <ShieldCheck class="h-6 w-6 text-brand-gold" />
          </div>
        </div>
        <div>
          <span class="block font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-brand-gold">
            ATALAYLAR
          </span>
          <span class="block text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold-light/90">
            Dekorasyon & Yapı
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <nav class="hidden items-center space-x-1 lg:flex" aria-label="Ana Menü">
        <template v-for="link in navLinks" :key="link.to">
          <!-- Item with Dropdown -->
          <div
            v-if="link.children"
            class="relative group"
            @mouseenter="isDropdownOpen = true"
            @mouseleave="isDropdownOpen = false"
          >
            <NuxtLink
              :to="link.to"
              class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
              :aria-expanded="isDropdownOpen"
              aria-haspopup="true"
            >
              {{ link.label }}
              <ChevronDown class="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </NuxtLink>
            <div class="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div class="w-64 rounded-xl border border-brand-anthracite-border bg-brand-anthracite p-2 shadow-2xl backdrop-blur-xl">
                <NuxtLink
                  v-for="sub in link.children"
                  :key="sub.to"
                  :to="sub.to"
                  class="block rounded-lg px-3.5 py-2.5 text-xs font-medium text-slate-200 transition-all hover:bg-brand-black hover:text-brand-gold focus-visible:ring-1 focus-visible:ring-brand-gold"
                >
                  {{ sub.label }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Standard Item -->
          <NuxtLink
            v-else
            :to="link.to"
            class="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
            active-class="text-brand-gold font-semibold"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>

      <!-- CTA Action & Mobile Toggle -->
      <div class="flex items-center space-x-3">
        <AppButton
          to="/ucretsiz-kesif"
          variant="primary"
          size="sm"
          class="hidden sm:inline-flex"
        >
          <Sparkles class="h-4 w-4" />
          <span>Ücretsiz Keşif Al</span>
        </AppButton>

        <!-- Mobile Menu Toggle Button (Min 44x44px touch target) -->
        <button
          type="button"
          class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl p-2.5 text-slate-200 hover:bg-brand-anthracite hover:text-white focus-visible:ring-2 focus-visible:ring-brand-gold lg:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-navigation-menu"
          aria-label="Navigasyon menüsünü aç veya kapat"
          @click="toggleMobileMenu"
        >
          <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6 text-brand-gold" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu with Backdrop and Accessible Esc Handler -->
    <div
      v-if="isMobileMenuOpen"
      id="mobile-navigation-menu"
      class="border-b border-brand-anthracite-border bg-brand-black/98 px-4 pb-8 pt-3 backdrop-blur-2xl lg:hidden shadow-2xl"
      role="dialog"
      aria-modal="true"
      aria-label="Mobil Navigasyon"
    >
      <nav class="space-y-1">
        <template v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block rounded-xl px-4 py-3 text-sm font-medium text-slate-100 hover:bg-brand-anthracite hover:text-brand-gold focus-visible:ring-1 focus-visible:ring-brand-gold"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </NuxtLink>
          <div v-if="link.children" class="ml-4 space-y-1 border-l border-brand-anthracite-border/70 pl-2">
            <NuxtLink
              v-for="sub in link.children"
              :key="sub.to"
              :to="sub.to"
              class="block rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:text-brand-gold focus-visible:ring-1 focus-visible:ring-brand-gold"
              @click="closeMobileMenu"
            >
              {{ sub.label }}
            </NuxtLink>
          </div>
        </template>
      </nav>

      <div class="mt-6 border-t border-brand-anthracite-border pt-6">
        <AppButton
          to="/ucretsiz-kesif"
          variant="primary"
          block
          size="md"
          @click="closeMobileMenu"
        >
          <Sparkles class="h-4 w-4" />
          <span>Ücretsiz Keşif ve Fiyat Teklifi</span>
        </AppButton>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <a
            v-if="isPhoneConfigured"
            :href="getPhoneCallUrl()"
            class="flex items-center justify-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite py-3 text-center text-xs font-semibold text-white hover:text-brand-gold min-h-[44px]"
          >
            <Phone class="mr-1.5 h-3.5 w-3.5 text-brand-gold" />
            Hemen Ara
          </a>
          <span
            v-else
            class="flex items-center justify-center rounded-xl border border-brand-anthracite-border/50 bg-brand-anthracite/50 py-3 text-center text-[11px] text-slate-400 min-h-[44px]"
          >
            Tel: Yapılandırılmadı
          </span>

          <a
            v-if="isWhatsAppConfigured"
            :href="getWhatsAppUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center rounded-xl bg-emerald-600/90 py-3 text-center text-xs font-semibold text-white hover:bg-emerald-600 min-h-[44px]"
          >
            <MessageCircle class="mr-1.5 h-3.5 w-3.5 text-white" />
            WhatsApp
          </a>
          <span
            v-else
            class="flex items-center justify-center rounded-xl border border-brand-anthracite-border/50 bg-brand-anthracite/50 py-3 text-center text-[11px] text-slate-400 min-h-[44px]"
          >
            WhatsApp: Yapılandırılmadı
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Menu,
  X
} from 'lucide-vue-next'
import AppButton from '~/components/common/AppButton.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'

const { config, navLinks, isPhoneConfigured, isWhatsAppConfigured, getWhatsAppUrl, getPhoneCallUrl } = useSiteConfig()
const isMobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on Escape key press
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

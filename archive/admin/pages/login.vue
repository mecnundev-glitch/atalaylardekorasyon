<template>
  <div class="min-h-screen bg-brand-black flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-brand-gold/30 selection:text-brand-gold-light">
    <!-- Ambient Radial Glow -->
    <div
      class="pointer-events-none fixed inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div class="h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
    </div>

    <div class="relative w-full max-w-md">
      <!-- Back to site link -->
      <div class="mb-6 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-xs font-medium text-slate-400 hover:text-brand-gold transition-colors"
        >
          <ArrowLeft class="mr-1.5 h-3.5 w-3.5" />
          Atalaylar Dekorasyon Ana Sayfasına Dön
        </NuxtLink>
      </div>

      <!-- Login Card -->
      <div class="rounded-3xl border border-brand-anthracite-border/90 bg-brand-black-soft/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <!-- Logo & Header -->
        <div class="text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold via-brand-gold-dark to-brand-black p-0.5 shadow-gold-sm">
            <div class="flex h-full w-full items-center justify-center rounded-[14px] bg-brand-black text-brand-gold font-display font-black text-xl">
              <ShieldCheck class="h-7 w-7 text-brand-gold" />
            </div>
          </div>

          <h1 class="mt-4 font-display text-2xl font-bold tracking-tight text-white">
            Yönetici Girişi
          </h1>
          <p class="mt-1.5 text-xs text-slate-400">
            Atalaylar Dekorasyon güvenli yönetim paneli
          </p>
        </div>

        <!-- Error Alert -->
        <div
          v-if="errorMessage"
          class="mt-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-start"
          role="alert"
        >
          <AlertCircle class="mr-2.5 h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Login Form -->
        <form class="mt-6 space-y-5" @submit.prevent="handleLogin">
          <div>
            <label for="admin-email" class="block text-xs font-semibold text-slate-200">
              Yönetici E-Posta Adresi
            </label>
            <div class="relative mt-1.5">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <Mail class="h-4 w-4" />
              </div>
              <input
                id="admin-email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                placeholder="admin@atalaylardekarasyon.com"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="admin-password" class="block text-xs font-semibold text-slate-200">
                Şifre
              </label>
            </div>
            <div class="relative mt-1.5">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <Lock class="h-4 w-4" />
              </div>
              <input
                id="admin-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                placeholder="••••••••••••"
                class="w-full rounded-xl border border-brand-anthracite-border bg-brand-anthracite/60 py-3 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="relative flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light py-3 px-4 text-xs font-bold text-brand-black shadow-gold-sm transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none min-h-[44px]"
            >
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              <LogIn v-else class="mr-2 h-4 w-4" />
              <span>{{ isLoading ? 'Giriş Yapılıyor...' : 'Panele Giriş Yap' }}</span>
            </button>
          </div>
        </form>

        <!-- Security Notice -->
        <div class="mt-8 border-t border-brand-anthracite-border/70 pt-5 text-center text-[11px] text-slate-500">
          <div class="flex items-center justify-center space-x-1.5 text-slate-400">
            <Lock class="h-3 w-3 text-emerald-400" />
            <span>256-Bit SSL & Row-Level Security Korumalı</span>
          </div>
          <p class="mt-1 text-[10px]">
            Yalnızca yetkili Atalaylar Dekorasyon yöneticileri içindir.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-vue-next'
import { useAdminAuth } from '~/composables/useAdminAuth'

definePageMeta({
  layout: false
})

useHead({
  title: 'Yönetici Girişi · Atalaylar Dekorasyon',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const route = useRoute()
const { login, isLoading } = useAdminAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Lütfen e-posta ve şifrenizi giriniz.'
    return
  }

  const res = await login(email.value, password.value)

  if (res.success) {
    const redirectUrl = (route.query.redirect as string) || '/admin'
    await navigateTo(redirectUrl)
  } else {
    errorMessage.value = res.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.'
  }
}
</script>

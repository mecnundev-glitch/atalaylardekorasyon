<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-brand-black px-4 text-center text-slate-100">
    <div class="mx-auto max-w-md">
      <div class="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-gold/30 bg-brand-anthracite-card text-brand-gold shadow-gold-md">
        <AlertTriangle class="h-10 w-10 text-brand-gold" />
      </div>

      <h1 class="mt-6 font-display text-5xl font-extrabold text-white">
        {{ error?.statusCode || 404 }}
      </h1>

      <p class="mt-2 text-lg font-medium text-slate-200">
        {{ error?.statusCode === 404 ? 'Sayfa Bulunamadı' : 'Bir Hata Oluştu' }}
      </p>

      <p class="mt-3 text-sm text-slate-400">
        {{ error?.statusMessage || 'Aradığınız sayfa taşınmış veya silinmiş olabilir. Ana sayfaya dönerek hizmetlerimizi inceleyebilirsiniz.' }}
      </p>

      <div class="mt-8 flex justify-center gap-4">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-light px-6 py-3 text-sm font-semibold text-brand-black shadow-gold-sm hover:brightness-105"
          @click="handleClearError"
        >
          <Home class="h-4 w-4" />
          <span>Ana Sayfaya Dön</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { AlertTriangle, Home } from 'lucide-vue-next'

defineProps<{
  error: NuxtError
}>()

const handleClearError = () => clearError({ redirect: '/' })
</script>

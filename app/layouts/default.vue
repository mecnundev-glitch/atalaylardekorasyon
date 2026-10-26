<template>
  <div class="flex min-h-screen flex-col bg-brand-black text-slate-100 antialiased selection:bg-brand-gold/30 selection:text-brand-gold-light">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content Area with mobile floating bar offset -->
    <main class="flex-1 pb-16 lg:pb-0">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Mobile Sticky Quick Contact Action Bar -->
    <FloatingContactBar />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/common/AppHeader.vue'
import AppFooter from '~/components/common/AppFooter.vue'
import FloatingContactBar from '~/components/common/FloatingContactBar.vue'
</script>

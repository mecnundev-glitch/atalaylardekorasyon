<template>
  <nav aria-label="Ekmek Kırıntısı" class="py-3 text-xs">
    <ol class="flex flex-wrap items-center space-x-2 text-slate-400">
      <li>
        <NuxtLink
          to="/"
          class="inline-flex items-center text-slate-400 transition-colors hover:text-brand-gold"
        >
          <Home class="mr-1 h-3.5 w-3.5" />
          <span>Ana Sayfa</span>
        </NuxtLink>
      </li>

      <li v-for="(item, index) in items" :key="index" class="flex items-center space-x-2">
        <ChevronRight class="h-3 w-3 text-slate-600" />
        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="transition-colors hover:text-brand-gold"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="font-medium text-brand-gold-light"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { Home, ChevronRight } from 'lucide-vue-next'

export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

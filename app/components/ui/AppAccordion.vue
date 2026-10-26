<template>
  <div class="space-y-3">
    <div
      v-for="(item, index) in items"
      :key="item.id || index"
      class="overflow-hidden rounded-2xl border border-brand-anthracite-border bg-brand-anthracite-card/80 transition-all duration-200"
      :class="[isOpen(item.id || String(index)) ? 'border-brand-gold/40 shadow-gold-sm bg-brand-anthracite-card' : '']"
    >
      <button
        :id="`accordion-btn-${item.id || index}`"
        type="button"
        :aria-expanded="isOpen(item.id || String(index))"
        :aria-controls="`accordion-panel-${item.id || index}`"
        class="flex w-full min-h-[52px] items-center justify-between gap-4 px-6 py-4 text-left font-display text-sm font-semibold text-white transition-colors hover:text-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-inset"
        @click="toggle(item.id || String(index))"
      >
        <span>{{ item.title }}</span>
        <ChevronDown
          class="h-4 w-4 shrink-0 text-brand-gold transition-transform duration-200"
          :class="{ 'rotate-180': isOpen(item.id || String(index)) }"
        />
      </button>

      <div
        v-show="isOpen(item.id || String(index))"
        :id="`accordion-panel-${item.id || index}`"
        :aria-labelledby="`accordion-btn-${item.id || index}`"
        role="region"
        class="px-6 pb-5 pt-1 text-xs leading-relaxed text-slate-300 border-t border-brand-anthracite-border/50"
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export interface AccordionItem {
  id: string
  title: string
  content: string
}

interface Props {
  items: AccordionItem[]
  defaultOpenId?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpenId: undefined
})

const openId = ref<string | null>(props.defaultOpenId || null)

const isOpen = (id: string) => openId.value === id

const toggle = (id: string) => {
  openId.value = openId.value === id ? null : id
}
</script>

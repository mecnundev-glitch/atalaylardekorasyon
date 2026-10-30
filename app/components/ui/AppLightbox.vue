<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/95 p-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Büyük Görsel Önizleme"
      tabindex="-1"
      @click.self="close"
    >
      <!-- Top Action Bar -->
      <div class="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6 text-slate-300">
        <div class="flex items-center gap-2 text-xs font-medium">
          <span class="rounded-full bg-brand-anthracite px-3 py-1 text-brand-gold-light border border-brand-anthracite-border font-mono">
            {{ currentIndex + 1 }} / {{ images.length }}
          </span>
          <span v-if="currentImage?.caption" class="hidden sm:inline-block text-slate-400 max-w-md truncate">
            {{ currentImage.caption }}
          </span>
        </div>

        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite text-slate-300 hover:text-white hover:border-brand-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors"
          aria-label="Önizlemeyi Kapat (Esc)"
          @click="close"
        >
          <X class="h-6 w-6" />
        </button>
      </div>

      <!-- Main Image Display Area -->
      <div class="relative flex max-h-[85vh] max-w-5xl items-center justify-center">
        <!-- Previous Button -->
        <button
          v-if="images.length > 1"
          type="button"
          class="absolute -left-3 sm:-left-14 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/90 text-slate-200 hover:text-brand-gold hover:border-brand-gold/60 focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors shadow-xl"
          aria-label="Önceki Görsel (Sol Ok)"
          @click="prev"
        >
          <ChevronLeft class="h-6 w-6" />
        </button>

        <!-- Current Active Image -->
        <div class="relative overflow-hidden rounded-2xl border border-brand-anthracite-border bg-brand-black shadow-2xl">
          <img
            :src="currentImage?.url"
            :alt="currentImage?.alt || 'Atalay Dekorasyon İzmir Uygulama Görseli'"
            decoding="async"
            class="max-h-[75vh] w-auto max-w-full object-contain"
          >
          <div v-if="currentImage?.caption" class="p-3 text-center sm:hidden bg-brand-black-soft text-xs text-slate-300">
            {{ currentImage.caption }}
          </div>
        </div>

        <!-- Next Button -->
        <button
          v-if="images.length > 1"
          type="button"
          class="absolute -right-3 sm:-right-14 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-anthracite-border bg-brand-anthracite/90 text-slate-200 hover:text-brand-gold hover:border-brand-gold/60 focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors shadow-xl"
          aria-label="Sonraki Görsel (Sağ Ok)"
          @click="next"
        >
          <ChevronRight class="h-6 w-6" />
        </button>
      </div>

      <!-- Bottom Hint (Keyboard guidance) -->
      <div class="absolute bottom-4 inset-x-0 text-center text-[11px] text-slate-500 hidden sm:block">
        Kapatmak için <kbd class="px-1.5 py-0.5 rounded bg-brand-anthracite border border-brand-anthracite-border text-slate-300">ESC</kbd>,
        geçişler için <kbd class="px-1.5 py-0.5 rounded bg-brand-anthracite border border-brand-anthracite-border text-slate-300">←</kbd>
        <kbd class="px-1.5 py-0.5 rounded bg-brand-anthracite border border-brand-anthracite-border text-slate-300">→</kbd> ok tuşlarını kullanabilirsiniz.
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { ProjectGalleryImage } from '~/types/project'

interface Props {
  isOpen: boolean
  images: ProjectGalleryImage[]
  startIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  startIndex: 0
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const currentIndex = ref(props.startIndex)

watch(
  () => props.startIndex,
  (val) => {
    currentIndex.value = val
  }
)

const currentImage = computed(() => {
  if (!props.images || props.images.length === 0) return null
  return props.images[currentIndex.value]
})

const close = () => {
  emit('close')
}

const next = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.images.length - 1
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') {
    close()
  } else if (e.key === 'ArrowRight') {
    next()
  } else if (e.key === 'ArrowLeft') {
    prev()
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (typeof document !== 'undefined') {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-brand-anthracite-border bg-brand-black shadow-2xl">
    <!-- Slider Container -->
    <div
      ref="containerRef"
      class="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none overflow-hidden cursor-ew-resize"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
    >
      <!-- After Image (Base) -->
      <img
        :src="afterImage"
        :alt="`${title} - Atalaylar Dekorasyon İzmir Uygulama Sonrası`"
        loading="lazy"
        decoding="async"
        width="1200"
        height="675"
        class="absolute inset-0 h-full w-full object-cover"
      >
      <div class="absolute right-4 top-4 z-10">
        <span class="rounded-full bg-brand-black/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-gold-light border border-brand-gold/30 backdrop-blur-md">
          {{ afterLabel || 'Uygulama Sonrası' }}
        </span>
      </div>

      <!-- Before Image (Clipped Overlay) -->
      <div
        class="absolute inset-0 overflow-hidden"
        :style="{ width: `${sliderPos}%` }"
      >
        <img
          :src="beforeImage"
          :alt="`${title} - Atalaylar Dekorasyon İzmir Uygulama Öncesi`"
          loading="lazy"
          decoding="async"
          width="1200"
          height="675"
          class="absolute inset-0 h-full w-full object-cover max-w-none"
          :style="{ width: containerWidth ? `${containerWidth}px` : '100vw' }"
        >
        <div class="absolute left-4 top-4 z-10">
          <span class="rounded-full bg-brand-black/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-300 border border-white/20 backdrop-blur-md">
            {{ beforeLabel || 'Uygulama Öncesi' }}
          </span>
        </div>
      </div>

      <!-- Divider Handle Bar -->
      <div
        class="absolute inset-y-0 z-20 flex items-center justify-center -translate-x-1/2 pointer-events-none"
        :style="{ left: `${sliderPos}%` }"
      >
        <div class="h-full w-0.5 bg-gradient-to-b from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
        <div class="absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-black shadow-gold-md text-brand-gold">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Info Footer -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-brand-anthracite-border bg-brand-anthracite-card/90 px-6 py-4 gap-3 text-left">
      <div>
        <h4 class="font-display text-sm font-semibold text-white">{{ title }}</h4>
        <p class="text-xs text-slate-400 mt-0.5">{{ description }}</p>
      </div>
      <p class="text-[11px] text-slate-400 flex items-center gap-1.5 shrink-0">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
        Karşılaştırmak için çizgiyi sağa/sola kaydırın
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  beforeImage: string
  afterImage: string
  title: string
  description?: string
  beforeLabel?: string
  afterLabel?: string
  initialPosition?: number
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  beforeLabel: 'Öncesi (Eski Durum)',
  afterLabel: 'Sonrası (Teslim Edilen)',
  initialPosition: 50
})

const sliderPos = ref(props.initialPosition)
const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref<number>(0)
const isDragging = ref(false)

const updateDimensions = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.getBoundingClientRect().width
  }
}

const handleMove = (clientX: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const offset = clientX - rect.left
  const percentage = (offset / rect.width) * 100
  sliderPos.value = Math.max(0, Math.min(100, percentage))
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  handleMove(e.clientX)
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || !e.touches[0]) return
  handleMove(e.touches[0].clientX)
}

const stopDrag = () => {
  isDragging.value = false
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  if ('touches' in e && e.touches[0]) {
    handleMove(e.touches[0].clientX)
  } else if ('clientX' in e) {
    handleMove(e.clientX)
  }
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onTouchMove)
  window.addEventListener('touchend', stopDrag)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', stopDrag)
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-medium rounded-full transition-colors',
      sizeClasses,
      variantClasses
    ]"
  >
    <span
      v-if="dot"
      :class="['mr-1.5 h-1.5 w-1.5 rounded-full', dotColorClass]"
    />
    <slot name="icon" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'gold' | 'neutral' | 'success' | 'info'
  size?: 'sm' | 'md'
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gold',
  size: 'md',
  dot: false
})

const sizeClasses = computed(() => {
  return props.size === 'sm'
    ? 'px-2.5 py-0.5 text-[11px] gap-1'
    : 'px-3.5 py-1 text-xs gap-1.5'
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'neutral':
      return 'border border-brand-anthracite-border bg-brand-anthracite text-slate-300'
    case 'success':
      return 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
    case 'info':
      return 'border border-sky-500/30 bg-sky-500/10 text-sky-300'
    case 'gold':
    default:
      return 'border border-brand-gold/30 bg-brand-gold/10 text-brand-gold-light shadow-gold-sm'
  }
})

const dotColorClass = computed(() => {
  switch (props.variant) {
    case 'neutral':
      return 'bg-slate-400'
    case 'success':
      return 'bg-emerald-400 animate-pulse'
    case 'info':
      return 'bg-sky-400'
    case 'gold':
    default:
      return 'bg-brand-gold animate-pulse'
  }
})
</script>

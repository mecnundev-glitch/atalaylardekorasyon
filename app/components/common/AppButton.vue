<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      sizeClasses,
      variantClasses,
      block ? 'w-full' : ''
    ]"
    @click="$emit('click', $event)"
  >
    <span
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent shrink-0"
      aria-hidden="true"
    />
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

interface Props {
  to?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  type: 'button',
  variant: 'primary',
  size: 'md',
  block: false,
  disabled: false,
  loading: false
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs min-h-[38px] px-3.5 py-1.5 rounded-lg gap-1.5'
    case 'lg':
      return 'text-base min-h-[50px] px-7 py-3 rounded-xl gap-2.5 font-semibold'
    case 'md':
    default:
      return 'text-sm min-h-[44px] px-5 py-2.5 rounded-xl gap-2 font-medium'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-brand-anthracite-card text-slate-100 border border-brand-anthracite-border hover:border-brand-gold/60 hover:text-brand-gold-light active:bg-brand-anthracite'
    case 'outline':
      return 'bg-transparent text-brand-gold border border-brand-gold/60 hover:bg-brand-gold/10 hover:border-brand-gold active:bg-brand-gold/20'
    case 'ghost':
      return 'bg-transparent text-slate-300 hover:text-brand-gold hover:bg-white/5 active:bg-white/10'
    case 'whatsapp':
      return 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-950/40 active:bg-emerald-700'
    case 'primary':
    default:
      return 'bg-gradient-to-r from-brand-gold via-brand-gold-400 to-brand-gold-light text-brand-black font-semibold shadow-gold-sm hover:shadow-gold-md hover:brightness-105 active:scale-[0.98]'
  }
})
</script>

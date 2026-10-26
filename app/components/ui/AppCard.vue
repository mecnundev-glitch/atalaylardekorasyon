<template>
  <component
    :is="as"
    :class="[
      'rounded-2xl border transition-all duration-300',
      surfaceClasses,
      paddingClasses,
      hoverable ? 'hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-gold-sm' : ''
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  as?: string
  variant?: 'default' | 'flat' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  variant: 'default',
  padding: 'md',
  hoverable: false
})

const surfaceClasses = computed(() => {
  switch (props.variant) {
    case 'flat':
      return 'bg-brand-anthracite border-brand-anthracite-border'
    case 'elevated':
      return 'bg-brand-anthracite-card border-brand-anthracite-border-light shadow-subtle-card'
    case 'default':
    default:
      return 'bg-brand-anthracite-card/90 border-brand-anthracite-border backdrop-blur-sm'
  }
})

const paddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return 'p-0'
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-8 sm:p-10'
    case 'md':
    default:
      return 'p-6'
  }
})
</script>

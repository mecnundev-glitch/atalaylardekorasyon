<template>
  <div :class="[align === 'center' ? 'mx-auto text-center max-w-3xl' : 'text-left max-w-2xl']">
    <!-- Optional Badge / Eyebrow -->
    <div v-if="badge" class="mb-3">
      <AppBadge variant="gold" size="sm" dot>
        {{ badge }}
      </AppBadge>
    </div>
    <div v-else-if="eyebrow" class="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
      {{ eyebrow }}
    </div>

    <!-- Title -->
    <component
      :is="as"
      :class="[
        'font-display font-bold tracking-tight text-white',
        sizeClasses
      ]"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </component>

    <!-- Description -->
    <p
      v-if="description || $slots.description"
      class="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppBadge from '~/components/ui/AppBadge.vue'

interface Props {
  as?: 'h1' | 'h2' | 'h3'
  badge?: string
  eyebrow?: string
  title?: string
  description?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'h2',
  badge: undefined,
  eyebrow: undefined,
  title: '',
  description: undefined,
  align: 'center',
  size: 'md'
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'text-3xl sm:text-4xl lg:text-5xl'
    case 'sm':
      return 'text-xl sm:text-2xl'
    case 'md':
    default:
      return 'text-2xl sm:text-3xl lg:text-4xl'
  }
})
</script>

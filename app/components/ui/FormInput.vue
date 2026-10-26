<template>
  <div class="space-y-1.5 text-left">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-xs font-medium text-slate-200"
    >
      {{ label }}
      <span v-if="required" class="text-amber-400">*</span>
    </label>

    <!-- Input Wrapper -->
    <div class="relative rounded-xl">
      <div
        v-if="$slots.prefix"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
      >
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        :name="name || inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined"
        :class="[
          'block w-full min-h-[46px] rounded-xl border bg-brand-black/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150',
          $slots.prefix ? 'pl-10' : '',
          $slots.suffix || error ? 'pr-10' : '',
          error
            ? 'border-rose-500/70 text-rose-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30'
            : 'border-brand-anthracite-border focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30',
          disabled ? 'opacity-50 cursor-not-allowed bg-brand-anthracite' : ''
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      >

      <div
        v-if="error"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-rose-400"
      >
        <AlertCircle class="h-4 w-4" />
      </div>
      <div
        v-else-if="$slots.suffix"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
      >
        <slot name="suffix" />
      </div>
    </div>

    <!-- Error or Helper Text -->
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="text-xs text-rose-400"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helperText"
      :id="`${inputId}-desc`"
      class="text-xs text-slate-500"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  modelValue?: string | number
  id?: string
  name?: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  label: undefined,
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  error: undefined,
  helperText: undefined,
  autocomplete: 'off'
})

defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'blur' | 'focus', event: FocusEvent): void
}>()

const generatedId = useId()
const inputId = computed(() => props.id || generatedId)
</script>

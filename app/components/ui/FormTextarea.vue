<template>
  <div class="space-y-1.5 text-left">
    <!-- Label -->
    <label
      v-if="label"
      :for="textareaId"
      class="block text-xs font-medium text-slate-200"
    >
      {{ label }}
      <span v-if="required" class="text-amber-400">*</span>
    </label>

    <!-- Textarea Wrapper -->
    <div class="relative rounded-xl">
      <textarea
        :id="textareaId"
        :name="name || textareaId"
        :value="modelValue"
        :rows="rows"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${textareaId}-error` : helperText ? `${textareaId}-desc` : undefined"
        :class="[
          'block w-full rounded-xl border bg-brand-black/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 resize-y',
          error
            ? 'border-rose-500/70 text-rose-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30'
            : 'border-brand-anthracite-border focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30',
          disabled ? 'opacity-50 cursor-not-allowed bg-brand-anthracite' : ''
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @blur="$emit('blur', $event)"
      />
    </div>

    <!-- Error or Helper Text -->
    <p
      v-if="error"
      :id="`${textareaId}-error`"
      class="text-xs text-rose-400"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helperText"
      :id="`${textareaId}-desc`"
      class="text-xs text-slate-500"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  id?: string
  name?: string
  label?: string
  rows?: number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: undefined,
  name: undefined,
  label: undefined,
  rows: 4,
  placeholder: '',
  required: false,
  disabled: false,
  error: undefined,
  helperText: undefined
})

defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'blur', event: FocusEvent): void
}>()

const generatedId = useId()
const textareaId = computed(() => props.id || generatedId)
</script>

<template>
  <div class="space-y-1.5 text-left">
    <!-- Label -->
    <label
      v-if="label"
      :for="selectId"
      class="block text-xs font-medium text-slate-200"
    >
      {{ label }}
      <span v-if="required" class="text-amber-400">*</span>
    </label>

    <!-- Select Wrapper -->
    <div class="relative rounded-xl">
      <select
        :id="selectId"
        :name="name || selectId"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${selectId}-error` : helperText ? `${selectId}-desc` : undefined"
        :class="[
          'block w-full min-h-[46px] appearance-none rounded-xl border bg-brand-black/70 px-4 py-2.5 pr-10 text-sm text-slate-100 transition-all duration-150',
          error
            ? 'border-rose-500/70 text-rose-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30'
            : 'border-brand-anthracite-border focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30',
          disabled ? 'opacity-50 cursor-not-allowed bg-brand-anthracite' : '',
          !modelValue ? 'text-slate-500' : ''
        ]"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        @blur="$emit('blur', $event)"
      >
        <option v-if="placeholder" value="" disabled selected class="bg-brand-anthracite text-slate-500">
          {{ placeholder }}
        </option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          class="bg-brand-anthracite text-slate-100 py-1"
        >
          {{ opt.label }}
        </option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
        <ChevronDown class="h-4 w-4" />
      </div>
    </div>

    <!-- Error or Helper Text -->
    <p
      v-if="error"
      :id="`${selectId}-error`"
      class="text-xs text-rose-400"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helperText"
      :id="`${selectId}-desc`"
      class="text-xs text-slate-500"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  id?: string
  name?: string
  label?: string
  placeholder?: string
  options: SelectOption[]
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
  placeholder: 'Lütfen seçin...',
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
const selectId = computed(() => props.id || generatedId)
</script>

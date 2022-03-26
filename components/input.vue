<template>
  <div class="flex input flex-col">
    <label
      v-if="label"
      :for="id"
      class="font-semibold mb-2 text-xs text-gray-500"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :class="{ '!p-0 h-[3.375rem] border-none': type === 'color' }"
      class="border border-solid border-gray-200 w-full px-6
       py-4 text-sm rounded-lg text-gray-600 placeholder:text-gray-400"
      @change="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  id: string,
  type?: string,
  label?: string,
  modelValue?: string | number,
  placeholder?: string,
}>()
</script>

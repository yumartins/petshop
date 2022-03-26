<template>
  <button class="button" :class="appearance ? `is-${appearance}` : 'is-primary'">
    {{ loading ? 'Carregando ...' : label }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  label: string,
  loading?: boolean,
  appearance?: 'primary' | 'secondary',
}>()
</script>

<style lang="postcss">
.button {
  @apply px-6 py-4 rounded-lg text-sm font-semibold
  border border-solid transition-all duration-300 ease-in-out;

  &.is-primary {
    @apply text-white bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600;
  }

  &.is-secondary {
    @apply text-gray-500 border-gray-200 hover:border-gray-300;
  }
}
</style>

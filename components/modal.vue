<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-gray-900/80">
    <div class="max-w-md flex flex-col p-14 w-full bg-white rounded-lg">
      <div class="flex mb-6 items-center justify-between">
        <h4 class="text-lg font-bold text-gray-900">
          {{ title }}
        </h4>

        <button
          type="button"
          class="font-sans text-xl text-gray-500"
          @click="$emit('close')"
        >
          x
        </button>
      </div>

      <slot />

      <div class="flex mt-10 gap-6 items-center justify-end">
        <Button
          label="Cancelar"
          appearance="secondary"
          @click="$emit('close')"
        />

        <Button
          :label="button || 'Adicionar'"
          :loading="loading"
          @click="$emit('create')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  button?: string,
  loading: boolean,
}>()

defineEmits(['close', 'create'])
</script>

<template>
  <div class="select relative" @blur="toggle()">
    <div class="flex flex-col" @click="toggle()">
      <label
        :for="id"
        class="font-semibold mb-2 text-xs text-gray-500"
      >
        {{ label }}
      </label>

      <div
        class="border border-solid border-gray-200 w-full px-6
       py-4 text-sm rounded-lg text-gray-600 placeholder:text-gray-400"
      >
        {{ modelValue ? modelValue.label : 'Selecione uma opção' }}
      </div>
    </div>
    <div
      class="flex flex-col z-50 absolute divide-y divide-y-gray-200
      w-full shadow-xl bg-white border border-solid border-gray-200"
      :class="{ hidden: !showed }"
    >
      <button
        v-for="option of options"
        :key="option.value"
        class="px-6 py-4 text-gray-500 text-sm text-left"
        @click="
          $emit('update:modelValue', option);
          toggle();
        "
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Option = {
  value: string,
  label: string
}

defineProps<{
  id: string,
  label: string,
  options: Option[],
  modelValue: Option | null,
}>()

const dropdown = ref(false)

const toggle = () => {
  dropdown.value = !dropdown.value
}

const showed = computed(() => dropdown.value)
</script>

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
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="border border-solid border-gray-200 w-full px-6
       py-4 text-sm rounded-lg text-gray-600 placeholder:text-gray-400"
      @change="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script ts>
export default {
  name: 'BaseInput',

  props: {
    id: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text'
    },

    modelValue: {
      type: [String, Number],
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

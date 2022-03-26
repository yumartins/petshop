<template>
  <div class="py-32 container">
    <div class="flex items-center justify-between">
      <h1 class="text-5xl leading-tight font-bold text-gray-900">
        Olá, {{ data.name }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services'

const route = useRoute()

const {
  id
} = route.params

/**
 * List user data.
 */
const {
  data: reqData
} = await useAsyncData('person', async () => {
  const req = await api.get(`/person/${id}`)

  return req.data.data
})

/**
 * Convert from proxy to array.
 */
const data = toRaw(reqData.value)
</script>

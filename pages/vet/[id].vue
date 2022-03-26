<template>
  <div class="py-32 container">
    <h1 class="text-5xl leading-tight font-bold text-gray-900">
      Olá, {{ data.name }}
    </h1>

    <div
      v-if="data.schedules.length > 0"
      class="mt-10 grid grid-cols-3 gap-8"
    >
      <div
        v-for="schedule in data.schedules"
        :key="schedule.id"
        class="flex p-6 flex-col bg-white border border-solid border-gray-200 rounded-lg"
      >
        <div class="flex flex-col">
          <div class="flex items-center">
            <span
              :style="{ backgroundColor: schedule.pet.color }"
              class="w-2 h-2 rounded-full mr-4"
            />

            <h2 class="text-xl font-bold text-gray-900">
              {{ schedule.pet.name }}
            </h2>
          </div>

          <p
            v-if="schedule.date"
            class="mt-2 text-sm font-semibold text-gray-500"
          >
            {{ schedule.date }}
          </p>

          <p
            v-if="schedule.description"
            class="mt-4 text-sm text-gray-500"
          >
            {{ schedule.description }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-else
      class="mt-10 bg-gray-100 p-16 rounded-lg text-gray-500"
    >
      <p>Não há consultas agendadas.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services'
import { format } from 'date-fns'

const route = useRoute()

const {
  id
} = route.params

/**
 * List user data and schedules.
 */
const {
  data: response
} = await useAsyncData('person', async () => {
  const {
    data
  } = await api.get(`/person/${id}`)

  const req = await api.get('/consultation')

  const schedules = req.data.data?.length > 0
    ? req.data.data.filter(consultation => consultation.consultation_vet[0].id === data.data.id)
      .map(consultation => ({
        ...consultation,
        date: consultation.date ? format(new Date(consultation.date), 'dd/MM/yyyy') : null
      }))
    : []

  return ({
    ...data.data,
    schedules
  })
})

/**
 * Convert from proxy to array.
 */
const data = toRaw(response.value)
</script>

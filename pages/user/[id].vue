<template>
  <div class="py-32 container">
    <div class="flex items-center justify-between">
      <h1 class="text-5xl leading-tight font-bold text-gray-900">
        Olá, {{ data.name }}
      </h1>

      <Button
        label="Adicionar pet"
        @click="toggle"
      />
    </div>

    <div
      v-if="pets.length > 0"
      class="mt-10 grid grid-cols-3 gap-8"
    >
      <div
        v-for="pet in pets"
        :key="pet.id"
        class="flex p-6 items-center justify-between
        bg-white border border-solid border-gray-200 rounded-lg"
      >
        <div class="flex flex-col">
          <div class="flex items-center">
            <span
              v-if="pet.color"
              :style="{ backgroundColor: pet.color }"
              class="w-2 h-2 rounded-full mr-4"
            />

            <h2 class="text-xl font-bold text-gray-900">
              {{ pet.name }}
            </h2>
          </div>

          <p
            v-if="pet.birth_date"
            class="mt-2 text-sm font-semibold text-gray-500"
          >
            {{ pet.birth_date }}
          </p>

          <p
            v-if="pet.description"
            class="mt-4 text-sm text-gray-500"
          >
            {{ pet.description }}
          </p>
        </div>

        <button
          type="button"
          @click="remove(pet.id)"
        >
          <svg class="w-6 h-6 stroke-red-500 fill-transparent" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0
              01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-else
      class="mt-10 bg-gray-100 p-16 rounded-lg text-gray-500"
    >
      <p>Não há pets cadastrados.</p>
    </div>

    <Modal
      v-show="show"
      title="Cadastrar pet"
      :loading="loading"
      @close="toggle"
      @create="create"
    >
      <div class="flex flex-col gap-4">
        <Input
          id="name"
          v-model="form.name"
          label="Nome"
          placeholder="Digite o nome do pet"
        />

        <Input
          id="color"
          v-model="form.color"
          type="color"
          label="Cor"
          placeholder="Selecione a cor do pet"
        />

        <Input
          id="birth_date"
          v-model="form.birth_date"
          type="date"
          label="Aniversário"
          placeholder="Selecione a data de aniversário do pet"
        />

        <Input
          id="description"
          v-model="form.description"
          label="Descrição"
          placeholder="Digite uma descrição do pet"
        />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services'
import { format } from 'date-fns'

const show = ref(false)
const loading = ref(false)

const form = ref({
  name: '',
  color: '#000000',
  birth_date: '',
  description: ''
})

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
 * List pets by user id.
 */
const {
  data: reqPets,
  refresh
} = await useAsyncData('pets', async () => {
  const req = await api.get('/pet')

  const filter = req.data.data
    .filter(fields => fields.pet_person[0].id === Number(id))

  const formatter = filter.length > 0
    ? filter.map(field => ({
      ...field,
      birth_date: field.birth_date ? format(new Date(field.birth_date), 'dd/MM/yyyy') : null
    }))
    : []

  return formatter
})

/**
 * Convert from proxy to array.
 */
const data = toRaw(reqData.value)
const pets = computed(() => toRaw(reqPets.value))

const onloading = (state: boolean) => {
  loading.value = state
}

/**
 * Toggle modal.
 */
const toggle = () => {
  show.value = !show.value
}

/**
 * Create pet.
 */
const create = async () => {
  onloading(true)

  const formatter = new FormData()

  Object.entries(form.value).forEach(([key, value]) => {
    formatter.append(key, value)
  })

  formatter.append('person_id', route.params.id as string)

  await api.post('/pet', formatter)
    .then(async () => {
      await refresh()

      toggle()
    })
    .finally(() => onloading(false))
}

/**
 * Delete pet.
 */
const remove = async (key: number) => {
  await api.delete(`/pet/${key}`)

  await refresh()
}

</script>

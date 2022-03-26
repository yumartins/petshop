<template>
  <div class="py-32 container">
    <div class="flex items-center justify-between">
      <h1 class="text-5xl leading-tight font-bold text-gray-900">
        Olá, {{ data.name }}
      </h1>

      <div class="flex items-center gap-4">
        <Button
          v-if="pets.length > 0"
          label="Agendar consulta"
          appearance="secondary"
          @click="toggle('SCHEDULE')"
        />

        <Button
          label="Adicionar pet"
          @click="toggle('CREATE')"
        />
      </div>
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
      v-show="showed"
      title="Cadastrar pet"
      :loading="loading"
      @close="toggle('CREATE')"
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

    <Modal
      v-show="scheduled"
      title="Agendar consulta"
      button="Agendar"
      :loading="loading"
      @close="toggle('SCHEDULE')"
      @create="scheduling"
    >
      <div class="flex flex-col gap-4">
        <Select
          id="vet_id"
          v-model="refs.vet_id"
          label="Veterinário"
          :options="vets"
          placeholder="Selecione o veterinário"
        />

        <Select
          id="pet_id"
          v-model="refs.pet_id"
          label="Pet"
          :options="filterPets()"
          placeholder="Selecione o pet"
        />

        <Input
          id="date"
          v-model="refs.date"
          type="date"
          label="Data"
          placeholder="Selecione a data da consulta"
        />

        <Input
          id="description"
          v-model="refs.description"
          label="Descrição"
          placeholder="Digite o que deseja"
        />

        <span
          v-if="success"
          class="text-green-500 mt-6 text-center text-sm"
        >
          {{ success }}
        </span>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services'
import { format } from 'date-fns'

const load = ref(false)

const show = ref(false)
const success = ref('')
const schedule = ref(false)

const form = ref({
  name: '',
  color: '#000000',
  birth_date: '',
  description: ''
})

const refs = ref({
  date: '',
  pet_id: null,
  vet_id: null,
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
 * List vets data.
 */
const {
  data: reqVets
} = await useAsyncData('vets', async () => {
  const req = await api.get('/vet')

  const formatter = req.data.data.length > 0
    ? req.data.data.map(field => ({ value: field.id, label: field.person.name }))
    : []

  return formatter
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
const vets = toRaw(reqVets.value)
const pets = computed(() => toRaw(reqPets.value))

const onloading = (state: boolean) => {
  load.value = state
}

/**
 * Toggle modal.
 */
const toggle = (key: 'CREATE' | 'SCHEDULE') => {
  switch (key) {
    case 'CREATE':
      show.value = !show.value

      break

    case 'SCHEDULE':
      schedule.value = !schedule.value

      break

    default:
      break
  }
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

      toggle('CREATE')
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

/**
 * Format pets for populate select.
 */
const filterPets = () => {
  if (pets.value.length > 0) {
    const filter = pets.value.map(pet => ({
      value: pet.id,
      label: pet.name
    }))

    return filter
  }

  return []
}

/**
 * Schedule with vet.
 */
const scheduling = async () => {
  onloading(true)

  const formatter = new FormData()

  formatter.append('date', refs.value.date)
  formatter.append('description', refs.value.description)
  formatter.append('pet_id', refs.value.pet_id.value)
  formatter.append('vet_id', refs.value.vet_id.value)

  await api.post('/consultation', formatter)
    .then(() => {
      success.value = 'Agendamento realizado com sucesso.'

      setTimeout(() => {
        success.value = ''

        toggle('SCHEDULE')
      }, 3000)
    })
    .finally(() => onloading(false))
}

const showed = computed(() => show.value)
const loading = computed(() => load.value)
const scheduled = computed(() => schedule.value)
</script>

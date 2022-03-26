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
      class="flex flex-col"
    >
      <div
        v-for="pet in pets"
        :key="pet.id"
      >
        <h2>{{ pet.name }}</h2>
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

const show = ref(false)
const loading = ref(false)

const form = ref({
  name: '',
  color: '',
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
  data
} = await useLazyAsyncData('person', async () => {
  const req = await api.get(`/person/${id}`)

  return req.data.data
})

/**
 * List pets by user id.
 */
const {
  data: pets,
  refresh
} = await useLazyAsyncData('pets', async () => {
  const req = await api.get('/pet')

  const filter = req.data.data
    .filter(fields => fields.pet_person[0].id === Number(id))

  return filter
})

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

</script>

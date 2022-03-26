<template>
  <div class="flex flex-col">
    <h1 class="text-5xl leading-tight font-bold text-gray-900">
      Cadastre-se
    </h1>

    <p class="mt-4 text-base text-gray-500">
      Expanda seu negócio agora mesmo.
    </p>

    <form
      class="flex mt-10 flex-col gap-4"
      @submit.prevent="create"
    >
      <Input
        id="name"
        v-model="form.name"
        label="Nome"
        placeholder="Digite seu nome"
      />

      <Input
        id="street"
        v-model="form.street"
        label="Rua"
        placeholder="Digite seu endereço"
      />

      <Input
        id="number"
        v-model="form.number"
        label="Número"
        placeholder="Digite seu número de endereço"
      />

      <div class="flex items-center gap-4">
        <Input
          id="district"
          v-model="form.district"
          label="Estado"
          placeholder="Digite seu estado"
        />

        <Input
          id="city"
          v-model="form.city"
          label="Cidade"
          placeholder="Digite sua cidade"
        />
      </div>

      <Input
        id="crmv"
        v-model="form.crmv"
        label="CRMV"
        placeholder="Digite seu número CRMV"
      />

      <Button
        type="submit"
        label="Cadastrar"
        class="mt-8"
        :loading="loading"
      />

      <span
        v-if="error"
        class="text-sm text-red-500"
      >
        {{ error }}
      </span>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { api } from '~/services'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()

const form = ref({
  name: '',
  crmv: '',
  city: '',
  street: '',
  number: '',
  district: ''
})

const error = ref('')
const loading = ref(false)

const onloading = (state) => {
  loading.value = state
}

const create = async () => {
  onloading(true)

  const {
    crmv,
    ...rest
  } = form.value

  const data = new FormData()

  Object.entries(rest).forEach(([key, value]) => {
    data.append(key, value)
  })

  await api.post('/person', data)
    .then(async ({ data: response }) => {
      const register = new FormData()

      register.append('crmv', crmv)
      register.append('person_id', response.data.id)

      const {
        data: res
      } = await api.post('/vet', register)

      console.log(res)

      router.push(`/vet/${res.data.id}`)
    })
    .catch(({ response }) => {
      error.value = response
    })
    .finally(() => onloading(false))
}
</script>

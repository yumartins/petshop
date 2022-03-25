<template>
  <div class="flex flex-col">
    <h1 class="text-5xl leading-tight font-bold text-gray-900">
      Cadastre-se
    </h1>

    <p class="mt-4 text-base text-gray-500">
      Tenha acesso à todos os veterinários.
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
          id="state"
          v-model="form.state"
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

<script ts>
import { ref } from 'vue'
import { api } from '~/services'

definePageMeta({
  layout: 'auth'
})

export default {
  setup () {
    const form = ref({
      name: '',
      city: '',
      state: '',
      street: '',
      number: ''
    })

    const error = ref('')
    const loading = ref(false)

    const onloading = (state) => {
      loading.value = state
    }

    const create = async () => {
      onloading(true)

      const {
        name,
        city,
        state,
        street,
        number
      } = form.value

      await api.post('/person', {
        name,
        city,
        street,
        number: number ? Number(number) : undefined,
        district: state
      })
        .then(({ data }) => console.log(data))
        .catch(({ response }) => {
          error.value = response
        })
        .finally(() => onloading(false))
    }

    return {
      form,
      error,
      create,
      loading
    }
  }
}
</script>

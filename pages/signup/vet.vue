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
        v-model="name"
        label="Nome"
        placeholder="Digite seu nome"
      />

      <Input
        id="street"
        v-model="street"
        label="Rua"
        placeholder="Digite seu endereço"
      />

      <Input
        id="number"
        v-model="number"
        label="Número"
        placeholder="Digite seu número de endereço"
      />

      <div class="flex items-center gap-4">
        <Input
          id="state"
          v-model="state"
          label="Estado"
          placeholder="Digite seu estado"
        />

        <Input
          id="city"
          v-model="city"
          label="Cidade"
          placeholder="Digite sua cidade"
        />
      </div>

      <Input
        id="crmv"
        v-model="crmv"
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

<script lang="ts">
import { ref } from 'vue'
import { api } from '~/services'

definePageMeta({
  layout: 'auth'
})

export default {
  setup () {
    const form = ref({
      name: '',
      crmv: '',
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
        crmv,
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
        .then(async ({ data }) => {
          await api.post('/vet', {
            crmv,
            person_id: data.id
          })
        })
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

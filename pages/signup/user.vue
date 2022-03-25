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

      <Button
        type="submit"
        label="Cadastrar"
        class="mt-8"
      />
    </form>
  </div>
</template>

<script ts>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

export default {
  setup () {
    const name = ref('')

    const address = {
      city: ref(''),
      state: ref(''),
      street: ref(''),
      number: ref('')
    }

    const create = () => {
      console.log(address.state.value, address.city.value)
    }

    return {
      name,
      create,
      ...address
    }
  }
}
</script>

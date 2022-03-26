<template>
  <div class="flex flex-col">
    <div class="flex py-10 left-0 right-0 container items-center fixed top-0 justify-between">
      <img
        src="/assets/logo.svg"
        alt="Puphub"
      >

      <div class="flex gap-6 items-center">
        <Button
          label="Acessar como veterinário"
          appearance="secondary"
          @click="toggle('VET')"
        />

        <Button
          label="Acessar como cliente"
          @click="toggle('USER')"
        />
      </div>
    </div>

    <div
      class="flex h-screen items-center bg-cover bg-no-repeat"
      style="background-image: url('/assets/background.svg')"
    >
      <div class="flex items-center container justify-between">
        <div class="flex flex-col max-w-sm">
          <h1 class="text-5xl leading-tight font-bold text-gray-900">
            Taking care for your Smart Dog !
          </h1>

          <p class="mt-6 text-base text-gray-500">
            Human–canine bonding is the relationship between dogs and humans.
          </p>

          <div class="mt-16 flex flex-col gap-6">
            <NuxtLink to="/signup/vet">
              <Button
                label="Quero ser um veterinário"
                class="w-full"
                appearance="secondary"
              />
            </NuxtLink>

            <NuxtLink to="/signup/user">
              <Button
                label="Quero ser um cliente"
                class="w-full"
              />
            </NuxtLink>
          </div>
        </div>

        <img
          src="/assets/dog-banner.png"
          alt="Dog"
        >
      </div>
    </div>

    <Modal
      v-show="showed"
      button="Acessar"
      title="Acessar a plataforma"
      :loading="loading"
      @close="toggle()"
      @create="auth"
    >
      <Input
        id="id"
        v-model="id"
        label="Identificador"
        placeholder="Digite a chave de acesso"
      />

      <span
        v-if="error"
        class="mt-4 text-center text-sm text-red-500"
      >
        {{ error }}
      </span>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { api } from '~/services'

const id = ref('')
const type = ref('')

const error = ref('')

const load = ref(false)
const show = ref(false)

const router = useRouter()

/**
 * Toggle modal.
 */
const toggle = (key?: 'VET' | 'USER') => {
  show.value = !show.value

  type.value = key || ''
}

const showed = computed(() => show.value)
const loading = computed(() => load.value)

const auth = async () => {
  if (!id.value) {
    error.value = 'Digite seu identificador.'

    return
  }

  const path = type.value.toLowerCase()

  load.value = true

  await api.get(`/person/${id.value}`)
    .then(({ data }) => router.push(`/${path}/${data.data.id}`))
    .catch(() => {
      error.value = 'Desculpe, chave incorreta.'
    })

  load.value = false
}
</script>

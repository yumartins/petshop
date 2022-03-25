<template>
  <div class="flex flex-col">
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
</template>

<script ts setup>
definePageMeta({
  layout: 'app'
})
</script>

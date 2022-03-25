<template>
  <div class="flex flex-col">
    <div class="flex py-10 left-0 right-0 container items-center fixed top-0 justify-between">
      <img
        src="/assets/logo.svg"
        alt="Puphub"
      >

      <div class="flex gap-6 items-center">
        <NuxtLink to="/vet">
          <Button
            label="Acessar como veterinário"
            appearance="secondary"
          />
        </NuxtLink>

        <NuxtLink to="/user">
          <Button label="Acessar como cliente" />
        </NuxtLink>
      </div>
    </div>

    <div
      class="flex h-screen items-center bg-cover bg-no-repeat"
      style="background-image: url('/assets/background.svg')"
    >
      <div class="flex items-center container justify-between">
        <div class="flex flex-col max-w-sm">
          <slot />
        </div>

        <img
          src="/assets/dog-banner.png"
          alt="Dog"
        >
      </div>
    </div>
  </div>
</template>

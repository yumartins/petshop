<template>
  <div class="flex w-full h-screen items-center">
    <div class="flex w-ful flex-col px-36 py-20 min-w-[40rem]">
      <NuxtLink to="/" class="mb-16">
        <img
          src="/assets/logo.svg"
          alt="Puphub"
        >
      </NuxtLink>

      <slot />
    </div>

    <div class="flex h-full w-full items-center justify-center bg-blue-100">
      <img alt="" src="/assets/auth-background.png">
    </div>
  </div>
</template>

<template>
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
</template>

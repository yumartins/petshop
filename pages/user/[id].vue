<template>
  <h1>{{ $route.params.id }}</h1>
</template>

<script lang="ts" setup>
const route = useRoute()

console.log(route.params.id)
</script>

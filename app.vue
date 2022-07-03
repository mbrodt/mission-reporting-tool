<template>
  <div class="min-h-screen pt-16 font-mono bg-gray-50 min-w-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import "./assets/tailwind.css";
</script>

<style>
.card {
  @apply bg-white shadow-xl rounded-xl p-8;
}

.btn {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}

.main-grid {
  @apply grid grid-cols-2 mx-auto max-w-5xl gap-12;
}

.text-input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
</style>

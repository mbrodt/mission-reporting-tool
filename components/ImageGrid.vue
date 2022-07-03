<template>
  <div class="grid grid-cols-3 gap-2">
    <img
      @click="$emit('image-click', image)"
      class="object-cover w-full h-32"
      v-for="image in images"
      :src="image"
      :key="image"
      alt="Mars image by the NASA Curiosity Rover"
    />
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="scss" scoped></style>

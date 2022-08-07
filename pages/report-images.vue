<template>
  <div class="main-grid">
    <div>
      <div class="card min-h-[520px]">
        <p class="mb-2">Select images for the report</p>
        <ImageGrid :images="loadedImages" @image-click="selectImage" />
        <button class="block mx-auto mt-4 btn btn-secondary" @click="counter++">
          Load more
        </button>
      </div>
    </div>
    <div>
      <div class="card min-h-[192px]" v-if="report.images.length">
        <p class="mb-2">Selected images</p>

        <ImageGrid :images="report.images" @image-click="removeImage" />
      </div>
    </div>
  </div>
</template>

<script setup>
let images = ref([]);
let counter = ref(1);

const report = useState("report");

const selectImage = (image) => {
  if (report.value.images.length >= 7) {
    return alert("You can only select up to 7 images");
  }
  if (!report.value.images.includes(image)) {
    report.value.images.push(image);
  }
};

const removeImage = (image) => {
  report.value.images = report.value.images.filter((img) => img !== image);
};

onMounted(async () => {
  const data = await $fetch(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=15"
  );
  images.value = data.photos.map((photo) => photo.img_src);
});

const loadedImages = computed(() => images.value.slice(0, counter.value * 9));

definePageMeta({
  layout: "report",
});
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <h1 class="text-4xl font-bold text-center">Confirm report details</h1>
    <div class="main-grid">
      <div class="col-span-2 card main-grid">
        <div>
          <p class="text-xl font-bold">{{ report.name }}</p>
          <p class="text-lg">{{ report.description }}</p>
          <p>{{ formattedDate }}</p>
          <p>
            The current position of the ISS is at
            {{ report.location?.latitude }},
            {{ report.location?.longitude }}
          </p>
          <p>
            This report was expertly crafted and is hereby signed by
            {{ fullName }}
          </p>
        </div>
        <ImageGrid :images="report.images" />
      </div>
    </div>
  </div>
</template>

<script setup>
const report = useState("report");
const user = useState("user");

const fullName = computed(() => {
  return `${user.value.first_name} ${user.value.last_name} (${user.value.code_name})`;
});

const formattedDate = computed(() => {
  const date = report.value.date;
  return date
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(date)
    : "";
});

definePageMeta({
  layout: "report",
});
</script>

<style lang="scss" scoped></style>

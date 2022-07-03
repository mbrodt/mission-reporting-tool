<template>
  <form class="main-grid">
    <div class="card">
      <div>
        <label
          class="block mb-2 text-sm font-bold text-gray-700"
          for="missionName"
        >
          Mission name
        </label>
        <input
          class="text-input"
          id="missionName"
          type="text"
          placeholder="Name of the mission"
          v-model="report.name"
        />
      </div>
      <div class="mt-4">
        <label
          class="block mb-2 text-sm font-bold text-gray-700"
          for="missionDescription"
        >
          Mission description
        </label>
        <textarea
          rows="6"
          class="text-input"
          id="missionDescription"
          type="text"
          placeholder="Description of the mission"
          v-model="report.description"
        />
      </div>
    </div>
    <div class="card">
      <Datepicker
        inline
        v-model="report.date"
        :enable-time-picker="false"
        auto-apply
      />
    </div>
  </form>
</template>

<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const report = useState("report");

definePageMeta({
  layout: "report",
});
</script>

<style lang="scss" scoped></style>

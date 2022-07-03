<template>
  <div>
    <div class="flex justify-around max-w-5xl mx-auto my-16">
      <div
        class="flex flex-col items-center"
        v-for="(step, index) in timelineSteps"
        :key="step.path"
      >
        <div
          class="flex items-center justify-center w-8 h-8 border rounded-full border-sky-400"
          :class="{ 'bg-sky-400 text-white': index < activeStep.step }"
        >
          {{ index + 1 }}
        </div>
        <span
          class="mt-2 text-xs font-semibold tracking-widest text-gray-600 uppercase"
          >{{ step.name }}</span
        >
      </div>
    </div>
    <slot />
    <div class="flex justify-between max-w-5xl mx-auto mt-4">
      <NuxtLink :to="prevStep.path" class="btn"
        >Back to {{ prevStep.name }}</NuxtLink
      >
      <NuxtLink
        v-if="activeStep.name !== 'Confirmation'"
        :to="nextStep.path"
        class="btn"
        >Next: {{ nextStep.name }}</NuxtLink
      >
      <button @click="saveReport" class="btn" v-else>Finish report</button>
    </div>
    <pre>
      {{ report }}
    </pre>
  </div>
</template>

<script setup>
const router = useRouter();
console.log("layout");

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const user = useUser();
let report = useState("report");
console.log("REPORT IN LAYOUT:", report.value);

if (!report.value) {
  report = useState("report", () => ({
    id: uuidv4(),
    name: "",
    description: "",
    date: "",
    images: [],
    location: null,
  }));
}

const steps = reactive([
  {
    step: 0,
    name: "Overview",
    path: "/",
  },
  {
    step: 1,
    name: "Details",
    path: "/report-details",
  },
  {
    step: 2,
    name: "Images",
    path: "/report-images",
  },
  {
    step: 3,
    name: "Location",
    path: "/report-location",
  },
  {
    step: 4,
    name: "Confirmation",
    path: "/report-confirmation",
  },
]);

const timelineSteps = computed(() => {
  return steps.filter((step) => step.step !== 0);
});

const activeStep = computed(() => {
  return steps.find((step) => step.path === router.currentRoute.value.path);
});

const prevStep = computed(() => {
  return steps.find((step) => step.step === activeStep.value.step - 1);
});

const nextStep = computed(() => {
  return steps.find((step) => step.step === activeStep.value.step + 1) || {};
});

const saveReport = () => {
  const reportToSave = {
    ...report.value,
    user: user.value,
  };
  console.log(reportToSave);
  const userKey = `reports-by-${user.value.id}`;
  const currentReports = JSON.parse(localStorage.getItem(userKey) || "[]");
  console.log("currentReports:", currentReports);
  currentReports.push(reportToSave);
  localStorage.setItem(userKey, JSON.stringify(currentReports));
  router.push("/");
};
</script>

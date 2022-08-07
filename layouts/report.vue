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
    <div class="flex justify-between max-w-5xl mx-auto mt-8">
      <NuxtLink :to="prevStep.path" class="btn btn-primary"
        >Back: {{ prevStep.name }}</NuxtLink
      >
      <NuxtLink
        v-if="activeStep.name !== 'Confirmation'"
        :to="nextStep.path"
        class="btn btn-primary"
        >Next: {{ nextStep.name }}</NuxtLink
      >
      <button @click="saveReport" class="btn btn-primary" v-else>
        Finish report
      </button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

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
const isUpdating = useState("isUpdating");

if (!report.value) {
  report = useState("report", () => ({
    id: uuidv4(),
    name: "",
    description: "",
    date: new Date(),
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
    name: "Report details",
    path: "/report-details",
  },
  {
    step: 2,
    name: "Select images",
    path: "/report-images",
  },
  {
    step: 3,
    name: "ISS Location",
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
  const userKey = `reports-by-${user.value.id}`;
  const currentReports = JSON.parse(localStorage.getItem(userKey) || "[]");
  if (!isUpdating.value) {
    currentReports.push(reportToSave);
  } else {
    const index = currentReports.findIndex(
      (report) => report.id === reportToSave.id
    );
    currentReports[index] = reportToSave;
  }
  localStorage.setItem(userKey, JSON.stringify(currentReports));
  router.push("/");
};
</script>

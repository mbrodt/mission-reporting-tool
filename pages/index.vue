<template>
  <div>
    <p class="text-4xl text-center">MRT</p>
    <h3 class="mt-6 text-5xl text-center">
      Hi, <span class="font-bold">{{ fullName }}</span>
    </h3>
    <div class="mt-8 main-grid">
      <div>
        <div
          class="grid w-full min-h-full grid-cols-2 gap-4 border border-gray-200 card"
        >
          <div
            @click="updateReport(report)"
            v-for="report in reports"
            :key="report.name"
          >
            {{ report.name }}
          </div>
        </div>
      </div>
      <div class="grid gap-12">
        <div class="flex justify-center card">
          <NuxtLink
            class="flex items-center btn btn-primary"
            to="/report-details"
          >
            Create new Space Report
            <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </NuxtLink>
        </div>
        <div class="card">
          <p class="text-lg font-bold text-center">Fun space fact</p>
          <p class="mt-4">
            {{ selectedFact }}
          </p>
        </div>
      </div>
      <pre>{{ report }}</pre>
    </div>
  </div>
</template>

<script setup>
import facts from "@/assets/spacefacts.json";

const router = useRouter();
const user = useUser();
const report = useState("report");
const isUpdating = useState("isUpdating", () => false);
let reports = [];

const selectedFact = ref(facts[Math.floor(Math.random() * facts.length)]);

const updateReport = (selectedReport) => {
  isUpdating.value = true;
  report.value = selectedReport;

  router.push({
    name: "report-details",
  });
};

onMounted(() => {
  report.value = undefined;
  isUpdating.value = false;
});

const fullName = computed(() => {
  return `${user?.value?.first_name} ${user?.value?.last_name} (${user?.value?.code_name})`;
});

if (user.value) {
  const userKey = `reports-by-${user.value.id}`;
  const userReports = localStorage.getItem(userKey) || "[]";
  reports = ref(JSON.parse(userReports));
}
</script>

<style lang="scss" scoped></style>

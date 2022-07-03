<template>
  <div class="main-grid">
    <div>
      <div class="!p-0 card">
        <div class="w-full h-[400px] rounded-xl" id="map"></div>
      </div>
    </div>
    <div>
      <div class="card">
        <div>
          <p>Current position of the International Space Station</p>
          <label
            class="block mt-4 mb-2 text-sm font-bold text-gray-700"
            for="lat"
          >
            Latitude
          </label>
          <input
            class="text-input"
            id="lat"
            type="text"
            readonly
            :value="latitude"
          />
        </div>
        <div class="mt-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="lng">
            Longitude
          </label>
          <input
            class="text-input"
            id="lng"
            type="text"
            readonly
            :value="longitude"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const config = useRuntimeConfig().public;
const report = useState("report");

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

const latitude = computed(() => report.value.location?.latitude);
const longitude = computed(() => report.value.location?.longitude);

let interval;

const createMap = () => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [longitude.value, latitude.value],
    zoom: 3,
  });
  const marker = new mapboxgl.Marker()
    .setLngLat([longitude.value, latitude.value])
    .addTo(map);
  return { map, marker };
};

const getCurrentPosition = async () => {
  const data = await $fetch(
    `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${
      Date.now() / 1000
    }`
  );
  return data[0];
};

const updatePosition = async (map, marker) => {
  report.value.location = await getCurrentPosition();
  map.setCenter([longitude.value, latitude.value]);
  marker.setLngLat([longitude.value, latitude.value]);
};

onMounted(async () => {
  report.value.location = await getCurrentPosition();
  const { map, marker } = createMap();
  interval = setInterval(() => {
    updatePosition(map, marker);
  }, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});

definePageMeta({
  layout: "report",
});
</script>

<style>
.mapboxgl-canvas {
  @apply w-full h-full;
}
</style>

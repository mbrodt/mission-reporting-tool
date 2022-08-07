<template>
  <button
    v-if="user"
    @click="logout"
    class="absolute top-4 right-4 btn btn-primary"
  >
    Logout here!
  </button>
</template>

<script setup>
const user = useUser();

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
</script>

<style lang="scss" scoped></style>

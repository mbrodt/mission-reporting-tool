<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-xs mt-16">
      <form
        @submit.prevent="attemptLogin"
        class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
            E-mail
          </label>
          <input
            v-model="email"
            :class="[showError && 'error']"
            class="text-input"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="password"
          >
            Password
          </label>
          <input
            v-model="password"
            :class="[showError && 'error']"
            class="text-input"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="mt-1">
          <p class="mt-2 text-xs italic text-red-500" v-if="showError">
            Something went wrong
          </p>
          <div class="flex items-center justify-between">
            <button class="mt-6 btn" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import users from "@/assets/users.json";

let email = ref("");
let password = ref("");
let showError = ref(false);

const attemptLogin = () => {
  const foundUser = users.find(
    (user) => user.email === email.value && user.password === password.value
  );
  if (!foundUser) {
    showError.value = true;
  } else {
    showError.value = false;
    localStorage.setItem("user", JSON.stringify(foundUser));
    navigateTo("/");
  }
};
</script>

<style scoped>
.error {
  @apply border-red-500;
}
</style>

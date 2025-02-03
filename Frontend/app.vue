<template>

  <div class="bg-white min-h-screen text-black font-inter">
    <NuxtLayout />
    <NuxtRouteAnnouncer />
  </div>

</template>

<script setup>

import { onNuxtReady } from '#app';
import { useAuthStore } from '~/stores/auth';

onNuxtReady(async () => {
  const auth = useAuthStore();

  console.log("YOOOO")
  console.log(auth.isAuthenticated)
  try {
    console.log('Performing initial authentication check...');
    await auth.refreshAccessToken(); // Tente de rafraîchir le token
    await auth.fetchUser();
    console.log('Initial authentication successful.');
  } catch (error) {
    console.log('User not authenticated on initial load.');
  }

});
</script>

<style>

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

</style>
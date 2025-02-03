<template>
  <div class="navbar px-4 flex justify-between items-center border-b-[0.2px] border-gray-400 fixed z-10 bg-white" >
    <NuxtLink to="/" class="flex space-x-2 cursor-pointer">
      <i class="fa-solid fa-fire  text-orange-400 text-3xl"></i>
      <h1 class="text-2xl">UltraSound</h1>
    </NuxtLink>
    <div class="hidden space-x-12  text-lg py-4  md:flex">
      <NuxtLink to="/" >Home</NuxtLink>
      <NuxtLink to="/view1">Our Vision</NuxtLink>
      <NuxtLink to="/view2">AI-Assistant</NuxtLink>
    </div>
    <div v-if="auth.user">
      <div className="avatar">
        <div className="w-12 mr-3 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <img src="~/assets/icon/logout.png" alt="" class=" cursor-pointer w-7 h-7 mr-2" @click="logoutRequest">
      <NuxtLink to="/member" class="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm">Espace Membre</NuxtLink>
    </div>
    <NuxtLink v-else to="/auth" class="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm">
      Connexion / Inscription
    </NuxtLink>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import AuthButton from './Auth/AuthButton.vue';
const auth = useAuthStore();

const logoutRequest = async () => {
  try {
    await auth.logout();
  }
  catch (error) {
    throw error;
  }
}

</script>
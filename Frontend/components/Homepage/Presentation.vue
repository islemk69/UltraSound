<template>

  <div class="w-screen h-screen flex flex-col items-center justify-center space-y-7">
    <div class="space-y-2 text-4xl md:text-7xl fade-slide" v-if="showPresentation">
      <h2 class=" font-semibold text-center">UltraSound Capital</h2>
      <h2 class="font-semibold text-center">Powered by AI.</h2>
    </div>
    <p class="text-xl md:text-2xl fade-slide" v-if="showPresentation">Stay connected !</p>
    <button class="bg-black px-4 py-1 md:px-6 md:py-3 rounded-full text-1xl md:text-2xl text-white fade-slide" v-if="showPresentation">Commencer</button>
  </div>

</template>



<script setup>

import { ref, onMounted } from 'vue';

const showPresentation = ref(false);
onMounted(() => {
  // Vérifie si l'utilisateur a déjà vu l'animation pendant cette session
  const hasSeenAnimation = sessionStorage.getItem('hasSeenPresentation');

  if (!hasSeenAnimation) {
    setTimeout(() => {
      showPresentation.value = true;
      sessionStorage.setItem('hasSeenPresentation', 'true'); // Marque l'animation comme vue pour cette session
    }, 800); // Attente de 0.8 seconde
  } else {
    showPresentation.value = true; // Montre directement le contenu
  }
});



</script>


<style scoped>

.fade-slide {
  opacity: 0;
  transform: translateY(-20px); /* Départ en haut */
  animation: fadeSlideIn 1s ease forwards; /* Animation sur 1 seconde */
}

/* Définition de l'animation */
@keyframes fadeSlideIn {
  to {
    opacity: 1;
    transform: translateY(0); /* Arrive à sa position d'origine */
  }
}

</style>


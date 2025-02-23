<template>
 <div class=" pt-24">
  <button class="btn" @click="checkout">Payer</button>
 </div>


</template>

<script setup>

const checkout = async () => {
  const response = await fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const { url } = await response.json(); // Récupère l'URL Stripe
  window.location.href = url; // Redirige l'utilisateur vers Stripe
}

definePageMeta({
  middleware: 'protected',
});

</script>
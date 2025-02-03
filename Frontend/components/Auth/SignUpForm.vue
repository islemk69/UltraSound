<template>
  <form @submit.prevent="onSubmit" class="space-y-3">
    <AuthInput id="username" label="Username" placeholder="your@email.com" v-model="username" />
    <AuthInput id="email" label="Email" placeholder="your@email.com" v-model="email" />
    <AuthInput id="password" label="Password" type="password" placeholder="••••••••" v-model="password" />
    <AuthButton :label="'Sign Up'" :loading="loading" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import AuthInput from './AuthInput.vue';
import AuthButton from './AuthButton.vue';
const apiUrl = process.server
        ? useRuntimeConfig().apiUrl // Utilisé côté serveur
        : useRuntimeConfig().public.apiUrl; // Utilisé côté client

const email = ref('');
const username = ref('');
const password = ref('');
const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
  loading.value = true;

  try {
    const payload = {
      email: email.value,
      username: username.value,
      password: password.value,
    };

    // Requête d'inscription
    const apiBase = useRuntimeConfig().public.apiBase;
    const response = await $fetch(`api/auth/register`, {
      method: 'POST',
      body: payload,
      credentials: 'include', // Inclut les cookies HttpOnly si utilisés
    });

    if (response.success) {
      alert('Sign Up successful!');
    } else {
      alert(response.message || 'An error occurred during Sign Up.');
    }
  } catch (error) {
    console.error('Sign Up Error:', error);
    alert('Unable to complete Sign Up. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>

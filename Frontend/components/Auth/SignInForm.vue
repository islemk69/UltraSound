<template>
  <form @submit.prevent="onSubmit" class="space-y-3">
    <AuthInput id="email" label="Email" placeholder="your@email.com" v-model="email" />
    <AuthInput id="password" label="Password" type="password" placeholder="••••••••" v-model="password" />
    <AuthButton :label="'Sign In'" :loading="loading" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import AuthInput from './AuthInput.vue';
import AuthButton from './AuthButton.vue';
import { useAuthStore } from '~/stores/auth';

const email = ref('');
const password = ref('');
const loading = ref(false);
const auth = useAuthStore();

const onSubmit = async () => {
  loading.value = true;
  try {
    await auth.login({ email: email.value, password: password.value });
  } catch (error) {
    alert('Login failed');
    console.error(error)
  }
  loading.value = false;
};
</script>

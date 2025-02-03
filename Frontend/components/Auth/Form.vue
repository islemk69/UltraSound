<template>
  <div class="flex items-center justify-center h-screen px-4">
    <div
    class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transition-all duration-500 overflow-hidden"
    :class="{ 'h-[460px]': signupForm, 'h-[400px]': !signupForm }"
  >
    <h3 class="text-center text-2xl font-bold pb-8">{{ signupForm ? 'Sign Up' : 'Sign In' }}</h3>
    <transition name="smooth-fade">
      <SignUpForm v-if="signupForm" />
      <SignInForm v-else />
    </transition>
    <p class="text-center mt-6">
      {{ signupForm ? 'Have an account?' : "Don't have an account?" }}
      <span @click="switchForm" class="text-blue-600 font-bold cursor-pointer">
        {{ signupForm ? 'Sign In' : 'Sign Up' }}
      </span>
    </p>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SignInForm from './SignInForm.vue';
import SignUpForm from './SignUpForm.vue';

const signupForm = ref(false);

const switchForm = () => {
  signupForm.value = !signupForm.value;
};
</script>


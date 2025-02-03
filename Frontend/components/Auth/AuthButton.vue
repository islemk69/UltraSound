<template>
  <button
    class="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-3 rounded-md text-sm w-full"
    :disabled="loading"
  >
    <span v-if="!loading">{{ label }}</span>
    <span v-else>Loading...</span>
  </button>
</template>

<script setup>
defineProps({
  label: String,
  loading: { type: Boolean, default: false },
});
</script>

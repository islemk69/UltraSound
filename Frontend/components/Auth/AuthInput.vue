<template>
  <div class="flex flex-col space-y-1">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  modelValue: String, // Représente la valeur actuelle
});

defineEmits(['update:modelValue']);
</script>

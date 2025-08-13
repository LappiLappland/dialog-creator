<script setup lang="ts">
defineProps<{ modelValue: boolean; id: string }>();
defineEmits<{ 'update:modelValue': [v: boolean] }>();
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      :id="id"
      :title="id"
      :checked="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <div class="w-14 h-7 bg-gray-200 rounded-full shadow-inner transition-colors duration-300 ease-in-out peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-opacity-50 peer-checked:bg-blue-500"></div>
    <div class="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ease-in-out peer-checked:transform peer-checked:translate-x-7"></div>
  </label>
</template>

<script setup lang="ts">
defineEmits<{
    (e: 'go-back'): void;
}>();

defineProps<{
    errorText: string;
}>();

</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <div class="flex items-start mb-4">
      <div class="ml-3">
        <h2 class="text-xl font-semibold text-gray-800">
            Error while parsing
        </h2>
        <p class="mt-1 text-sm text-gray-600">
            Make sure you copied class correctly
        </p>
      </div>
    </div>

    <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            {{ errorText }}
          </p>
        </div>
      </div>
    </div>

    <button
      class="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      @click="$emit('go-back')"
    >
      Go back to import
    </button>
  </div>
</template>

<script setup lang="ts">
import type { EditorFieldEnumPayload } from '../../types/EditorFieldTypes';

defineProps<{ modelValue: string | number; payload: EditorFieldEnumPayload }>();
defineEmits<{ 'update:modelValue': [v: string] }>();
</script>

<template>
  <div
    class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-700"
  >
    {{ payload.valueConverter(modelValue) }}
  </div>
</template>

<script setup lang="ts">
import type { EditorFieldOptionsPayload } from '../../types/EditorFieldTypes';

defineProps<{ modelValue: string; id: string; payload: EditorFieldOptionsPayload }>();
defineEmits<{ 'update:modelValue': [v: string] }>();
</script>

<template>
  <input
    class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-700"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"

    :list="id"
  />
  <datalist :id="id">
    <option
    v-for="item in payload.options"
    :value="item.value"
    :key="item.value"
    ></option>
  </datalist>
</template>

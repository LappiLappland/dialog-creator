<script setup lang="ts">
import type { EditorFieldOptionsPayload } from '../../types/EditorFieldTypes';

defineProps<{ modelValue: string; payload: EditorFieldOptionsPayload }>();
defineEmits<{ 'update:modelValue': [v: string] }>();
</script>

<template>
    <select
    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
        <option v-for="option in payload.options"
        :value="option.value"
        :key="option.value"
        class="text-gray-900"
        >
            {{ option.text }}
        </option>
    </select>
</template>

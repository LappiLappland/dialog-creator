<script setup lang="ts">
import type { EditorFieldOptionsPayload } from '../../types/EditorFieldTypes';

defineProps<{ modelValue: string; payload: EditorFieldOptionsPayload }>();
defineEmits<{ 'update:modelValue': [v: string] }>();
</script>

<template>
    <select
    class="select-input"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
        <option v-for="option in payload.options"
        :value="option.value"
        :key="option.value"
        class="select-input__option"
        >
            {{ option.text }}
        </option>
    </select>
</template>

<style>
.select-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.375rem;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-main));
    transition: all 200ms ease;
}

.select-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: transparent;
}

.select-input__option {
    color: rgb(var(--text-on-main));
}
</style>

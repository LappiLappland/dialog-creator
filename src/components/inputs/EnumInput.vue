<script setup lang="ts">
import type { EditorFieldEnumPayload } from '../../types/EditorFieldTypes';

defineProps<{ modelValue: string | number; payload: EditorFieldEnumPayload }>();
defineEmits<{ 'update:modelValue': [v: string] }>();
</script>

<template>
    <div
        class="enum-input"
    >
        {{ payload.valueConverter(modelValue) }}
    </div>
</template>

<style>
.enum-input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 200ms ease;
    color: rgb(var(--text-on-main-secondary));
    background-color: rgb(var(--bg-main));
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.enum-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(var(--border-selected));
}
</style>

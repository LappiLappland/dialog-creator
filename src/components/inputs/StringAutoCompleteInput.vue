<script setup lang="ts">
import type { EditorFieldOptionsPayload } from '../../types/EditorFieldTypes';

defineProps<{ modelValue: string; id: string; payload: EditorFieldOptionsPayload }>();
defineEmits<{ 'update:modelValue': [v: string] }>();
</script>

<template>
    <div>
        <input
        class="auto-complete__input"
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
    </div>
</template>

<style>

.auto-complete__input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 200ms ease;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-main));
}

.auto-complete__input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(var(--border-selected));
}

</style>

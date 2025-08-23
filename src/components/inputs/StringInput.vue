<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits<{ 'update:modelValue': [v: string] }>();
</script>

<template>
    <textarea
    class="string-input"
    rows="2"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    autocomplete="off"
    ></textarea>
</template>

<style>
.string-input {
    resize: vertical;
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 200ms ease;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-main));
}

.string-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(var(--border-selected));
}
</style>

<script setup lang="ts">
defineProps<{ modelValue: boolean; id: string }>();
defineEmits<{ 'update:modelValue': [v: boolean] }>();
</script>

<template>
    <label class="boolean-input">
        <input
        type="checkbox"
        class="boolean-input__checkbox"
        :id="id"
        :title="id"
        :checked="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <div class="boolean-input__track"></div>
        <div class="boolean-input__thumb"></div>
    </label>
</template>

<style>
.boolean-input {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.boolean-input__checkbox {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

.boolean-input__track {
    width: 3.5rem;
    height: 1.75rem;
    background-color: rgb(var(--border-main));
    border-radius: 9999px;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    transition: background-color 300ms ease-in-out;
}

.boolean-input__checkbox:focus + .boolean-input__track {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}

.boolean-input__checkbox:checked + .boolean-input__track {
    background-color: rgb(var(--bg-button));
}

.boolean-input__thumb {
    position: absolute;
    left: 0.25rem;
    top: 0.25rem;
    background-color: rgb(var(--bg-main));
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 9999px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: transform 300ms ease-in-out;
}

.boolean-input__checkbox:checked + .boolean-input__track + .boolean-input__thumb {
    transform: translateX(1.75rem);
}
</style>

<script setup lang="ts">
import type { DialogStyle } from '../../types/Dialog';
import type { EditorFieldStylePayload } from '../../types/EditorFieldTypes';

const props = defineProps<{ modelValue: DialogStyle; payload: EditorFieldStylePayload }>();
const emit = defineEmits<{ 'update:modelValue': [v: DialogStyle] }>();

function handleInput(e: Event, type: keyof DialogStyle) {
    if (!(e.currentTarget instanceof HTMLSelectElement)) return;

    const value = e.currentTarget.value;

    const style = { ...props.modelValue };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    style[type] = value;

    emit('update:modelValue', style);
}
</script>

<template>
    <div class="style-input">
        <select
        v-if="payload.position.length > 0"
        class="style-input__select style-input__select-position"
        :value="modelValue.position"
        @input="handleInput($event, 'position')"
        >
            <option v-for="option in payload.position"
            :value="option.value"
            :key="option.value"
            class="style-input__option"
            >
                {{ option.text }}
            </option>
        </select>
        <select
        v-if="payload.type.length > 0"
        class="style-input__select"
        :value="modelValue.type"
        @input="handleInput($event, 'type')"
        >
            <option v-for="option in payload.type"
            :value="option.value"
            :key="option.value"
            class="style-input__option"
            >
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<style>
.style-input {
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
}

.style-input__select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.375rem;
    background-color: rgb(var(--bg-main));
    color: rgb(var(--text-on-main));
    transition: all 200ms ease;
}

.style-input__select:focus {
    border-color: transparent;
}

.style-input__select-position {
    margin-bottom: 0.25rem;
}

.style-input__option {
    color: rgb(var(--text-on-main));
}
</style>

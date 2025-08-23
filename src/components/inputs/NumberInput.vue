<script setup lang="ts">
import { ref, watch } from 'vue';
import { ofpFloatRegex, ofpIntegerRegex } from '../../utils/regex';
import type { EditorFieldNumberPayload } from '../../types/EditorFieldTypes';

const props = defineProps<{ modelValue: number; payload?: EditorFieldNumberPayload }>();
const emit = defineEmits<{ 'update:modelValue': [v: number] }>();

const hasError = ref(false);
const inputValue = ref(props.modelValue.toString());

const isInt = props.payload?.isInt;

watch(() => props.modelValue, () => {
    if (Number.parseFloat(inputValue.value) !== props.modelValue) {
        inputValue.value = props.modelValue.toString();
    }
    hasError.value = false;
});

function handleInput(e: Event) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    const value = e.currentTarget.value;
    inputValue.value = value;

    const num = Number.parseFloat(value);
    const isCorrect = isInt ? ofpIntegerRegex.test(value) : ofpFloatRegex.test(value);
    if (Number.isNaN(num) || !isCorrect) {
        hasError.value = true;
        return;
    }

    hasError.value = false;
    emit('update:modelValue', num);
}

</script>

<template>
    <input
    :class="[
    'number-input',
    hasError
        ? 'number-input_error'
        : 'number-input_default'
    ]"
    :value="inputValue"
    @input="handleInput"
    />
</template>

<style>
.number-input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 200ms ease;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-main));
}

.number-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.number-input_default {
    border-color: rgb(var(--border-main));
}

.number-input_default:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(var(--border-selected));
}

.number-input_error {
    border-color: rgb(var(--border-error));
    background-color: rgb(var(--bg-error));
    color: rgb(var(--text-on-error))
}

.number-input_error:focus {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
    border-color: rgb(var(--border-error));
}
</style>

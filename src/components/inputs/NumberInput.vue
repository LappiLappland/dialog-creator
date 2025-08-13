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
    inputValue.value = props.modelValue.toString();
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
      'w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 placeholder-gray-400 text-gray-700',
      hasError
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    ]"
    :value="inputValue"
    @input="handleInput"
  />
</template>

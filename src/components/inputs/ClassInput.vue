<script setup lang="ts">
import { ref, watch } from 'vue';
import { cppClassNameRegex } from '../../utils/regex';
import { useDialogStore } from '../../stores/dialogStore';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ 'update:modelValue': [v: string] }>();

const store = useDialogStore();

const hasError = ref(false);
const inputValue = ref(props.modelValue.toString());

watch(() => props.modelValue, () => {
    inputValue.value = props.modelValue;
    hasError.value = !store.isClassNameUnique(props.modelValue);
});

function handleInput(e: Event) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    let value = e.currentTarget.value;
    inputValue.value = value;

    if (!cppClassNameRegex.test(value)) {
        hasError.value = true;
        return;
    }
    else if (!store.isClassNameUnique(value)) {
        hasError.value = true;
        return;
    }

    hasError.value = false;
    emit('update:modelValue', value);
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

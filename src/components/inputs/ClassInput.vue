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
      'class-input',
      hasError
        ? 'class-input_error'
        : 'class-input_default'
    ]"
    :value="inputValue"
    @input="handleInput"
  />
</template>

<style>
.class-input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 200ms ease;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-main));
}

.class-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.class-input_default {
    border-color: rgb(var(--border-main));
}

.class-input_default:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(var(--border-selected));
}

.class-input_error {
    border-color: rgb(var(--border-error));
    background-color: rgb(var(--bg-error));
    color: rgb(var(--text-on-error))
}

.class-input_error:focus {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
    border-color: rgb(var(--border-error));
}
</style>

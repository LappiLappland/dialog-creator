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
    <div class="border border-gray-200 rounded-lg px-4 py-3">
        <select
        v-if="payload.position.length > 0"
        class="mb-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        :value="modelValue.position"
        @input="handleInput($event, 'position')"
        >
            <option v-for="option in payload.position"
            :value="option.value"
            :key="option.value"
            class="text-gray-900"
            >
                {{ option.text }}
            </option>
        </select>
        <select
        v-if="payload.type.length > 0"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        :value="modelValue.type"
        @input="handleInput($event, 'type')"
        >
            <option v-for="option in payload.type"
            :value="option.value"
            :key="option.value"
            class="text-gray-900"
            >
                {{ option.text }}
            </option>
        </select>
    </div>

</template>

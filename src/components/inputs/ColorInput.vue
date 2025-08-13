<script setup lang="ts">
import { ColorPicker } from 'vue3-colorpicker';
import { colorToOsuus } from '../../utils/colorConverters';
import type { ColorDialog } from '../../types/Dialog';

defineProps<{ modelValue: ColorDialog }>();
const emit = defineEmits<{ 'update:modelValue': [v: ColorDialog] }>();

function handleInput(color: string) {
    emit('update:modelValue', color);
}

</script>

<template>
    <div class="flex items-center">
        <ColorPicker
            format="rgb"
            shape="square"
            v-on:pureColorChange="handleInput"
            :pure-color="modelValue"
            use-type="pure"
            lang="En"
            picker-type="chrome"
            :debounce="0"
        />
        <span class="text-xs text-gray-500"
        >
            {{ colorToOsuus(modelValue) }}
        </span>
    </div>

</template>

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
    <div class="color-input">
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
        <span class="color-input__value">
            {{ colorToOsuus(modelValue) }}
        </span>
    </div>
</template>

<style>
.color-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.color-input__value {
    font-size: 0.75rem;
    color: rgb(var(--text-on-main-secondary));
}
</style>

<script setup lang="ts">
import { colorToOsuus } from '../../utils/colorConverters';
import type { ColorDialog } from '../../types/Dialog';

const props = defineProps<{ modelValue: ColorDialog }>();
const emit = defineEmits<{ 'update:modelValue': [v: ColorDialog] }>();

function updateModel(hex: string, alpha: string) {
    const newColor = hex + alpha;

    emit('update:modelValue', newColor);
}

function handleHEXInput(e: Event) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    const hex = e.currentTarget.value;
    const alpha = props.modelValue.slice(-2);

    updateModel(hex, alpha);
}

function handleAlphaInput(e: Event) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    const hex = props.modelValue.slice(0, 7);
    const alpha = Number.parseInt(e.currentTarget.value).toString(16).padStart(2, '0');

    updateModel(hex, alpha);
}

</script>

<template>
    <div class="color-input">
        <div class="color-input__group">
            <div class="color-input__color-select">
                <input
                type="color"
                :value="modelValue.slice(0, -2)"
                @input="handleHEXInput"
                />
                <span class="color-input__value">
                    {{ colorToOsuus(modelValue) }}
                </span>
            </div>
            <input class="color-input__range"
            type="range"
            :value="Number('0x' + modelValue.slice(-2))"
            @input="handleAlphaInput"
            min="0"
            max="255"
            step="1"
            />
        </div>
    </div>
</template>

<style>
.color-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.color-input__group {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.color-input__color-select {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.color-input__value {
    font-size: 0.75rem;
    color: rgb(var(--text-on-main-secondary));
}

.color-input__range {
    accent-color: rgb(var(--bg-primary));
}
</style>

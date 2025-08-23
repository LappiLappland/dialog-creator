<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { ofpFloatRegex } from '../../utils/regex';
import type { DialogBox } from '../../types/Dialog';

const props = defineProps<{ modelValue: DialogBox }>();
const emit = defineEmits<{ 'update:modelValue': [v: DialogBox] }>();

const hasError = reactive({
    x: false,
    y: false,
    h: false,
    w: false,
});

const box = ref({
    x: props.modelValue.x.toString(),
    y: props.modelValue.y.toString(),
    w: props.modelValue.w.toString(),
    h: props.modelValue.h.toString(),
});

const dimensions: (keyof DialogBox)[] = ['x', 'y', 'w', 'h'];

watch(() => props.modelValue, (newVal) => {
    box.value = {
        x: newVal.x.toString(),
        y: newVal.y.toString(),
        w: newVal.w.toString(),
        h: newVal.h.toString(),
    };
    hasError.x = false;
    hasError.y = false;
    hasError.w = false;
    hasError.h = false;
}, {
    deep: true,
});

function updateBox(e: Event, type: keyof DialogBox) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    const value = e.currentTarget.value;

    const num = Number.parseFloat(value);
    const isCorrect = ofpFloatRegex.test(value);

    box.value[type] = value;

    if (Number.isNaN(num) || !isCorrect) {
        hasError[type] = true;
        return;
    }

    const sendBox = { ...props.modelValue };

    hasError[type] = false;
    sendBox[type] = num;

    emit('update:modelValue', sendBox);
}
</script>

<template>
    <fieldset class="box-input">
        <div class="box-input__grid">
            <div
                v-for="dim in dimensions"
                :key="dim"
                class="box-input__field"
            >
                <label class="box-input__label">
                    {{ dim }}:
                </label>
                <input
                :class="[
                'box-input__control',
                hasError[dim]
                    ? 'box-input__control_error'
                    : 'box-input__control_default'
                ]"
                :value="box[dim]"
                @input="updateBox($event, dim)"
                type="text"
                />
            </div>
        </div>
    </fieldset>
</template>

<style>
.box-input {
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
}

.box-input__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}

.box-input__field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.box-input__label {
    font-size: 0.875rem;
    font-weight: var(--fw-medium);
    color: rgb(var(--text-on-main-secondary));
    width: 1rem;
    text-transform: uppercase;
}

.box-input__control {
    width: 100%;
    padding: 0.375rem 0.25rem;
    font-size: 0.875rem;
    border: 1px solid;
    border-radius: 0.375rem;
    transition: all 200ms ease;
    outline: none;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-main));
}

.box-input__control_default {
    border-color: rgb(var(--border-main));
}

.box-input__control_default:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(var(--border-selected));
}

.box-input__control_error {
    border-color: rgb(var(--border-error));
    background-color: rgb(var(--bg-error));
    color: rgb(var(--text-on-error))
}

.box-input__control_error:focus {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
    border-color: rgb(var(--border-error));
}
</style>

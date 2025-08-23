<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { ofpFloatRegex } from '../../utils/regex';
import type { DialogSound } from '../../types/Dialog';

const props = defineProps<{ modelValue: DialogSound }>();
const emit = defineEmits<{ 'update:modelValue': [v: DialogSound] }>();

const hasError = reactive({
    file: false,
    volume: false,
    pitch: false,
});

const sound = ref({
    file: props.modelValue.file.toString(),
    volume: props.modelValue.volume.toString(),
    pitch: props.modelValue.pitch.toString(),
});

watch(props.modelValue, (newVal) => {
    sound.value = {
        file: newVal.file.toString(),
        volume: newVal.volume.toString(),
        pitch: newVal.pitch.toString(),
    };
    hasError.file = false;
    hasError.pitch = false;
    hasError.volume = false;
});

function updateBox(e: Event, type: keyof DialogSound) {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    const value = e.currentTarget.value;
    sound.value[type] = value;

    const sendSound = { ...props.modelValue };

    if (type === 'file') {
        sendSound[type] = value;
        emit('update:modelValue', sendSound);
    }
    else {
        const num = Number.parseFloat(value);
        const isCorrect = ofpFloatRegex.test(value);

        if (Number.isNaN(num) || !isCorrect) {
            hasError[type] = true;
            return;
        }

        hasError[type] = false;
        sendSound[type] = num;

        emit('update:modelValue', sendSound);
    }
}
</script>

<template>
    <fieldset class="sound-input">
        <div class="sound-input__fields">
            <div class="sound-input__field">
                <label class="sound-input__label">
                File:
                </label>
                <input
                :class="[
                'sound-input__control',
                hasError['file']
                    ? 'sound-input__control_error'
                    : 'sound-input__control_default'
                ]"
                :value="sound['file']"
                @input="updateBox($event, 'file')"
                type="text"
                />
            </div>
            <div class="sound-input__field">
                <label class="sound-input__label">
                Volume:
                </label>
                <input
                :class="[
                'sound-input__control',
                hasError['volume']
                    ? 'sound-input__control_error'
                    : 'sound-input__control_default'
                ]"
                :value="sound['volume']"
                @input="updateBox($event, 'volume')"
                type="text"
                />
            </div>
            <div class="sound-input__field">
                <label class="sound-input__label">
                Pitch:
                </label>
                <input
                :class="[
                'sound-input__control',
                hasError['pitch']
                    ? 'sound-input__control_error'
                    : 'sound-input__control_default'
                ]"
                :value="sound['pitch']"
                @input="updateBox($event, 'pitch')"
                type="text"
                />
            </div>
        </div>
    </fieldset>
</template>

<style>
.sound-input {
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
}

.sound-input__fields {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.sound-input__field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sound-input__label {
    font-size: 0.875rem;
    font-weight: var(--fw-medium);
    color: rgb(var(--text-on-main-secondary));
    min-width: 0;
}

.sound-input__control {
    width: 100%;
    padding: 0.375rem 0.25rem;
    font-size: 0.875rem;
    border: 1px solid;
    border-radius: 0.375rem;
    transition: all 200ms ease;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-main));
    outline: none;
}

.sound-input__control_default {
    border-color: rgb(var(--border-main));
}

.sound-input__control_default:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: rgb(var(--border-selected));
}

.sound-input__control_error {
    border-color: rgb(var(--border-error));
    background-color: rgb(var(--bg-error));
    color: rgb(var(--text-on-error))
}

.sound-input__control_error:focus {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
    border-color: rgb(var(--border-error));
}
</style>

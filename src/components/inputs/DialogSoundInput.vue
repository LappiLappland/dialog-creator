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
    <fieldset class="border border-gray-200 rounded-lg px-4 py-3">
        <div class="flex flex-col gap-0.5">
            <div
                class="flex items-center gap-2"
            >
                <label class="text-sm font-medium text-gray-600">
                File:
                </label>
                <input
                :class="[
                'w-full px-1 py-1.5 text-sm border rounded-md focus:ring-2 outline-none transition',
                hasError['file']
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                ]"
                :value="sound['file']"
                @input="updateBox($event, 'file')"
                type="text"
                />
            </div>
            <div
                class="flex items-center gap-2"
            >
                <label class="text-sm font-medium text-gray-600">
                Volume:
                </label>
                <input
                :class="[
                'w-full px-1 py-1.5 text-sm border rounded-md focus:ring-2 outline-none transition',
                hasError['volume']
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                ]"
                :value="sound['volume']"
                @input="updateBox($event, 'volume')"
                type="text"
                />
            </div>
            <div
                class="flex items-center gap-2"
            >
                <label class="text-sm font-medium text-gray-600">
                Pitch:
                </label>
                <input
                :class="[
                'w-full px-1 py-1.5 text-sm border rounded-md focus:ring-2 outline-none transition',
                hasError['pitch']
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                ]"
                :value="sound['pitch']"
                @input="updateBox($event, 'pitch')"
                type="text"
                />
            </div>
        </div>

    </fieldset>
</template>

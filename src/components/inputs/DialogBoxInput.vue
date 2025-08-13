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
    <fieldset class="border border-gray-200 rounded-lg px-4 py-3">
        <div class="grid grid-cols-2 gap-3">
            <div
                v-for="dim in dimensions"
                :key="dim"
                class="flex items-center gap-2"
            >
                <label class="text-sm font-medium text-gray-600 w-4 uppercase">
                {{ dim }}:
                </label>
                <input
                :class="[
                'w-full px-1 py-1.5 text-sm border rounded-md focus:ring-2 outline-none transition',
                hasError[dim]
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                ]"
                :value="box[dim]"
                @input="updateBox($event, dim)"
                type="text"
                />
            </div>
        </div>
    </fieldset>
</template>

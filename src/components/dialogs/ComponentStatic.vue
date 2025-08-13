<script setup lang="ts">
import { computed } from 'vue';
import type DialogItem from '../../classes/dialogs/DialogItem';
import { useDialogStore } from '../../stores/dialogStore';
import { StyleType } from '../../types/Dialog';
import { fontClassNamesMap } from '../../constants/fontClassNamesMap';

const props = defineProps<{ dialog: DialogItem }>();

const store = useDialogStore();

const fontSize = computed(() => {
    if (!store.windowBox) return 0;
    const h = store.windowBox.h;
    const size = h * props.dialog.sizeEx;

    return size;
});

const fontFamily = computed(() => {
    const wantFont = props.dialog.font.toLowerCase();
    if (wantFont === '') return '';
    const available = Object.entries(fontClassNamesMap);
    for (const [fontName, fontClass] of available) {
        if (wantFont.startsWith(fontName)) {
            return fontClass;
        }
    }
    return '';
});

</script>

<template>
    <div
    v-if="props.dialog.style.type !== StyleType.FRAME"
    class="h-full relative text-nowrap bg-blend-multiply"
    :class="[props.dialog.extraClass]"
    :style="[{
        'background-color': props.dialog.colorBackground,
    }, dialog.getContainerStyle()]"
    >
        <span
        :style="[{
            color: props.dialog.colorText,
            'font-size': `${fontSize}px`,
            'line-height': props.dialog.lineSpacing,
        }, dialog.getTextStyle()]"
        :class="[fontFamily]"
        >
            {{ props.dialog.text }}
        </span>
        <svg
        v-if="dialog.style.type === StyleType.LINE"
        width="100%"
        height="100%"
        >
            <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            :stroke="dialog.colorText"
            stroke-width="2"
            />
        </svg>
    </div>
    <fieldset
    v-else
    class="h-full relative text-nowrap bg-blend-multiply"
    :class="[props.dialog.extraClass]"
    :style="[{
        'background-color': 'transparent',
    }, dialog.getContainerStyle()]"
    >
        <legend
        :style="[{
            'margin-left': `${fontSize}px`,
            color: props.dialog.colorText,
            'font-size': `${fontSize}px`,
            'line-height': props.dialog.lineSpacing,
        }]"
        :class="[fontFamily]"
        >
            {{ props.dialog.text }}
        </legend>
    </fieldset>
</template>

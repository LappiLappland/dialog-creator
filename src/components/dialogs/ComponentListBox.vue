<script setup lang="ts">
import { computed } from 'vue';
import type DialogListBox from '../../classes/dialogs/DialogListBox';
import { useDialogStore } from '../../stores/dialogStore';
import { fontClassNamesMap } from '../../constants/fontClassNamesMap';

const props = defineProps<{ dialog: DialogListBox }>();

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

const amount = computed(() => {
    if (props.dialog.rowHeight === 0 || props.dialog.box.h === 0) return 0;
    return Math.ceil(props.dialog.box.h / props.dialog.rowHeight) + 1;
});

const rowHeightInPX = computed(() => {
    if (!store.windowBox || props.dialog.rowHeight === 0) return 0;
    return store.windowBox.h * props.dialog.rowHeight;
});

</script>

<template>
    <div class="h-full relative text-nowrap bg-blend-multiply overflow-hidden"
    :class="[props.dialog.extraClass]"
    :style="[{
        'background-color': 'transparent',
        border: `2px solid ${dialog.colorText}`,
    }, dialog.getContainerStyle()]"
    >
        <div
        v-for="num in amount"
        :key="rowHeightInPX + '_' + num"
        class="border-b relative text-nowrap"
        :style="{
            height: rowHeightInPX + 'px',
            'background-color': num !== 1 ? undefined : props.dialog.colorText,
        }"
        >
            <span
            :style="[{
                color: num !== 1 ? props.dialog.colorText : props.dialog.colorSelect,
                'font-size': `${fontSize}px`,
                'line-height': props.dialog.lineSpacing,
            }, dialog.getTextStyle()]"
            :class="[fontFamily]"
            >
                {{ props.dialog.text + ' ' + num }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import CommandDispatcher from '../../classes/CommandDispatcher';
import AddCmd from '../../classes/commands/AddCmd';
import DialogActiveText from '../../classes/dialogs/DialogActiveText';
import DialogButton from '../../classes/dialogs/DialogButton';
import DialogCombo from '../../classes/dialogs/DialogCombo';
import DialogEdit from '../../classes/dialogs/DialogEdit';
import DialogItem from '../../classes/dialogs/DialogItem';
import DialogListBox from '../../classes/dialogs/DialogListBox';
import DialogSlider from '../../classes/dialogs/DialogSlider';
import { useDialogStore } from '../../stores/dialogStore';
import { StylePosition, StyleType } from '../../types/Dialog';
import { osuusToColor } from '../../utils/colorConverters';

const store = useDialogStore();

type ButtonAction = () => DialogItem;

function dialogFactory<T extends DialogItem>(dialogClass: new (id: string) => T, patch: Partial<T>) {
    return () => {
        const item = new dialogClass('');
        Object.assign(item, patch);
        return item;
    };
}

interface ButtonOption {
    title: string;
    action: ButtonAction;
}

const buttonsList: ButtonOption[] = [
    { title: 'Static', action: () => new DialogItem('') },
    { title: 'Background', action: dialogFactory(DialogItem, {
        style: { type: StyleType.BACKGROUND, position: StylePosition.LEFT },
        colorText: osuusToColor(1, 1, 1, 0.8),
    }) },
    { title: 'Text', action: dialogFactory(DialogItem, {
        colorText: osuusToColor(1, 1, 1, 0.8),
        colorBackground: osuusToColor(1, 1, 1, 0),
        text: 'Text',
    }) },
    { title: 'Button', action: () => new DialogButton('') },
    { title: 'ActiveText', action: () => new DialogActiveText('') },
    { title: 'Edit', action: () => new DialogEdit('') },
    { title: 'Combo', action: () => new DialogCombo('') },
    { title: 'ListBox', action: () => new DialogListBox('') },
    { title: 'Slider', action: () => new DialogSlider('') },
];

function addDialogItem(action: ButtonAction) {
    const instance = action();
    CommandDispatcher.run(new AddCmd(store, instance));
}

</script>

<template>
    <div class="flex flex-row flex-wrap gap-1">
        <button
        v-for="(item, index) in buttonsList"
        class="cursor-pointer px-3 py-1.5 mr-1 text-xs border border-gray-300 rounded hover:bg-white active:bg-gray-50 transition-colors shadow-sm"
        :title="item.title"
        :key="index"
        @click="() => addDialogItem(item.action)"
        >
            {{ item.title }}
        </button>
    </div>
</template>

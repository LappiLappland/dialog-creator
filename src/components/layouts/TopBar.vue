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
        style: { position: StylePosition.CENTER, type: StyleType.SINGLE },
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
    <div class="top-bar">
        <button
        v-for="(item, index) in buttonsList"
        class="top-bar__button"
        :title="item.title"
        :key="index"
        @click="() => addDialogItem(item.action)"
        >
            {{ item.title }}
        </button>
    </div>
</template>

<style>

.top-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 8px;
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-secondary));
    border-bottom: 1px solid rgb(var(--border-main));
}

.top-bar__button {
    cursor: pointer;
    padding-inline: 0.75rem;
    padding-block: 0.375rem;
    margin-right: 0.25rem;
    font-size: 0.75rem;
    border-radius: 4px;
    border: 1px solid rgb(var(--border-main));
    background-color: rgb(var(--bg-main));
    transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.top-bar__button:hover {
    background-color: rgba(var(--bg-main), 0.75);
}

.top-bar__button:focus {
    background-color: rgba(var(--bg-main), 0.65);
}

</style>

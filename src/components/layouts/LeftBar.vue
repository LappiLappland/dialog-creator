<script setup lang="ts">

import { VueDraggable } from 'vue-draggable-plus';
import { useDialogStore } from '../../stores/dialogStore';
import CommandDispatcher from '../../classes/CommandDispatcher';
import SwapOrderCmd from '../../classes/commands/SwapOrderCmd';

const store = useDialogStore();

function deleteDialog(id: string) {
    store.deleteItem(id);
}

function rememberChange(oldIndex: number | undefined, newIndex: number | undefined) {
    if (oldIndex !== undefined && newIndex !== undefined) {
        CommandDispatcher.add(new SwapOrderCmd(store, oldIndex, newIndex));
    }
}

</script>

<template>
    <div
    class="left-bar"
    >
        <h2 class="left-bar__header">
            Items
        </h2>
        <VueDraggable ref="el" v-model="store.dialogItemsArray"
        @change="rememberChange($event.oldIndex, $event.newIndex)"
        class="left-bar__list"
        >
        <div
            v-for="item in store.dialogItemsArray"
            :key="item.id"
            class="item-card"
            :class="[
                store.selectedItem === item.id
                    ? 'item-card_selected'
                    : 'item-card_default',
                store.isClassNameUnique(item.className)
                    ? 'item-card_valid'
                    : 'item-card_invalid'
            ]"
            @click="() => store.setSelectedItem(item.id)"
            >
                <div class="item-card__content">
                    <div class="item-card__info">
                        <span class="item-card__name">
                            {{ item.className }}
                        </span>
                    </div>
                    <div class="item-card__actions">
                        <button class="item-card__delete-btn"
                        @click="deleteDialog(item.id)"
                        >
                            <svg class="item-card__delete-icon" fill="currentColor" stroke="currentColor"
                            height="24px" width="24px"
                            viewBox="0 0 512 512"
                            >
                                <path d="M439.114,69.747c0,0,2.977,2.1-43.339-11.966c-41.52-12.604-80.795-15.309-80.795-15.309l-2.722-19.297
                                    C310.387,9.857,299.484,0,286.642,0h-30.651h-30.651c-12.825,0-23.729,9.857-25.616,23.175l-2.722,19.297
                                    c0,0-39.258,2.705-80.778,15.309C69.891,71.848,72.868,69.747,72.868,69.747c-10.324,2.849-17.536,12.655-17.536,23.864v16.695
                                    h200.66h200.677V93.611C456.669,82.402,449.456,72.596,439.114,69.747z"/>
                                <path d="M88.593,464.731C90.957,491.486,113.367,512,140.234,512h231.524c26.857,0,49.276-20.514,51.64-47.269
                                    l25.642-327.21H62.952L88.593,464.731z M342.016,209.904c0.51-8.402,7.731-14.807,16.134-14.296
                                    c8.402,0.51,14.798,7.731,14.296,16.134l-14.492,239.493c-0.51,8.402-7.731,14.798-16.133,14.288
                                    c-8.403-0.51-14.806-7.722-14.296-16.125L342.016,209.904z M240.751,210.823c0-8.42,6.821-15.241,15.24-15.241
                                    c8.42,0,15.24,6.821,15.24,15.241v239.492c0,8.42-6.821,15.24-15.24,15.24c-8.42,0-15.24-6.821-15.24-15.24V210.823z
                                    M153.833,195.608c8.403-0.51,15.624,5.894,16.134,14.296l14.509,239.492c0.51,8.403-5.894,15.615-14.296,16.125
                                    c-8.403,0.51-15.624-5.886-16.134-14.288l-14.509-239.493C139.026,203.339,145.43,196.118,153.833,195.608z"/>
                                </svg>
                        </button>
                        <div class="item-card__menu">
                            <svg class="item-card__menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </VueDraggable>
    </div>
</template>

<style>

.left-bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgb(var(--border-main));
    padding-inline: 8px;
    padding-block: 4px;
    background-color: rgb(var(--bg-secondary));
}

.left-bar__header {
    font-size: 1.125rem;
    text-align: center;
    color: rgb(var(--text-on-main));
    margin-bottom: 16px;
    font-weight: var(--fw-semi-bold);
}

.left-bar__list {
    overflow: auto;
    flex-grow: 1;
}

.item-card {
    border: 1px solid;
    border-radius: 0.5rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    transition: all 200ms ease;
    cursor: move;
    position: relative;
}

.item-card:hover {
    cursor: pointer;
}

.item-card_default {
    border-color: rgb(var(--border-main));
}

.item-card_default:hover {
    border-color: rgb(var(--border-hover));
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.item-card_selected {
    border-color: rgb(var(--border-selected));
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.item-card_valid {
    background-color: rgb(var(--bg-main));
}

.item-card_invalid {
    background-color: rgb(var(--bg-error));
    border-color: rgb(var(--border-error));
}

.item-card__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-card__info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.item-card__name {
    font-size: 0.875rem;
    font-weight: var(--fw-medium);
    color: rgb(var(--text-on-main));
}

.item-card__actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.item-card__delete-btn {
    color: rgb(var(--text-on-main-secondary));
    cursor: pointer;
    transition: color 200ms ease;
    background: none;
    border: none;
    padding: 0;
}

.item-card__delete-btn:hover {
    color: var(--bg-error);
}

.item-card__delete-icon {
    width: 0.75rem;
    height: 0.75rem;
}

.item-card__menu {
    padding: 0.125rem;
    color: rgb(var(--text-on-main-secondary));
}

.item-card__menu-icon {
    width: 0.75rem;
    height: 0.75rem;
}

</style>

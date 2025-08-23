<script setup lang="ts">
import { useModal, useModalSlot } from 'vue-final-modal';
import ModalImport from '../modals/ModalImport/ModalImport.vue';
import { useDialogStore } from '../../stores/dialogStore';
import { exportToExt } from '../../utils/export';
import saveTextToFile from '../../utils/saveTextToFile';
const store = useDialogStore();

const { open: openImport, close: closeImport } = useModal({
    slots: {
        default: useModalSlot({
            component: ModalImport,
            attrs: {
                onImportDone: () => {
                    closeImport();
                },
            },
        }),
    },
});

function handleImport() {
    openImport();
}

function handleExport() {
    // TODO: cache this, maybe ?
    const text = exportToExt(store.mainDialog, store.dialogItemsArray);

    saveTextToFile(text);
}

function handleCopy() {
    // TODO: cache this, maybe ?
    const text = exportToExt(store.mainDialog, store.dialogItemsArray);

    navigator.clipboard.writeText(text);
}

</script>

<template>
    <div class="actions-bar">
        <div class="actions-bar__group">
            <button
                class="actions-bar__button"
                @click="store.switchWindowDisplay"
            >
                Show {{ store.showCode ? 'editor' : 'code' }}
            </button>

            <button
                class="actions-bar__button"
                @click="store.resetState"
            >
                Reset
            </button>

            <button
                class="actions-bar__button"
                @click="handleExport"
            >
                Export
            </button>

            <button
                class="actions-bar__button"
                @click="handleImport"
            >
                Import
            </button>

            <button
                class="actions-bar__button"
                @click="handleCopy"
            >
                Copy to clipboard
            </button>
        </div>
    </div>
</template>

<style>
.actions-bar {
    width: 100%;
    background-color: rgb(var(--bg-main));
    border-bottom: 1px solid rgb(var(--border-main));
    padding-inline: 1rem;
    padding-block: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.actions-bar__group {
    display: flex;
    gap: 0.5rem;
}

.actions-bar__button {
    cursor: pointer;
    padding-inline: 0.375rem;
    padding-block: 0.125rem;
    font-size: 0.875rem;
    font-weight: var(--fw-regular);
    color: rgb(var(--text-on-main));
    background: none;
    border: none;
    border-radius: 0.25rem;
    transition: color 200ms ease, background-color 200ms ease;
}

.actions-bar__button:hover {
    color: rgb(var(--text-on-main));
    background-color: rgb(var(--bg-secondary));
}
</style>

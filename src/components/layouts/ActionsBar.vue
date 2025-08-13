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
    <div class="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
        <div class="flex space-x-2">
            <button
                class="cursor-pointer px-1.5 py-0.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                @click="store.switchWindowDisplay"
            >
                Show {{ store.showCode ? 'editor' : 'code' }}
            </button>

            <button
                class="cursor-pointer px-1.5 py-0.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                @click="store.resetState"
            >
                Reset
            </button>

            <button
                class="cursor-pointer px-1.5 py-0.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                @click="handleExport"
            >
                Export
            </button>

            <button
                class="cursor-pointer px-1.5 py-0.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                @click="handleImport"
            >
                Import
            </button>

            <button
            class="cursor-pointer px-1.5 py-0.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            @click="handleCopy"
            >
                Copy to clipboard
            </button>
        </div>
    </div>
</template>

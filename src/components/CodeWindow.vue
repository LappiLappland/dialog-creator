<script setup lang="ts">
import { exportToExt } from '../utils/export';
import { useDialogStore } from '../stores/dialogStore';
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue';

const store = useDialogStore();

const container = useTemplateRef('container');

const codeText = computed(() => {
    return exportToExt(store.mainDialog, store.dialogItemsArray);
});

function handlekeyDown(e: KeyboardEvent) {
    if (!container.value) return;
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();

        const selection = window.getSelection();
        if (!selection) return;
        const range = document.createRange();

        range.selectNodeContents(container.value);

        selection.removeAllRanges();
        selection.addRange(range);
    }
}

onMounted(() => {
    document.addEventListener('keydown', handlekeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handlekeyDown);
});
</script>

<template>
    <div
    ref="container"
    class="relative overflow-hidden bg-slate-400 border-2 border-gray-300 shadow-lg"
    >
        <!-- <pre class="overflow-auto h-full">
{{ codeText }}
        </pre> -->
        <highlightjs
        class="h-full overflow-auto"
        lang="cpp"
        :code="codeText"
        />
    </div>
</template>

<style>
    .hljs {
        height: 100%;
    }
</style>

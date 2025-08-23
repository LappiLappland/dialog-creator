<script setup lang="ts">
import { exportToExt } from '../utils/export';
import { useDialogStore } from '../stores/dialogStore';
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue';
import 'highlight.js/styles/vs2015.css';

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
    class="code-viewer"
    >
        <highlightjs
        class="code-viewer__content"
        lang="cpp"
        :code="codeText"
        />
    </div>
</template>

<style>
.code-viewer {
    position: relative;
    overflow: hidden;
    border: 2px solid rgb(var(--border-main));
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    flex: 1 1 0;
}

.code-viewer__content {
    height: 100%;
    overflow: auto;
}

.hljs {
    height: 100%;
}
</style>

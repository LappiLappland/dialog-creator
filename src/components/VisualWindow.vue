<script setup lang="ts">
import Draggable from './Draggable.vue';
import { useDialogStore } from '../stores/dialogStore';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import type { DialogBox } from '../types/Dialog';

const store = useDialogStore();
let resizeObserver: ResizeObserver;

const containerEl = useTemplateRef('container');

const preventBlur = ref(false);

function updateWindowBox() {
    if (!containerEl.value) return;

    const rect = containerEl.value.getBoundingClientRect();
    store.setWindowBox({
        x: rect.x,
        y: rect.y,
        w: rect.width,
        h: rect.height,
    });
}

function handleClick(e: MouseEvent) {
    if (preventBlur.value) return;
    if (!containerEl.value) return;
    if (e.target === containerEl.value) {
        store.setSelectedItem('');
    }
}

function handleDraggableDeactivated(id: string, oldBox: DialogBox, newBox: DialogBox) {
    store.patchItemHistory({
        id,
        key: 'box',
        oldValue: oldBox,
        newValue: newBox,
    });

    requestAnimationFrame(() => {
        preventBlur.value = false;
    });
}

onMounted(() => {
    if (containerEl.value) {
        updateWindowBox();

        resizeObserver = new ResizeObserver(updateWindowBox);
        resizeObserver.observe(containerEl.value);
    }
});

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
});
</script>

<template>
    <div
    ref="container"
    class="visual-window"
    :style="{
      'background-color': store.mainDialog.debugBackground,
    }"
    @click="handleClick"
    >
        <Draggable
            v-for="item in store.dialogItemsArray"
            :dialogItem="item"
            :key="item.id"
            @activated="preventBlur = true"
            @deactivated="(oldBox, newBox) => handleDraggableDeactivated(item.id, oldBox, newBox)"
        >
            <component :is="item.getComponent()" :dialog="item" />
        </Draggable>
    </div>
</template>

<style>
.visual-window {
    position: relative;
    overflow: hidden;
    border: 2px solid rgb(var(--border-main));
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    height: 100%;
    width: 100%;
}
</style>

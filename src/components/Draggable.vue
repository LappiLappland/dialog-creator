<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import numToPercent from '../utils/numToPercent';
import { useDialogStore } from '../stores/dialogStore';
import DialogItem from '../classes/dialogs/DialogItem';
import type { Coord, DragCoords } from '../types/Geometry';
import type { ContainerSide } from '../types/UI';
import type { DialogBox } from '../types/Dialog';

const props = defineProps<{
    dialogItem: DialogItem;
}>();

const emit = defineEmits<{
    (e: 'activated'): void;
    (e: 'deactivated', oldBox: DialogBox, newBox: DialogBox): void;
}>();

const store = useDialogStore();

const container = useTemplateRef('container');

const dragPosition = ref<DragCoords>();
const resizingSide = ref<ContainerSide>();
const usedSide = ref<ContainerSide | null>(null);
const oldBox = ref<DialogBox>();

const usedCursorType = computed(() => {
    if (!usedSide.value) {
        return dragPosition.value ? 'grabbing' : 'grab';
    }

    if (resizingSide.value) {
        return `${resizingSide.value}-resize`;
    }

    return `${usedSide.value}-resize`;
});

const currentState = computed(() => {
    if (dragPosition.value) return 'dragging';
    if (resizingSide.value) return 'resizing';
    if (store.selectedItem === props.dialogItem.id) return 'selected';
    return 'default';
});

function handleMouseDown(e: MouseEvent) {
    if (!usedSide.value) {
        handleDragStart(e);
    }
    else {
        resizingSide.value = usedSide.value;
        document.documentElement.style.cursor = `${resizingSide.value}-resize`;
    }
    store.setSelectedItem(props.dialogItem.id);
    oldBox.value = { ...props.dialogItem.box };
    emit('activated');
}

function handleMouseMove(e: MouseEvent) {
    if (resizingSide.value) {
        handleResize(e);
    }
    else if (dragPosition.value) {
        handleDrag(e);
    }
}

function handleResize(e: MouseEvent) {
    if (!container.value) return;

    const mX = e.clientX;
    const mY = e.clientY;

    const box = getResizedBox({ x: mX, y: mY });

    if (!box) return;

    store.changeBox(props.dialogItem.id, box);
}

function handleDragStart(e: MouseEvent) {
    if (!container.value) return;

    const rect = container.value.getBoundingClientRect();

    dragPosition.value = {
        mX: e.clientX - rect.x,
        mY: e.clientY - rect.y,
        eX: (rect.x - rect.x) / rect.width,
        eY: (rect.y - rect.y) / rect.height,
    };
}

function handleMouseUp() {
    if (dragPosition.value || resizingSide.value) {
        document.documentElement.style.cursor = 'auto';
        dragPosition.value = undefined;
        resizingSide.value = undefined;

        if (oldBox.value) {
            emit('deactivated', oldBox.value, props.dialogItem.box);
        }
        oldBox.value = undefined;
    }
}

function handleDrag(e: MouseEvent) {
    if (!dragPosition.value) return;
    if (!store.windowBox) return;

    const { mX, mY, eX, eY } = dragPosition.value;

    const { x: cX, y: cY, w: cW, h: cH } = store.windowBox;

    const deltaX = (e.clientX - cX - mX) / cW;
    const deltaY = (e.clientY - cY - mY) / cH;

    const relX = eX + deltaX;
    const relY = eY + deltaY;

    store.changeCoord(props.dialogItem.id, { x: relX, y: relY });
}

function handleCursor(e: MouseEvent) {
    if (!container.value) return;

    const mX = e.clientX;
    const mY = e.clientY;

    const side = getSide({ x: mX, y: mY });

    usedSide.value = side;
}

function getSide(coord: Coord): ContainerSide | null {
    if (!container.value) return null;
    const rect = container.value.getBoundingClientRect();
    const threshold = 8;

    const distanceToLeft = Math.abs(coord.x - rect.left);
    const distanceToRight = Math.abs(coord.x - rect.right);
    const distanceToTop = Math.abs(coord.y - rect.top);
    const distanceToBottom = Math.abs(coord.y - rect.bottom);

    const minDistance = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);

    if (minDistance > threshold) {
        return null;
    }

    const horizontalSide = distanceToLeft < distanceToRight ? { side: 'w', distance: distanceToLeft } : { side: 'e', distance: distanceToRight };
    const verticalSide = distanceToTop < distanceToBottom ? { side: 'n', distance: distanceToTop } : { side: 's', distance: distanceToBottom };

    const isCorner = horizontalSide.distance <= threshold && verticalSide.distance <= threshold;

    if (isCorner) {
        if (horizontalSide.side === 'w' && verticalSide.side === 'n') return 'nw';
        if (horizontalSide.side === 'e' && verticalSide.side === 'n') return 'ne';
        if (horizontalSide.side === 'w' && verticalSide.side === 's') return 'sw';
        if (horizontalSide.side === 'e' && verticalSide.side === 's') return 'se';
    }

    if (horizontalSide.distance < verticalSide.distance) {
        return horizontalSide.side as 'e' | 'w';
    }
    else {
        return verticalSide.side as 'n' | 's';
    }
}

function getResizedBox(mousePos: Coord): DialogBox | null {
    if (!store.windowBox) return null; // parent container
    const item = store.getItem(props.dialogItem.id);
    if (!item) return null; // current container
    if (!resizingSide.value) return null; // used side

    const parent = store.windowBox;
    const currentBox = item.box;
    const side = resizingSide.value;

    const currentX = currentBox.x * parent.w;
    const currentY = currentBox.y * parent.h;
    const currentW = currentBox.w * parent.w;
    const currentH = currentBox.h * parent.h;

    const mouseX = mousePos.x - parent.x;
    const mouseY = mousePos.y - parent.y;

    let newX = currentX;
    let newY = currentY;
    let newW = currentW;
    let newH = currentH;

    const minSize = 20;

    if (side.includes('e')) {
        newW = Math.max(minSize, mouseX - currentX);
    }
    else if (side.includes('w')) {
        newW = Math.max(minSize, currentX + currentW - mouseX);
        newX = Math.min(mouseX, currentX + currentW - minSize);
    }

    if (side.includes('s')) {
        newH = Math.max(minSize, mouseY - currentY);
    }
    else if (side.includes('n')) {
        newH = Math.max(minSize, currentY + currentH - mouseY);
        newY = Math.min(mouseY, currentY + currentH - minSize);
    }

    // Convert back to relative percentages
    const newBox: DialogBox = {
        x: newX / parent.w,
        y: newY / parent.h,
        w: newW / parent.w,
        h: newH / parent.h,
    };

    return newBox;
}

onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
});
</script>

<template>
    <div
    ref="container"
    :style="{
        left: numToPercent(dialogItem.box.x),
        top: numToPercent(dialogItem.box.y),
        width: numToPercent(dialogItem.box.w),
        height: numToPercent(dialogItem.box.h),
        cursor: usedCursorType,
    }"
    class="draggable-item"
    :class="{
        'draggable-item_default': currentState === 'default',
        'draggable-item_selected': currentState === 'selected',
        'draggable-item_resizing': currentState === 'resizing',
        'draggable-item_dragging': currentState === 'dragging',
    }"
    @mousedown="handleMouseDown"
    @mousemove="handleCursor"
    >
        <slot></slot>
    </div>
</template>

<style>
.draggable-item {
    position: absolute;
    overflow: hidden;
}

.draggable-item_default:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 0 1px rgb(var(--border-main));
}

.draggable-item_selected,
.draggable-item_resizing {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 0 2px rgba(0, 188, 255, 0.3);
}

.draggable-item_dragging {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    box-shadow: 0 0 0 2px rgb(0, 188, 255, 0.5);
    opacity: 0.9;
    z-index: 10;
}
</style>

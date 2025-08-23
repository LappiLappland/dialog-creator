<script setup lang="ts">
import { computed } from 'vue';
import type DialogItem from '../../classes/dialogs/DialogItem';
import { StylePosition } from '../../types/Dialog';

const props = defineProps<{ dialog: DialogItem }>();

const viewBox = '0 0 1 1';

const minPos = 0;
const maxPos = 1;
const curPos = 0.5;

const strokeColor = computed(() => {
    return props.dialog.colorBackground;
});

// VERTICAL
const vert = computed(() => {
    const _w = 1;
    const _h = 1;
    const bigLine = 0.6 * _w;
    const smallLine = 0.3 * _w;
    // const spinHeight = 1.33 * bigLine
    const spinHeight = 0.33 * bigLine;
    const thumbHeight = 0.02;
    const fieldHeight = _h - 2 * spinHeight - thumbHeight;
    const top = spinHeight + 0.5 * thumbHeight;
    const bottom = top + fieldHeight;
    const right = bigLine;

    const coef = maxPos > minPos
        ? 1 / (maxPos - minPos)
        : 0;
    const thumbPos = top + fieldHeight * (curPos - minPos) * coef;

    // Tick subdivision
    let lines = 1;
    let lineDist = fieldHeight;
    while (lineDist > 0.02) {
        lines *= 2;
        lineDist *= 0.5;
    }

    const tickLines = [];
    for (let i = 0; i <= lines; i++) {
        const y = top + i * lineDist;
        const len = (i % 2 === 0 || lines === 1) ? bigLine : smallLine;
        tickLines.push({ x1: right - len, y1: y, x2: right, y2: y });
    }

    return {
        topSpin: [
            { x1: 0.5 * bigLine, y1: 0, x2: 0, y2: spinHeight },
            { x1: 0, y1: spinHeight, x2: bigLine, y2: spinHeight },
            { x1: bigLine, y1: spinHeight, x2: 0.5 * bigLine, y2: 0 },
        ],
        bottomSpin: [
            { x1: 0.5 * bigLine, y1: 1, x2: 0, y2: 1 - spinHeight },
            { x1: 0, y1: 1 - spinHeight, x2: bigLine, y2: 1 - spinHeight },
            { x1: bigLine, y1: 1 - spinHeight, x2: 0.5 * bigLine, y2: 1 },
        ],
        bg: { x1: right, y1: top, x2: right, y2: bottom },
        tickLines,
        thumb: {
            x1: bigLine, y1: thumbPos,
            x2: _w, y2: thumbPos - 0.5 * thumbHeight,
            x3: _w, y3: thumbPos + 0.5 * thumbHeight,
        },
    };
});

// HORIZONTAL
const horz = computed(() => {
    const _w = 1;
    const _h = 1;
    const bigLine = 0.6 * _h;
    const smallLine = 0.3 * _h;
    const space = 0.15 * _h;
    // const spinWidth = 0.75 * bigLine
    const spinWidth = 0.15 * bigLine;
    const thumbWidth = 0.015;
    const fieldWidth = _w - 2 * spinWidth - thumbWidth;
    const left = spinWidth + 0.5 * thumbWidth;
    const right = left + fieldWidth;
    const bottom = bigLine;

    const coef = maxPos > minPos
        ? 1 / (maxPos - minPos)
        : 0;
    const thumbPos = left + fieldWidth * (curPos - minPos) * coef;

    // Tick subdivision
    let lines = 1;
    let lineDist = fieldWidth;
    const lineEach = 0.035;
    while (lineDist > lineEach) {
        lines *= 2;
        lineDist *= 0.5;
    }

    const tickLines = [];
    for (let i = 0; i <= lines; i++) {
        const x = left + i * lineDist;
        const len = (i % 2 === 0 || lines === 1) ? bigLine : smallLine;
        tickLines.push({ x1: x, y1: bottom - len, x2: x, y2: bottom });
    }

    return {
        leftSpin: [
            { x1: 0, y1: 0.5 * bigLine, x2: spinWidth, y2: 0 },
            { x1: spinWidth, y1: 0, x2: spinWidth, y2: bigLine },
            { x1: spinWidth, y1: bigLine, x2: 0, y2: 0.5 * bigLine },
        ],
        rightSpin: [
            { x1: 1, y1: 0.5 * bigLine, x2: 1 - spinWidth, y2: 0 },
            { x1: 1 - spinWidth, y1: 0, x2: 1 - spinWidth, y2: bigLine },
            { x1: 1 - spinWidth, y1: bigLine, x2: 1, y2: 0.5 * bigLine },
        ],
        bg: { x1: left, y1: bottom, x2: right, y2: bottom },
        tickLines,
        thumb: {
            x1: thumbPos, y1: bottom + space,
            x2: thumbPos - 0.5 * thumbWidth, y2: 1,
            x3: thumbPos + 0.5 * thumbWidth, y3: 1,
        },
    };
});
</script>

<template>
  <svg
    :viewBox="viewBox"
    preserveAspectRatio="none"
    width="100%"
    height="100%"
  >
        <g :stroke="strokeColor" stroke-width="0.002" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <!-- Vertical -->
            <template v-if="dialog.style.position === StylePosition.VERTICAL">
                <!-- top spin -->
                <line v-for="(l, i) in vert.topSpin" :key="`v-ts-${i}`" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
                <!-- bottom spin -->
                <line v-for="(l, i) in vert.bottomSpin" :key="`v-bs-${i}`" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
                <!-- background line -->
                <line :x1="vert.bg.x1" :y1="vert.bg.y1" :x2="vert.bg.x2" :y2="vert.bg.y2" />
                <!-- ticks -->
                <line v-for="(l, i) in vert.tickLines" :key="`v-tick-${i}`" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
                <!-- thumb -->
                <line :x1="vert.thumb.x1" :y1="vert.thumb.y1" :x2="vert.thumb.x2" :y2="vert.thumb.y2" />
                <line :x1="vert.thumb.x2" :y1="vert.thumb.y2" :x2="vert.thumb.x3" :y2="vert.thumb.y3" />
                <line :x1="vert.thumb.x3" :y1="vert.thumb.y3" :x2="vert.thumb.x1" :y2="vert.thumb.y1" />
            </template>

            <!-- Horizontal -->
            <template v-else>
                <!-- left spin -->
                <line v-for="(l, i) in horz.leftSpin" :key="`h-ls-${i}`" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
                <!-- right spin -->
                <line v-for="(l, i) in horz.rightSpin" :key="`h-rs-${i}`" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
                <!-- background line -->
                <line stroke-width="0.008" :x1="horz.bg.x1" :y1="horz.bg.y1" :x2="horz.bg.x2" :y2="horz.bg.y2" />
                <!-- ticks -->
                <line v-for="(l, i) in horz.tickLines" :key="`h-tick-${i}`" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
                <!-- thumb -->
                <line :x1="horz.thumb.x1" :y1="horz.thumb.y1" :x2="horz.thumb.x2" :y2="horz.thumb.y2" />
                <line :x1="horz.thumb.x2" :y1="horz.thumb.y2" :x2="horz.thumb.x3" :y2="horz.thumb.y2" />
                <line :x1="horz.thumb.x3" :y1="horz.thumb.y2" :x2="horz.thumb.x1" :y2="horz.thumb.y1" />
            </template>
        </g>
    </svg>
</template>

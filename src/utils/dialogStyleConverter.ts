/* eslint-disable @typescript-eslint/no-unused-vars */
import { StylePosition, StyleType, type DialogStyle } from '../types/Dialog';

export default function numToDialogStyle(value: number): DialogStyle {
    // Extract type (higher bits)
    const typeValue = Math.floor(value / 16) * 16;
    const type = Object.entries(StyleType).find(([_, val]) => val === typeValue.toString())?.[1] || StyleType.SINGLE;

    // Extract position (lower bits)
    const positionValue = value % 16;
    const position = Object.entries(StylePosition).find(([_, val]) => val === positionValue.toString())?.[1] || StylePosition.HORIZONTAL;

    return {
        type,
        position,
    };
}

import type { ColorRGBA } from '../types/ColorObject';
import type { ColorDialog } from '../types/Dialog';

const hexRegex = /^#([A-Fa-f0-9]{8})$/;

/**
 * Convert a number (0-1) to two-digit hex (00-FF)
 */
function toHex(value: number): string {
    const byte = Math.round(value * 255);
    return byte.toString(16).padStart(2, '0');
}

/**
 * Convert two-digit hex (00-FF) to number (0-1)
 */
function fromHex(hex: string): number {
    return parseInt(hex, 16) / 255;
}

/**
 * Converts normalized values (0–1) to #RRGGBBAA format
 */
export function osuusToColor(r: number, g: number, b: number, a: number = 1): ColorDialog {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
}

/**
 * Converts #RRGGBBAA to normalized string "r, g, b, a"
 */
export function colorToOsuus(color: ColorDialog): string {
    if (!hexRegex.test(color)) {
        throw new Error('Invalid hex color format. Expected #RRGGBBAA. Got ' + color);
    }

    const r = fromHex(color.slice(1, 3));
    const g = fromHex(color.slice(3, 5));
    const b = fromHex(color.slice(5, 7));
    const a = fromHex(color.slice(7, 9));

    return `${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}, ${a.toFixed(2)}`;
}

/**
 * Converts #RRGGBBAA to ColorRGBA object
 */
export function colorToObject(color: ColorDialog): ColorRGBA {
    if (!hexRegex.test(color)) {
        throw new Error('Invalid hex color format. Expected #RRGGBBAA. Got ' + color);
    }

    const r = fromHex(color.slice(1, 3));
    const g = fromHex(color.slice(3, 5));
    const b = fromHex(color.slice(5, 7));
    const a = fromHex(color.slice(7, 9));

    return { r, g, b, a };
}

/**
 * Converts ColorRGBA object to #RRGGBBAA
 */
export function objectToColor(color: ColorRGBA): ColorDialog {
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${toHex(color.a)}`;
}

import type { ColorRGBA } from '../types/ColorObject';
import type { ColorDialog } from '../types/Dialog';

// Format: rgba(155, 155, 155, 155, 0.7)
export function osuusToColor(r: number, g: number, b: number, a: number = 1): ColorDialog {
    return `rgba(${r * 255},${g * 255},${b * 255},${a})`;
}

// Format: 0.5, 0.5, 0.5, 0.5, 0.7
export function colorToOsuus(color: ColorDialog): string {
    const match = color.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);

    if (!match) {
        throw new Error('Invalid color string format');
    }

    const r = parseFloat(match[1]) / 255;
    const g = parseFloat(match[2]) / 255;
    const b = parseFloat(match[3]) / 255;
    const a = match[4] ? parseFloat(match[4]) : 1;

    return `${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}, ${a.toFixed(2)}`;
}

export function colorToObject(color: ColorDialog): ColorRGBA {
    const match = color.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);

    if (!match) {
        throw new Error('Invalid color string format');
    }

    const r = parseFloat(match[1]) / 255;
    const g = parseFloat(match[2]) / 255;
    const b = parseFloat(match[3]) / 255;
    const a = match[4] ? parseFloat(match[4]) : 1;

    return {
        r, g, b, a,
    };
}

// Format: rgba(155, 155, 155, 155, 0.7)
export function objectToColor(color: ColorRGBA): ColorDialog {
    return `rgba(${color.r * 255},${color.g * 255},${color.b * 255},${color.a})`;
}

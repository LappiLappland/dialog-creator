import type Dialog from '../classes/dialogs/Dialog';
import type DialogItem from '../classes/dialogs/DialogItem';
import { getClassDescriptor } from '../descriptors/ClassDescriptor';
import { StyleType, type DialogBox, type DialogSound, type DialogStyle } from '../types/Dialog';
import { colorToOsuus } from './colorConverters';
import roundToPrecision from './round';

// Export to raw text of dialog class
export function exportToExt(dialog: Dialog, items: DialogItem[]): string {
    const lines: string[] = [];
    const push = (...str: string[]) => str.forEach(s => lines.push(s));
    const tab = (n: number) => ' '.repeat(n * 4);

    const roundFLoatTo = 12;

    const skipUniqueCases = <T extends object>(obj: T, key: string) => {
        switch (key) {
            case 'lineSpacing':
                if (
                    'style' in obj
                    && obj.style
                    && typeof obj.style === 'object'
                    && 'type' in obj.style
                    && obj['style']['type'] !== StyleType.MULTI
                ) {
                    return true;
                }
                break;
            case 'tooltip':
            case 'tooltipColorText':
            case 'tooltipColorBox':
            case 'tooltipColorShade':
                if ('tooltip' in obj && obj['tooltip'] === '') {
                    return true;
                }
                break;
        }
        return false;
    };

    const writeObject = <T extends Record<string, unknown>>(obj: T, level: number) => {
        const desc = getClassDescriptor(obj);
        if (!desc) return;
        const keys = Object.keys(desc) as Array<keyof typeof desc>;

        for (const key of keys) {
            const field = desc[key];
            if (field.exclude) continue;

            const value = obj[key];
            if (value === undefined) continue;

            if (skipUniqueCases(obj, key)) continue;

            let isArray = false;
            let sqf: string | undefined;
            switch (field.type) {
                case 'select':
                case 'string-autocomplete':
                case 'class':
                case 'string':
                case 'enum':
                    sqf = `"${value}"`;
                    break;
                case 'number':
                    if (typeof value !== 'number') break;
                    sqf = String(roundToPrecision(value, roundFLoatTo));
                    break;
                case 'boolean':
                    sqf = value ? '1' : '0';
                    break;
                case 'color':
                    if (typeof value !== 'string') break;
                    sqf = `{${colorToOsuus(value)}}`;
                    isArray = true;
                    break;
                case 'dialogBox': {
                    const { x, y, w, h } = value as DialogBox;
                    push(`${tab(level)}x=${roundToPrecision(x, roundFLoatTo)};`);
                    push(`${tab(level)}y=${roundToPrecision(y, roundFLoatTo)};`);
                    push(`${tab(level)}w=${roundToPrecision(w, roundFLoatTo)};`);
                    push(`${tab(level)}h=${roundToPrecision(h, roundFLoatTo)};`);
                    break;
                }
                case 'sound': {
                    const { file, volume, pitch } = value as DialogSound;
                    sqf = `{"${file}", ${roundToPrecision(volume, roundFLoatTo)}, ${roundToPrecision(pitch, roundFLoatTo)}}`;
                    isArray = true;
                    break;
                }
                case 'style': {
                    const { position, type } = value as DialogStyle;
                    sqf = `"${position} + ${type}"`;
                    break;
                }
                default:
                    // throw new Error(`Unknown format when exporting ${field.type} on ${key} inside ${obj.className}`)
            }

            if (sqf) {
                const name = field.name ?? key;
                push(`${tab(level)}${name}${isArray ? '[]' : ''}=${sqf};`);
            }
        }
    };

    // Header
    push(`class ${dialog.className}`);
    push('{');
    writeObject(dialog as unknown as Record<string, unknown>, 1);

    // controls[] list
    const controlNames = items.map(item => item.className);
    push(`${tab(1)}controls[]={"${controlNames.join('","')}"};`);

    // MAIN LOOP
    items.forEach((item, i) => {
        push('');
        push(`${tab(1)}class ${controlNames[i]}`);
        push(`${tab(1)}{`);
        writeObject(item as unknown as Record<string, unknown>, 2);
        push(`${tab(1)}};`);
    });

    push('};');
    return lines.join('\n');
}

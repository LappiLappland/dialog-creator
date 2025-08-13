/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EditorField } from '../types/EditorFieldTypes';
import Dialog from '../classes/dialogs/Dialog';
import DialogActiveText from '../classes/dialogs/DialogActiveText';
import DialogButton from '../classes/dialogs/DialogButton';
import DialogCombo from '../classes/dialogs/DialogCombo';
import DialogEdit from '../classes/dialogs/DialogEdit';
import DialogEnabled from '../classes/dialogs/DialogEnabled';
import DialogItem from '../classes/dialogs/DialogItem';
import DialogListBox from '../classes/dialogs/DialogListBox';
import DialogProgress from '../classes/dialogs/DialogProgress';
import DialogSlider from '../classes/dialogs/DialogSlider';
import DialogToolbox from '../classes/dialogs/DialogToolbox';
import { fontTypeOptions, stylePositionOptions, styleTypeOptions } from '../constants/selectOptions';
import { typeNamesMap } from '../constants/typeNamesMap';
import { StylePosition, StyleType } from '../types/Dialog';

const ClassDescriptorMap = new Map<unknown, Record<string, EditorField>>();

export function describe<T>(
    constructor: new (...a: any[]) => T,
    fields: Partial<Record<keyof T, EditorField>>,
) {
    ClassDescriptorMap.set(constructor, fields as any);
}

export function getClassDescriptor(obj: any): Record<string, EditorField> | undefined {
    return ClassDescriptorMap.get(obj.constructor);
}

describe(Dialog, {
    id: { label: 'ID', type: 'string', editable: false, exclude: true },
    className: { label: 'Class', type: 'class', editable: true, exclude: true },
    idd: { label: 'IDD', type: 'number', editable: true, payload: { isInt: true } },
    movingEnable: { label: 'Movable', type: 'boolean', editable: true },
    debugBackground: { label: 'Debug background', type: 'color', editable: true, exclude: true },
});

describe(DialogItem, {
    id: { label: 'ID', type: 'string', editable: false, exclude: true },
    idc: { label: 'IDC', type: 'number', editable: true, payload: { isInt: true } },
    type: { label: 'Type', type: 'enum', editable: true, payload: {
        valueConverter: v => (typeNamesMap.get(v as any) || ''),
    } },
    className: { label: 'Class', type: 'class', editable: true, exclude: true },
    box: { label: 'Dimensions', type: 'dialogBox', editable: true },
    text: { label: 'Text', type: 'string', editable: true },
    sizeEx: { label: 'Text size', type: 'number', editable: true },
    font: { label: 'Text font', type: 'string-autocomplete', editable: true, payload: {
        options: fontTypeOptions,
    } },
    colorText: { label: 'Text color', type: 'color', editable: true },
    colorBackground: { label: 'Background color', type: 'color', editable: true },
    style: { label: 'Style', type: 'style', editable: true, payload: {
        position: stylePositionOptions,
        type: styleTypeOptions,
    } },
    lineSpacing: { label: 'Line spacing', type: 'number', editable: true },
});

describe(DialogEnabled, {
    ...getClassDescriptor(new DialogItem('')),
    tooltip: { label: 'Tooltip text', type: 'string', editable: true },
    tooltipColorText: { label: 'Tooltip text color', type: 'color', editable: true },
    tooltipColorBox: { label: 'Tooltip box color', type: 'color', editable: true },
    tooltipColorShade: { label: 'Tooltip shade color', type: 'color', editable: true },
});

describe(DialogButton, {
    ...getClassDescriptor(new DialogEnabled('')),
    action: { label: 'Action', type: 'string', editable: true },
    colorBackground: { label: '', type: 'color', editable: false, exclude: true },
    style: { label: 'Style', type: 'style', editable: true, payload: {
        position: stylePositionOptions,
        type: [],
    } },
    soundPush: { label: 'Sound push', type: 'sound', editable: true },
    soundClick: { label: 'Sound click', type: 'sound', editable: true },
    soundEscape: { label: 'Sound escape', type: 'sound', editable: true },
    lineSpacing: { label: '', type: 'string', editable: false, exclude: true },
});

describe(DialogEdit, {
    ...getClassDescriptor(new DialogEnabled('')),
    colorSelection: { label: 'Selection color', type: 'color', editable: true },
    autoComplete: { label: 'AutoComplete', type: 'select', editable: true, payload: {
        options: [
            { text: 'None', value: '' },
            { text: 'Scripting', value: 'scripting' },
            { text: 'General', value: 'general' },
        ],
    } },
    style: { label: 'Style', type: 'style', editable: true, payload: {
        position: stylePositionOptions,
        type: [
            { text: 'No text wrap', value: StyleType.SINGLE },
            { text: 'Allow text wrap', value: StyleType.MULTI },
        ],
    } },
});

describe(DialogSlider, {
    ...getClassDescriptor(new DialogEnabled('')),
    style: { label: 'Direction', type: 'style', editable: true, payload: {
        position: [
            { text: 'Horizontal', value: StylePosition.HORIZONTAL },
            { text: 'Vertical', value: StylePosition.VERTICAL },
        ],
        type: [],
    } },
    colorBackground: { label: 'Color', type: 'color', editable: true, name: 'color' },
    text: { label: '', type: 'string', editable: false, exclude: true },
    sizeEx: { label: '', type: 'string', editable: false, exclude: true },
    colorText: { label: '', type: 'string', editable: false, exclude: true },
    font: { label: '', type: 'string', editable: false, exclude: true },
    lineSpacing: { label: '', type: 'string', editable: false, exclude: true },
});

describe(DialogCombo, {
    ...getClassDescriptor(new DialogEnabled('')),
    text: { label: 'Debug text', type: 'string', editable: true, exclude: true },
    colorSelect: { label: 'Selection color', type: 'color', editable: true },
    wholeHeight: { label: 'Whole height', type: 'number', editable: true },
});

describe(DialogListBox, {
    ...getClassDescriptor(new DialogEnabled('')),
    text: { label: 'Debug text', type: 'string', editable: true, exclude: true },
    colorSelect: { label: 'Selection color', type: 'color', editable: true },
    colorBackground: { label: '', type: 'string', editable: false, exclude: true },
    style: { label: '', type: 'style', editable: false, payload: { type: [], position: [] } },
    rowHeight: { label: 'Row height', type: 'number', editable: true },
});

describe(DialogToolbox, {
    ...getClassDescriptor(new DialogEnabled('')),
    rows: { label: 'Rows', type: 'number', editable: true },
    cols: { label: 'Cols', type: 'number', editable: true },
    strings: { label: 'Strings', type: 'string', editable: true },

    color: { label: 'Color', type: 'color', editable: true },
    colorTextSelect: { label: 'Active text color', type: 'color', editable: true },
    colorSelect: { label: 'Active color', type: 'color', editable: true },
    colorTextDisable: { label: 'Text color', type: 'color', editable: true },
    colorDisable: { label: 'Color', type: 'color', editable: true },
});

describe(DialogProgress, {
    ...getClassDescriptor(new DialogEnabled('')),
    colorFrame: { label: 'Frame color', type: 'color', editable: true },
    colorBar: { label: 'Bar color', type: 'color', editable: true },
});

describe(DialogActiveText, {
    ...getClassDescriptor(new DialogEnabled('')),
    colorBackground: { label: '', type: 'string', editable: false, exclude: true },
    action: { label: 'Action', type: 'string', editable: true },
    colorText: { label: 'Text color', type: 'color', editable: true, name: 'color' },
    colorActive: { label: 'Active color', type: 'color', editable: true },
    soundEnter: { label: 'Enter sound', type: 'sound', editable: true },
    soundPush: { label: 'Push sound', type: 'sound', editable: true },
    soundClick: { label: 'Click sound', type: 'sound', editable: true },
    soundEscape: { label: 'Escape sound', type: 'sound', editable: true },
    style: { label: 'Direction', type: 'style', editable: true, payload: {
        position: stylePositionOptions,
        type: [],
    } },
});

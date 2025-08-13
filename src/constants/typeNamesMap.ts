import { DialogType } from '../types/Dialog';

export const typeNamesMap = new Map<DialogType, string>([
    [DialogType.STATIC, 'STATIC'],
    [DialogType.BUTTON, 'BUTTON'],
    [DialogType.EDIT, 'EDIT'],
    [DialogType.SLIDER, 'SLIDER'],
    [DialogType.COMBO, 'COMBO'],
    [DialogType.LISTBOX, 'LISTBOX'],
    [DialogType.TOOLBOX, 'TOOLBOX'],
    [DialogType.PROGRESS, 'PROGRESS'],
    [DialogType.ACTIVETEXT, 'ACTIVETEXT'],
]);

import type { Coord, Size } from './Geometry';

export interface DialogBox extends Coord, Size {}

export const enum DialogType {
    STATIC = 0,
    BUTTON = 1,
    EDIT = 2,
    SLIDER = 3,
    COMBO = 4,
    LISTBOX = 5,
    TOOLBOX = 6,
    PROGRESS = 8,
    ACTIVETEXT = 11,
};

export interface DialogStyle {
    position: StylePosition;
    type: StyleType;
}

export enum StylePosition {
    LEFT = '0',
    RIGHT = '1',
    CENTER = '2',
    UP = '3',
    DOWN = '4',
    VCENTER = '5',

    // Slider specific
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    VERTICAL = '0',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    HORIZONTAL = '1',
}

export enum StyleType {
    SINGLE = '0',
    MULTI = '16',
    TITLE_BAR = '32',
    PICTURE = '48',
    FRAME = '64',
    BACKGROUND = '80',
    GROUP_BOX = '96',
    GROUP_BOX2 = '112',
    HUD_BACKGROUND = '128',
    TILE_PICTURE = '144',
    WITH_RECT = '160',
    LINE = '176',
    SHADOW = '256',
    NO_RECT = '512',
}

export type DialogSound = {
    file: string;
    volume: number;
    pitch: number;
};
export type ColorDialog = string;

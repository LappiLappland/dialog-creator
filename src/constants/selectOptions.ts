import { StylePosition, StyleType } from '../types/Dialog';
import type SelectOption from '../types/SelectOption';

export const stylePositionOptions: SelectOption[] = [
    { value: StylePosition.LEFT, text: 'Left' },
    { value: StylePosition.RIGHT, text: 'Right' },
    { value: StylePosition.CENTER, text: 'Center' },
    // TODO: investigate behaviour
    // Not sure how these even work in ofp
    // { value: StylePosition.UP, text: 'Up' },
    // { value: StylePosition.DOWN, text: 'Down' },
    // { value: StylePosition.VCENTER, text: 'Vertical Center' },
];

export const styleTypeOptions: SelectOption[] = [
    { value: StyleType.SINGLE, text: 'Single' },
    { value: StyleType.MULTI, text: 'Multi' },
    { value: StyleType.TITLE_BAR, text: 'Title Bar' },
    { value: StyleType.PICTURE, text: 'Picture' },
    { value: StyleType.FRAME, text: 'Frame' },
    { value: StyleType.BACKGROUND, text: 'Background' },
    { value: StyleType.GROUP_BOX, text: 'Group Box' },
    { value: StyleType.GROUP_BOX2, text: 'Group Box 2' },
    { value: StyleType.HUD_BACKGROUND, text: 'HUD Background' },
    { value: StyleType.TILE_PICTURE, text: 'Tile Picture' },
    { value: StyleType.WITH_RECT, text: 'With Rectangle' },
    { value: StyleType.LINE, text: 'Line' },
    { value: StyleType.NO_RECT, text: 'Without Rectangle' },
    { value: StyleType.SHADOW, text: 'Shadow' },
];

export const fontTypeOptions: SelectOption[] = [
    { value: 'AudreysHandB48', text: 'AudreysHandB48' },
    { value: 'AudreysHandI48', text: 'AudreysHandI48' },
    { value: 'CourierNewB48', text: 'CourierNewB48' },
    { value: 'CourierNewB64', text: 'CourierNewB64' },
    { value: 'Garamond64', text: 'Garamond64' },
    { value: 'steelfishB128', text: 'steelfishB128' },
    { value: 'steelfishB64', text: 'steelfishB64' },
    { value: 'SteelfishB64CE', text: 'SteelfishB64CE' },
    { value: 'TahomaB24', text: 'TahomaB24' },
    { value: 'TahomaB36', text: 'TahomaB36' },
    { value: 'TahomaB48', text: 'TahomaB48' },
];

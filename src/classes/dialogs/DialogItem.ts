import { type Component, type CSSProperties } from 'vue';
import { DialogType, StylePosition, StyleType, type ColorDialog, type DialogBox, type DialogStyle } from '../../types/Dialog';
import ComponentStatic from '../../components/dialogs/ComponentStatic.vue';
import { colorToObject, objectToColor, osuusToColor } from '../../utils/colorConverters';
import placeholderImage from '../../assets/images/placeholder.webp';
import backgroundImage from '../../assets/images/background.webp';
import windowDisplayImage from '../../assets/images/windowdisplay.webp';
import type Prototype from '../../types/Prototype';
import { cloneClass } from '../../utils/cloneClass';

export default class DialogItem implements Prototype<DialogItem> {
    public id: string;
    public idc: number;
    public type: DialogType;
    public className: string;
    public text: string;
    public sizeEx: number;
    public colorText: ColorDialog;
    public box: DialogBox;
    public colorBackground: ColorDialog;
    public style: DialogStyle;
    public font: string;
    public lineSpacing: number;

    public extraClass: string;

    constructor(id: string, box?: DialogBox) {
        this.id = id;
        this.idc = -1;
        this.type = DialogType.STATIC;
        this.className = 'item_' + id;
        this.text = '';
        this.font = 'tahomaB48';
        this.sizeEx = 0.02;
        this.colorText = osuusToColor(0, 0, 0, 1);
        this.box = box ?? { x: 0, y: 0, w: 0, h: 0 };
        this.colorBackground = osuusToColor(1, 1, 1, 1);
        this.lineSpacing = 1;

        this.style = {
            position: StylePosition.LEFT,
            type: StyleType.SINGLE,
        };

        this.extraClass = '';
    }

    public getTextStyle(): CSSProperties {
        const scale = 1;

        switch (this.style.position) {
            case StylePosition.UP:
                return {
                    'position': 'absolute',
                    'left': '50%',
                    'top': (0.5 * scale) + '%',
                    'transform': 'translateX(-50%)',
                    'text-align': 'center',
                };
            case StylePosition.VCENTER:
                return {
                    'position': 'absolute',
                    'left': '50%',
                    'top': '50%',
                    'transform': 'translate(-50%, -50%)',
                    'text-align': 'center',
                };
            case StylePosition.DOWN:
                return {
                    'position': 'absolute',
                    'left': '50%',
                    'bottom': (0.5 * scale) + '%',
                    'transform': 'translateX(-50%)',
                    'text-align': 'center',
                };
            case StylePosition.RIGHT:
                return {
                    'position': 'absolute',
                    'right': (0.5 * scale) + '%',
                    'top': '50%',
                    'transform': 'translateY(-50%)',
                    'text-align': 'right',
                };
            case StylePosition.CENTER:
                return {
                    'position': 'absolute',
                    'left': '50%',
                    'top': '50%',
                    'transform': 'translate(-50%, -50%)',
                    'text-align': 'center',
                };
            case StylePosition.LEFT:
                return {
                    'position': 'absolute',
                    'left': (0.5 * scale) + '%',
                    'top': '50%',
                    'transform': 'translateY(-50%)',
                    'text-align': 'left',
                };
            default:
                return {};
        }
    }

    public getContainerStyle(): CSSProperties {
        // const color1 = osuusToColor(0, 0, 0, 1);
        const color2 = osuusToColor(0.2, 0.2, 0.2, 1);
        const color3 = osuusToColor(0.5, 0.5, 0.5, 1);
        const color4 = osuusToColor(0.6, 0.6, 0.6, 1);
        // const color5 = osuusToColor(0.8, 0.8, 0.8, 1);

        switch (this.style.type) {
            case StyleType.HUD_BACKGROUND: {
                const color = colorToObject(this.colorBackground);
                color.a = Math.max(0, color.a - 0.3);
                return {
                    'background-color': objectToColor(color),
                    'border-radius': '16px',
                    'border': `3px solid ${this.colorBackground}`,
                };
            }
            case StyleType.BACKGROUND:
                return {
                    'background-image': `url(${backgroundImage})`,
                    'background-repeat': 'repeat',
                    'border-top': `2px solid ${color2}`,
                    'border-left': `2px solid ${color2}`,
                    'border-bottom': `2px solid ${color4}`,
                    'border-right': `2px solid ${color4}`,
                };
            case StyleType.FRAME:
                return {
                    'background-color': 'transparent',
                    'color': 'transparent',
                    'border': `1.3px solid ${this.colorText}`,
                };
            case StyleType.LINE:
                return {
                    'background-color': 'transparent',
                };
            case StyleType.WITH_RECT:
                return {
                    'background-color': 'transparent',
                    'border': `1.3px solid ${this.colorText}`,
                };
            case StyleType.GROUP_BOX: {
                return {
                    'background-color': color3,
                    'border-top': `1.3px solid ${color2}`,
                    'border-left': `1.3px solid ${color2}`,
                    'border-bottom': `1.3px solid ${color4}`,
                    'border-right': `1.3px solid ${color4}`,
                };
            }
            case StyleType.GROUP_BOX2: {
                return {
                    'background-image': `url(${windowDisplayImage})`,
                    'background-repeat': 'repeat',
                    'border-top': `1.3px solid ${color2}`,
                    'border-left': `1.3px solid ${color2}`,
                    'border-bottom': `1.3px solid ${color4}`,
                    'border-right': `1.3px solid ${color4}`,
                };
            }
            case StyleType.TITLE_BAR:
                return {
                    'background-color': color3,
                    'border-top': `1.3px solid ${color2}`,
                    'border-left': `1.3px solid ${color2}`,
                    'border-bottom': `1.3px solid ${color4}`,
                    'border-right': `1.3px solid ${color4}`,
                };
            case StyleType.MULTI:
                return {
                    'text-wrap': 'wrap',
                };
            case StyleType.PICTURE:
            case StyleType.TILE_PICTURE:
                return {
                    'background-image': `url(${placeholderImage})`,
                    'background-size': '100% 100%',
                    'background-repeat': 'no-repeat',
                };
            case StyleType.SHADOW: {
                const size = 1 * this.sizeEx;

                const offsetX = 0.075 * size;
                const offsetY = 0.1 * size;

                const textColor = colorToObject(this.colorText);
                return {
                    'text-shadow': `${offsetX}px ${offsetY}px 1px rgba(0, 0, 0, ${textColor.a})`,
                };
            }

            default:
                return {};
        }
    }

    public getComponent(): Component {
        return ComponentStatic;
    }

    public clone() {
        return cloneClass(DialogItem, this);
    }
}

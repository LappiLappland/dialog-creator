import type { CSSProperties } from 'vue';
import { osuusToColor } from '../../utils/colorConverters';
import { DialogType, StylePosition, StyleType, type ColorDialog, type DialogBox } from '../../types/Dialog';
import DialogEnabled from './DialogEnabled';

export default class DialogEdit extends DialogEnabled {
    public colorSelection: ColorDialog;
    public autoComplete: string;

    constructor(id: string, box?: DialogBox) {
        super(id, box);
        this.type = DialogType.EDIT;
        this.text = 'Initial text';
        this.colorSelection = osuusToColor(1, 1, 1, 0.25);
        this.colorBackground = osuusToColor(0, 0, 0, 0);
        this.colorText = osuusToColor(0.08, 0.08, 0.12, 0.75);
        this.autoComplete = '';

        this.colorText = osuusToColor(0.08, 0.08, 0.12, 0.75);
    }

    public getTextStyle(): CSSProperties {
        const styles = super.getTextStyle();

        if (this.style.type === StyleType.MULTI) {
            styles['transform'] = undefined;
            styles['top'] = undefined;
            if (this.style.position === StylePosition.CENTER) {
                styles['transform'] = 'translateX(-50%)';
            }
        }

        return styles;
    }

    public getContainerStyle(): CSSProperties {
        const obj: CSSProperties = {
            border: `1px solid ${this.colorText}`,
        };

        if (this.style.type === StyleType.MULTI) {
            obj['text-wrap'] = 'wrap';
        }

        return obj;
    }
}

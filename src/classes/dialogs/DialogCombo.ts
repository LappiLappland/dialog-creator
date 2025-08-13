import type { CSSProperties } from 'vue';
import { osuusToColor } from '../../utils/colorConverters';
import { DialogType, type ColorDialog, type DialogBox } from '../../types/Dialog';
import DialogEnabled from './DialogEnabled';

export default class DialogCombo extends DialogEnabled {
    public colorSelect: ColorDialog;
    public wholeHeight: number;

    constructor(id: string, box?: DialogBox) {
        super(id, box);
        this.type = DialogType.COMBO;
        this.text = 'Item';
        this.colorSelect = osuusToColor(0.35, 0.38, 0.36, 1);
        this.colorText = osuusToColor(0.08, 0.08, 0.12, 0.75);
        this.colorBackground = osuusToColor(0.35, 0.38, 0.36, 0.75);
        this.wholeHeight = 0.25;
    }

    public getTextStyle(): CSSProperties {
        const scale = 1;
        return {
            'color': this.colorSelect,
            'position': 'absolute',
            'left': (0.5 * scale) + '%',
            'top': '50%',
            'transform': 'translateY(-50%)',
            'text-align': 'left',
        };
    }

    public getContainerStyle(): CSSProperties {
        return {
            'background-color': this.colorText,
        };
    }
}

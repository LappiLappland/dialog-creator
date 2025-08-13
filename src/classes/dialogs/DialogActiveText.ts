import type { CSSProperties } from 'vue';
import { osuusToColor } from '../../utils/colorConverters';
import DialogEnabled from './DialogEnabled';
import { DialogType, type ColorDialog, type DialogBox, type DialogSound } from '../../types/Dialog';

export default class DialogActiveText extends DialogEnabled {
    public action: string;
    public colorActive: ColorDialog;
    public soundEnter: DialogSound;
    public soundPush: DialogSound;
    public soundClick: DialogSound;
    public soundEscape: DialogSound;

    constructor(id: string, box?: DialogBox) {
        super(id, box);
        this.type = DialogType.ACTIVETEXT;
        this.colorBackground = osuusToColor(0, 0, 0, 0);
        this.colorActive = osuusToColor(1, 1, 1, 1);
        this.colorText = osuusToColor(0, 0, 0, 1);
        this.text = 'Active text';
        this.action = '';
        this.soundEnter = { file: 'ui\\ui_over', volume: 0.2, pitch: 1 };
        this.soundPush = { file: '', volume: 0.2, pitch: 1 };
        this.soundClick = { file: 'ui\\ui_ok', volume: 0.2, pitch: 1 };
        this.soundEscape = { file: 'ui\\ui_cc', volume: 0.2, pitch: 1 };
    }

    public getTextStyle(): CSSProperties {
        const style = super.getTextStyle();
        // TODO: it actually appears on bottom of container, not text
        style['border-bottom'] = `1px solid ${this.colorText}`;
        return style;
    }

    public getContainerStyle(): CSSProperties {
        return {

        };
    }
}

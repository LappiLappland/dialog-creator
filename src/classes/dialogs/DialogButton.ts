import type { CSSProperties } from 'vue';
import { osuusToColor } from '../../utils/colorConverters';
import { DialogType, type DialogBox, type DialogSound } from '../../types/Dialog';
import DialogEnabled from './DialogEnabled';

export default class DialogButton extends DialogEnabled {
    public action: string;
    public soundPush: DialogSound;
    public soundClick: DialogSound;
    public soundEscape: DialogSound;

    constructor(id: string, box?: DialogBox) {
        super(id, box);

        this.type = DialogType.BUTTON;
        this.action = '';
        this.text = 'Button';
        this.colorText = osuusToColor(0.08, 0.08, 0.12, 1);
        this.colorBackground = osuusToColor(0.5, 0.5, 0.5, 0.3);

        this.soundPush = {
            file: 'ui\\ui_ok',
            volume: 0.2,
            pitch: 1,
        };
        this.soundClick = {
            file: '',
            volume: 0.2,
            pitch: 1,
        };
        this.soundEscape = {
            file: 'ui\\ui_cc',
            volume: 0.2,
            pitch: 1,
        };
    }

    public getContainerStyle(): CSSProperties {
        const color2 = osuusToColor(0.2, 0.2, 0.2, 1);
        // const color3 = osuusToColor(0.5, 0.5, 0.5, 1);
        const color4 = osuusToColor(0.6, 0.6, 0.6, 1);
        return {
            'border-top': `2px solid ${color2}`,
            'border-left': `2px solid ${color2}`,
            'border-bottom': `2px solid ${color4}`,
            'border-right': `2px solid ${color4}`,
        };
    }
}

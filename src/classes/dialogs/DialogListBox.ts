import { type Component, type CSSProperties } from 'vue';
import { DialogType, type ColorDialog, type DialogBox } from '../../types/Dialog';
import DialogEnabled from './DialogEnabled';
import ComponentListBox from '../../components/dialogs/ComponentListBox.vue';
import { osuusToColor } from '../../utils/colorConverters';

export default class DialogListBox extends DialogEnabled {
    public colorSelect: ColorDialog;
    public rowHeight: number;

    constructor(id: string, box?: DialogBox) {
        super(id, box);
        this.type = DialogType.LISTBOX;
        this.text = 'Item';
        this.colorSelect = osuusToColor(0.35, 0.38, 0.36, 1);
        this.colorText = osuusToColor(0.08, 0.08, 0.12, 0.75);

        this.rowHeight = 0.05;
    }

    public getTextStyle(): CSSProperties {
        const scale = 1;
        return {
            'position': 'absolute',
            'left': (0.5 * scale) + '%',
            'top': '50%',
            'transform': 'translateY(-50%)',
            'text-align': 'left',
        };
    }

    public getContainerStyle(): CSSProperties {
        return {};
    }

    public getComponent(): Component {
        return ComponentListBox;
    }
}

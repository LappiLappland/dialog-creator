import { osuusToColor } from '../../utils/colorConverters';
import { DialogType, type ColorDialog, type DialogBox } from '../../types/Dialog';
import DialogEnabled from './DialogEnabled';

export default class DialogProgress extends DialogEnabled {
    public colorFrame: ColorDialog;
    public colorBar: ColorDialog;

    constructor(id: string, box?: DialogBox) {
        super(id, box);
        this.type = DialogType.PROGRESS;
        this.colorFrame = osuusToColor(1, 1, 1, 1);
        this.colorBar = osuusToColor(1, 1, 1, 0.5);
    }
}

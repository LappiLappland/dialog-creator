import { osuusToColor } from '../../utils/colorConverters';
import { DialogType, type ColorDialog, type DialogBox } from '../../types/Dialog';
import DialogEnabled from './DialogEnabled';

export default class DialogToolbox extends DialogEnabled {
    public rows: number;
    public cols: number;
    public strings: string;

    public color: ColorDialog;
    public colorTextSelect: ColorDialog;
    public colorSelect: ColorDialog;
    public colorTextDisable: ColorDialog;
    public colorDisable: ColorDialog;

    constructor(id: string, box?: DialogBox) {
        super(id, box);

        this.type = DialogType.TOOLBOX;

        this.rows = 1;
        this.cols = 6;
        this.strings = '';

        this.colorTextSelect = osuusToColor(0.0, 0.0, 0.0, 0.8);
        this.colorSelect = osuusToColor(0.0, 0.0, 0.0, 0.8);
        this.colorTextDisable = osuusToColor(0.0, 0.0, 0.0, 0.2);
        this.colorDisable = osuusToColor(0.0, 0.0, 0.0, 0.2);

        this.color = osuusToColor(0.0, 0.0, 0.0, 0.4);
        this.colorText = osuusToColor(0.0, 0.0, 0.0, 0.4);
    }
}

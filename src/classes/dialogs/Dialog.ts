import type { ColorDialog } from '../../types/Dialog';
import { osuusToColor } from '../../utils/colorConverters';

export default class Dialog {
    public id: string;
    public className: string;
    public idd: number;
    public movingEnable: boolean;
    public debugBackground: ColorDialog;

    constructor(id: string) {
        this.id = id;
        this.className = 'LL_dialog';
        this.idd = -1;
        this.movingEnable = false;
        this.debugBackground = osuusToColor(0.569, 0.608, 0.686, 1);
    }
}

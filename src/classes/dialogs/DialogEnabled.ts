import { osuusToColor } from '../../utils/colorConverters';
import { type DialogBox } from '../../types/Dialog';
import DialogItem from './DialogItem';

export default class DialogEnabled extends DialogItem {
    public tooltipColorShade: string;
    public tooltipColorBox: string;
    public tooltipColorText: string;
    public tooltip: string;

    constructor(id: string, box?: DialogBox) {
        super(id, box);

        this.tooltip = '';
        this.tooltipColorBox = osuusToColor(0, 0, 0, 0.5);
        this.tooltipColorShade = osuusToColor(1, 1, 0.7, 1);
        this.tooltipColorText = osuusToColor(0, 0, 0, 1);
    }
}

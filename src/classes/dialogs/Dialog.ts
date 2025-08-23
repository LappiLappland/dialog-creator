import type { ColorDialog } from '../../types/Dialog';

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
        this.debugBackground = 'rgba(145, 155, 175, 1)';
    }
}

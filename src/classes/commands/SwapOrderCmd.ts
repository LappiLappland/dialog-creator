import type { useDialogStore } from '../../stores/dialogStore';
import type Command from '../../types/Command';
import swapArrayItems from '../../utils/swapArrayItems';

export default class SwapOrderCmd implements Command {
    private store: ReturnType<typeof useDialogStore>;
    private fromIndex: number;
    private toIndex: number;

    constructor(store: ReturnType<typeof useDialogStore>, fromIndex: number, toIndex: number) {
        this.store = store;
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }

    execute() {
        swapArrayItems(this.store.dialogItemsArray, this.fromIndex, this.toIndex);
    }

    undo() {
        swapArrayItems(this.store.dialogItemsArray, this.toIndex, this.fromIndex);
    }
}

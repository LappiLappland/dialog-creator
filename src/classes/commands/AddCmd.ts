import type { useDialogStore } from '../../stores/dialogStore';
import type Command from '../../types/Command';
import type DialogItem from '../dialogs/DialogItem';

export default class AddCmd implements Command {
    private store: ReturnType<typeof useDialogStore>;
    private instance: DialogItem;
    private id: string;

    constructor(store: ReturnType<typeof useDialogStore>, item: DialogItem) {
        this.store = store;
        this.instance = item;
        this.id = '';
    }

    execute() {
        this.store.addItem(this.instance);
        this.id = this.instance.id; // Probably unnecessary, but just in case
    }

    undo() {
        this.store.deleteItem(this.id);
    }
}

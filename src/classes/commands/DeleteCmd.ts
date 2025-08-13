import type { useDialogStore } from '../../stores/dialogStore';
import type Command from '../../types/Command';
import type DialogItem from '../dialogs/DialogItem';

export default class DeleteCmd implements Command {
    private id: string;
    private store: ReturnType<typeof useDialogStore>;
    private backup?: DialogItem;

    constructor(store: ReturnType<typeof useDialogStore>, id: string) {
        this.id = id;
        this.store = store;
    }

    execute() {
        const item = this.store.dialogItems.get(this.id);
        if (!item) return;
        this.backup = item;
        this.store.deleteItem(this.id);
    }

    undo() {
        if (!this.backup) return;
        this.store.addItem(this.backup);
    }
}

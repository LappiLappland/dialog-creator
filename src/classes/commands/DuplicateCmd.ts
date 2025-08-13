import type { useDialogStore } from '../../stores/dialogStore';
import type Command from '../../types/Command';

export default class DuplicateCmd implements Command {
    private id: string;
    private store: ReturnType<typeof useDialogStore>;
    private newItemId?: string;

    constructor(store: ReturnType<typeof useDialogStore>, id: string) {
        this.id = id;
        this.store = store;
    }

    execute() {
        const item = this.store.dialogItems.get(this.id);
        if (!item) return;
        const copy = item.clone();
        copy.id = '';
        this.store.addItem(copy);
        copy.box = { ...copy.box, x: copy.box.x - 0.01, y: copy.box.y - 0.01 };
        this.newItemId = copy.id;
    }

    undo() {
        if (!this.newItemId) return;
        const item = this.store.dialogItems.get(this.newItemId);
        if (!item) return;
        this.store.deleteItem(item.id);
    }
}

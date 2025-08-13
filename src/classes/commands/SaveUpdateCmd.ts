import type { useDialogStore } from '../../stores/dialogStore';
import type Command from '../../types/Command';
import type Dialog from '../dialogs/Dialog';
import type DialogItem from '../dialogs/DialogItem';

export default class SaveUpdateCmd implements Command {
    private id: string;
    private store: ReturnType<typeof useDialogStore>;
    private key: string;
    private oldValue: unknown;
    private newValue: unknown;

    constructor(store: ReturnType<typeof useDialogStore>, id: string, key: string, oldValue: unknown, newValue: unknown) {
        this.id = id;
        this.store = store;
        this.key = key;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    execute() {
        let item: DialogItem | Dialog | undefined;
        if (this.id === this.store.mainDialog.id) {
            item = this.store.mainDialog;
        }
        else {
            item = this.store.dialogItems.get(this.id);
        }
        if (!item) return;
        if (this.key in item) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            item[this.key] = this.newValue;
        }
    }

    undo() {
        let item: DialogItem | Dialog | undefined;
        if (this.id === this.store.mainDialog.id) {
            item = this.store.mainDialog;
        }
        else {
            item = this.store.dialogItems.get(this.id);
        }
        if (!item) return;
        if (this.key in item) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            item[this.key] = this.oldValue;
        }
    }
}

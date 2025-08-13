import type { useDialogStore } from '../../stores/dialogStore';
import type Command from '../../types/Command';
import type { ImportedClassResult } from '../../utils/classToDialog';

export default class ReplaceStateCmd implements Command {
    private replacement: ImportedClassResult;
    private store: ReturnType<typeof useDialogStore>;

    constructor(store: ReturnType<typeof useDialogStore>, replacement: ImportedClassResult) {
        this.store = store;
        this.replacement = replacement;
    }

    execute() {
        this.store.replaceState(this.replacement.mainClass, this.replacement.children);
    }

    undo() {}
}

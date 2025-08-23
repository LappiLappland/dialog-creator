import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { useDialogStore } from '../stores/dialogStore';
import DeleteCmd from '../classes/commands/DeleteCmd';
import DuplicateCmd from '../classes/commands/DuplicateCmd';
import CommandDispatcher from '../classes/CommandDispatcher';

export default function useGlobalHotkeys(preventGlobalHotkeys: Ref<boolean>) {
    const store = useDialogStore();

    const activeKeys = ref(new Set<string>());

    function deleteDialog() {
        if (!store.selectedItem) return;
        CommandDispatcher.run(new DeleteCmd(store, store.selectedItem));
    }

    function duplicateDialog() {
        if (!store.selectedItem) return;
        CommandDispatcher.run(new DuplicateCmd(store, store.selectedItem));
    }

    function undoCommand() {
        CommandDispatcher.undo();
    }

    function redoCommand() {
        CommandDispatcher.redo();
    }

    function moveSelected(e: KeyboardEvent) {
        if (!store.selectedItem) return;

        let x = 0;
        let y = 0;

        if (activeKeys.value.has('ArrowLeft')) {
            x--;
        }
        if (activeKeys.value.has('ArrowRight')) {
            x++;
        }
        if (activeKeys.value.has('ArrowUp')) {
            y--;
        }
        if (activeKeys.value.has('ArrowDown')) {
            y++;
        }

        if (x === 0 && y === 0) return;

        const item = store.getItem(store.selectedItem);
        if (!item) return;

        e.preventDefault();

        const ctrlActive = activeKeys.value.has('ControlLeft');
        const shiftActive = activeKeys.value.has('ShiftLeft');
        const altActive = activeKeys.value.has('AltLeft');

        let moveDist = 0.001;
        if (ctrlActive && shiftActive) {
            moveDist = 0.1;
        }
        else if (ctrlActive) {
            moveDist = 0.01;
        }
        else if (altActive) {
            moveDist = 0.0001;
        }

        const box = { ...item.box };
        box.x += x * moveDist;
        box.y += y * moveDist;

        store.patchItem(store.selectedItem, 'box', box);
    }

    function handleHotkeys(e: KeyboardEvent) {
        if (preventGlobalHotkeys.value) return;

        switch (e.code) {
            case 'Delete':
                e.preventDefault();
                deleteDialog();
                return;
            case 'KeyZ':
                if (e.ctrlKey) {
                    e.preventDefault();
                    undoCommand();
                };
                return;
            case 'KeyY':
                if (e.ctrlKey) {
                    e.preventDefault();
                    redoCommand();
                };
                return;
            case 'KeyD':
                if (e.ctrlKey) {
                    e.preventDefault();
                    duplicateDialog();
                };
                return;
        }

        moveSelected(e);
    }

    function handleKeyDown(e: KeyboardEvent) {
        activeKeys.value.add(e.code);
        handleHotkeys(e);
    }

    function handleKeyUp(e: KeyboardEvent) {
        activeKeys.value.delete(e.code);
    }

    onMounted(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
    });
}

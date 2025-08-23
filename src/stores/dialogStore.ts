import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import DialogItem from '../classes/dialogs/DialogItem';
import Dialog from '../classes/dialogs/Dialog';
import type { DialogBox } from '../types/Dialog';
import type { Coord } from '../types/Geometry';
import { typeNamesMap } from '../constants/typeNamesMap';
import CommandDispatcher from '../classes/CommandDispatcher';
import SaveUpdateCmd from '../classes/commands/SaveUpdateCmd';

let uniqueIndex = 0;

export interface DialogItemChange {
    id: string;
    key: string;
    oldValue: unknown;
    newValue: unknown;
}

export const useDialogStore = defineStore('dialog', () => {
    const mainDialog = ref<Dialog>(new Dialog('main'));

    const dialogItemsArray = ref<DialogItem[]>([]);

    const dialogItems = computed<Map<string, DialogItem>>(() => {
        return new Map(
            dialogItemsArray.value.map(item => [item.id, item]),
        );
    });

    const duplicateClassNames = computed<Set<string>>(() => {
        const seen = new Set<string>();
        const dup = new Set<string>();

        for (const item of dialogItemsArray.value) {
            const c = item.className.toLowerCase();
            if (seen.has(c.toLowerCase())) {
                dup.add(c.toLowerCase());
            }
            else {
                seen.add(c.toLowerCase());
            }
        }

        return dup;
    });

    const pendingChanges = new Map<string, DialogItemChange>();

    const selectedItem = ref<string>();

    const windowBox = ref<DialogBox>();
    const showCode = ref(false);

    function addItem(dialog: DialogItem) {
        uniqueIndex++;

        dialog.box = { x: 0.15, y: 0.15, w: 0.15, h: 0.15 };
        if (dialog.id === '') dialog.id = uniqueIndex + '';

        const typeName = typeNamesMap.get(dialog.type) ?? 'item';
        dialog.className = typeName + '_' + dialog.id;

        dialogItemsArray.value.push(dialog);
    }

    function getItem(id: string) {
        const item = dialogItems.value.get(id);
        return item || null;
    }

    function deleteItem(id: string) {
        dialogItemsArray.value = dialogItemsArray.value.filter(e => e.id !== id);
    }

    function patchItem(id: string, key: string, newValue: unknown) {
        let item: DialogItem | Dialog | undefined;
        if (id === mainDialog.value.id) {
            item = mainDialog.value;
        }
        else {
            item = dialogItems.value.get(id);
        }
        if (!item) return;

        if (!(key in item)) return;

        const changeKey = `${id}-${key}`;
        if (!pendingChanges.has(changeKey)) {
            pendingChanges.set(changeKey, {
                id,
                key,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                oldValue: item[key],
                newValue: newValue,
            });
        }
        else {
            const item = pendingChanges.get(changeKey);
            if (item) {
                item.newValue = newValue;
            }
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        item[key] = newValue;

        flushPendingChanges();
    }

    function patchItemHistory({ id, key, oldValue, newValue }: DialogItemChange) {
        CommandDispatcher.add(new SaveUpdateCmd(useDialogStore(), id, key, oldValue, newValue));
    }

    function flushPendingChanges() {
        for (const { id, key, oldValue, newValue } of pendingChanges.values()) {
            CommandDispatcher.add(new SaveUpdateCmd(useDialogStore(), id, key, oldValue, newValue));
        }
        pendingChanges.clear();
    };

    function changeCoord(id: string, coord: Coord) {
        const item = dialogItems.value.get(id);
        if (!item) return;

        item.box.x = coord.x;
        item.box.y = coord.y;
    }

    function changeBox(id: string, box: DialogBox) {
        const item = dialogItems.value.get(id);
        if (!item) return;

        item.box = { ...box };
    }

    function setWindowBox(box: DialogBox) {
        windowBox.value = { ...box };
    }

    function setSelectedItem(id: string) {
        selectedItem.value = id;
    }

    function switchWindowDisplay() {
        showCode.value = !showCode.value;
    }

    function resetState() {
        uniqueIndex = 0;
        dialogItemsArray.value = [];
        mainDialog.value = new Dialog('main');
        selectedItem.value = '';
        CommandDispatcher.clearHistory();
    }

    function replaceState(main: Dialog, children: DialogItem[]) {
        resetState();
        children.forEach((child) => {
            uniqueIndex++;
            child.id = uniqueIndex + '';
        });

        main.id = 'main' + crypto.randomUUID();
        main.debugBackground = mainDialog.value.debugBackground;

        dialogItemsArray.value = children;
        mainDialog.value = main;

        selectedItem.value = '';
    }

    function isClassNameUnique(className: string) {
        return !duplicateClassNames.value.has(className.toLowerCase());
    }

    return {
        showCode,
        mainDialog,
        selectedItem,
        dialogItems,
        dialogItemsArray,
        windowBox,
        changeCoord,
        changeBox,
        patchItem,
        patchItemHistory,
        getItem,
        deleteItem,
        addItem,
        setSelectedItem,
        resetState,
        replaceState,
        isClassNameUnique,
        switchWindowDisplay,
        setWindowBox,
    };
});

<script setup lang="ts">
import { computed, inject } from 'vue';
import { getClassDescriptor } from '../../descriptors/ClassDescriptor';
import { useDialogStore } from '../../stores/dialogStore';
import { fieldInputMap } from '../../constants/fieldInputMap';
import { setPreventGlobalHotkeysKey } from '../../providers/globalHotkeys';
const store = useDialogStore();

const setPreventGlobalHotkeys = inject(setPreventGlobalHotkeysKey)!;

const item = computed(() => {
    return store.selectedItem ? (store.getItem(store.selectedItem) || store.mainDialog) : store.mainDialog;
});

const meta = computed(() => {
    if (!item.value) return;

    return getClassDescriptor(item.value);
});

</script>

<template>
    <div class="h-full flex flex-col">
        <h2 class="text-lg font-semibold text-gray-800 text-center px-2">
            Properties
        </h2>
        <h2 class="text-md font-semibold text-gray-600 mb-2 text-center px-2">
            {{ item?.className }}
        </h2>
        <form v-if="meta && item"
            class="overflow-auto grow px-2"
            @focusin="setPreventGlobalHotkeys(true)"
            @focusout="setPreventGlobalHotkeys(false)"
        >
            <div
            v-for="([prop, spec]) in Object.entries(meta)"
            :key="prop + '_' + item.id"
            class="mb-2.5"
            >
                <label v-if="spec.editable" :for="prop"
                  class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                {{ spec.label }}
                </label>

                <component
                :is="fieldInputMap[spec.type]"
                v-if="spec.editable"
                :id="prop"
                :model-value="(item as any)[prop]"
                @update:modelValue="(newValue: any) => {
                    store.patchItem(item.id, prop, newValue);
                }"
                :payload="spec.payload"
                />
            </div>
        </form>
    </div>
</template>

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
    <div class="right-bar">
        <h2 class="right-bar__title">
            Properties
        </h2>
        <h2 class="right-bar__subtitle">
            {{ item?.className }}
        </h2>
        <form v-if="meta && item"
            class="right-bar__form"
            @focusin="setPreventGlobalHotkeys(true)"
            @focusout="setPreventGlobalHotkeys(false)"
        >
            <div
            v-for="([prop, spec]) in Object.entries(meta)"
            :key="prop + '_' + item.id"
            class="right-bar__field"
            >
                <label v-if="spec.editable" :for="prop"
                  class="right-bar__label"
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

<style>
.right-bar {
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    border-left: 1px solid rgb(var(--border-main));
    padding-inline: 4px;
    padding-block: 8px;
    background-color: rgb(var(--bg-secondary));
}

.right-bar__title {
    font-size: 1.125rem;
    font-weight: var(--fw-semi-bold);
    color: rgb(var(--text-on-main));
    text-align: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.right-bar__subtitle {
    font-size: 1rem;
    font-weight: var(--fw-semi-bold);
    color: rgb(var(--text-on-main-secondary));
    margin-bottom: 0.5rem;
    text-align: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.right-bar__form {
    flex: 1 1 0;
    overflow-y: auto;
    padding-inline: 0.5rem;
}

.right-bar__field {
    margin-bottom: 0.625rem;
}

.right-bar__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: var(--fw-semi-bold);
    color: rgb(var(--text-on-main));
}

.right-bar__input {
    width: 100%;
}
</style>

<script setup lang="ts">
import { provide, ref } from 'vue';
import CodeWindow from './components/CodeWindow.vue';
import VisualWindow from './components/VisualWindow.vue';
import { useDialogStore } from './stores/dialogStore';
import { ModalsContainer } from 'vue-final-modal';
import ActionsBar from './components/layouts/ActionsBar.vue';
import LeftBar from './components/layouts/LeftBar.vue';
import TopBar from './components/layouts/TopBar.vue';
import RightBar from './components/layouts/RightBar.vue';
import { setPreventGlobalHotkeysKey } from './providers/globalHotkeys';
import useGlobalHotkeys from './composables/useGlobalHotkeys';

const store = useDialogStore();

const preventGlobalHotkeys = ref(false);
function setPreventGlobalHotkeys(value: boolean) {
    preventGlobalHotkeys.value = value;
}
provide(setPreventGlobalHotkeysKey, setPreventGlobalHotkeys);

useGlobalHotkeys(preventGlobalHotkeys.value);

</script>

<template>
    <div class="bg-gray-100 w-screen h-screen flex flex-col justify-center items-center">
        <ActionsBar />
        <div class="grid w-full h-full grid-cols-[15%_auto_25%] grid-rows-1
        bg-white shadow-md rounded-lg overflow-hidden
        ">
            <LeftBar
                class="border-r border-gray-200 bg-gray-50 px-2 py-1"
            />

            <div class="grid grid-rows-[auto_1fr] border-b border-gray-200">
                <TopBar
                class="border-b border-gray-200 bg-gray-50 p-2"
                />
                <VisualWindow
                v-if="!store.showCode"
                />
                <CodeWindow
                v-else
                />
            </div>

            <RightBar
            class="border-l border-gray-200 bg-gray-50 py-1"
            />
        </div>
    </div>
    <ModalsContainer />
</template>

<style scoped>

</style>

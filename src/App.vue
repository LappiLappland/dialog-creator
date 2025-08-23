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
    <div class="main">
        <ActionsBar />
        <div class="main__layout-grid">
            <LeftBar />

            <div class="main__window-grid">
                <TopBar />
                <VisualWindow
                v-if="!store.showCode"
                />
                <CodeWindow
                v-else
                />
            </div>

            <RightBar />
        </div>
    </div>
    <ModalsContainer />
</template>

<style>

.main {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgb(var(--bg-main));
}

.main__layout-grid {
    display: grid;
    width: 100%;
    flex-grow: 1;
    grid-template-columns: 180px auto 300px;
    grid-template-rows: 1fr;
}

.main__window-grid {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
}

</style>

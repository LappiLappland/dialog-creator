<script setup lang="ts">
import { ref } from 'vue';
import ImportStepUpload from './ImportStepUpload.vue';
import ImportStepSelect from './ImportStepSelect.vue';
import preprocessCpp from '../../../utils/cppPreprocessor';
import { parseCpp, type OFPClass, type ParsedOFPClasses } from '../../../utils/cppParser';
import classToDialog from '../../../utils/classToDialog';
import CommandDispatcher from '../../../classes/CommandDispatcher';
import ReplaceStateCmd from '../../../classes/commands/ReplaceStateCmd';
import { useDialogStore } from '../../../stores/dialogStore';
import ImportStepError from './ImportStepError.vue';

const enum ModalImportStep {
    UPLOAD = 1,
    SELECT = 2,

    ERROR = -1,
}

const emit = defineEmits<{
    (e: 'importDone'): void;
}>();

const store = useDialogStore();

const currentStep = ref<ModalImportStep>(ModalImportStep.UPLOAD);
const parsedClasses = ref<ParsedOFPClasses>();
const errorText = ref('');

function handleFirstStepDone(codeText: string) {
    if (codeText.trim() === '') return;

    currentStep.value = 2;

    try {
        const preprocessed = preprocessCpp(codeText);
        const obj = parseCpp(preprocessed);

        for (const [key, value] of obj.entries()) {
            const findValue = (obj: OFPClass, key: string) => {
                if (key in obj.properties) {
                    return obj.properties[key];
                }
                else if (obj.parent) {
                    return findValue(obj.parent, key);
                }
                return null;
            };

            const idd = findValue(value, 'idd');

            if (idd === null) {
                obj.delete(key);
            }
        }

        if (obj.size === 0) {
            throw new Error('No classes were found');
        }

        parsedClasses.value = obj;

        if (obj.size === 1) {
            const keys = [...obj.keys()];
            handleClassSelected(keys[0]);
        }
    }
    catch (err) {
        errorText.value = 'Unknown error';
        if (err instanceof Error) {
            errorText.value = err.message;
        }
        currentStep.value = ModalImportStep.ERROR;
    }
}

function handleClassSelected(id: string) {
    if (!parsedClasses.value) return;
    try {
        const importedDialog = classToDialog(id, parsedClasses.value);

        CommandDispatcher.run(new ReplaceStateCmd(store, importedDialog));
        CommandDispatcher.clearHistory();

        emit('importDone');
    }
    catch (err) {
        errorText.value = 'Unknown error';
        if (err instanceof Error) {
            errorText.value = err.message;
        }
        currentStep.value = ModalImportStep.ERROR;
    }
}

</script>

<template>
    <div class="modal-import"
    @click="(e) => {if (e.target === e.currentTarget) {$emit('importDone')}}"
    >
        <div class="modal-import__container">
            <ImportStepUpload
            v-if="currentStep === ModalImportStep.UPLOAD"
            @accepted="handleFirstStepDone"
            />
            <ImportStepSelect
            v-else-if="currentStep === ModalImportStep.SELECT && parsedClasses"
            :classes="parsedClasses"
            @class-selected="handleClassSelected"
            @go-back="currentStep = ModalImportStep.UPLOAD"
            />
            <ImportStepError
            v-else-if="currentStep === ModalImportStep.ERROR"
            :error-text="errorText"
            @go-back="currentStep = ModalImportStep.UPLOAD"
            />
        </div>
    </div>
</template>

<style>
.modal-import {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.modal-import__container {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    background-color: rgb(var(--bg-main));
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

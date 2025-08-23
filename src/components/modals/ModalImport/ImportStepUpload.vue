<script setup lang="ts">
import { ref } from 'vue';
import FileUploadBox from '../../FileUploadBox.vue';

defineEmits<{
    (e: 'accepted', codeText: string): void;
}>();

const showFile = ref(false);
const codeText = defineModel<string>({
    default: '',
});

function handleFileUploaded(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            codeText.value = reader.result;
            showFile.value = false;
        }
    };
}

</script>

<template>
    <div class="import-upload">
        <h2 class="import-upload__title">
            Import text with Dialog class
        </h2>

        <p class="import-upload__note">
            Note: any "#include" would be ignored, please make sure you don't use them
        </p>

        <div class="import-upload__tabs">
            <button
                class="import-upload__tab"
                :class="[
                showFile ?
                    'import-upload__tab_active' :
                    'import-upload__tab_inactive'
                ]"
                @click="showFile = true"
            >
                File
            </button>
            <button
                class="import-upload__tab"
                :class="[
                !showFile ?
                    'import-upload__tab_active' :
                    'import-upload__tab_inactive'
                ]"
                @click="showFile = false"
            >
                Text
            </button>
        </div>

        <div class="import-upload__content">
            <FileUploadBox
                v-if="showFile"
                @file-uploaded="handleFileUploaded"
                class="import-upload__file-upload"
            />
            <textarea
                class="import-upload__textarea"
                rows="10"
                placeholder="Insert text here"
                v-model="codeText"
                v-else
            ></textarea>
        </div>

        <button
            class="import-upload__confirm-btn"
            @click="$emit('accepted', codeText)"
        >
            Confirm
        </button>
    </div>
</template>

<style>
.import-upload {
    padding: 1.5rem;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
}

.import-upload__title {
    font-size: 1.25rem;
    font-weight: var(--fw-semi-bold);
    color: rgb(var(--text-on-main));
    margin-bottom: 0.5rem;
}

.import-upload__note {
    font-size: 0.875rem;
    color: rgb(var(--text-on-main-secondary));
    margin-bottom: 1rem;
}

.import-upload__tabs {
    display: flex;
    background-color: rgb(var(--bg-secondary));
    border-radius: 0.5rem;
    padding: 0.25rem;
    margin-bottom: 1rem;
}

.import-upload__tab {
    cursor: pointer;
    flex: 1;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.375rem;
    font-weight: var(--fw-medium);
    transition: all 200ms ease;
    border: none;
    background: none;
}

.import-upload__tab_active {
    background-color: rgb(var(--bg-main));
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.import-upload__tab_inactive {
    color: rgb(var(--text-on-main-secondary));
}

.import-upload__tab_inactive:hover {
    color: rgb(var(--text-on-main));
}

.import-upload__content {
    margin-bottom: 1rem;
}

.import-upload__file-upload {
    margin-bottom: 0.5rem;
}

.import-upload__textarea {
    width: 100%;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    padding: 0.75rem;
    resize: none;
    transition: border-color 200ms ease, box-shadow 200ms ease;
}

.import-upload__textarea:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: transparent;
}

.import-upload__confirm-btn {
    cursor: pointer;
    width: 100%;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: rgb(var(--bg-button));
    color: rgb(var(--text-on-button));
    font-weight: var(--fw-medium);
    border-radius: 0.5rem;
    border: none;
    transition: background-color 200ms ease, box-shadow 200ms ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.import-upload__confirm-btn:hover {
    background-color: rgba(var(--bg-button), 0.85);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.import-upload__confirm-btn:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1);
}

</style>

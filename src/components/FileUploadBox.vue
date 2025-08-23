<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'fileUploaded', file: File): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const file = ref<File | null>(null);
const isDragging = ref(false);

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        file.value = target.files[0];
        emit('fileUploaded', file.value);
    }
};

const handleDrop = (event: DragEvent) => {
    isDragging.value = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        file.value = event.dataTransfer.files[0];
        emit('fileUploaded', file.value);
    }
};
</script>

<template>
  <div
    class="file-upload"
    :class="{ 'file-upload_dragging': isDragging }"
    @click="triggerFileInput"
    @dragover.prevent="isDragging = true"
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <p class="file-upload__text">
      {{ file ? file.name : 'Click or drag a file here to upload' }}
    </p>
    <input
      ref="fileInput"
      type="file"
      class="file-upload__input"
      @change="handleFileSelect"
    />
  </div>
</template>

<style>
.file-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    border: 2px dashed rgb(var(--border-main));
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 200ms ease, border-color 200ms ease;
    background-color: transparent;
}

.file-upload_dragging {
    background-color: rgb(var(--bg-hover));
    border-color: rgb(var(--border-hover));
}

.file-upload__text {
    color: rgb(var(--text-on-main-secondary));
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
}

.file-upload__input {
    display: none;
}
</style>

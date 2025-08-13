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
    class="flex items-center justify-center min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors"
    :class="{ 'bg-blue-50 border-blue-400': isDragging }"
    @click="triggerFileInput"
    @dragover.prevent="isDragging = true"
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <p class="text-gray-500 text-center px-4">
      {{ file ? file.name : 'Click or drag a file here to upload' }}
    </p>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      @change="handleFileSelect"
    />
  </div>
</template>

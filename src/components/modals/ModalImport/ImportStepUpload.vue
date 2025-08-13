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
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-xl font-semibold text-gray-800 mb-2">
      Import text with Dialog class
    </h2>

    <p class="text-sm text-gray-600 mb-4">
      Note: any "#include" would be ignored, please make sure you don't use them
    </p>

    <div class="flex bg-gray-100 rounded-lg p-1 mb-4">
      <button
        class="cursor-pointer flex-1 py-2 px-4 rounded-md transition-all duration-200 font-medium"
        :class="{
          'bg-white shadow-sm text-blue-600': showFile,
          'text-gray-700 hover:text-gray-900': !showFile
        }"
        @click="showFile = true"
      >
        File
      </button>
      <button
        class="cursor-pointer flex-1 py-2 px-4 rounded-md transition-all duration-200 font-medium"
        :class="{
          'bg-white shadow-sm text-blue-600': !showFile,
          'text-gray-700 hover:text-gray-900': showFile
        }"
        @click="showFile = false"
      >
        Text
      </button>
    </div>

    <div class="mb-4">
      <FileUploadBox
        v-if="showFile"
        @file-uploaded="handleFileUploaded"
        class="mb-2"
      />
      <textarea
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        rows="10"
        placeholder="Insert text here"
        v-model="codeText"
        v-else
      ></textarea>
    </div>

    <button
        class="cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        @click="$emit('accepted', codeText)"
    >
      Confirm
    </button>
  </div>
</template>

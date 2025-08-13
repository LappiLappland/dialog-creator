<script setup lang="ts">
import { computed } from 'vue';
import type { ParsedOFPClasses } from '../../../utils/cppParser';

defineEmits<{
    (e: 'class-selected', id: string): void;
    (e: 'go-back'): void;
}>();

const searchText = defineModel<string>({
    default: '',
});

const props = defineProps<{
    classes: ParsedOFPClasses;
}>();

const filteredClasses = computed(() => {
    return [...props.classes.keys()].filter((key) => {
        return key.includes(searchText.value.toLowerCase());
    });
});

</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <button class="text-sm hover:underline cursor-pointer"
    @click="$emit('go-back')"
    >
        ← Go back
    </button>
    <h2 class="text-xl font-semibold text-gray-800 mb-2">
      Select dialog class
    </h2>

    <p class="text-sm text-gray-600 mb-6">
      Several classes were found during parsing, please select which one you intend to edit
    </p>

    <div class="space-y-4">
      <div class="relative">
        <input
          v-model="searchText"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
          placeholder="Search..."
        />
        <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <div class="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
        <ul>
          <li
            v-for="(value, index) in filteredClasses"
            :key="index"
          >
            <button
              class="cursor-pointer w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              @click="$emit('class-selected', value)"
            >
              <span class="font-medium text-gray-800">{{ value }}</span>
            </button>
          </li>
        </ul>

        <div v-if="filteredClasses.length === 0" class="px-4 py-8 text-center text-gray-500">
          No classes found matching "{{ searchText }}"
        </div>
      </div>
    </div>
  </div>
</template>

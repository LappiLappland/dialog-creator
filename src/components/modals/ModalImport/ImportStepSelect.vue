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
    <div class="import-step">
        <button class="import-step__back-btn"
        @click="$emit('go-back')"
        >
            ← Go back
        </button>
        <h2 class="import-step__title">
            Select dialog class
        </h2>

        <p class="import-step__description">
            Several classes were found during parsing, please select which one you intend to edit
        </p>

        <div class="import-step__content">
            <div class="import-step__search-container">
                <input
                v-model="searchText"
                class="import-step__search-input"
                placeholder="Search..."
                />
                <svg class="import-step__search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>

            <div class="import-step__list-container">
                <ul class="import-step__list">
                    <li
                        v-for="(value, index) in filteredClasses"
                        :key="index"
                    >
                        <button
                        class="import-step__class-btn"
                        @click="$emit('class-selected', value)"
                        >
                        <span class="import-step__class-name">{{ value }}</span>
                        </button>
                    </li>
                </ul>

                <div v-if="filteredClasses.length === 0" class="import-step__empty">
                    No classes found matching "{{ searchText }}"
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.import-step {
    padding: 1.5rem;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
}

.import-step__back-btn {
    font-size: 0.875rem;
    background: none;
    border: none;
    color: rgb(var(--text-on-main));
    cursor: pointer;
    text-decoration: underline;
}

.import-step__back-btn:hover {
    text-decoration: underline;
}

.import-step__title {
    font-size: 1.25rem;
    font-weight: var(--fw-semi-bold);
    color: rgb(var(--text-on-main));
    margin-bottom: 0.5rem;
}

.import-step__description {
    font-size: 0.875rem;
    color: rgb(var(--text-on-main-secondary));
    margin-bottom: 1.5rem;
}

.import-step__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.import-step__search-container {
    position: relative;
}

.import-step__search-input {
    width: 100%;
    padding-left: 2.5rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    transition: all 200ms ease;
    padding-left: 2.5rem;
}

.import-step__search-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: transparent;
}

.import-step__search-icon {
    position: absolute;
    left: 0.75rem;
    top: 0.875rem;
    height: 1.25rem;
    width: 1.25rem;
    color: rgb(var(--bg-primary));
}

.import-step__list-container {
    border: 1px solid rgb(var(--border-main));
    border-radius: 0.5rem;
    max-height: 15rem;
    overflow-y: auto;
}

.import-step__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.import-step__class-btn {
    cursor: pointer;
    width: 100%;
    text-align: left;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background: none;
    border: none;
    border-bottom: 1px solid rgb(var(--bg-secondary));
    transition: background-color 150ms ease;
    width: 100%;
}

.import-step__class-btn:hover {
    background-color: rgb(var(--bg-hover));
}

.import-step__class-btn:focus {
    background-color: rgb(var(--bg-hover));
    outline: none;
}

.import-step__class-btn:last-child {
    border-bottom: none;
}

.import-step__class-name {
    font-weight: var(--fw-medium);
    color: rgb(var(--text-on-main));
}

.import-step__empty {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    text-align: center;
    color: rgb(var(--text-on-main-secondary));
}
</style>

<script setup lang="ts">
defineEmits<{
    (e: 'go-back'): void;
}>();

defineProps<{
    errorText: string;
}>();

</script>

<template>
    <div class="import-error">
        <div class="import-error__header">
            <div class="import-error__header-content">
                <h2 class="import-error__title">
                    Error while parsing
                </h2>
                <p class="import-error__subtitle">
                    Make sure you copied class correctly
                </p>
            </div>
        </div>

        <div class="import-error__message">
            <div class="import-error__message-content">
                <div class="import-error__icon-container">
                    <svg class="import-error__icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div class="import-error__text-container">
                    <p class="import-error__text">
                        {{ errorText }}
                    </p>
                </div>
            </div>
        </div>

        <button
        class="import-error__btn"
        @click="$emit('go-back')"
        >
            Go back to import
        </button>
    </div>
</template>

<style>
.import-error {
    padding: 1.5rem;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
}

.import-error__header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.import-error__header-content {
    margin-left: 0.75rem;
}

.import-error__title {
    font-size: 1.25rem;
    font-weight: var(--fw-semi-bold);
    color: rgb(var(--text-on-main));
}

.import-error__subtitle {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: rgb(var(--text-on-main-secondary));
}

.import-error__message {
    background-color: rgb(var(--bg-error));
    border-left: 4px solid rgb(var(--border-error));
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

.import-error__message-content {
    display: flex;
}

.import-error__icon-container {
    flex-shrink: 0;
}

.import-error__icon {
    height: 1.25rem;
    width: 1.25rem;
    color: rgb(var(--text-on-error));
}

.import-error__text-container {
    margin-left: 0.75rem;
}

.import-error__text {
    font-size: 0.875rem;
    color: rgb(var(--text-on-error));
}

.import-error__btn {
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

.import-error__btn:hover {
    background-color: rgba(var(--bg-button), 0.85);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.import-error__btn:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.1);
}
</style>

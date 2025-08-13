import type { Component } from 'vue';
import type { EditorType } from '../types/EditorFieldTypes.ts';
import StringInput from '../components/inputs/StringInput.vue';
import BooleanInput from '../components/inputs/BooleanInput.vue';
import DialogBoxInput from '../components/inputs/DialogBoxInput.vue';
import NumberInput from '../components/inputs/NumberInput.vue';
import ColorInput from '../components/inputs/ColorInput.vue';
import StringAutoCompleteInput from '../components/inputs/StringAutoCompleteInput.vue';
import SelectInput from '../components/inputs/SelectInput.vue';
import DialogSoundInput from '../components/inputs/DialogSoundInput.vue';
import ClassInput from '../components/inputs/ClassInput.vue';
import StyleInput from '../components/inputs/StyleInput.vue';
import EnumInput from '../components/inputs/EnumInput.vue';

export const fieldInputMap: Record<EditorType, Component> = {
    'string': StringInput,
    'boolean': BooleanInput,
    'dialogBox': DialogBoxInput,
    'number': NumberInput,
    'color': ColorInput,
    'string-autocomplete': StringAutoCompleteInput,
    'select': SelectInput,
    'sound': DialogSoundInput,
    'class': ClassInput,
    'style': StyleInput,
    'enum': EnumInput,
};

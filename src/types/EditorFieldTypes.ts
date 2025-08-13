import type SelectOption from './SelectOption';

interface EditorFieldGeneral {
    label: string;
    editable: boolean;
    name?: string;
    exclude?: boolean;
    payload?: unknown;
}

interface EditorFieldSimple extends EditorFieldGeneral {
    type: 'string' | 'class' | 'boolean' | 'dialogBox' | 'color' | 'sound';
}

export interface EditorFieldOptionsPayload {
    options: SelectOption[];
}

interface EditorFieldOptions extends EditorFieldGeneral {
    type: 'string-autocomplete' | 'select';
    payload: EditorFieldOptionsPayload;
}

export interface EditorFieldNumberPayload {
    isInt?: boolean;
}

interface EditorFieldNumber extends EditorFieldGeneral {
    type: 'number';
    payload?: EditorFieldNumberPayload;
}

export interface EditorFieldStylePayload {
    position: SelectOption[];
    type: SelectOption[];
}

interface EditorFieldStyle extends EditorFieldGeneral {
    type: 'style';
    payload: EditorFieldStylePayload;
}

export interface EditorFieldEnumPayload {
    valueConverter: (num: string | number) => string;
}

interface EditorFieldEnum extends EditorFieldGeneral {
    type: 'enum';
    payload: EditorFieldEnumPayload;
}

export type EditorField = EditorFieldSimple | EditorFieldOptions | EditorFieldNumber | EditorFieldStyle | EditorFieldEnum;
export type EditorType = EditorField['type'];

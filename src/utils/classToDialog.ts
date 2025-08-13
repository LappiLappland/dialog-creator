import Dialog from '../classes/dialogs/Dialog';
import DialogItem from '../classes/dialogs/DialogItem';
import { typeClassesMap } from '../constants/typeClassesMap';
import { getClassDescriptor } from '../descriptors/ClassDescriptor';
import { type ColorDialog, type DialogSound } from '../types/Dialog';
import { objectToColor } from './colorConverters';
import type { OFPClass, ParsedOFPClasses } from './cppParser';
import numToDialogStyle from './dialogStyleConverter';
import { evaluateMath } from './mathEvaluator';

export interface ImportedClassResult {
    mainClass: Dialog;
    children: DialogItem[];
}

// Converter from OFPClass to in-editor data reprensentation
export default function classToDialog(id: string, map: ParsedOFPClasses): ImportedClassResult {
    const mainClass = map.get(id.toLowerCase());
    if (!mainClass) {
        throw new Error(`Class ${mainClass} not found`);
    };

    const dialog = createInstance(mainClass, Dialog);
    dialog.className = mainClass.className;

    const children = mainClass.classes;
    const childrenOrdered = mainClass.properties['controls'];
    if (!Array.isArray(childrenOrdered)) {
        throw new Error('Controls property was not array of strings');
    }
    if (!(children instanceof Map)) {
        throw new Error('Classes was not Map. Possibly "classes" property exists in class');
    }
    const childrenInstances: DialogItem[] = [];

    childrenOrdered.forEach((child) => {
        const itemFromObj = children.get(child.toLowerCase());
        if (!itemFromObj) return;
        const item = createInstance(itemFromObj);
        if (!item) return;
        item.className = itemFromObj.className;
        childrenInstances.push(item);
    });

    return {
        mainClass: dialog,
        children: childrenInstances,
    };
}

// Recursively searches for value
function findValue(obj: OFPClass, key: string) {
    if (key in obj.properties) {
        return obj.properties[key];
    }
    else if (obj.parent) {
        return findValue(obj.parent, key);
    }
    return null;
}

// Creates instance of Dialog based on OFPClass
function createInstance<T>(obj: OFPClass, constructor?: new (id: string) => T) {
    let usedConstructor = constructor;

    // Find appropriate constructor based on type
    if (!usedConstructor) {
        const typeV = findValue(obj, 'type');

        if (!typeV) {
            throw new Error('Property "type" was not found on class. Unable to compose in-editor object');
        }
        if (Array.isArray(typeV)) {
            throw new Error('Property "type" was array. Expected plain value');
        }

        const typeC = evaluateMath(typeV);
        if (Number.isNaN(typeC)) {
            throw new Error('Property "type" is not a number');
        };

        usedConstructor = typeClassesMap.get(typeC) as new (id: string) => T;

        // Maybe unknown style. Just treat it as a Static
        if (!usedConstructor) {
            usedConstructor = DialogItem as new (id: string) => T;
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = new usedConstructor('') as any;
    const desc = getClassDescriptor(instance);
    if (!desc) {
        throw new Error('Application error. Could not find descriptor for object');
    }

    for (const [key, prop] of Object.entries(desc)) {
        if (prop.exclude) continue;

        const usedKey = prop.name ?? key;

        const foundValue = findValue(obj, usedKey.toLowerCase());

        if (!foundValue) continue;

        let value: string | boolean | number | ColorDialog | DialogSound | undefined;
        switch (prop.type) {
            case 'enum':
            case 'string-autocomplete':
            case 'select':
            case 'string':
                value = foundValue as string;
                break;
            case 'number':
                if (Array.isArray(foundValue)) {
                    throw new Error(`Expected string/number for property "${key}" in ${obj.className}, but received array`);
                }
                value = evaluateMath(foundValue) as number;
                break;
            case 'boolean':
                if (Array.isArray(foundValue)) {
                    throw new Error(`Expected string/number for property "${key}" in ${obj.className}, but received array`);
                }
                value = !!Number.parseInt(foundValue) as boolean;
                break;
            case 'color': {
                const [r, g, b, a] = foundValue;
                value = objectToColor({
                    r: evaluateMath(r),
                    g: evaluateMath(g),
                    b: evaluateMath(b),
                    a: evaluateMath(a),
                }) as ColorDialog;
                break;
            }
            case 'sound': {
                const [file, volume, pitch] = foundValue;
                value = {
                    file,
                    volume: evaluateMath(volume),
                    pitch: evaluateMath(pitch),
                } as DialogSound;
                break;
            }
            case 'style':
            case 'dialogBox':
            case 'class':
                break; // skip
        }

        if (value) {
            instance[key] = value;
        }
    }

    // Add box values
    ['x', 'y', 'w', 'h'].forEach((dim) => {
        const value = findValue(obj, dim);
        if (!value || Array.isArray(value)) return;
        const num = evaluateMath(value);
        if (num) {
            instance.box[dim] = num;
        }
    });

    // Add style value
    {
        const value = findValue(obj, 'style');
        if (value && !Array.isArray(value)) {
            const num = evaluateMath(value);
            const style = numToDialogStyle(num);
            instance.style = style;
        }
    }

    // Cast type to number
    {
        if (instance['type']) {
            instance['type'] = +instance['type'];
        }
    }

    return instance;
}

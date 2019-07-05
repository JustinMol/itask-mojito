import { Observable } from 'rxjs';

const EditorMetaKey = Symbol('Editor');
const EditorFieldMetaKey = Symbol('EditorField');

export enum EditorType {
    SimpleEditor,
    TableEditor,
    ConditionEditor,
};

export type Field = EditorFieldOptions & {
    value: any;
    property: string;
    options$: Observable<any[]>;
};

/* @Editors */
export const SimpleEditor = Reflect.metadata(EditorMetaKey, EditorType.SimpleEditor);
export const TableEditor = Reflect.metadata(EditorMetaKey, EditorType.TableEditor);
export const ConditionEditor = Reflect.metadata(EditorMetaKey, EditorType.ConditionEditor);

export function getEditorType(target: object): EditorType {
    return Reflect.getMetadata(EditorMetaKey, target);
}

/* @EditorField */
export interface EditorFieldOptions {
    property?: string;
    label?: string;
    input?: 'input' | 'select',
    type?: any,
}

export function EditorField(options: EditorFieldOptions = {}) {
    return function(target: object, property: string) {
        options.label = options.label || property;
        options.property = property;
        options.input = options.input || 'input';
        return Reflect.defineMetadata(EditorFieldMetaKey, options, target, property);
    }
}

export function getFieldOptions(target: object): EditorFieldOptions[] {
    return Object.getOwnPropertyNames(target)
        .filter(f => Reflect.hasMetadata(EditorFieldMetaKey, target, f))
        .map(f => Reflect.getMetadata(EditorFieldMetaKey, target, f));
}

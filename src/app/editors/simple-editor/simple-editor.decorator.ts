const EditorMetaKey = Symbol('Editor');
const EditorFieldMetaKey = Symbol('EditorField');

export enum EditorType {
    SimpleEditor,
};


// @TableEditor
export const SimpleEditor = Reflect.metadata(EditorMetaKey, EditorType.SimpleEditor);

// @EditorField
export function EditorField(label?: string, type?: string) {
    return function(target: object, property: string) {
        return Reflect.defineMetadata(EditorFieldMetaKey, label || property, target, property);
    }
}

export function getFields(target: object): any[] {
    return Object.getOwnPropertyNames(target)
        .filter(f => Reflect.hasMetadata(EditorFieldMetaKey, target, f))
        .map(f => ({
            property: f,
            label: Reflect.getMetadata(EditorFieldMetaKey, target, f),
            value: target[f],
        }));
}

export function getEditorType(target: object): EditorType {
    return Reflect.getMetadata(EditorMetaKey, target);
}

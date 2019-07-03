const EditorMetaKey = Symbol('Editor');
const EditorFieldMetaKey = Symbol('EditorField');

export enum EditorType {
    SimpleEditor,
    TableEditor,
    ConditionEditor,
};

/* @Decorators */
export const SimpleEditor = Reflect.metadata(EditorMetaKey, EditorType.SimpleEditor);
export const TableEditor = Reflect.metadata(EditorMetaKey, EditorType.TableEditor);
export const ConditionEditor = Reflect.metadata(EditorMetaKey, EditorType.ConditionEditor);

export function EditorField(label?: string, type?: string) {
    return function(target: object, property: string) {
        return Reflect.defineMetadata(EditorFieldMetaKey, label || property, target, property);
    }
}

export function EditorExpression() {
    
}

/* Getter functions */
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

import { Injectable, ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';
import { EditorType, getEditorType } from './table-editor/table-editor.decorator';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { EditorComponent } from './editor-component';

@Injectable({
  providedIn: 'root'
})
export class EditorFactoryResolver {

  private _editorMap = new Map<EditorType,Type<EditorComponent>>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this._editorMap.set(EditorType.TableEditor, TableEditorComponent);
  }

  createEditorFactory(target: any): ComponentFactory<EditorComponent> {
    const Class = target.constructor ? target.constructor : target;
    const editorType = getEditorType(Class);
    if (this._editorMap.has(editorType)) {
      const component = this._editorMap.get(editorType);
      return this.componentFactoryResolver.resolveComponentFactory(component);
    }

    return null;
  }
}
